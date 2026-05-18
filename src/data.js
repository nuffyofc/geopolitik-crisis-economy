// ============================================================
// GAME DATA: Factions, Nodes, Routes, Commodities, Events
// ============================================================

export const FACTIONS = [
  {
    id: 'NOMAD_CORP',
    name: 'NOMAD CORP',
    icon: '🌐',
    bonus: '+20% trade route speed\n−15% reroute cost',
    description: 'Stateless megacorporation with unmatched logistics.',
    color: '#00d4ff',
    startCapital: 12000,
    startOil: 800,
    startData: 1200,
    startInfluence: 600,
    specialBonus: { tradeSpeed: 1.2, rerouteCost: 0.85 }
  },
  {
    id: 'IRON_PACT',
    name: 'IRON PACT',
    icon: '⚔️',
    bonus: '+30% military protection\n−25% base cost',
    description: 'Former defense conglomerate turned global power broker.',
    color: '#ff6600',
    startCapital: 15000,
    startOil: 600,
    startData: 800,
    startInfluence: 1200,
    specialBonus: { militaryProtect: 1.3, baseCost: 0.75 }
  },
  {
    id: 'SILKROAD_AI',
    name: 'SILKROAD AI',
    icon: '🤖',
    bonus: '+35% market prediction\n+20% data income',
    description: 'Algorithmic supremacy through AI-driven market analysis.',
    color: '#9b59b6',
    startCapital: 10000,
    startOil: 400,
    startData: 2400,
    startInfluence: 800,
    specialBonus: { marketPrediction: 1.35, dataIncome: 1.2 }
  },
  {
    id: 'ARCTIC_SYNDICATE',
    name: 'ARCTIC SYNDICATE',
    icon: '❄️',
    bonus: '+25% resource extraction\nImmune to weather events',
    description: 'Controls critical polar mineral deposits and routes.',
    color: '#88ccff',
    startCapital: 11000,
    startOil: 1200,
    startData: 600,
    startInfluence: 800,
    specialBonus: { resourceExtract: 1.25, weatherImmune: true }
  },
  {
    id: 'GULF_CARTEL',
    name: 'GULF CARTEL',
    icon: '⛽',
    bonus: '+40% oil income\nChoke point control bonus',
    description: 'Commands critical energy infrastructure and waterways.',
    color: '#ffd700',
    startCapital: 13000,
    startOil: 2000,
    startData: 400,
    startInfluence: 600,
    specialBonus: { oilIncome: 1.4, chokeBonus: 1.5 }
  },
  {
    id: 'CYBER_GHOSTS',
    name: 'CYBER GHOSTS',
    icon: '👻',
    bonus: '+50% cyber ops\n−30% webcam cost',
    description: 'Shadow network with eyes everywhere and allegiance to none.',
    color: '#00ff88',
    startCapital: 9000,
    startOil: 200,
    startData: 3000,
    startInfluence: 1000,
    specialBonus: { cyberOps: 1.5, webcamCost: 0.7 }
  }
];

