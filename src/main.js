// ============================================================
// MAIN.JS — Redesigned scenario-driven orchestrator
// ============================================================

import './style.css';
import { FACTIONS, COMMODITIES, WORLD_NODES, TRADE_ROUTES, AI_ADVISOR_MESSAGES } from './data.js';
import { GameState } from './gameState.js';
import { WorldMap } from './worldMap.js';
import { SCENARIOS, getScenarioForTurn } from './scenarios.js';

let selectedFaction = null;
let gameState = null;
let worldMap = null;
let usedScenarioIds = [];
let currentScenario = null;
let scenarioCount = 0;

// ── INTRO ──────────────────────────────────────────────────────
function initIntro() {
  const grid = document.getElementById('faction-grid');
  FACTIONS.forEach(f => {
    const card = document.createElement('div');
    card.className = 'faction-card';
    card.innerHTML = `<span class="faction-icon">${f.icon}</span>
      <div class="faction-name">${f.name}</div>
      <div class="faction-bonus">${f.bonus.split('\n').join('<br>')}</div>`;
    card.addEventListener('click', () => {
      selectedFaction = f;
      document.querySelectorAll('.faction-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById('btn-start').removeAttribute('disabled');
    });
    grid.appendChild(card);
  });
  document.getElementById('btn-start').addEventListener('click', startGame);
}

// ── GAME START ─────────────────────────────────────────────────
function startGame() {
  if (!selectedFaction) return;
  document.getElementById('intro-screen').classList.remove('active');
  document.getElementById('game-screen').classList.add('active');

  gameState = new GameState(selectedFaction);

  // Subscribe to reactive updates
  gameState.on('resources-changed', () => renderResources());
  gameState.on('defcon-changed', () => renderDefcon());
  gameState.on('market-updated', () => renderMarket());
  gameState.on('dominance-changed', () => renderDominance());

  // World map
  worldMap = new WorldMap('world-map', gameState, onNodeClick);
  worldMap.startLoop();

  // Map layer buttons
  document.querySelectorAll('.map-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.activeLayer = btn.dataset.layer;
    });
  });

  // Consequence continue button
  document.getElementById('btn-continue').addEventListener('click', onContinueAfterConsequence);
  document.getElementById('btn-restart').addEventListener('click', () => location.reload());

  // Initial render
  renderFactionBadge();
  renderResources();
  renderDefcon();
  renderMarket();
  renderDominance();
  renderAdvisor();

  // First market tick (passive income drip)
  setInterval(() => {
    gameState.doMarketTick();
  }, 8000);

  setStatus('Commander, your strategic command is operational. First scenario incoming...');

  // Small delay then first scenario
  setTimeout(() => presentScenario(), 1200);
}

// ── SCENARIO ENGINE ────────────────────────────────────────────
function presentScenario() {
  scenarioCount++;
  document.getElementById('turn-num').textContent = Math.ceil(scenarioCount / 3);
  document.getElementById('scenario-count-badge').textContent = `SCENARIO ${scenarioCount}`;

  currentScenario = getScenarioForTurn(gameState.turn, usedScenarioIds);
  if (!currentScenario) {
    setStatus('All scenarios exhausted. Turn loop continues.');
    usedScenarioIds = [];
    currentScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
  }
  usedScenarioIds.push(currentScenario.id);

  // Play a "new scenario" news alert
  addNews(`BREAKING: ${currentScenario.title}`, currentScenario.category === 'CRITICAL' ? 'critical' : 'high', currentScenario.icon);

  // Apply DEFCON delta from scenario event
  if (currentScenario.defconDelta !== 0) {
    gameState.defcon = Math.max(1, Math.min(5, gameState.defcon - currentScenario.defconDelta));
    renderDefcon();
    if (currentScenario.defconDelta > 0) {
      document.getElementById('game-screen').classList.add('flash-red');
      setTimeout(() => document.getElementById('game-screen').classList.remove('flash-red'), 600);
    }
  }

  // Passive income per N scenarios
  if (scenarioCount % 3 === 0) {
    const income = gameState.doIncomeTick();
    gameState.updateDominance();
    addNews(`Turn income collected: +$${income.capital.toLocaleString()}`, 'low', '💰');
    renderResources();
    renderDominance();
  }

  // Check win/lose
  const result = gameState.checkWinLose();
  if (result.over) { showGameOver(result); return; }

  renderScenarioCard(currentScenario);
  renderAdvisor();
  setStatus(`📋 New scenario: ${currentScenario.title} — Choose your response, Commander.`);
}

