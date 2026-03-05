// ============================================================
// WORLD MAP — Real 2D map via d3-geo + topojson + world-atlas
// ============================================================

import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import { zoom, zoomIdentity } from 'https://cdn.skypack.dev/d3-zoom@3';
import { select } from 'https://cdn.skypack.dev/d3-selection@3';
import worldData from 'world-atlas/countries-110m.json';

export class WorldMap {
    constructor(canvasId, gameState, onNodeClick) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.state = gameState;
        this.onNodeClick = onNodeClick;
        this.time = 0;
        this.hoveredNode = null;
        this.selectedNode = null;

        // Build world data
        this.countries = feature(worldData, worldData.objects.countries);
        this.borders = mesh(worldData, worldData.objects.countries, (a, b) => a !== b);

        this.transform = zoomIdentity;

        this._resize();
        window.addEventListener('resize', () => this._resize());
        this.canvas.addEventListener('mousemove', e => this._onMouseMove(e));
        this.canvas.addEventListener('click', e => this._onClick(e));
        this.canvas.addEventListener('mouseleave', () => { this.hoveredNode = null; this._hideTooltip(); });

        // Initialize D3 zoom
        this.zoom = zoom()
            .scaleExtent([0.8, 5])
            .on('zoom', (e) => {
                this.transform = e.transform;
            });