// World map nodes (x/y as percentages of canvas)
export const WORLD_NODES = [
  // North America
  { id: 'nyc', name: 'New York', type: 'economic', lon: -74.0, lat: 40.7, region: 'NA', gdp: 250 },
  { id: 'la', name: 'Los Angeles', type: 'economic', lon: -118.2, lat: 34.0, region: 'NA', gdp: 180 },
  { id: 'houston', name: 'Houston', type: 'resource', lon: -95.3, lat: 29.7, region: 'NA', gdp: 120, resource: 'oil' },
  { id: 'toronto', name: 'Toronto', type: 'economic', lon: -79.3, lat: 43.6, region: 'NA', gdp: 90 },

  // Europe
  { id: 'london', name: 'London', type: 'economic', lon: -0.1, lat: 51.5, region: 'EU', gdp: 220 },
  { id: 'frankfurt', name: 'Frankfurt', type: 'economic', lon: 8.6, lat: 50.1, region: 'EU', gdp: 180 },
  { id: 'paris', name: 'Paris', type: 'economic', lon: 2.3, lat: 48.8, region: 'EU', gdp: 200 },
  { id: 'rotterdam', name: 'Rotterdam', type: 'economic', lon: 4.4, lat: 51.9, region: 'EU', gdp: 70, isPort: true },

  // Middle East
  { id: 'dubai', name: 'Dubai/Gulf', type: 'resource', lon: 55.2, lat: 25.2, region: 'ME', gdp: 150, resource: 'oil', isChokepoint: false },
  { id: 'hormuz', name: 'Strait of Hormuz', type: 'chokepoint', lon: 56.4, lat: 26.5, region: 'ME', gdp: 0, isChokepoint: true },
  { id: 'riyadh', name: 'Riyadh', type: 'resource', lon: 46.6, lat: 24.7, region: 'ME', gdp: 100, resource: 'oil' },

  // Africa / Suez
  { id: 'suez', name: 'Suez Canal', type: 'chokepoint', lon: 32.5, lat: 29.9, region: 'AF', gdp: 0, isChokepoint: true },
  { id: 'cairo', name: 'Cairo', type: 'economic', lon: 31.2, lat: 30.0, region: 'AF', gdp: 60 },
  { id: 'lagos', name: 'Lagos', type: 'resource', lon: 3.3, lat: 6.5, region: 'AF', gdp: 55, resource: 'minerals' },
  { id: 'capetown', name: 'Cape Town', type: 'economic', lon: 18.4, lat: -33.9, region: 'AF', gdp: 40 },
  { id: 'congo', name: 'Congo Basin', type: 'resource', lon: 15.3, lat: -4.3, region: 'AF', gdp: 20, resource: 'minerals' },

  // Asia
  { id: 'mumbai', name: 'Mumbai', type: 'economic', lon: 72.8, lat: 19.0, region: 'AS', gdp: 140 },
  { id: 'singapore', name: 'Singapore', type: 'economic', lon: 103.8, lat: 1.3, region: 'AS', gdp: 100, isPort: true },
  { id: 'malacca', name: 'Malacca Strait', type: 'chokepoint', lon: 102.2, lat: 2.2, region: 'AS', gdp: 0, isChokepoint: true },
  { id: 'shanghai', name: 'Shanghai', type: 'economic', lon: 121.4, lat: 31.2, region: 'AS', gdp: 280 },
  { id: 'tokyo', name: 'Tokyo', type: 'economic', lon: 139.6, lat: 35.6, region: 'AS', gdp: 250 },
  { id: 'seoul', name: 'Seoul', type: 'economic', lon: 126.9, lat: 37.5, region: 'AS', gdp: 140 },
  { id: 'beijing', name: 'Beijing', type: 'economic', lon: 116.4, lat: 39.9, region: 'AS', gdp: 220 },
  { id: 'siberia', name: 'Siberia Mines', type: 'resource', lon: 88.2, lat: 69.3, region: 'AS', gdp: 30, resource: 'minerals' },

  // Latin America
  { id: 'saopaulo', name: 'São Paulo', type: 'economic', lon: -46.6, lat: -23.5, region: 'LA', gdp: 90 },
  { id: 'buenos', name: 'Buenos Aires', type: 'economic', lon: -58.3, lat: -34.6, region: 'LA', gdp: 60 },
  { id: 'bogota', name: 'Bogotá', type: 'resource', lon: -74.0, lat: 4.7, region: 'LA', gdp: 40, resource: 'minerals' },

  // Russia
  { id: 'moscow', name: 'Moscow', type: 'economic', lon: 37.6, lat: 55.7, region: 'RU', gdp: 130 },
  { id: 'urals', name: 'Ural Fields', type: 'resource', lon: 65.5, lat: 57.1, region: 'RU', gdp: 50, resource: 'oil' },

  // Australia
  { id: 'sydney', name: 'Sydney', type: 'economic', lon: 151.2, lat: -33.8, region: 'OC', gdp: 80 },
  { id: 'perth', name: 'W. Australia Mines', type: 'resource', lon: 115.8, lat: -31.9, region: 'OC', gdp: 30, resource: 'minerals' },
];