function renderScenarioCard(sc) {
  const container = document.getElementById('scenario-card-container');

  // Remove placeholder
  const placeholder = document.getElementById('scenario-placeholder');
  if (placeholder) placeholder.remove();

  const card = document.createElement('div');
  card.className = 'scenario-card';
  card.id = 'active-scenario-card';

  card.innerHTML = `
    <div class="scenario-cat-bar">
      <span class="scenario-cat-icon">${sc.icon}</span>
      <span class="scenario-category">${sc.category} ALERT</span>
      <span class="scenario-turn-badge">TURN ${Math.ceil(scenarioCount / 3)}</span>
    </div>
    <div class="scenario-title">${sc.title}</div>
    <div class="scenario-situation">${sc.situation}</div>
    <div class="scenario-context-toggle" id="ctx-toggle">
      <span class="toggle-arrow">▶</span>&nbsp;REAL-WORLD CONTEXT
    </div>
    <div class="scenario-context" id="scenario-context">${sc.realWorldContext}</div>
    <div class="scenario-choices-label">SELECT YOUR RESPONSE:</div>
    <div class="scenario-choices" id="scenario-choices"></div>
  `;

  // Remove previous card
  const prev = document.getElementById('active-scenario-card');
  if (prev) prev.remove();
  container.appendChild(card);

  // Toggle real-world context
  document.getElementById('ctx-toggle').addEventListener('click', () => {
    const toggle = document.getElementById('ctx-toggle');
    const ctx = document.getElementById('scenario-context');
    toggle.classList.toggle('open');
    ctx.classList.toggle('open');
  });

  // Build choice cards
  const choicesEl = document.getElementById('scenario-choices');
  sc.choices.forEach(choice => {
    const canAfford = choice.cost === 0 || gameState.canAfford(choice.cost);
    const div = document.createElement('div');
    div.className = `choice-card ${canAfford ? 'can-afford' : 'cannot-afford'}`;

    // Build effect tags
    const effectTags = buildEffectTags(choice.effects);

    div.innerHTML = `
      <div class="choice-header">
        <span class="choice-label">${choice.label}</span>
        <span class="choice-cost ${choice.cost === 0 ? 'free' : ''}">${choice.cost === 0 ? 'FREE' : '$' + choice.cost.toLocaleString()}</span>
      </div>
      <div class="choice-desc">${choice.description}</div>
      <div class="choice-logic-hint">"${choice.realLogic.substring(0, 100)}..."</div>
      <div class="choice-effects">${effectTags}</div>
    `;

    if (canAfford) {
      div.addEventListener('click', () => executeChoice(sc, choice));
    } else {
      div.title = `Insufficient capital. Need $${choice.cost.toLocaleString()}.`;
    }

    choicesEl.appendChild(div);
  });

  container.scrollTop = container.scrollHeight;
}

function buildEffectTags(effects) {
  const tags = [];
  if (effects.capital > 0) tags.push(`<span class="choice-effect-tag pos">+$${effects.capital.toLocaleString()}</span>`);
  if (effects.capital < 0) tags.push(`<span class="choice-effect-tag neg">-$${Math.abs(effects.capital).toLocaleString()}</span>`);
  if (effects.oil > 0) tags.push(`<span class="choice-effect-tag pos">+${effects.oil} OIL</span>`);
  if (effects.oil < 0) tags.push(`<span class="choice-effect-tag neg">${effects.oil} OIL</span>`);
  if (effects.data > 0) tags.push(`<span class="choice-effect-tag pos">+${effects.data} DATA</span>`);
  if (effects.data < 0) tags.push(`<span class="choice-effect-tag neg">${effects.data} DATA</span>`);
  if (effects.defcon < 0) tags.push(`<span class="choice-effect-tag pos">DEFCON ↑</span>`);
  if (effects.defcon > 0) tags.push(`<span class="choice-effect-tag neg">DEFCON ↓</span>`);
  if (effects.influence > 0) tags.push(`<span class="choice-effect-tag neu">+${effects.influence} INFL</span>`);
  if (effects.influence < 0) tags.push(`<span class="choice-effect-tag neg">${effects.influence} INFL</span>`);
  return tags.join('');
}