        select(this.canvas).call(this.zoom);
    }

    _resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.W = this.canvas.width;
        this.H = this.canvas.height;

        // Set up projection
        this.projection = geoNaturalEarth1()
            .scale(this.W / 6.4)
            .translate([this.W / 2, this.H / 2]);
        this.path = geoPath(this.projection, this.ctx);
    }

    _worldToCanvas(lon, lat) {
        const p = this.projection([lon, lat]);
        if (!p) return null;
        return this.transform.apply(p);
    }

    _canvasToWorld(cx, cy) {
        if (!this.projection.invert) return null;
        const ll = this.projection.invert([cx, cy]);
        if (!ll) return null;
        return [(ll[0] / 358 + 0.495), (0.5 - ll[1] / 165)];
    }

    _findNodeAt(cx, cy) {
        // Inverse transform the mouse coordinates to handle zoom/pan
        const [invX, invY] = this.transform.invert([cx, cy]);

        return this.state.nodes.find(n => {
            const pos = this.projection([n.lon, n.lat]);
            if (!pos) return false;
            const dx = pos[0] - invX, dy = pos[1] - invY;
            // Scale hit radius to be generous even when zoomed out
            return Math.sqrt(dx * dx + dy * dy) < (14 / this.transform.k);
        });
    }

    _onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const cx = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const cy = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        this.hoveredNode = this._findNodeAt(cx, cy);
        if (this.hoveredNode) {
            this._showTooltip(e.clientX - rect.left, e.clientY - rect.top, this.hoveredNode);
            this.canvas.style.cursor = 'pointer';
        } else {
            this._hideTooltip();
            this.canvas.style.cursor = 'crosshair';
        }
    }

    _onClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const cx = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const cy = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        const node = this._findNodeAt(cx, cy);
        if (node) {
            this.selectedNode = node;
            if (this.onNodeClick) this.onNodeClick(node);
        }
    }

    _showTooltip(cx, cy, node) {
        const tooltip = document.getElementById('map-tooltip');
        const relatedRoutes = this.state.routes.filter(r => r.from === node.id || r.to === node.id);
        const blocked = relatedRoutes.filter(r => r.status !== 'active').length;
        const income = relatedRoutes.reduce((s, r) => s + Math.floor(r.value * r.efficiency * 0.35), 0);

        const flag = this._getFlagEmoji(node.isoCode);

        let html = `<div style="display:flex; align-items:center; gap:8px; margin-bottom:5px;">
                      <span style="font-size:24px;">${flag}</span>
                      <strong style="font-size:16px; letter-spacing:1px;">${node.name.toUpperCase()}</strong>
                    </div>`;

        if (node.type === 'chokepoint') html += `<span style="color:#ff2244; font-weight:bold;">⚠ STRATEGIC CHOKEPOINT</span><br>`;
        else if (node.type === 'resource') html += `<span style="color:var(--cyan)">RESOURCE:</span> ${(node.resource || '').toUpperCase()}<br>`;
        else html += `<span style="color:var(--cyan)">GDP INDEX:</span> $${node.gdp}B<br>`;

        html += `<span style="color:var(--cyan)">ROUTES:</span> ${relatedRoutes.length} &nbsp;|&nbsp; <span style="color:#ff2244">BLOCKED:</span> ${blocked}<br>`;
        html += `<div style="margin-top:8px; border-top:1px solid rgba(0,212,255,0.2); padding-top:8px;">
                   EST. INCOME: <strong style="color:var(--green)">$${income}/TURN</strong>
                 </div>`;

        tooltip.innerHTML = html;
        tooltip.classList.add('visible');
        tooltip.style.left = `${Math.min(cx + 14, this.W - 220)}px`;
        tooltip.style.top = `${Math.min(cy - 10, this.H - 120)}px`;
    }

    _getFlagEmoji(isoCode) {
        if (!isoCode) return '🌐';
        return isoCode.toUpperCase().replace(/./g, char =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
        );
    }

    _hideTooltip() {
        document.getElementById('map-tooltip').classList.remove('visible');
    }

    render() {
        const ctx = this.ctx;
        const W = this.W, H = this.H;
        this.time += 0.018;

        ctx.clearRect(0, 0, W, H);

        // Map drawing
        ctx.save();
        ctx.translate(this.transform.x, this.transform.y);
        ctx.scale(this.transform.k, this.transform.k);

        // Ocean background
        const oceanGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.8);
        oceanGrad.addColorStop(0, '#04182e');
        oceanGrad.addColorStop(1, '#010a18');
        ctx.fillStyle = oceanGrad;

        // Draw ocean relative to projection bounding box to avoid hard edges when panning
        ctx.beginPath();
        this.path({ type: 'Sphere' });
        ctx.fill();

        // Draw sphere outline
        ctx.save();
        ctx.beginPath();
        this.path({ type: 'Sphere' });
        ctx.fillStyle = '#03122a';
        ctx.strokeStyle = 'rgba(0,212,255,0.08)';
        ctx.lineWidth = 0.5;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Graticule (lat/lon grid)
        this._drawGraticule(ctx);

        // Countries fill
        ctx.save();
        ctx.beginPath();
        this.path(this.countries);
        const landGrad = ctx.createLinearGradient(0, 0, 0, H);
        landGrad.addColorStop(0, '#0c2840');
        landGrad.addColorStop(1, '#091c30');
        ctx.fillStyle = landGrad;
        ctx.fill();
        ctx.restore();

        // Country borders
        ctx.save();
        ctx.beginPath();
        this.path(this.borders);
        ctx.strokeStyle = 'rgba(0,120,180,0.25)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();

        // Draw layers
        const layer = this.state.activeLayer;
        if (layer === 'trade' || layer === 'threats') this._drawRoutes(ctx, layer);
        if (layer === 'fog') this._drawFogOfWar(ctx, W, H);

        this._drawNodes(ctx);
        this._drawActiveEventIcons(ctx);
        ctx.restore(); // Restore from zoom/pan transform

        // Vignette overlay
        const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H);
        vig.addColorStop(0, 'transparent');
        vig.addColorStop(1, 'rgba(1,6,18,0.5)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
    }

    _drawGraticule(ctx) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0,80,120,0.12)';
        ctx.lineWidth = 0.4;
        // Simple lat/lon lines
        for (let lon = -180; lon <= 180; lon += 30) {
            ctx.beginPath();
            this.path({ type: 'LineString', coordinates: Array.from({ length: 91 }, (_, i) => [lon, -90 + i * 2]) });
            ctx.stroke();
        }
        for (let lat = -90; lat <= 90; lat += 30) {
            ctx.beginPath();
            this.path({ type: 'LineString', coordinates: Array.from({ length: 361 }, (_, i) => [-180 + i, lat]) });
            ctx.stroke();
        }
        ctx.restore();
    }

    _drawRoutes(ctx, layer) {
        this.state.routes.forEach(r => {
            const fromNode = this.state.getNode(r.from);
            const toNode = this.state.getNode(r.to);
            if (!fromNode || !toNode) return;

            const fp = this.projection([fromNode.lon, fromNode.lat]);
            const tp = this.projection([toNode.lon, toNode.lat]);
            if (!fp || !tp) return;
            const [fx, fy] = fp;
            const [tx, ty] = tp;

            let color, width, dash = [];
            if (r.status === 'blocked') {
                color = 'rgba(255,34,68,0.8)'; width = 2; dash = [5, 4];
            } else if (r.status === 'disrupted') {
                color = 'rgba(255,102,0,0.7)'; width = 1.5; dash = [3, 3];
            } else if (r.resource === 'oil') {
                color = 'rgba(255,110,0,0.5)'; width = 2;
            } else if (r.resource === 'minerals') {
                color = 'rgba(136,200,255,0.45)'; width = 1.5;
            } else if (r.type === 'air') {
                color = 'rgba(0,212,255,0.22)'; width = 1; dash = [7, 4];
            } else {
                color = 'rgba(0,160,220,0.38)'; width = 1.5;
            }

            if (r.status === 'active' && layer === 'trade') {
                this._drawAnimatedRoute(ctx, fx, fy, tx, ty, color, width, dash, r);
            } else {
                ctx.save();
                ctx.strokeStyle = color;
                ctx.lineWidth = width;
                ctx.setLineDash(dash);
                ctx.beginPath();
                ctx.moveTo(fx, fy);
                ctx.lineTo(tx, ty);
                ctx.stroke();
                ctx.restore();
            }
        });
    }

    _drawAnimatedRoute(ctx, fx, fy, tx, ty, color, width, dash, route) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.setLineDash(dash);
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated pulse dot
        const speed = 0.007 + (route.traffic / 10) * 0.006;
        const t = ((this.time * speed * 60) % 1 + 1) % 1;
        const px = fx + (tx - fx) * t;
        const py = fy + (ty - fy) * t;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/, '0.95)');
        ctx.fill();
        ctx.restore();
    }

    _drawFogOfWar(ctx, W, H) {
        ctx.save();
        ctx.fillStyle = 'rgba(0,0,0,0.72)';
        // Draw fog covering the whole visible projection area
        ctx.beginPath();
        this.path({ type: 'Sphere' });
        ctx.fill();
        this.state.nodes.forEach(n => {
            if (!n.fogRevealed) return;
            const pos = this.projection([n.lon, n.lat]);
            if (!pos) return;
            const [cx, cy] = pos;
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
            g.addColorStop(0, 'rgba(0,0,0,0.9)');
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(cx, cy, 70, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
    }

    _drawNodes(ctx) {
        // Adjust node sizes based on zoom to prevent massive nodes
        const i_k = 1 / Math.sqrt(this.transform.k);

        this.state.nodes.forEach(n => {
            const pos = this.projection([n.lon, n.lat]);
            if (!pos) return;
            const [cx, cy] = pos;
            const isHovered = this.hoveredNode === n;
            const isSelected = this.selectedNode === n;
            const isDisrupted = this.state.routes.some(r => (r.from === n.id || r.to === n.id) && r.status === 'blocked');
            const pulse = Math.sin(this.time * 2 + n.lon * 10) * 0.3 + 0.7;

            let color, glowColor, radius;
            if (n.type === 'chokepoint') {
                color = '#ff2244'; glowColor = `rgba(255,34,68,${0.7 * pulse})`; radius = 8 * i_k;
            } else if (n.type === 'resource') {
                color = n.resource === 'oil' ? '#ff6600' : '#88ccff';
                glowColor = n.resource === 'oil' ? `rgba(255,102,0,${0.55 * pulse})` : `rgba(136,200,255,${0.45 * pulse})`;
                radius = 6.5 * i_k;
            } else {
                color = isDisrupted ? '#ff6600' : '#00d4ff';
                glowColor = isDisrupted ? `rgba(255,102,0,${0.4 * pulse})` : `rgba(0,212,255,${0.35 * pulse})`;
                radius = 5.5 * i_k;
            }
            if (isHovered || isSelected) radius *= 1.5;

            // Glow
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 3.5);
            g.addColorStop(0, glowColor);
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(cx, cy, radius * 3.5, 0, Math.PI * 2);
            ctx.fill();

            // Node dot
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = isDisrupted ? '#ff6600' : color;
            ctx.fill();
            ctx.strokeStyle = isSelected ? '#ffd700' : (isHovered ? '#ffffff' : 'rgba(255,255,255,0.5)');
            ctx.lineWidth = (isSelected ? 2.5 : 1.2) * i_k;
            ctx.stroke();

            // Chokepoint warning
            if (n.isChokepoint) {
                ctx.save();
                ctx.font = 'bold 11px sans-serif';
                ctx.fillStyle = '#ff2244';
                ctx.textAlign = 'center';
                ctx.fillText('⚠', cx, cy - radius - 3);
                ctx.restore();
            }

            // Labels
            if (isHovered || isSelected || (n.type === 'economic' && n.gdp > 140) || this.transform.k > 2) {
                ctx.save();
                const fontSize = Math.max(6, 10 * i_k);
                const flag = this._getFlagEmoji(n.isoCode);

                ctx.textAlign = 'center';
                ctx.shadowColor = 'rgba(0,0,0,0.95)';
                ctx.shadowBlur = 5;

                // Draw Flag (using system font for better emoji support)
                ctx.font = `${fontSize * 1.2}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
                ctx.fillText(flag, cx, cy + radius + (13 * i_k));

                // Draw Name
                ctx.font = `${isHovered ? 'bold ' : ''}${fontSize}px "Share Tech Mono", monospace`;
                ctx.fillStyle = isSelected ? '#ffd700' : '#d0eeff';
                ctx.fillText(n.name.toUpperCase(), cx, cy + radius + (24 * i_k));

                ctx.restore();
            }
        });
    }

    _drawActiveEventIcons(ctx) {
        this.state.activeEvents.forEach(ev => {
            (ev.affectedRoutes || []).forEach(rid => {
                const r = this.state.getRoute(rid);
                if (!r) return;
                const fn = this.state.getNode(r.from);
                const tn = this.state.getNode(r.to);
                if (!fn || !tn) return;
                const fp = this.projection([fn.lon, fn.lat]);
                const tp = this.projection([tn.lon, tn.lat]);
                if (!fp || !tp) return;
                const cx = (fp[0] + tp[0]) / 2;
                const cy = (fp[1] + tp[1]) / 2;
                if (Math.sin(this.time * 5) > 0) {
                    ctx.save();
                    ctx.font = '16px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(ev.icon, cx, cy);
                    ctx.restore();
                }
            });
        });
    }

    resetZoom() {
        select(this.canvas)
            .transition()
            .duration(450)
            .call(this.zoom.transform, zoomIdentity);
    }

    startLoop() {
        const loop = () => { this.render(); requestAnimationFrame(loop); };
        requestAnimationFrame(loop);
    }
}