// Trade routes: pairs of node IDs
export const TRADE_ROUTES = [
  // Transatlantic
  { id: 'r1', from: 'nyc', to: 'london', type: 'sea', traffic: 8, value: 200 },
  { id: 'r2', from: 'nyc', to: 'frankfurt', type: 'air', traffic: 5, value: 120 },
  { id: 'r3', from: 'houston', to: 'rotterdam', type: 'sea', traffic: 9, value: 300, resource: 'oil' },

  // Europe internal
  { id: 'r4', from: 'london', to: 'frankfurt', type: 'air', traffic: 9, value: 150 },
  { id: 'r5', from: 'frankfurt', to: 'rotterdam', type: 'land', traffic: 8, value: 100 },
  { id: 'r6', from: 'rotterdam', to: 'paris', type: 'land', traffic: 7, value: 90 },

  // Suez corridor
  { id: 'r7', from: 'rotterdam', to: 'suez', type: 'sea', traffic: 7, value: 180 },
  { id: 'r8', from: 'suez', to: 'dubai', type: 'sea', traffic: 9, value: 250 },
  { id: 'r9', from: 'dubai', to: 'hormuz', type: 'sea', traffic: 10, value: 400, resource: 'oil' },

  // Asia routes
  { id: 'r10', from: 'dubai', to: 'mumbai', type: 'sea', traffic: 7, value: 150 },
  { id: 'r11', from: 'mumbai', to: 'singapore', type: 'sea', traffic: 8, value: 180 },
  { id: 'r12', from: 'singapore', to: 'malacca', type: 'sea', traffic: 10, value: 350 },
  { id: 'r13', from: 'malacca', to: 'shanghai', type: 'sea', traffic: 9, value: 280 },
  { id: 'r14', from: 'shanghai', to: 'tokyo', type: 'air', traffic: 9, value: 200 },
  { id: 'r15', from: 'shanghai', to: 'beijing', type: 'land', traffic: 8, value: 160 },
  { id: 'r16', from: 'tokyo', to: 'nyc', type: 'air', traffic: 7, value: 180 },
  { id: 'r17', from: 'seoul', to: 'beijing', type: 'land', traffic: 6, value: 120 },

  // Russia
  { id: 'r18', from: 'moscow', to: 'frankfurt', type: 'land', traffic: 5, value: 130 },
  { id: 'r19', from: 'urals', to: 'moscow', type: 'land', traffic: 8, value: 200, resource: 'oil' },
  { id: 'r20', from: 'siberia', to: 'beijing', type: 'land', traffic: 5, value: 90, resource: 'minerals' },

  // Africa
  { id: 'r21', from: 'lagos', to: 'rotterdam', type: 'sea', traffic: 5, value: 120, resource: 'minerals' },
  { id: 'r22', from: 'congo', to: 'cairo', type: 'land', traffic: 3, value: 80, resource: 'minerals' },
  { id: 'r23', from: 'capetown', to: 'rotterdam', type: 'sea', traffic: 4, value: 100 },

  // Pacific
  { id: 'r24', from: 'sydney', to: 'singapore', type: 'sea', traffic: 5, value: 110 },
  { id: 'r25', from: 'perth', to: 'shanghai', type: 'sea', traffic: 6, value: 140, resource: 'minerals' },
  { id: 'r26', from: 'sydney', to: 'la', type: 'sea', traffic: 5, value: 130 },

  // Latin America
  { id: 'r27', from: 'saopaulo', to: 'rotterdam', type: 'sea', traffic: 5, value: 100 },
  { id: 'r28', from: 'saopaulo', to: 'nyc', type: 'sea', traffic: 6, value: 110 },
  { id: 'r29', from: 'bogota', to: 'houston', type: 'sea', traffic: 5, value: 90, resource: 'minerals' },
  { id: 'r30', from: 'bogota', to: 'saopaulo', type: 'land', traffic: 3, value: 60 },
];