// ── CHOICE EXECUTION ───────────────────────────────────────────
function executeChoice(scenario, choice) {
  // Spend capital
  if (choice.cost > 0) {
    if (!gameState.spendCapital(choice.cost, choice.label)) return;
  }

  // Apply effects
  const eff = choice.effects;
  if (eff.capital > 0) gameState.gainCapital(eff.capital, choice.label);
  if (eff.capital < 0) gameState.spendCapital(Math.abs(eff.capital), choice.label);
  if (eff.oil !== undefined) gameState.oil = Math.max(0, Math.min(9999, gameState.oil + (eff.oil || 0)));
  if (eff.data !== undefined) gameState.data = Math.max(0, Math.min(9999, gameState.data + (eff.data || 0)));
  if (eff.influence !== undefined) gameState.influence = Math.max(0, Math.min(9999, gameState.influence + (eff.influence || 0)));
  if (eff.defcon !== undefined) {
    gameState.defcon = Math.max(1, Math.min(5, gameState.defcon - eff.defcon));
    renderDefcon();
  }

  // Apply price mods
  if (choice.priceMods) {
    Object.entries(choice.priceMods).forEach(([cid, mult]) => {
      const c = gameState.getCommodity(cid);
      if (c) {
        c.price = Math.max(c.basePrice * 0.25, c.price * mult);
        c.history.push(Math.round(c.price * 100) / 100);
        if (c.history.length > 14) c.history.shift();
      }
    });
    renderMarket();
  }

  // Apply route disruptions
  if (choice.affectsRoutes && choice.affectsRoutes.length > 0 && choice.routeEff !== 1) {
    choice.affectsRoutes.forEach(rid => {
      const r = gameState.getRoute(rid);
      if (!r) return;
      r.efficiency = choice.routeEff;
      if (choice.routeEff === 0) r.status = 'blocked';
      else if (choice.routeEff < 0.8) r.status = 'disrupted';
      else r.status = 'active';
    });
  } else if (choice.routeEff > 1 && choice.affectsRoutes) {
    choice.affectsRoutes.forEach(rid => {
      const r = gameState.getRoute(rid);
      if (r) { r.efficiency = Math.min(2.0, choice.routeEff); r.status = 'active'; }
    });
  }

  // Store active choice event
  if (scenario.defconDelta > 0 || (choice.affectsRoutes && choice.affectsRoutes.length > 0)) {
    gameState.activeEvents.push({
      id: `${scenario.id}_${choice.id}`,
      type: scenario.category.toLowerCase(),
      icon: scenario.icon,
      affectedRoutes: choice.affectsRoutes || [],
      turnsRemaining: 2,
      defconDelta: scenario.defconDelta
    });
  }

  gameState.updateDominance();
  renderResources();
  renderDominance();

  // Check win/lose after choice
  const result = gameState.checkWinLose();
  if (result.over) { showGameOver(result); return; }

  // Show consequence overlay
  showConsequence(scenario, choice);
}

// ── CONSEQUENCE OVERLAY ────────────────────────────────────────
function showConsequence(scenario, choice) {
  const overlay = document.getElementById('consequence-overlay');
  overlay.classList.remove('hidden');

  document.getElementById('consequence-header').textContent = '⚡ OPERATION COMPLETE';
  document.getElementById('consequence-scenario-title').textContent = scenario.title;
  document.getElementById('consequence-choice-made').textContent = '▶ ' + choice.label;

  document.getElementById('consequence-logic').textContent = choice.realLogic;
  document.getElementById('consequence-outcome').textContent = choice.consequence;

  // Effect pills
  const effEl = document.getElementById('consequence-effects');
  const eff = choice.effects;
  const pills = [];
  if (choice.cost > 0) pills.push(`<span class="effect-pill neg">-$${choice.cost.toLocaleString()} SPENT</span>`);
  if (eff.capital > 0) pills.push(`<span class="effect-pill pos">+$${eff.capital.toLocaleString()} GAINED</span>`);
  if (eff.capital < 0) pills.push(`<span class="effect-pill neg">-$${Math.abs(eff.capital).toLocaleString()} LOST</span>`);
  if (eff.oil > 0) pills.push(`<span class="effect-pill pos">+${eff.oil} OIL RESERVES</span>`);
  if (eff.defcon < 0) pills.push(`<span class="effect-pill pos">DEFCON ${gameState.defcon} — TENSIONS EASE</span>`);
  if (eff.defcon > 0) pills.push(`<span class="effect-pill neg">DEFCON ${gameState.defcon} — ESCALATING</span>`);
  effEl.innerHTML = pills.join('');

  // Market summary
  const mktEl = document.getElementById('consequence-market');
  if (choice.priceMods && Object.keys(choice.priceMods).length > 0) {
    const moves = Object.entries(choice.priceMods).map(([cid, mult]) => {
      const c = gameState.getCommodity(cid);
      const label = c ? c.name : cid.toUpperCase();
      const pct = ((mult - 1) * 100).toFixed(0);
      return `${label} ${mult > 1 ? `<span style="color:var(--green)">▲${pct}%</span>` : `<span style="color:var(--red)">▼${Math.abs(pct)}%</span>`}`;
    }).join(' &nbsp;|&nbsp; ');
    mktEl.innerHTML = `<strong>MARKET IMPACT:</strong> ${moves}`;
  } else {
    mktEl.innerHTML = '<strong>MARKETS:</strong> No significant commodity movement.';
  }

  addNews(choice.label, 'medium', scenario.icon);
}

