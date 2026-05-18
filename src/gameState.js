// ============================================================
// GAME STATE MANAGER
// ============================================================

import { COMMODITIES, WORLD_NODES, TRADE_ROUTES } from './data.js';

const PHASES = ['INTEL', 'MITIGATION', 'ACTION', 'RESOLUTION'];

export class GameState {
    constructor(faction) {
        this.faction = faction;
        this.turn = 1;
        this.phaseIdx = 0;

        // Resources
        this.capital = faction.startCapital;
        this.oil = faction.startOil;
        this.data = faction.startData;
        this.influence = faction.startInfluence;

        // Market
        this.commodities = COMMODITIES.map(c => ({
            ...c,
            price: c.basePrice,
            history: [c.basePrice],
            playerHoldings: 0,
        }));

        // World state
        this.nodes = WORLD_NODES.map(n => ({ ...n, status: 'active', fogRevealed: !n.isChokepoint, disrupted: 0 }));
        this.routes = TRADE_ROUTES.map(r => ({ ...r, status: 'active', efficiency: 1.0, insured: false }));

        // Game state
        this.defcon = 5;
        this.dominance = 0;
        this.activeEvents = [];
        this.resolvedEvents = [];
        this.turnLog = [];
        this.infrastructure = [];
        this.pendingActions = [];
        this.activeLayer = 'trade';

        // Generate starting income
        this.turnIncome = this._calcTurnIncome();

        // Subscribe list
        this._subs = {};
    }

    get phase() { return PHASES[this.phaseIdx]; }

    on(event, cb) {
        if (!this._subs[event]) this._subs[event] = [];
        this._subs[event].push(cb);
    }

    emit(event, data) {
        (this._subs[event] || []).forEach(cb => cb(data));
    }

    getNode(id) { return this.nodes.find(n => n.id === id); }
    getRoute(id) { return this.routes.find(r => r.id === id); }
    getCommodity(id) { return this.commodities.find(c => c.id === id); }

    getActiveRoutes() { return this.routes.filter(r => r.status === 'active'); }

    canAfford(cost) { return this.capital >= cost; }

    spendCapital(amount, reason) {
        if (!this.canAfford(amount)) return false;
        this.capital -= amount;
        this.turnLog.push({ type: 'spend', amount, reason });
        this.emit('resources-changed');
        return true;
    }

    gainCapital(amount, reason) {
        this.capital += amount;
        this.turnLog.push({ type: 'gain', amount, reason });
        this.emit('resources-changed');
    }

    applyEvent(event) {
        this.activeEvents.push({ ...event, turnsRemaining: event.defconDelta > 0 ? 2 : 1 });

        // Update DEFCON
        if (event.defconDelta !== 0) {
            this.defcon = Math.max(1, Math.min(5, this.defcon - event.defconDelta));
            this.emit('defcon-changed', this.defcon);
        }

        // Disrupt routes
        event.affectedRoutes.forEach(rid => {
            const r = this.getRoute(rid);
            if (r) {
                r.efficiency = event.routeBlockMult;
                if (event.routeBlockMult === 0) r.status = 'blocked';
                else if (event.routeBlockMult < 0.8) r.status = 'disrupted';
            }
        });

        // Price shocks
        if (event.priceMod) {
            Object.entries(event.priceMod).forEach(([cid, mult]) => {
                const c = this.getCommodity(cid);
                if (c) {
                    c.price = Math.max(c.basePrice * 0.3, c.price * mult);
                    c.history.push(c.price);
                    if (c.history.length > 12) c.history.shift();
                }
            });
        }

        this.emit('event-applied', event);
    }

    resolveEvent(event) {
        // Gradually restore routes
        event.affectedRoutes.forEach(rid => {
            const r = this.getRoute(rid);
            if (r && r.status !== 'active') {
                r.status = 'active';
                r.efficiency = 1.0;
            }
        });
        this.resolvedEvents.push(event);
        this.emit('event-resolved', event);
    }

    doMarketTick() {
        this.commodities.forEach(c => {
            const drift = (Math.random() - 0.485) * c.volatile;
            const meanRevert = (c.basePrice - c.price) * 0.08;
            c.price = Math.max(c.basePrice * 0.25, c.price * (1 + drift) + meanRevert);
            c.history.push(Math.round(c.price * 100) / 100);
            if (c.history.length > 12) c.history.shift();
        });
        this.emit('market-updated');
    }

    doIncomeTick() {
        this.turnIncome = this._calcTurnIncome();
        const income = this.turnIncome;
        this.gainCapital(income, `Turn ${this.turn} trade income`);
        const oilIncome = Math.floor(this.getActiveRoutes().filter(r => r.resource === 'oil').length * 80 * (this.faction.specialBonus?.oilIncome || 1));
        this.oil = Math.min(9999, this.oil + oilIncome);
        const dataIncome = Math.floor(60 * (this.faction.specialBonus?.dataIncome || 1));
        this.data = Math.min(9999, this.data + dataIncome);
        this.emit('resources-changed');
        return { capital: income, oil: oilIncome, data: dataIncome };
    }

    _calcTurnIncome() {
        const activeRoutes = this.getActiveRoutes();
        const baseIncome = activeRoutes.reduce((sum, r) => sum + (r.value * r.efficiency), 0);
        const speedBonus = this.faction.specialBonus?.tradeSpeed || 1;
        return Math.floor(baseIncome * speedBonus * 0.35);
    }

    addInfrastructure(item) {
        this.infrastructure.push({ ...item, builtTurn: this.turn });
        this.emit('infrastructure-added', item);
    }

    updateDominance() {
        const maxCapital = 80000;
        const oilScore = Math.min(1, this.oil / 5000) * 15;
        const infraScore = Math.min(1, this.infrastructure.length / 10) * 15;
        const capitalScore = Math.min(1, this.capital / maxCapital) * 70;
        this.dominance = Math.min(100, Math.floor(capitalScore + oilScore + infraScore));
        this.emit('dominance-changed', this.dominance);
    }

    checkWinLose() {
        if (this.defcon <= 1) {
            return { over: true, win: false, reason: 'DEFCON 1 reached. Global annihilation imminent. Operation terminated.', icon: '☢️' };
        }
        if (this.capital <= 0) {
            return { over: true, win: false, reason: 'Economic collapse. Your empire has crumbled to dust.', icon: '💸' };
        }
        if (this.dominance >= 90) {
            return { over: true, win: true, reason: 'Global market dominance achieved. The world bends to your will.', icon: '👑' };
        }
        return { over: false };
    }

    advancePhase() {
        this.phaseIdx = (this.phaseIdx + 1) % PHASES.length;
        if (this.phaseIdx === 0) {
            this.turn++;
            // Tick down active events
            this.activeEvents = this.activeEvents.filter(ev => {
                ev.turnsRemaining--;
                if (ev.turnsRemaining <= 0) { this.resolveEvent(ev); return false; }
                return true;
            });
        }
        this.emit('phase-changed', this.phase);
        return this.phase;
    }
}