export const COMMODITIES = [
  { id: 'oil', name: 'CRUDE OIL', icon: '⛽', basePrice: 85, unit: '$/bbl', volatile: 0.22, color: '#ff6600' },
  { id: 'gold', name: 'GOLD', icon: '🥇', basePrice: 2020, unit: '$/oz', volatile: 0.08, color: '#ffd700' },
  { id: 'lithium', name: 'LITHIUM', icon: '⚡', basePrice: 45, unit: '$/kg', volatile: 0.25, color: '#88ccff' },
  { id: 'wheat', name: 'WHEAT', icon: '🌾', basePrice: 6.5, unit: '$/bu', volatile: 0.15, color: '#c8a060' },
  { id: 'copper', name: 'COPPER', icon: '🔩', basePrice: 8.8, unit: '$/lb', volatile: 0.18, color: '#cc6633' },
  { id: 'natgas', name: 'NAT. GAS', icon: '🔥', basePrice: 3.2, unit: '$/mmbtu', volatile: 0.3, color: '#88aaff' },
];

export const GLOBAL_EVENTS = [
  // Kinetic
  { id: 'ev1', type: 'kinetic', severity: 'critical', headline: 'Airstrike grounds shipping in Gulf region', region: 'ME', icon: '💥', affectedRoutes: ['r8', 'r9'], routeBlockMult: 0, priceMod: { oil: 1.35, gold: 1.08 }, defconDelta: 1, minTurn: 2 },
  { id: 'ev2', type: 'kinetic', severity: 'high', headline: 'Naval blockade imposed near Taiwan Strait', region: 'AS', icon: '🚢', affectedRoutes: ['r14', 'r13'], routeBlockMult: 0.3, priceMod: { lithium: 1.2, copper: 1.15 }, defconDelta: 1, minTurn: 3 },
  { id: 'ev3', type: 'kinetic', severity: 'critical', headline: 'Suez Canal blocked after terrorist attack', region: 'AF', icon: '🚫', affectedRoutes: ['r7', 'r8'], routeBlockMult: 0, priceMod: { oil: 1.28, wheat: 1.15, gold: 1.1 }, defconDelta: 1, minTurn: 4 },
  { id: 'ev4', type: 'kinetic', severity: 'high', headline: 'Drone swarm disrupts Strait of Hormuz transit', region: 'ME', icon: '🛸', affectedRoutes: ['r9'], routeBlockMult: 0.2, priceMod: { oil: 1.45, natgas: 1.3 }, defconDelta: 1, minTurn: 2 },
  { id: 'ev5', type: 'kinetic', severity: 'medium', headline: 'Proxy conflict erupts over Siberian mineral fields', region: 'AS', icon: '⚔️', affectedRoutes: ['r20', 'r19'], routeBlockMult: 0.5, priceMod: { lithium: 1.15, copper: 1.1 }, defconDelta: 0, minTurn: 3 },

  // Cyber
  { id: 'ev6', type: 'cyber', severity: 'high', headline: 'Critical port infrastructure hacked in Rotterdam', region: 'EU', icon: '💻', affectedRoutes: ['r3', 'r7', 'r21'], routeBlockMult: 0.5, priceMod: { copper: 1.08 }, defconDelta: 0, minTurn: 1 },
  { id: 'ev7', type: 'cyber', severity: 'critical', headline: 'AI-driven market manipulation detected in Shanghai', region: 'AS', icon: '🔓', affectedRoutes: [], routeBlockMult: 1, priceMod: { oil: 0.9, gold: 0.95, lithium: 0.88 }, defconDelta: 0, minTurn: 2 },
  { id: 'ev8', type: 'cyber', severity: 'medium', headline: 'Banking malware freezes transactions in Frankfurt', region: 'EU', icon: '🛡️', affectedRoutes: [], routeBlockMult: 1, priceMod: { gold: 1.06, copper: 0.96 }, defconDelta: 0, minTurn: 1 },
  { id: 'ev9', type: 'cyber', severity: 'high', headline: 'Grid attack disables three US eastern seaboard ports', region: 'NA', icon: '⚡', affectedRoutes: ['r1', 'r2', 'r28'], routeBlockMult: 0.4, priceMod: { oil: 1.1, wheat: 1.08 }, defconDelta: 0, minTurn: 2 },

  // Natural
  { id: 'ev10', type: 'natural', severity: 'high', headline: 'Category 5 hurricane devastates Gulf Coast refineries', region: 'NA', icon: '🌀', affectedRoutes: ['r3', 'r29'], routeBlockMult: 0.3, priceMod: { oil: 1.25, natgas: 1.2, wheat: 1.12 }, defconDelta: 0, minTurn: 1 },
  { id: 'ev11', type: 'natural', severity: 'medium', headline: 'Earthquake disrupts mining in Chilean Andes', region: 'LA', icon: '🌋', affectedRoutes: ['r30'], routeBlockMult: 0.5, priceMod: { copper: 1.18, lithium: 1.12 }, defconDelta: 0, minTurn: 1 },
  { id: 'ev12', type: 'natural', severity: 'medium', headline: 'Monsoon season delays Asian shipping by 30%', region: 'AS', icon: '🌧️', affectedRoutes: ['r11', 'r12'], routeBlockMult: 0.7, priceMod: { wheat: 1.1 }, defconDelta: 0, minTurn: 1 },
  { id: 'ev13', type: 'natural', severity: 'high', headline: 'Drought cuts West African grain output by 40%', region: 'AF', icon: '☀️', affectedRoutes: [], routeBlockMult: 1, priceMod: { wheat: 1.3 }, defconDelta: 0, minTurn: 1 },
  { id: 'ev14', type: 'natural', severity: 'low', headline: 'Arctic ice melt opens Northern Sea Route', region: 'AS', icon: '🧊', affectedRoutes: [], routeBlockMult: 1, priceMod: { oil: 0.95 }, defconDelta: 0, minTurn: 2 },

  // Geopolitical / economic
  { id: 'ev15', type: 'political', severity: 'high', headline: 'OPEC+ announces 2Mbbl/day production cut', region: 'ME', icon: '📉', affectedRoutes: [], routeBlockMult: 1, priceMod: { oil: 1.18, natgas: 1.12 }, defconDelta: 0, minTurn: 1 },
  { id: 'ev16', type: 'political', severity: 'medium', headline: 'G7 imposes sweeping tech sanctions on rival powers', region: 'EU', icon: '🚧', affectedRoutes: ['r15', 'r17'], routeBlockMult: 0.7, priceMod: { lithium: 1.1, copper: 1.08 }, defconDelta: 0, minTurn: 2 },
  { id: 'ev17', type: 'political', severity: 'medium', headline: 'New free trade zone established in Southeast Asia', region: 'AS', icon: '📈', affectedRoutes: [], routeBlockMult: 1, priceMod: { copper: 0.93, lithium: 0.95 }, defconDelta: -1, minTurn: 3 },
  { id: 'ev18', type: 'political', severity: 'critical', headline: 'Nuclear standoff triggers global market panic', region: 'AS', icon: '☢️', affectedRoutes: [], routeBlockMult: 1, priceMod: { gold: 1.25, oil: 0.8 }, defconDelta: 2, minTurn: 4 },
  { id: 'ev19', type: 'political', severity: 'high', headline: 'Unprecedented IMF bailout stabilizes emerging markets', region: 'LA', icon: '💵', affectedRoutes: [], routeBlockMult: 1, priceMod: { oil: 1.05, gold: 0.97 }, defconDelta: -1, minTurn: 3 },
  { id: 'ev20', type: 'political', severity: 'low', headline: 'Diplomatic breakthrough: Russia-EU pipeline deal signed', region: 'EU', icon: '🤝', affectedRoutes: ['r18'], routeBlockMult: 1.2, priceMod: { natgas: 0.85, oil: 0.97 }, defconDelta: -1, minTurn: 4 },
];