function onContinueAfterConsequence() {
  document.getElementById('consequence-overlay').classList.add('hidden');

  // Tick down active events
  gameState.activeEvents = gameState.activeEvents.filter(ev => {
    if (--ev.turnsRemaining <= 0) {
      (ev.affectedRoutes || []).forEach(rid => {
        const r = gameState.getRoute(rid);
        if (r) { r.status = 'active'; r.efficiency = 1.0; }
      });
      return false;
    }
    return true;
  });

  renderResources();
  setStatus('Situation resolved. Analyzing next intelligence report...');
  setTimeout(() => presentScenario(), 800);
}

// ── NODE CLICK ─────────────────────────────────────────────────
function onNodeClick(node) {
  const routes = gameState.routes.filter(r => r.from === node.id || r.to === node.id);
  const blocked = routes.filter(r => r.status !== 'active').length;
  const income = routes.reduce((s, r) => s + Math.floor(r.value * r.efficiency * 0.35), 0);
  setStatus(`📍 ${node.name} — ${routes.length} routes | ${blocked} blocked | ~$${income}/turn`);
}

// ── UI RENDER FUNCTIONS ────────────────────────────────────────
function renderFactionBadge() {
  const f = selectedFaction;
  const badge = document.getElementById('player-faction-badge');
  badge.textContent = `${f.icon} ${f.name}`;
  badge.style.color = f.color;
  badge.style.borderColor = f.color + '50';
  badge.style.background = f.color + '12';
}

function renderResources() {
  const s = gameState;
  const items = [
    { icon: '💰', label: 'CAPITAL', value: `$${(s.capital / 1000).toFixed(1)}K`, cls: s.capital < 3000 ? 'negative' : s.capital < 7000 ? 'caution' : '' },
    { icon: '⛽', label: 'OIL', value: s.oil, cls: '' },
    { icon: '💻', label: 'DATA', value: s.data, cls: '' },
    { icon: '🎯', label: 'INFL.', value: s.influence, cls: '' },
  ];
  document.getElementById('resource-bar').innerHTML = items.map(item => `
    <div class="resource-item">
      <span class="resource-icon">${item.icon}</span>
      <div>
        <div class="resource-label">${item.label}</div>
        <div class="resource-value ${item.cls}">${item.value}</div>
      </div>
    </div>`).join('');
}

function renderDefcon() {
  const lvl = gameState.defcon;
  document.getElementById('defcon-level').textContent = lvl;
  document.getElementById('defcon-level').className = `defcon-level defcon-${lvl}`;
  const labels = { 5: 'PEACETIME', 4: 'GUARDED', 3: 'ELEVATED', 2: 'HIGH ALERT', 1: '⚠ MAXIMUM' };
  document.getElementById('defcon-label').textContent = labels[lvl];
  const segs = document.getElementById('defcon-segments');
  segs.innerHTML = '';
  for (let i = 5; i >= 1; i--) {
    const seg = document.createElement('div');
    seg.className = `defcon-seg${i >= lvl ? ` active-${lvl}` : ''}`;
    segs.appendChild(seg);
  }
}

