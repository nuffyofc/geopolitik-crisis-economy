// ============================================================
// UI PANELS: DEFCON, Market, News Feed, Advisor, Actions
// ============================================================

// ── DEFCON WIDGET ─────────────────────────────────────────────
export function renderDefcon(state) {
    const lvl = state.defcon;
    const display = document.getElementById('defcon-display');
    const levelEl = document.getElementById('defcon-level');

    levelEl.textContent = lvl;
    levelEl.className = `defcon-level defcon-${lvl}`;

    const labels = { 5: 'PEACETIME', 4: 'GUARDED', 3: 'ELEVATED', 2: 'HIGH ALERT', 1: '⚠ MAXIMUM ALERT' };
    document.getElementById('defcon-label').textContent = labels[lvl];

    // Segments (5 segments, light up from right = 5, toward left = 1)
    const segs = document.getElementById('defcon-segments');
    segs.innerHTML = '';
    for (let i = 5; i >= 1; i--) {
        const seg = document.createElement('div');
        seg.className = 'defcon-seg';
        if (i >= lvl) seg.classList.add(`active-${lvl}`);
        segs.appendChild(seg);
    }

    // Flash screen on DEFCON change
    if (lvl <= 2) {
        document.getElementById('game-screen').classList.add('flash-red');
        setTimeout(() => document.getElementById('game-screen').classList.remove('flash-red'), 600);
    }
}

// ── MARKET WIDGET ─────────────────────────────────────────────
export function renderMarket(state) {
    const container = document.getElementById('market-container');
    container.innerHTML = '';

    state.commodities.forEach(c => {
        const prev = c.history.length >= 2 ? c.history[c.history.length - 2] : c.basePrice;
        const change = ((c.price - prev) / prev * 100);
        const isUp = change >= 0;

        let priceStr;
        if (c.price >= 1000) priceStr = `$${c.price.toFixed(0)}`;
        else if (c.price >= 10) priceStr = `$${c.price.toFixed(2)}`;
        else priceStr = `$${c.price.toFixed(3)}`;

        const row = document.createElement('div');
        row.className = 'commodity-row';
        row.innerHTML = `
      <span class="commodity-icon">${c.icon}</span>
      <div class="commodity-info">
        <div class="commodity-name">${c.name}</div>
        <div class="commodity-price">${priceStr}</div>
      </div>
      <div class="commodity-change ${isUp ? 'up' : 'down'}">${isUp ? '▲' : '▼'} ${Math.abs(change).toFixed(1)}%</div>
      <svg class="sparkline" viewBox="0 0 50 24" preserveAspectRatio="none">
        ${renderSparkline(c.history, c.color, isUp)}
      </svg>
    `;
        container.appendChild(row);
    });
}

function renderSparkline(history, color, isUp) {
    if (history.length < 2) return '';
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;
    const pts = history.map((v, i) => {
        const x = (i / (history.length - 1)) * 50;
        const y = 24 - ((v - min) / range) * 22;
        return `${x},${y}`;
    });
    const lineColor = isUp ? '#00ff88' : '#ff2244';
    return `<polyline points="${pts.join(' ')}" fill="none" stroke="${lineColor}" stroke-width="1.5" opacity="0.9"/>`;
}

// ── RESOURCE BAR ──────────────────────────────────────────────
export function renderResources(state) {
    const bar = document.getElementById('resource-bar');
    const items = [
        { icon: '💰', label: 'CAPITAL', value: `$${(state.capital / 1000).toFixed(1)}K`, class: state.capital < 2000 ? 'negative' : 'positive' },
        { icon: '⛽', label: 'OIL RESERVES', value: state.oil, class: 'positive' },
        { icon: '💻', label: 'DATA CREDITS', value: state.data, class: 'positive' },
        { icon: '🎯', label: 'INFLUENCE', value: state.influence, class: 'positive' },
        { icon: '📈', label: 'PROJ. INCOME', value: `+$${state.turnIncome}`, class: 'positive' },
    ];

    bar.innerHTML = items.map(item => `
    <div class="resource-item">
      <span class="resource-icon">${item.icon}</span>
      <div>
        <div class="resource-label">${item.label}</div>
        <div class="resource-value ${item.class}">${item.value}</div>
      </div>
    </div>
  `).join('');
}

// ── NEWS FEED ──────────────────────────────────────────────────
const NEWS_TIMES = ['00:00', '03:47', '07:23', '09:51', '12:00', '14:33', '17:09', '20:44', '22:17'];
let newsTimeIdx = 0;