export const INFRASTRUCTURE_OPTIONS = {
  trade: [
    { id: 'reroute', name: 'Emergency Reroute', cost: 2000, icon: '🔄', desc: 'Bypass blocked route around Africa (+2 turns, −15% penalties)', requiresRoute: true },
    { id: 'insurance', name: 'Route Insurance', cost: 1500, icon: '🛡️', desc: 'Insure top 3 routes. Collect 140% value if blocked.', requiresRoute: false },
    { id: 'fastlane', name: 'Priority Shipping', cost: 3000, icon: '🚀', desc: 'Double cargo output for 2 turns on all active routes.', requiresRoute: false },
    { id: 'new_port', name: 'Build Deep-Sea Port', cost: 8000, icon: '⚓', desc: 'Adds 50% traffic capacity permanently to chosen hub.', requiresRoute: true },
  ],
  infra: [
    { id: 'data_center', name: 'Build Data Center', cost: 5000, icon: '🖥️', desc: 'Reduces cyber attack damage by 40% in that region.', requiresRoute: false },
    { id: 'mil_base', name: 'Military Base', cost: 9000, icon: '🛡️', desc: 'Deters kinetic attacks near one chokepoint for 3 turns.', requiresRoute: true },
    { id: 'pipeline', name: 'Alternative Pipeline', cost: 7000, icon: '🔧', desc: 'Creates bypass for Suez/Hormuz chokepoints permanently.', requiresRoute: false },
    { id: 'satellite', name: 'Satellite Network', cost: 4000, icon: '🛸', desc: 'Reveals all active threats and upcoming events for 3 turns.', requiresRoute: false },
  ],
  covert: [
    { id: 'proxy_war', name: 'Fund Proxy Conflict', cost: 6000, icon: '⚔️', desc: 'Trigger rival disruption in a competitor region for 2 turns.', requiresRoute: false },
    { id: 'market_raid', name: 'Market Manipulation', cost: 4000, icon: '📊', desc: 'Short-sell a commodity; profit on next crash.', requiresRoute: false },
    { id: 'webcam_hack', name: 'Deploy Webcam Network', cost: 2500, icon: '📷', desc: 'Reveal fog-of-war nodes in one region for 3 turns.', requiresRoute: false },
    { id: 'corporate_takeover', name: 'Hostile Takeover', cost: 12000, icon: '💼', desc: 'Seize a rival trade route and collect 50% of their income.', requiresRoute: true },
  ]
};

export const AI_ADVISOR_MESSAGES = [
  'Long-term intel suggests Persian Gulf tension will escalate within 2 turns. Consider oil stockpiles.',
  'Market anomaly detected. Gold diverging from risk parity model — hedge accordingly.',
  'Rival logistics appears to concentrate in SE Asia. A disruption there would be... strategically interesting.',
  'Siberian mineral extraction output is 22% below baseline. This may indicate upstream conflict.',
  'Algorithmic scan of news vectors identifies 67% probability of Suez disruption within 3 turns.',
  'Currency devaluation patterns in emerging markets suggest imminent commodity sell-off.',
  'Cyber threat vectors clustering around Rotterdam. Recommend defensive data center investment.',
  'Optimal arbitrage window detected: lithium contract spread exceeds 18% — favorable entry point.',
  'Three rival supply chains are exposed to the same chokepoint. A single event could reshape standings.',
  'DEFCON trajectory anomalous. Diplomatic back-channels showing increased usage — possible de-escalation.',
  'Climate models project disruption to North Atlantic shipping lanes within 1-2 turns.',
  'Shell company activity near Congo mineral fields detected. Competitor expansion imminent.',
];