function renderMarket() {
  const container = document.getElementById('market-container');
  container.innerHTML = '';
  gameState.commodities.forEach(c => {
    const prev = c.history.length >= 2 ? c.history[c.history.length - 2] : c.basePrice;
    const change = ((c.price - prev) / prev * 100);
    const isUp = change >= 0;
    let ps;
    if (c.price >= 1000) ps = `$${c.price.toFixed(0)}`;
    else if (c.price >= 10) ps = `$${c.price.toFixed(2)}`;
    else ps = `$${c.price.toFixed(3)}`;
    const pts = c.history.map((v, i) => {
      const min = Math.min(...c.history), max = Math.max(...c.history);
      const x = (i / Math.max(1, c.history.length - 1)) * 46;
      const y = 22 - ((v - min) / Math.max(0.001, max - min)) * 20;
      return `${x},${y}`;
    }).join(' ');
    const row = document.createElement('div');
    row.className = 'commodity-row';
    row.innerHTML = `
      <span class="commodity-icon">${c.icon}</span>
      <div class="commodity-info">
        <div class="commodity-name">${c.name}</div>
        <div class="commodity-price">${ps}</div>
      </div>
      <div class="commodity-change ${isUp ? 'up' : 'down'}">${isUp ? '▲' : '▼'}${Math.abs(change).toFixed(1)}%</div>
      <svg class="sparkline" viewBox="0 0 46 22">
        <polyline points="${pts}" fill="none" stroke="${isUp ? '#00ff88' : '#ff2244'}" stroke-width="1.4" opacity="0.9"/>
      </svg>`;
    container.appendChild(row);
  });
}

function renderAdvisor() {
  const msg = AI_ADVISOR_MESSAGES[Math.floor(Math.random() * AI_ADVISOR_MESSAGES.length)];
  document.getElementById('advisor-message').textContent = `"${msg}"`;

  const events = [
    { label: 'Gulf Disruption', pct: 30 + Math.floor(Math.random() * 50), cls: 'high' },
    { label: 'Cyber Attack EU', pct: 15 + Math.floor(Math.random() * 40), cls: 'med' },
    { label: 'Market Correction', pct: 20 + Math.floor(Math.random() * 45), cls: 'med' },
    { label: 'De-escalation', pct: 10 + Math.floor(Math.random() * 30), cls: 'low' },
  ];
  if (gameState.defcon <= 3) events[0].pct = Math.min(92, events[0].pct + 28);

  document.getElementById('advisor-probability').innerHTML = events.map(ev => `
    <div class="prob-row">
      <span class="prob-label">${ev.label}</span>
      <div class="prob-bar-wrap"><div class="prob-bar-fill ${ev.cls}" style="width:${ev.pct}%"></div></div>
      <span class="prob-pct">${ev.pct}%</span>
    </div>`).join('');
}

function renderDominance() {
  document.getElementById('dominance-pct').textContent = gameState.dominance;
  document.getElementById('dominance-fill').style.width = `${gameState.dominance}%`;
}

function addNews(headline, severity = 'low', icon = '📰') {
  const feed = document.getElementById('news-feed');
  const item = document.createElement('div');
  item.className = `news-item severity-${severity}`;
  item.innerHTML = `<div class="news-time">BREAKING</div><div class="news-headline">${icon} ${headline}</div>`;
  feed.insertBefore(item, feed.firstChild);
  while (feed.children.length > 12) feed.removeChild(feed.lastChild);
}

function setStatus(msg) {
  document.getElementById('status-message').textContent = msg;
}

// ── GAME OVER ──────────────────────────────────────────────────
function showGameOver(result) {
  const overlay = document.getElementById('gameover-overlay');
  const panel = document.getElementById('gameover-panel');
  overlay.classList.remove('hidden');
  if (result.win) panel.classList.add('victory');
  document.getElementById('gameover-icon').textContent = result.icon;
  document.getElementById('gameover-title').textContent = result.win ? 'GLOBAL DOMINANCE' : 'OPERATION TERMINATED';
  document.getElementById('gameover-reason').textContent = result.reason;
  document.getElementById('gameover-stats').innerHTML = `
    SCENARIOS SURVIVED: ${scenarioCount}<br>
    FINAL CAPITAL: $${gameState.capital.toLocaleString()}<br>
    DEFCON REACHED: ${gameState.defcon}<br>
    DOMINANCE ACHIEVED: ${gameState.dominance}%
  `;
}

// ── BOOT ───────────────────────────────────────────────────────
initIntro();