export function addNewsItem(event, newsFeed) {
    const item = document.createElement('div');
    const time = NEWS_TIMES[newsTimeIdx % NEWS_TIMES.length];
    newsTimeIdx++;
    item.className = `news-item severity-${event.severity}`;
    item.innerHTML = `
    <div class="news-time">⏱ ${time} UTC — ${event.type.toUpperCase()}</div>
    <div class="news-headline">${event.icon} ${event.headline}</div>
    <span class="news-tag">${event.region} REGION</span>
  `;
    newsFeed.insertBefore(item, newsFeed.firstChild);
    // Keep max 15 items
    while (newsFeed.children.length > 15) newsFeed.removeChild(newsFeed.lastChild);
}

export function addNewsGeneric(headline, severity = 'low', icon = '📰') {
    const feed = document.getElementById('news-feed');
    const item = document.createElement('div');
    item.className = `news-item severity-${severity}`;
    item.innerHTML = `
    <div class="news-time">⏱ BREAKING — MARKETS</div>
    <div class="news-headline">${icon} ${headline}</div>
  `;
    feed.insertBefore(item, feed.firstChild);
    while (feed.children.length > 15) feed.removeChild(feed.lastChild);
}

// ── AI ADVISOR ────────────────────────────────────────────────
export function renderAdvisor(state, messages) {
    const idx = Math.floor(Math.random() * messages.length);
    const msg = messages[idx];
    document.getElementById('advisor-message').textContent = `"${msg}"`;

    // Generate probabilities
    const events = [
        { label: 'Gulf Disruption', pct: 30 + Math.floor(Math.random() * 50), cls: 'high' },
        { label: 'Cyber Attack EU', pct: 15 + Math.floor(Math.random() * 40), cls: 'med' },
        { label: 'Market Correction', pct: 20 + Math.floor(Math.random() * 45), cls: 'med' },
        { label: 'DEFCON Reduction', pct: 10 + Math.floor(Math.random() * 30), cls: 'low' },
    ];

    // Bias based on current defcon
    if (state.defcon <= 3) events[0].pct = Math.min(95, events[0].pct + 30);

    const probContainer = document.getElementById('advisor-probability');
    probContainer.innerHTML = events.map(ev => `
    <div class="prob-row">
      <span class="prob-label">${ev.label}</span>
      <div class="prob-bar-wrap"><div class="prob-bar-fill ${ev.cls}" style="width:${ev.pct}%"></div></div>
      <span class="prob-pct">${ev.pct}%</span>
    </div>
  `).join('');
}

// ── ACTION PANEL ──────────────────────────────────────────────
export function renderActions(state, currentTab, onAction) {
    const { INFRASTRUCTURE_OPTIONS } = { INFRASTRUCTURE_OPTIONS: null };
    // Import lazily
    import('./data.js').then(({ INFRASTRUCTURE_OPTIONS: opts }) => {
        const actions = opts[currentTab] || [];
        const content = document.getElementById('action-content');
        content.innerHTML = '';

        actions.forEach(action => {
            const canAfford = state.canAfford(action.cost);
            const div = document.createElement('div');
            div.className = `action-item${canAfford ? '' : ' disabled'}`;
            if (!canAfford) div.setAttribute('disabled', true);
            div.innerHTML = `
        <div class="action-item-header">
          <span class="action-item-name">${action.icon} ${action.name}</span>
          <span class="action-item-cost">$${action.cost.toLocaleString()}</span>
        </div>
        <div class="action-item-desc">${action.desc}</div>
      `;
            if (canAfford) {
                div.addEventListener('click', () => onAction(action));
            }
            content.appendChild(div);
        });
    });
}

// ── PHASE DISPLAY ──────────────────────────────────────────────
export function renderPhase(phase) {
    const phaseDescs = {
        INTEL: 'Analyze threats and news. Prepare your response.',
        MITIGATION: 'Protect your assets. Reroute, insure, build defenses.',
        ACTION: 'Execute trades, covert ops, and market maneuvers.',
        RESOLUTION: 'The turn resolves. Markets adjust. Profits tallied.'
    };
    const phaseEl = document.getElementById('turn-phase-indicator');
    phaseEl.textContent = phase;
    phaseEl.className = `turn-phase ${phase}`;
    document.getElementById('phase-name').textContent = `${phase} PHASE`;
    document.getElementById('phase-desc').textContent = phaseDescs[phase] || '';
}

// ── DOMINANCE METER ────────────────────────────────────────────
export function renderDominance(state) {
    document.getElementById('dominance-pct').textContent = state.dominance;
    document.getElementById('dominance-fill').style.width = `${state.dominance}%`;
}

// ── FACTION BADGE ──────────────────────────────────────────────
export function renderFactionBadge(faction) {
    const badge = document.getElementById('player-faction-badge');
    badge.textContent = `${faction.icon} ${faction.name}`;
    badge.style.color = faction.color;
    badge.style.borderColor = faction.color + '66';
    badge.style.background = faction.color + '15';
}
