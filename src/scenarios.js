// ============================================================
// SCENARIOS: Real-world geopolitical decision system
// Each scenario has: situation, context, lore, and 3-4 choices
// Each choice has: action, real-world logic explanation, consequences
// ============================================================

export const SCENARIOS = [

    // ─────── ENERGY / OIL ──────────────────────────────────────
    {
        id: 'sc_opec_cut',
        category: 'ENERGY',
        icon: '⛽',
        title: 'OPEC+ Surprise Production Cut',
        situation: 'Saudi Arabia and Russia announce an immediate 2 million barrel/day production cut, sending oil futures surging 12% in pre-market trading. Your Gulf shipping routes are already profitable — but this changes everything.',
        realWorldContext: 'OPEC uses production cuts as a geopolitical vote. In 2022, a similar cut before midterm elections was seen as a direct slap at Washington. The petrodollar system means oil-producing nations and the US are locked in a mutual hostage arrangement.',
        defconDelta: 0,
        choices: [
            {
                id: 'buy_oil_futures',
                label: '📈 Buy oil futures — ride the spike',
                description: 'Short-term play. Profit from the price surge.',
                realLogic: 'Classic crisis profiteering. In real markets, hedge funds front-run OPEC announcements within hours of leaked agendas from Vienna hotel lobbies. This is legal and expected.',
                cost: 3000,
                effects: { capital: +8000, oil: 0, defcon: 0 },
                consequence: 'Oil spikes 15% over 2 turns. Your position pays out $8,000. However rivals also profit — Dominance edge narrows.',
                priceMods: { oil: 1.15, natgas: 1.08 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'stockpile_oil',
                label: '🛢️ Stockpile physical reserves now',
                description: 'Buy before prices fully adjust. Build a strategic reserve.',
                realLogic: 'The US Strategic Petroleum Reserve (SPR) does exactly this — buy low, store, release when prices hurt consumers. Nations with reserves are immune to blackmail.',
                cost: 5000,
                effects: { capital: -5000, oil: +2500, defcon: 0 },
                consequence: 'You acquire 2,500 oil units at pre-spike prices. When you sell next turn, net profit is $6,200. Future oil disruptions deal 40% less damage to your income.',
                priceMods: { oil: 1.12 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'fund_alternative_energy',
                label: '☀️ Pivot — invest in alternative energy infrastructure',
                description: 'Long game. Reduce oil dependency permanently.',
                realLogic: 'Germany post-Nord Stream tried this exact pivot. The problem: it takes 3-5 years. Short term pain, long term immunity from OPEC pressure. The US IRA ($369B) was this bet at national scale.',
                cost: 8000,
                effects: { capital: -2000, oil: -100, defcon: -1 },
                consequence: 'You absorb -$2,000 net loss this turn as oil prices hurt your routes. But starting Turn 4, your oil dependency drops 50% — OPEC disruptions barely affect you.',
                priceMods: { oil: 1.1 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'ignore_it',
                label: '🤷 Do nothing — this is noise',
                description: 'Hold position. Watch and wait.',
                realLogic: 'Sometimes the right move. Markets overreact to OPEC announcements. If US shale producers instantly ramp production (as they did in 2022), the spike reverses within weeks.',
                cost: 0,
                effects: { capital: -2000, oil: 0, defcon: 0 },
                consequence: 'Your shipping costs increase. Route income drops $2,000 this turn as fuel costs eat margins. If shale responds next turn, you recover — if not, you took a preventable hit.',
                priceMods: { oil: 1.18, natgas: 1.1 },
                affectsRoutes: ['r3', 'r9'],
                routeEff: 0.75
            }
        ]
    },

    {
        id: 'sc_red_sea_attack',
        category: 'KINETIC',
        icon: '🚢',
        title: 'Houthi Missiles Target Red Sea Shipping',
        situation: 'Iranian-backed Houthi forces in Yemen have fired ballistic missiles at three commercial tankers in the Red Sea. Two are damaged. Lloyd\'s of London has suspended insurance for all Red Sea transits. Your Suez corridor generates 40% of your income.',
        realWorldContext: 'This is exactly what happened in late 2023–2024. Shipping companies rerouted around the Cape of Good Hope, adding 14 days and ~$1M per trip. The Houthis use this as leverage for Iran in nuclear negotiations — the attacks literally stop when deals are made.',
        defconDelta: 1,
        choices: [
            {
                id: 'reroute_cape',
                label: '🌍 Reroute all ships around Cape of Good Hope',
                description: 'Avoid the Red Sea entirely. Pay the extra fuel and time cost.',
                realLogic: 'This is what Maersk, MSC, and CMA CGM all did in 2024. The Cape route adds 14 days and $1M per voyage in fuel, but your ship is not a missile target. Insurance alone on the Suez route jumped from $500K to $3M per trip.',
                cost: 4000,
                effects: { capital: -4000, oil: -300, defcon: 0 },
                consequence: 'Suez routes blocked for 2 turns. You take a -$4,000 reroute cost hit but avoid route destruction. Oil consumption increases. Income from those routes drops 30% due to longer transit.',
                priceMods: { oil: 1.08, wheat: 1.06 },
                affectsRoutes: ['r7', 'r8'],
                routeEff: 0.7
            },
            {
                id: 'buy_route_insurance',
                label: '🛡️ Buy war risk insurance — keep sailing',
                description: 'Accept the risk premium. Routes stay open.',
                realLogic: 'Lloyd\'s of London war risk premiums for Gulf of Aden went from 0.05% to 1.5% of cargo value overnight in early 2024. Some operators paid it — mostly those with military escort arrangements.',
                cost: 6000,
                effects: { capital: +3000, oil: 0, defcon: 0 },
                consequence: 'Routes stay active at 90% efficiency. If an attack event fires next turn, insurance pays out $9,000. This is a positive EV bet if your intel suggests escalation is temporary.',
                priceMods: { oil: 1.05 },
                affectsRoutes: [],
                routeEff: 0.9
            },
            {
                id: 'fund_naval_escort',
                label: '⚓ Pay for naval coalition escort',
                description: 'Spend heavily to secure the lane permanently.',
                realLogic: 'Operation Prosperity Guardian was the US-led coalition to escort ships. The problem: it costs the US Navy more than the cargo is worth. But for megacorps, a private military contract (PMC) escort is a real option.',
                cost: 12000,
                effects: { capital: +1000, oil: 0, defcon: -1 },
                consequence: 'Suez corridor secured for 4 turns. Military presence deters further attacks. DEFCON improves by 1. High upfront cost, massive long-term income protection.',
                priceMods: { oil: 0.95 },
                affectsRoutes: ['r7', 'r8'],
                routeEff: 1.1
            },
            {
                id: 'profit_oil_spike',
                label: '💰 Short shipping stocks, long oil futures',
                description: 'Don\'t fix the problem — profit from it.',
                realLogic: 'Market predators love crises they don\'t own. When Houthi attacks spiked in 2024, tanker operators like Frontline saw stock prices surge 40% because tight supply = higher rates for remaining operational ships.',
                cost: 2000,
                effects: { capital: +7000, oil: 0, defcon: 0 },
                consequence: 'Your own Red Sea income drops. But oil futures and tanker stocks surge. Net gain: $7,000. Morally dubious. Mechanically efficient. Dominance increases.',
                priceMods: { oil: 1.22, natgas: 1.12 },
                affectsRoutes: ['r7'],
                routeEff: 0.5
            }
        ]
    },

    // ─────── CYBER ──────────────────────────────────────────────
    {
        id: 'sc_cyber_port',
        category: 'CYBER',
        icon: '💻',
        title: 'NotPetya-Style Attack Hits Rotterdam Port',
        situation: 'A sophisticated wiper malware — traced to a nation-state APT group — has paralyzed Rotterdam\'s automated container terminal. 30% of European imports flow through here. The attack is spreading to Frankfurt banking infrastructure.',
        realWorldContext: 'NotPetya (2017) was a Russian cyberweapon disguised as ransomware. It caused $10 billion in global damage, hitting Maersk so hard they lost 17 days of shipping capacity. Maersk reinstalled 45,000 PCs in 10 days using a lone domain controller in Ghana that happened to be offline.',
        defconDelta: 0,
        choices: [
            {
                id: 'deploy_cyber_defense',
                label: '🔒 Deploy our own cyber defense team',
                description: 'Protect your digital assets from the spreading malware.',
                realLogic: 'After NotPetya, Maersk hired hundreds of security engineers and completely redesigned their network segmentation. The lesson: flat networks (everything connected to everything) die to wipers. Segmented networks survive.',
                cost: 5000,
                effects: { capital: +2000, data: -500, defcon: 0 },
                consequence: 'Your infrastructure is shielded. You lose 500 data but gain an immunity to the next cyber event. Your rivals suffer the full attack damage — you scoop their disrupted contracts for +$2,000.',
                priceMods: { copper: 1.05 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'short_european_logistics',
                label: '📉 Short European logistics companies',
                description: 'The attack will crater their stock prices in hours.',
                realLogic: 'In 2017, anyone watching the NotPetya spread could have shorted FedEx and Maersk. Both fell 10-15% within days of the attack becoming public. Informed traders often enter positions before official announcements.',
                cost: 1000,
                effects: { capital: +9000, data: 0, defcon: 0 },
                consequence: 'European logistics stocks crater. Your short positions pay $9,000. No operational effect on your routes. Legally gray. Mechanically superior short-term play.',
                priceMods: { gold: 1.04 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'counter_hack',
                label: '👾 Launch counter-cyber operation',
                description: 'Attribute and retaliate against the APT group.',
                realLogic: 'US Cyber Command\'s "Defend Forward" doctrine does this — hack back before the attack propagates. The problem: attribution takes time and misattribution causes diplomatic crises. Israel and Iran have been in active cyber war since 2010.',
                cost: 7000,
                effects: { capital: +3000, data: +500, defcon: 1 },
                consequence: 'Counter-op partially neutralizes the attack. Your routes take only 20% damage vs 60%. However, DEFCON worsens by 1 — retaliation risks escalation. You seize $3,000 in disrupted rival contracts.',
                priceMods: { oil: 1.05 },
                affectsRoutes: ['r5'],
                routeEff: 0.8
            },
            {
                id: 'wait_recover',
                label: '⏳ Wait it out — infrastructure self-heals',
                description: 'Do nothing. Accept the disruption.',
                realLogic: 'Many companies chose this. The attack is not your problem — until it spreads to your supply chain. Passive resilience is viable only if your exposure is minimal and you have diversified routes.',
                cost: 0,
                effects: { capital: -3000, data: -200, defcon: 0 },
                consequence: 'Three routes lose efficiency for 2 turns. Revenue drops $3,000. If you have alternative routes, this is survivable. If not, it compounds.',
                priceMods: { copper: 1.1, gold: 1.06 },
                affectsRoutes: ['r4', 'r5', 'r6'],
                routeEff: 0.4
            }
        ]
    },

    // ─────── POLITICAL / SANCTIONS ─────────────────────────────
    {
        id: 'sc_swift_sanctions',
        category: 'GEOPOLITICAL',
        icon: '🏦',
        title: 'G7 Threatens SWIFT Exclusion of Major Economy',
        situation: 'The G7 is debating disconnecting a major emerging market from SWIFT — the global bank messaging system that moves $5 trillion daily. Your Moscow and Urals routes could be cut off overnight. But rival supply chains are even more exposed.',
        realWorldContext: 'Disconnecting Russia from SWIFT in 2022 was called a "financial nuclear weapon." It worked — but Russia adapted via MIR payment system and yuan settlement. Iran has been off SWIFT since 2012 and still exports oil through shadow tankers. Sanctions are porous but devastating in the short term.',
        defconDelta: 1,
        choices: [
            {
                id: 'exit_exposure',
                label: '🏃 Liquidate all exposed positions immediately',
                description: 'Sell everything linked to the sanctioned economy. Take the loss before it\'s worse.',
                realLogic: 'This is exactly what Goldman Sachs, JPMorgan, and western banks did in Russia within 48 hours of the 2022 invasion. The ones who moved first lost least. Those who hesitated lost billions in write-downs.',
                cost: 0,
                effects: { capital: -2000, oil: 0, defcon: 0 },
                consequence: 'You exit at a -$2,000 loss but immunize yourself from the full sanctions blast. Rivals who hold positions will take -$8,000 next turn. You\'ll be positioned to buy their assets at fire-sale prices.',
                priceMods: { gold: 1.08, oil: 1.05 },
                affectsRoutes: ['r18', 'r19', 'r20'],
                routeEff: 0
            },
            {
                id: 'shadow_network',
                label: '🌑 Build a shadow payment network',
                description: 'Route payments through third-party intermediaries — Turkey, UAE, India.',
                realLogic: 'This is exactly how sanctioned trade continues. Russia uses Turkish banks, UAE shell companies, and Indian rupee settlement. The US Treasury plays whack-a-mole closing these channels but new ones open faster than they\'re shut.',
                cost: 6000,
                effects: { capital: +4000, data: -300, defcon: 0 },
                consequence: 'Routes stay open at 70% efficiency via the shadow network. If Treasury cracks down, you face a 30% chance of $10,000 fine per turn. High-risk, high-reward gray market play.',
                priceMods: { oil: 1.03 },
                affectsRoutes: ['r18', 'r19'],
                routeEff: 0.7
            },
            {
                id: 'lobby_against',
                label: '🎙️ Use influence to lobby against sanctions',
                description: 'Deploy political capital to block or water down the sanctions package.',
                realLogic: 'This is what Exxon Mobil, BP, and European energy companies did in 2014 and 2022. They lobbied furiously for carve-outs covering energy. The US Treasury creates "licenses" for specific sectors — these are bought through political access.',
                cost: 5000,
                effects: { capital: +6000, influence: -400, defcon: -1 },
                consequence: 'You secure an energy sector carve-out. Your routes remain operational at full efficiency. DEFCON improves as diplomatic channels stay open. Net: +$1,000 and preserved income stream.',
                priceMods: { oil: 1.02, natgas: 0.98 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'yuan_pivot',
                label: '🇨🇳 Pivot to yuan-denominated trade',
                description: 'Abandon dollar settlement. Route all transactions through Chinese financial infrastructure.',
                realLogic: 'Saudi Arabia began settling some oil trades in yuan in 2023. The "petroyuan" erodes US dollar dominance but offers SWIFT-bypass capability. China actively promotes this as a sanction-evasion tool for countries it wants to court.',
                cost: 3000,
                effects: { capital: +2000, influence: +300, defcon: 0 },
                consequence: 'Your eastern routes switch to yuan settlement. You gain +$2,000 and become partially SWIFT-immune. However, you now have strategic exposure to Chinese financial system stability.',
                priceMods: { gold: 1.06, oil: 1.04 },
                affectsRoutes: ['r18'],
                routeEff: 0.9
            }
        ]
    },

    // ─────── NATURAL / CLIMATE ─────────────────────────────────
    {
        id: 'sc_panama_drought',
        category: 'NATURAL',
        icon: '🌵',
        title: 'Panama Canal Hits Record Low Water Levels',
        situation: 'El Niño-driven drought has dropped Gatún Lake to historic lows. The Panama Canal Authority has restricted transits to ships with 40% less cargo than normal. 40% of US-Asia container trade runs through the Canal. Wait times: 21 days.',
        realWorldContext: 'This happened exactly in late 2023. Ships waited weeks or paid $4M+ to "jump the queue" via auctions. Companies either paid up, rerouted via Suez, or accepted massive delays. Climate change is making this a permanent vulnerability.',
        defconDelta: 0,
        choices: [
            {
                id: 'bid_priority',
                label: '💳 Buy priority transit slots via Panama auction',
                description: 'Pay premium to jump the 21-day queue.',
                realLogic: 'The Panama Canal Authority literally auctioned slots for $4M each in 2023. This is real. Companies like LNG carriers paid it because their contracts penalized late delivery more than $4M.',
                cost: 4000,
                effects: { capital: +5000, oil: -200, defcon: 0 },
                consequence: 'Your Pacific routes maintain full efficiency. Rivals face 21-day delays. You capture their lost contracts — net +$5,000. Expensive but competitively decisive.',
                priceMods: { oil: 1.06 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'reroute_suez',
                label: '🌍 Reroute everything through Suez Canal',
                description: 'Longer but the only alternative with normal draft restrictions.',
                realLogic: 'Suez adds 9,000 nautical miles versus Panama for US East Coast–Asia routes. Shipping companies spent heavily on Suez transits in 2023. This pushed demand — and Suez toll revenues — to record highs.',
                cost: 2000,
                effects: { capital: +1500, oil: -400, defcon: 0 },
                consequence: 'Routes stay open at 85% efficiency via Suez detour. You compete with Houthi disruption risk on the same corridor. Net: +$1,500 after rerouting costs. Suez route efficiency temporarily boosted.',
                priceMods: { oil: 1.04, wheat: 1.04 },
                affectsRoutes: ['r26', 'r24'],
                routeEff: 0.85
            },
            {
                id: 'rail_alternative',
                label: '🚂 Pivot to trans-continental rail (China-Europe)',
                description: 'Use Chinese Belt & Road rail corridors instead of maritime.',
                realLogic: 'The China-Europe Railway Express grew 30% in volume during 2021 supply chain crisis. It\'s slower than sea but immune to canal disruptions and Suez/Panama bottlenecks. Russia\'s invasion complicated this, but alternate routes through Central Asia exist.',
                cost: 5000,
                effects: { capital: +3000, influence: +200, defcon: 0 },
                consequence: 'You establish rail corridor access. +$3,000 income and gain influence from the Belt & Road relationship. Canal disruptions now deal 50% less damage to your network permanently.',
                priceMods: { lithium: 0.96, copper: 0.97 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'hold_cargo',
                label: '📦 Hold cargo — wait for rain',
                description: 'Accept the delay. Store cargo and wait for El Niño to break.',
                realLogic: 'Some commodities are fine waiting. Grain, steel, and non-perishables can sit in warehouses. But electronics, refrigerated goods, and time-sensitive manufacturing components cannot. Apple reportedly paid months of warehousing to avoid shipping rate spikes.',
                cost: 1000,
                effects: { capital: -3000, oil: +200, defcon: 0 },
                consequence: 'Routes frozen for 2 turns but no rerouting cost. You save $1,000 in logistics but lose $3,000 in delayed contract fulfillment penalties. Positive only if the drought resolves quickly — 40% probability.',
                priceMods: { wheat: 1.12, copper: 1.08 },
                affectsRoutes: ['r26', 'r16'],
                routeEff: 0
            }
        ]
    },

    // ─────── DEBT TRAP / EXPANSION ─────────────────────────────
    {
        id: 'sc_port_acquisition',
        category: 'EXPANSION',
        icon: '⚓',
        title: 'Distressed Nation Offers Strategic Port Lease',
        situation: 'A cash-strapped government is offering a 99-year port lease on a key Indian Ocean chokepoint. Your competitors are circling. The port controls access to critical mineral shipping lanes. The country has $12B in Chinese debt coming due in 18 months.',
        realWorldContext: 'This is the Hambantota playbook. China gave Sri Lanka $1.4B in loans for the port, Sri Lanka couldn\'t repay, then handed over a 99-year lease in 2017. The US calls it debt trap diplomacy. China calls it normal infrastructure investment. Both are correct.',
        defconDelta: 0,
        choices: [
            {
                id: 'take_lease',
                label: '🏗️ Acquire the port lease — full terms',
                description: 'Outbid competitors. Secure the chokepoint.',
                realLogic: 'Hambantota was a strategic masterstroke — whoever controls key Indian Ocean ports controls the energy trade between the Persian Gulf and East Asia. The US 7th Fleet operates partly to ensure these lanes stay open. Owning one is leverage.',
                cost: 15000,
                effects: { capital: +4000, influence: +600, defcon: 0 },
                consequence: 'You control a permanent strategic chokepoint. All rival routes through this corridor now pay you a 10% levy — +$4,000/turn forever. This is the single highest-value investment in the game.',
                priceMods: { oil: 0.97 },
                affectsRoutes: ['r10', 'r11'],
                routeEff: 1.15
            },
            {
                id: 'counteroffer_rival',
                label: '🤝 Buy the debt — then convert to equity',
                description: 'Buy the Chinese debt at discount. Restructure it for port equity.',
                realLogic: 'This is called "vulture investing" in sovereign debt. Hedge funds buy distressed country debt at 30 cents on the dollar, then demand 100 cents worth of assets in restructuring. Paul Singer\'s Elliott Management did this to Argentina for $2.4B.',
                cost: 8000,
                effects: { capital: +6000, influence: +400, defcon: 0 },
                consequence: 'Lower cost entry. You acquire 40% of the port. $6,000/turn in lease income. Less control than full acquisition but a far better price. You also own the country\'s debt — political leverage.',
                priceMods: { gold: 1.03 },
                affectsRoutes: ['r10'],
                routeEff: 1.1
            },
            {
                id: 'disrupt_rival_bid',
                label: '🔥 Fund instability — prevent rival acquisition',
                description: 'If you can\'t have it, no one can. Covert disruption.',
                realLogic: 'The US routinely pressures countries not to lease ports to China. Often via IMF conditions: "You can have this bailout, but no Chinese military access." India similarly pressured Sri Lanka over Hambantota\'s Chinese naval implications.',
                cost: 4000,
                effects: { capital: +1000, influence: -200, defcon: 1 },
                consequence: 'Rival acquisition blocked. The deal collapses into political chaos. You gain $1,000 from rivals\' failed investment but DEFCON worsens. The port remains uncontrolled — available for your bid next turn.',
                priceMods: { gold: 1.04 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'pass_on_it',
                label: '❌ Pass — overextension risk is too high',
                description: 'Capital deployment discipline. The price is too rich.',
                realLogic: 'Warren Buffett\'s rule: don\'t buy what you don\'t understand. Sovereign port acquisitions come with political risk — governments change, leases get nationalized, local populations riot. Many Chinese BRI projects are now stranded assets.',
                cost: 0,
                effects: { capital: +1000, influence: 0, defcon: 0 },
                consequence: 'You conserve capital and avoid political entanglement. A rival acquires the port next turn and begins collecting the levy income. Your capital position is $1,000 stronger from compound interest.',
                priceMods: {},
                affectsRoutes: [],
                routeEff: 1
            }
        ]
    },

    // ─────── NUCLEAR / DEFCON ──────────────────────────────────
    {
        id: 'sc_nuclear_posture',
        category: 'CRITICAL',
        icon: '☢️',
        title: 'Nuclear Standoff: Tactical Weapon Detonated in Uninhabited Zone',
        situation: 'A regional power has detonated a low-yield tactical nuclear device in an uninhabited area as a "demonstration." Markets are in freefall. Gold is up 18%. Oil is down on demand destruction fears. DEFCON is at 3. Every actor is watching who blinks.',
        realWorldContext: 'Academic wargames (including those at Harvard\'s Belfer Center) show this is the most dangerous scenario — a "demonstration" creates a use norm. The Cuban Missile Crisis was resolved because both sides wanted an off-ramp. The lesson: whoever finds the off-ramp wins.',
        defconDelta: 2,
        choices: [
            {
                id: 'flee_to_gold',
                label: '🥇 Liquidate risk assets — pile into gold and bonds',
                description: 'Classic flight-to-safety. Protect capital above all.',
                realLogic: 'Gold is the ancient hedge against civilizational risk. In every major crisis — 2008, COVID, 2022 — institutions sell equities and buy gold, US Treasuries, and Swiss francs. This is not sentiment. It is institutional mandate.',
                cost: 5000,
                effects: { capital: +12000, defcon: 0 },
                consequence: 'Gold positions surge 20%. Your portfolio is shielded. If DEFCON reaches 1, you lose minimally while rivals collapse. If situation de-escalates, you give back some gains. Asymmetric downside protection.',
                priceMods: { gold: 1.2, oil: 0.85 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'buy_defense_stocks',
                label: '🛡️ Go long defense contractors and military hardware',
                description: 'Crisis = defense spending surge. Buy it ahead of the herd.',
                realLogic: 'Lockheed Martin, Raytheon, BAE Systems all saw stock surges after every major geopolitical event since 9/11. NATO members pledged 2% of GDP to defense after Ukraine. That\'s hundreds of billions flowing into defense stocks.',
                cost: 4000,
                effects: { capital: +10000, defcon: 0 },
                consequence: 'Defense holdings surge as NATO nations emergency-increase military budgets. +$10,000 over 2 turns. DEFCON doesn\'t improve — but your income from the war economy offsets the risk.',
                priceMods: { gold: 1.1, oil: 1.05 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'use_influence_deescalate',
                label: '☮️ Use influence to broker a back-channel deal',
                description: 'Spend influence to find the off-ramp. Prevent DEFCON 2.',
                realLogic: 'In the Cuban Missile Crisis, the actual resolution was a secret back-channel deal: USSR removed missiles from Cuba, US quietly removed Jupiter missiles from Turkey 6 months later. No one knew for 25 years. Off-ramps are always face-saving.',
                cost: 0,
                effects: { capital: -2000, influence: -500, defcon: -2 },
                consequence: 'DEFCON improves by 2 — to level 5. Crisis resolves. Markets recover. Your influence cost is high but the global stability dividend is massive — all routes return to full efficiency.',
                priceMods: { gold: 0.95, oil: 1.05 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'stay_course',
                label: '😤 Stay the course — show no fear',
                description: 'Don\'t react. Markets hate uncertainty more than they hate war.',
                realLogic: 'This is the "volatility sells" thesis. Nuclear standoffs historically de-escalate — the weapons are too destructive to actually use. Selling at peak fear locks in losses. Those who held through the Cuban Missile Crisis made money.',
                cost: 0,
                effects: { capital: -4000, defcon: 0 },
                consequence: 'No defensive moves. Your open positions take -$4,000 in mark-to-market losses. 60% chance crisis de-escalates next turn, recovering those losses. 40% chance DEFCON worsens another step.',
                priceMods: { gold: 1.15, oil: 0.9 },
                affectsRoutes: ['r1', 'r14'],
                routeEff: 0.7
            }
        ]
    },

    // ─────── TRADE WAR ──────────────────────────────────────────
    {
        id: 'sc_tariff_war',
        category: 'ECONOMIC',
        icon: '🚧',
        title: 'Escalating Tariff War — Supply Chain Decoupling',
        situation: 'Two superpowers have imposed 145% tariffs on each other\'s exports. Global supply chains built on decades of "just-in-time" manufacturing are fracturing. Companies are scrambling to "near-shore" and "friend-shore." Who moves first wins the reshoring economy.',
        realWorldContext: 'This is the US-China trade war (2018-present) and its acceleration. Apple moved iPhone assembly to India and Vietnam. Samsung already had 60% of production outside China. The losers are companies who bet everything on single-country supply chains. The winners anticipated this 10 years ago.',
        defconDelta: 0,
        choices: [
            {
                id: 'vietnam_pivot',
                label: '🇻🇳 Pivot production to Vietnam / Southeast Asia',
                description: 'The new manufacturing heartland. Get there before the price spikes.',
                realLogic: 'Vietnam\'s exports tripled during US-China tariff war. Samsung moved 60% of phone production there. Nike, Intel, Apple all followed. Vietnam is the manufacturing escape valve from China — land costs, wages, and political risk are all lower.',
                cost: 8000,
                effects: { capital: +5000, influence: +200, defcon: 0 },
                consequence: 'Your SE Asia routes gain 35% income permanently. You\'re immune to further US-China tariff escalation. One-time cost, permanent competitive advantage.',
                priceMods: { lithium: 0.94, copper: 0.96 },
                affectsRoutes: ['r11', 'r12'],
                routeEff: 1.35
            },
            {
                id: 'arbitrage_tariffs',
                label: '🔀 Tariff arbitrage — route goods through third country',
                description: 'Ship through Mexico, Malaysia, or UAE to avoid tariff designation.',
                realLogic: 'Chinese companies massively expanded production in Vietnam and Mexico specifically to export through them to the US, bypassing tariffs. US investigators call it "transshipment fraud." It\'s the same product with a different label on the box.',
                cost: 3000,
                effects: { capital: +6000, defcon: 0 },
                consequence: '+$6,000 from tariff arbitrage profits. 30% chance per turn of US Treasury audit exposing the scheme — triggering $15,000 fine. High-reward, legally risky play.',
                priceMods: { copper: 0.97, lithium: 0.98 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'invest_reshoring',
                label: '🏭 Invest in domestic production — reshoring play',
                description: 'Build manufacturing inside the protected market. Collect subsidies.',
                realLogic: 'The CHIPS Act ($52B), IRA ($369B), and Infrastructure Act created a US industrial policy for the first time in 40 years. Companies building fabs in Arizona (TSMC) and Ohio (Intel) get direct subsidies. The EU matched with its own Chips Act.',
                cost: 10000,
                effects: { capital: +3000, influence: +400, defcon: -1 },
                consequence: 'You build protected domestic capacity. Immune to future tariff escalation. +$3,000/turn in subsidy income. DEFCON improves 1 from reduced geopolitical dependency. Slow ROI, rock-solid position.',
                priceMods: { lithium: 0.96, copper: 0.96 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'buy_raw_materials',
                label: '⛏️ Stockpile critical minerals now before export bans',
                description: 'China controls critical mineral supply. Buy before restrictions hit.',
                realLogic: 'China controls 70%+ of rare earth processing. In 2010, a China-Japan diplomatic dispute triggered China cutting rare earth exports by 40%. Japan paid triple the market price on spot markets. China has explicitly restricted gallium and germanium exports since 2023.',
                cost: 6000,
                effects: { capital: +2000, oil: +500, defcon: 0 },
                consequence: 'You stockpile critical minerals before China restricts export. Next mineral disruption event deals you 0% damage and pays +$8,000 from rival scramble. Strategic stockpile pays dividends for 4 turns.',
                priceMods: { lithium: 1.12, copper: 1.08 },
                affectsRoutes: [],
                routeEff: 1
            }
        ]
    },

    // ─────── POLITICAL INTEL ────────────────────────────────────
    {
        id: 'sc_election_market',
        category: 'POLITICAL',
        icon: '🗳️',
        title: 'Shock Election Result — Policy Reversal Incoming',
        situation: 'An unexpected election result in a major economy is about to reverse energy policy, trade agreements, and regulatory environments. Markets hate uncertainty. But you have intel 72 hours before the market fully digests the implications.',
        realWorldContext: 'Every major election creates a position-building opportunity. Brexit: GBP fell 8% overnight. Trump 2016: Mexican peso fell 13%, defense stocks surged, solar stocks crashed. Reagan 1980: gold fell as inflation hawkishness priced in. Smart money positions 72 hours ahead.',
        defconDelta: -1,
        choices: [
            {
                id: 'go_long_energy',
                label: '⛽ Long traditional energy — the new government loves fossil fuels',
                description: 'Drill baby drill. Regulatory rollback incoming.',
                realLogic: 'When fossil-fuel-friendly administrations win, E&P (exploration & production) stocks rally immediately. Permitting accelerates, environmental review shortened, federal land opened. The market prices this within 24 hours.',
                cost: 3000,
                effects: { capital: +9000, defcon: -1 },
                consequence: 'Energy stocks surge as regulations ease. +$9,000 from positions. DEFCON improves as the new government signals isolationist foreign policy — less military adventurism.',
                priceMods: { oil: 1.1, natgas: 1.08, gold: 0.97 },
                affectsRoutes: ['r3', 'r9'],
                routeEff: 1.15
            },
            {
                id: 'short_green',
                label: '☀️ Short green energy — subsidy rollback imminent',
                description: 'Renewable subsidies are the first thing cut by the new government.',
                realLogic: 'US solar stocks fell 20-30% in a single day after 2024 election results. IRA subsidies face threats. European energy transition stocks also sold off. This is one of the most predictable election trades.',
                cost: 2000,
                effects: { capital: +7000, defcon: 0 },
                consequence: 'Green energy stocks crater as subsidies face rollback. Your short pays $7,000. Market rotation into traditional energy benefits your existing oil route income.',
                priceMods: { oil: 1.08, lithium: 0.88 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'buy_defense',
                label: '🛡️ Long defense — military spending pledge is the centerpiece',
                description: 'Campaign promised 3% of GDP to NATO. This is a certainty.',
                realLogic: 'Defense stocks are among the most reliably predictable political trades. When a government committed to military spending wins, Lockheed, Raytheon, L3 Technologies all rally within hours. The orders pipeline is 5-10 years long.',
                cost: 4000,
                effects: { capital: +8000, defcon: 0 },
                consequence: '+$8,000 from defense stock positioning. Your military infrastructure investments gain bonus income as the new government fast-tracks contracts.',
                priceMods: { gold: 1.05, oil: 1.04 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'diversify_across',
                label: '📊 Spread bets — anything could happen in year one',
                description: 'Politicians campaign one way, govern differently. Diversify.',
                realLogic: 'Campaign promises have terrible predictive value. Reagan promised deficits down — debt tripled. Obama promised Gitmo close — it\'s still open. Trump promised tariffs — and actually delivered them, unusually. Smart money hedges the campaign vs governance divergence.',
                cost: 2000,
                effects: { capital: +4000, defcon: -1 },
                consequence: 'Moderate gains across multiple positions. +$4,000. No single bet fails catastrophically if governance diverges from campaign. DEFCON improves from reduced regional tension.',
                priceMods: { gold: 1.02, oil: 1.04 },
                affectsRoutes: [],
                routeEff: 1
            }
        ]
    },

    // ─────── LOGISTICAL FAILURES ────────────────────────────────
    {
        id: 'sc_suez_blockage',
        category: 'LOGISTICS',
        icon: '🚢',
        title: 'Mega-Ship Grounds in Suez Canal, Blocking Global Trade',
        situation: 'A 400-meter container ship has completely wedged itself diagonally across the Suez Canal during a sandstorm. Hundreds of vessels are backed up. $9.6 billion worth of daily trade is halted.',
        realWorldContext: 'The 2021 Ever Given grounding blocked the canal for 6 days. It trapped 1.9 million barrels of oil a day, delaying supply chains globally. Companies faced agonizing choices: wait and hope it\'s freed soon, or send ships around Africa at massive expense.',
        defconDelta: 0,
        choices: [
            {
                id: 'reroute_cape_immediately',
                label: '🌍 Reroute immediately around Africa',
                description: 'Take the hit on fuel and time. Don\'t wait for salvage.',
                realLogic: 'Some companies rerouted within 24 hours. They accepted a 14-day delay and high fuel costs rather than gambling on the salvage timeline. When the ship was freed earlier than expected (6 days), these companies looked foolish, but it was the safer risk-management choice.',
                cost: 4000,
                effects: { capital: -2000, oil: -400, defcon: 0 },
                consequence: 'Suez routes disrupted, but African detours keep trade flowing at 75% efficiency. You absorb -$2000 and high fuel costs. Your supply chain remains unbroken.',
                priceMods: { oil: 1.05 },
                affectsRoutes: ['r7', 'r8'],
                routeEff: 0.75
            },
            {
                id: 'wait_for_salvage',
                label: '⏳ Anchor and wait for salvage teams',
                description: 'Hold position. The Dutch salvage teams are the best in the world.',
                realLogic: 'Most operators anchored and waited. The gamble paid off when the Ever Given was floated in 6 days. Had it taken weeks (as some feared), the cascading delays would have bankrupted smaller shipping lines.',
                cost: 1000,
                effects: { capital: -4000, oil: 0, defcon: 0 },
                consequence: 'Routes are completely blocked for 1 turn. You suffer -$4,000 in delayed revenue. However, you avoid massive fuel overages. Once cleared, efficiency returns immediately.',
                priceMods: { copper: 1.05, lithium: 1.05 },
                affectsRoutes: ['r7', 'r8'],
                routeEff: 0
            },
            {
                id: 'air_freight_pivot',
                label: '✈️ Charter emergency air freight for critical goods',
                description: 'Abandon the sea. Move high-margin goods by air.',
                realLogic: 'During the blockage, rates for air cargo from Asia to Europe spiked as companies moved laptops, medical supplies, and critical components. Extremely expensive, but preserves key client relationships.',
                cost: 8000,
                effects: { capital: +3000, influence: +200, defcon: 0 },
                consequence: 'You pay a massive premium to secure air transport. You gain +$3,000 from fulfilling critical contracts that rivals missed. Your influence grows. Sea routes remain blocked.',
                priceMods: { lithium: 1.08, copper: 1.04 },
                affectsRoutes: ['r7', 'r8'],
                routeEff: 0
            }
        ]
    },

    // ─────── GLOBAL HEALTH ──────────────────────────────────────
    {
        id: 'sc_global_pandemic',
        category: 'CRITICAL',
        icon: '🦠',
        title: 'Novel Pathogen Triggers Global Lockdowns',
        situation: 'A highly contagious respiratory virus is spreading rapidly. Major economies are ordering sudden, indefinite lockdowns. Port workers, truck drivers, and manufacturing hubs are paralyzed. Demand for consumer goods is fluctuating violently.',
        realWorldContext: 'The 2020 COVID-19 pandemic caused a dual supply-and-demand shock. Oil futures literally went negative temporarily as storage filled up. Meanwhile, demand for electronics and medical supplies skyrocketed, creating severe shortages.',
        defconDelta: 0,
        choices: [
            {
                id: 'hoard_cash',
                label: '💰 Liquidate positions and hoard cash',
                description: 'Prepare for a prolonged recession. Cash is king.',
                realLogic: 'In Q1 2020, corporations drew down credit lines and hoarded billions in cash to ensure survival during the great unknown. Companies that survived the initial shock were then positioned to buy distressed assets.',
                cost: 0,
                effects: { capital: +8000, influence: -300, defcon: 0 },
                consequence: 'You slash operations and hoard cash. Gain +$8,000 liquidity immediately. However, your route efficiencies drop to 40% as you lay off workforce. You lose influence for abandoning contracts.',
                priceMods: { oil: 0.6, copper: 0.8, gold: 1.15 },
                affectsRoutes: ['r1', 'r2', 'r3', 'r4', 'r5', 'r13', 'r14', 'r15', 'r16'],
                routeEff: 0.4
            },
            {
                id: 'pivot_medical_logistics',
                label: '⚕️ Pivot entire fleet to medical & essential logistics',
                description: 'Repurpose trade routes to handle the crisis. Gain government favors.',
                realLogic: 'Logistics companies that successfully pivoted to transporting PPE, vaccines, and essential consumer goods saw record profits in 2020/2021, supported by emergency government contracts.',
                cost: 7000,
                effects: { capital: +6000, influence: +800, defcon: -1 },
                consequence: 'You spend heavily to refit your logistics network. You secure lucrative emergency contracts (+$6,000). Huge influence gain as a global savior. DEFCON drops by 1 as nations collaborate.',
                priceMods: { wheat: 1.2, lithium: 1.1 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'buy_oil_storage',
                label: '🛢️ Buy desperate oil contracts at negative prices',
                description: 'Take delivery of oil when no one has storage. Profit later.',
                realLogic: 'In April 2020, WTI crude futures famously dropped to -$37 a barrel. Traders literally paid buyers to take oil because storage facilities in Cushing, Oklahoma were full. Anyone with empty supertankers made unprecedented profits storing it.',
                cost: 4000,
                effects: { capital: +12000, oil: +4000, defcon: 0 },
                consequence: 'You lease empty supertankers for floating storage, absorbing oil at rock-bottom prices. You gain massive oil reserves (+4000) and later arbitrage it for +$12,000. Masterful crisis profiteering.',
                priceMods: { oil: 0.5 },
                affectsRoutes: [],
                routeEff: 0.6
            }
        ]
    },

    // ─────── THE 10 NEW REAL-WORLD EXPANSIONS ───────────────────
    {
        id: 'sc_taiwan_blockade',
        category: 'TECHNOLOGY',
        icon: '🧊',
        title: 'Taiwan Strait "Quarantine" Drills',
        situation: 'Mainland China has launched unprecedented naval exercises encircling Taiwan, effectively creating a maritime quarantine. 60% of the world\'s advanced semiconductors are stuck in port. Global tech manufacturing is freezing.',
        realWorldContext: 'Following high-profile diplomatic visits in 2022 and 2024, China launched massive live-fire drills surrounding Taiwan. CSIS wargames indicate a "quarantine" (customs inspections by China) is more likely than an amphibious invasion, strangling tech exports without firing a shot.',
        defconDelta: 2,
        choices: [
            {
                id: 'fund_us_fabs',
                label: '🏭 Fast-track US/EU domestic fab construction',
                description: 'Capitalize on the CHIPS Act. Build outside the danger zone.',
                realLogic: 'TSMC is building fabs in Arizona, Germany, and Japan specifically to mitigate this risk. The US CHIPS Act provides $52B to near-shore this production, though it takes 3-5 years to come online.',
                cost: 8000,
                effects: { capital: +3000, data: +800, defcon: -1 },
                consequence: 'You secure massive government subsidies for domestic tech production. +$3,000/turn and vast Data gains. You are now immune to Pacific semiconductor shocks.',
                priceMods: { copper: 1.05, gold: 1.02 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'short_consumer_tech',
                label: '📉 Short consumer tech and auto manufacturers',
                description: 'Without chips, cars and phones can\'t be finished.',
                realLogic: 'During the 2021 chip shortage, Ford and GM parked tens of thousands of unfinished cars in lots because they lacked a $2 microcontroller. Apple lost $6B in iPad/Mac sales in one quarter.',
                cost: 2000,
                effects: { capital: +12000, data: 0, defcon: 0 },
                consequence: 'Tech and Auto stocks crater. Your short positions pay out a massive $12,000. However, your own data-reliant routes suffer a 20% efficiency hit this turn.',
                priceMods: { gold: 1.1 },
                affectsRoutes: ['r12', 'r15'],
                routeEff: 0.8
            },
            {
                id: 'bribe_blockade',
                label: '🚤 Bribe "quarantine" inspectors for gray-market export',
                description: 'Use dark money to get your shipments through the naval cordon.',
                realLogic: 'Sanctions and blockades always create premium smuggling economies. During the Iran-Iraq war, the "Tanker War" saw massive premiums paid to captains and corrupt officials to move oil through the Gulf.',
                cost: 6000,
                effects: { capital: +8000, influence: -400, defcon: 0 },
                consequence: 'You pay exorbitant bribes but get your chips out. You dominate the starved market for +$8,000. High risk of exposure costs you influence.',
                priceMods: { copper: 1.08 },
                affectsRoutes: ['r11', 'r12'],
                routeEff: 1.1
            }
        ]
    },
    {
        id: 'sc_nordstream_sabotage',
        category: 'ENERGY',
        icon: '💥',
        title: 'Subsea Gas Pipeline Sabotaged',
        situation: 'Massive explosions have ruptured two primary subsea pipelines delivering natural gas to Europe. European gas prices just spiked 400%. Winter is approaching. Heavy industry in Germany is preparing to shut down completely.',
        realWorldContext: 'The September 2022 sabotage of Nord Stream 1 and 2 permanently altered European energy architecture. It forced Europe to buy massively expensive LNG (Liquid Natural Gas) from the US and Qatar, enriching shipping companies while devastating German industrial competitiveness.',
        defconDelta: 1,
        choices: [
            {
                id: 'invest_lng',
                label: '⛴️ Invest heavily in LNG carrier fleets and terminals',
                description: 'Europe needs gas by ship now. Control the ships.',
                realLogic: 'Post-Nord Stream, the daily charter rate for an LNG carrier jumped from $50K to nearly $400K. European nations frantically leased Floating Storage and Regasification Units (FSRUs) at any price.',
                cost: 7000,
                effects: { capital: +9000, oil: +200, defcon: 0 },
                consequence: 'You deploy LNG carriers to Europe at extortionate spot rates. Huge +$9,000 payout over 2 turns. US to Europe routes gain permanent 20% efficiency.',
                priceMods: { natgas: 1.4, wheat: 1.05 },
                affectsRoutes: ['r1', 'r2'],
                routeEff: 1.2
            },
            {
                id: 'buy_german_industry',
                label: '🏭 Buy distressed European industrial assets',
                description: 'Their energy costs just tripled. Buy their bankrupt factories.',
                realLogic: 'BASF, Volkswagen, and other German titans have increasingly shifted production to China and the US because European energy is no longer globally competitive without cheap Russian gas.',
                cost: 9000,
                effects: { capital: +4000, influence: +500, defcon: 0 },
                consequence: 'You acquire top-tier industrial assets for pennies. Slow return initially, but your global dominance increases heavily. +$4,000 base income increase.',
                priceMods: { natgas: 1.3, copper: 0.9 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'pivot_coal',
                label: '⛏️ Pivot back to Coal and Nuclear',
                description: 'Green targets are dead. Survival requires baseload power.',
                realLogic: 'Despite its Green party being in coalition, Germany had to restart mothballed coal power plants in 2022/2023 to survive the winter without Russian gas. Ideology bows to physics.',
                cost: 3000,
                effects: { capital: +5000, influence: -200, defcon: 0 },
                consequence: 'You supply coal to desperate European utilities. Reliable +$5,000 profit. Green activists blast your reputation (lose influence), but your energy security is guaranteed.',
                priceMods: { natgas: 1.25, lithium: 0.95 },
                affectsRoutes: ['r4', 'r6'],
                routeEff: 1
            }
        ]
    },
    {
        id: 'sc_africa_coup',
        category: 'GEOPOLITICAL',
        icon: '🪖',
        title: 'Resource Nationalist Coup in Central Africa',
        situation: 'A military junta has seized power in a nation producing 60% of the world\'s cobalt. They have immediately nationalized all foreign-owned mines and are demanding renegotiation of export contracts exclusively through their new holding company.',
        realWorldContext: 'Resource nationalism is rising. The DRC (handling ~70% of global cobalt) aggressively renegotiated its "minerals for infrastructure" deal with China in 2024. In the Sahel (Niger, Mali), juntas have actively expelled Western mining interests to strike better deals with Russian PMCs and Chinese firms.',
        defconDelta: 1,
        choices: [
            {
                id: 'fund_pmc_counter',
                label: '🚁 Fund PMC to restore the previous government',
                description: 'A quiet, deniable counter-coup to protect your mines.',
                realLogic: 'Private Military Companies (like Wagner Group, or Western equivalents like Executive Outcomes in the 90s) are routinely used to secure mines in unstable regions, often trading security services for mineral rights.',
                cost: 8000,
                effects: { capital: +6000, influence: -500, defcon: 1 },
                consequence: 'The counter-coup succeeds but is bloody and publicly condemned. You secure your mines and take over rivals\' seized assets (+6,000). DEFCON worsens due to proxy-war escalation.',
                priceMods: { lithium: 1.15, copper: 1.1 },
                affectsRoutes: ['r11'],
                routeEff: 1
            },
            {
                id: 'bribe_junta',
                label: '🤝 Negotiate exclusive deal with the Junta',
                description: 'Pay the new bosses. Lock out your competitors.',
                realLogic: 'Capital has no morality. When governments fall, mining conglomerates send executives to meet the generals. If you pay the new tax, you keep the rocks flowing while competitors cite "human rights" and lose market share.',
                cost: 5000,
                effects: { capital: +4000, influence: -200, defcon: 0 },
                consequence: 'You pay the junta\'s extortionate "licensing fee." In return, you get the cobalt while rivals are locked out. +$4000 from monopoly pricing. Influence drops from doing business with warlords.',
                priceMods: { lithium: 1.08 },
                affectsRoutes: ['r11'],
                routeEff: 1.1
            },
            {
                id: 'pivot_battery_chemistry',
                label: '🔋 Pivot to Cobalt-free battery chemistry (LFP)',
                description: 'Invest in tech that doesn\'t need their minerals.',
                realLogic: 'Because cobalt is expensive and ethically fraught (child labor in DRC), Tesla and Ford have aggressively pivoted to LFP (Lithium Iron Phosphate) batteries, which use zero cobalt. Technology bypasses geopolitics.',
                cost: 7000,
                effects: { capital: +2000, data: +400, defcon: 0 },
                consequence: 'Initial R&D cost is high, but you permanently eliminate cobalt dependency. You license the tech to desperate automakers. Data tech increases. Immune to future African mineral shocks.',
                priceMods: { lithium: 0.95, copper: 1.05 },
                affectsRoutes: [],
                routeEff: 1
            }
        ]
    },
    {
        id: 'sc_deepfake_crash',
        category: 'CYBER',
        icon: '🤖',
        title: 'AI Deepfake Triggers Flash Crash',
        situation: 'A flawless AI-generated video of the US Federal Reserve Chairman announcing an emergency 200bps rate hike due to "undisclosed bank failures" hits social media. Algorithmic trading bots read the transcript and dump everything. The S&P drops 8% in 12 minutes.',
        realWorldContext: 'In 2023, an AI-generated image of an explosion at the Pentagon caused a brief but sharp dip in the stock market. As deepfakes become indistinguishable from reality, high-frequency trading algos reading sentiment will inevitably trigger cascading flash crashes before human regulators can halt trading.',
        defconDelta: 0,
        choices: [
            {
                id: 'buy_the_dip',
                label: '📉 Buy the absolute bottom of the flash crash',
                description: 'Your quant models verify it\'s a fake. Load the boat.',
                realLogic: 'During the 2010 Flash Crash (caused by a spoofing trader), algorithms that were programmed to buy extreme, illogical dips made fortunes in minutes when the market snapped back to reality.',
                cost: 3000,
                effects: { capital: +11000, data: 0, defcon: 0 },
                consequence: 'You buy equities at a 8% discount. 20 minutes later, the Fed issues a denial. The market violently snaps back. You net an immediate $11,000 profit. Peak algorithmic predation.',
                priceMods: { gold: 0.95 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'deploy_ai_verification',
                label: '🛡️ Deploy proprietary zero-trust AI verification',
                description: 'Sell your verification tech to panicking institutions.',
                realLogic: 'The ultimate solution to AI fakes is AI verification (cryptographic watermarking, deepfake detection models). The companies that own this infrastructure will act as the new "credit rating agencies" for truth.',
                cost: 6000,
                effects: { capital: +5000, data: +600, defcon: 0 },
                consequence: 'You sell your detection software to exchanges and banks to prevent future algobot panics. Huge data yield and solid +$5,000 revenue stream. You insulated yourself from the crash entirely.',
                priceMods: {},
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'panic_sell',
                label: '🏃 Panic sell with the herd',
                description: 'Trust the tape. If it\'s real, you save your portfolio.',
                realLogic: 'Risk management dictates that sometimes you sell first and ask questions later. The risk of being holding the bag if a major bank actually failed outweighs the cost of selling at the bottom.',
                cost: 0,
                effects: { capital: -4000, data: -100, defcon: 0 },
                consequence: 'You sell at the bottom. The video is proven fake, the market rebounds, and you have to buy back in at higher prices. -$4,000 loss from pure human panic.',
                priceMods: { gold: 1.05 },
                affectsRoutes: [],
                routeEff: 1
            }
        ]
    },
    {
        id: 'sc_satellite_kessler',
        category: 'KINETIC',
        icon: '🛰️',
        title: 'ASAT Test Threatens Kessler Syndrome',
        situation: 'A rogue state has successfully tested a direct-ascent anti-satellite (ASAT) missile against its own dead weather satellite. The resulting debris cloud is on a collision course with Low Earth Orbit (LEO) comms networks, threatening GPS and maritime tracking.',
        realWorldContext: 'Russia (2021), India (2019), and China (2007) have all conducted ASAT tests, creating thousands of pieces of trackable shrapnel. A cascading collision event (Kessler Syndrome) could knock out GPS, which currently coordinates global shipping, aviation, and financial timestamps.',
        defconDelta: 1,
        choices: [
            {
                id: 'pivot_terrestrial_nav',
                label: '🗺️ Pivot ships to terrestrial nav & localized comms',
                description: 'Prepare your fleet to sail blind without GPS.',
                realLogic: 'The US Naval Academy brought back teaching celestial navigation (using sextants) precisely because GPS is highly vulnerable to jamming and ASAT strikes. Ships with inertial navigation systems can survive brief satellite blackouts.',
                cost: 4000,
                effects: { capital: +2000, data: -200, defcon: 0 },
                consequence: 'Debris knocks out several GPS nodes. Rival shipping grinds to a halt. Your vertically-integrated, analog-capable fleet keeps moving. You seize delayed contracts for +$2,000.',
                priceMods: { oil: 1.06 },
                affectsRoutes: ['r14', 'r15'],
                routeEff: 1.1
            },
            {
                id: 'launch_replacements',
                label: '🚀 Fund rapid-launch replacement constellation',
                description: 'Use your private aerospace division to replace dead sats.',
                realLogic: 'SpaceX\'s Starlink architecture (thousands of cheap satellites) makes it highly resilient to ASATs compared to legacy systems (a few billion-dollar satellites). The US Space Force is currently migrating to this "proliferated architecture" for resilience.',
                cost: 10000,
                effects: { capital: +4000, influence: +800, defcon: -1 },
                consequence: 'Your aerospace wing launches 50 replacements in 48 hours. You save the global logistical network. Massive influence gain with governments and +$4,000 in emergency government contracts. DEFCON eases.',
                priceMods: { copper: 1.05, lithium: 1.02 },
                affectsRoutes: [],
                routeEff: 1.2
            },
            {
                id: 'short_logistics',
                label: '📉 Short aviation and global logistics stocks',
                description: 'If GPS goes down, planes don\'t fly. Ships don\'t dock.',
                realLogic: 'Just like the CrowdStrike outage grounded flights globally, a true GPS degradation would instantly halt modern aviation and automated port terminals. The economic damage would be immediate and severe.',
                cost: 2000,
                effects: { capital: +7000, data: -300, defcon: 0 },
                consequence: 'Debris strikes force a 12-hour global ground stop. Airlines and logistics stocks tank. Your shorts pay $7,000. However, your own data efficiency takes a brutal hit.',
                priceMods: { gold: 1.08, oil: 0.95 },
                affectsRoutes: ['r1', 'r7', 'r12'],
                routeEff: 0.6
            }
        ]
    },
    {
        id: 'sc_global_tax',
        category: 'ECONOMIC',
        icon: '💼',
        title: 'OECD Enforces 15% Global Minimum Tax',
        situation: 'The OECD framework has been ratified. The era of the "Double Irish with a Dutch Sandwich" is over. A strict 15% minimum corporate tax is being aggressively enforced. Your offshore IP holding companies are suddenly massive liabilities.',
        realWorldContext: 'In 2024, the OECD\'s Pillar Two went live, theoretically ending the race to the bottom for corporate tax rates. Historically, tech and pharma companies parked their patents in zero-tax havens (Bermuda, Ireland) and charged their own subsidiaries "licensing fees" to wipe out taxable profit in the US/EU.',
        defconDelta: 0,
        choices: [
            {
                id: 'relocate_ip',
                label: '🏢 Relocate Intellectual Property to EU "Patent Boxes"',
                description: 'Move assets out of havens and into legally compliant low-tax regimes.',
                realLogic: 'When Ireland closed the "Double Irish" loophole, Apple didn\'t bring its IP back to the US—it restructured using "capital allowances for intangible assets," maintaining an effective tax rate far below statutory levels. Compliance is an industry.',
                cost: 5000,
                effects: { capital: -1000, influence: +300, defcon: 0 },
                consequence: 'You pay armies of lawyers to restructure. Costly (-$1000 this turn), but your effective tax rate stays competitive. You avoid massive multinational fines and gain legitimate regulatory influence.',
                priceMods: {},
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'pass_to_consumer',
                label: '📈 Pay the tax, raise prices globally',
                description: 'Accept the 15% hit, but protect margins by squeezing the customer.',
                realLogic: 'When governments tax corporations, corporations tax consumers. Major tech monopolies with inelastic demand simply raised subscription prices to offset digital service taxes in Europe.',
                cost: 0,
                effects: { capital: +3000, influence: -400, defcon: 0 },
                consequence: 'Your route pricing increases. You squeeze +$3,000 in immediate cash flow from consumers. However, public backlash and political anger deal a heavy blow to your Influence.',
                priceMods: { wheat: 1.08, copper: 1.05 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'bribe_exemptions',
                label: '🕵️ Fund lobbying for "strategic industry" exemptions',
                description: 'Make your specific sector exempt from the OECD framework.',
                realLogic: 'The global minimum tax is full of carve-outs. Shipping companies (which already pay almost no tax via "tonnage taxes") lobbied successfully to be largely exempt. Green energy credits also allow companies to push effective rates below 15%.',
                cost: 6000,
                effects: { capital: +5000, influence: 0, defcon: 0 },
                consequence: 'Lobbying succeeds. You secure a "green energy transition" carve-out that protects your logistics networks. You maintain old profit margins, gaining a $5,000 edge over rivals who paid the tax.',
                priceMods: {},
                affectsRoutes: [],
                routeEff: 1
            }
        ]
    },
    {
        id: 'sc_arctic_route',
        category: 'NATURAL',
        icon: '🧊',
        title: 'Arctic Ice Collapse Opens Northern Sea Route',
        situation: 'An unprecedented summer melt has left the Northern Sea Route (NSR) along Russia\'s arctic coast completely ice-free for 6 months. This route cuts the transit time between Asia and Europe by 40% compared to the Suez Canal. It is a logistical holy grail.',
        realWorldContext: 'Climate change is steadily making the NSR viable. By 2035, it may be open year-round. It cuts a 34-day trip from Yokohama to Rotterdam down to 21 days. The geopolitical catch: Russia controls the entire coastline and charges exorbitant "icebreaker escort" tolls.',
        defconDelta: 0,
        choices: [
            {
                id: 'build_ice_fleet',
                label: '🚢 Invest in Ice-Class Freighters',
                description: 'Dominate the new route before competitors build adequate ships.',
                realLogic: 'Maersk and COSCO have already run test shipments through the NSR. To do it safely, companies need "Ice-Class ARC7" vessels. Russia\'s Novatek uses these specifically to export LNG from the Yamal peninsula year-round.',
                cost: 8000,
                effects: { capital: +6000, oil: -200, defcon: 0 },
                consequence: 'You deploy an ice-class fleet. You dominate the Asia-Europe trade via the Arctic. Suez routes lose volume. Your new route pays massive dividends (+$6,000/turn efficiency).',
                priceMods: { natgas: 0.92, oil: 0.95 },
                affectsRoutes: ['r6', 'r12'], // Connecting Europe/Asia directly
                routeEff: 1.4
            },
            {
                id: 'pay_russian_tolls',
                label: '🇷🇺 Pay Russian transit tolls and use standard ships',
                description: 'It\'s ice-free, but you still need political permission and escorts.',
                realLogic: 'Russia legally classifies the NSR as its internal waters (disputed by the US). They require all vessels to pay for Rosatom nuclear icebreaker escorts, turning climate change into a massive sovereign revenue stream.',
                cost: 4000,
                effects: { capital: +3000, influence: -200, defcon: 0 },
                consequence: 'You pay the toll. You get the 40% transit speed bonus, netting +$3,000. However, Western media blasts you for funding Russian state monopolies, costing you influence.',
                priceMods: { wheat: 0.95 },
                affectsRoutes: ['r6'],
                routeEff: 1.2
            },
            {
                id: 'lobby_environmental_ban',
                label: '🛑 Lobby for Environmental Shipping Ban in the Arctic',
                description: 'Block the route citing heavy fuel oil (HFO) spill risks in pristine waters.',
                realLogic: 'Nike, H&M, and several major shipping lines (like CMA CGM) signed a pledge never to use the Arctic route, citing environmental concerns. This is partly ethical, and partly a calculated move to prevent rivals from gaining a transit time advantage.',
                cost: 3000,
                effects: { capital: -1000, influence: +600, defcon: 0 },
                consequence: 'You successfully lobby the IMO (International Maritime Organization) to ban heavy fuel oil in the Arctic, effectively closing the route to cheap freighters. You lose $1,000 but gain massive global influence. Suez remains the chokepoint.',
                priceMods: { oil: 1.05 },
                affectsRoutes: ['r7', 'r8'],
                routeEff: 1.1
            }
        ]
    },
    {
        id: 'sc_lithium_cartel',
        category: 'ECONOMIC',
        icon: '🔋',
        title: 'South America Forms "Lithium OPEC"',
        situation: 'Argentina, Bolivia, and Chile (holding 60% of the world\'s lithium reserves) have formally signed an agreement to coordinate production quotas and set floor prices for lithium carbonate. Battery costs for EVs and grid storage are about to skyrocket.',
        realWorldContext: 'The "Lithium Triangle" nations have frequently discussed forming a cartel modeled purely on OPEC. While currently hindered by internal politics and different regulatory frameworks, resource nationalism is pushing them closer to coordinated price-fixing as EV demand scales.',
        defconDelta: 0,
        choices: [
            {
                id: 'forward_contract_aus',
                label: '🇦🇺 Buy out Australian and Canadian hard-rock mines',
                description: 'Bypass the cartel by controlling the non-cartel supply.',
                realLogic: 'While South America has the brine lakes, Australia is actually the world\'s largest lithium producer via hard-rock mining (spodumene). When China or South America threatens supply, Western automakers instantly dump billions into Australian and Canadian mining operations.',
                cost: 9000,
                effects: { capital: +4000, data: +300, defcon: 0 },
                consequence: 'You secure non-cartel supply lines. As the cartel spikes global prices, your internally sourced lithium gives your tech and manufacturing routes a massive cost advantage. +$4,000.',
                priceMods: { lithium: 1.3, copper: 1.05 },
                affectsRoutes: [],
                routeEff: 1
            },
            {
                id: 'deal_with_cartel',
                label: '🤝 Sign long-term offtake agreements with the Cartel',
                description: 'Accept their higher prices, but guarantee your supply.',
                realLogic: 'Automakers like Ford, GM, and Tesla have been signing direct "offtake agreements" with mining companies, bypassing commodity markets entirely. They agree to buy lithium at a set price for 10 years to guarantee they have batteries to build cars.',
                cost: 5000,
                effects: { capital: -2000, influence: +200, defcon: 0 },
                consequence: 'You lock in prices higher than yesterday, but lower than tomorrow. You take an initial -$2,000 hit to margins, but EV production continues uninterrupted. Rivals face shortages next turn.',
                priceMods: { lithium: 1.25 },
                affectsRoutes: ['r11', 'r12'],
                routeEff: 1
            },
            {
                id: 'destabilize_cartel',
                label: '🔥 Fund political opposition in Lithium Triangle',
                description: 'Cartels require political unity. Break the unity.',
                realLogic: 'South American politics are notoriously volatile. A change in government in Argentina or Chile often results in 180-degree turns on mining nationalization. Foreign capital frequently backs pro-privatization candidates to keep resources flowing cheaply.',
                cost: 4000,
                effects: { capital: +5000, influence: -300, defcon: 1 },
                consequence: 'You fund a successful pro-market political campaign in Argentina. The cartel fractures before its first quota is enforced. Prices crash. You save billions, but DEFCON ticks up due to foreign election interference.',
                priceMods: { lithium: 0.85 },
                affectsRoutes: [],
                routeEff: 1
            }
        ]
    },
    {
        id: 'sc_software_blackout',
        category: 'CYBER',
        icon: '🖥️',
        title: 'Global Cybersecurity Update Grounds Flights',
        situation: 'A flawed kernel-level update pushed by a dominant global cybersecurity vendor has caused "Blue Screens of Death" on 60% of Fortune 500 Windows machines. Airlines are grounded, banks can\'t process trades, and automated port terminals are frozen.',
        realWorldContext: 'The July 2024 CrowdStrike outage was the largest IT outage in history. It wasn\'t a hack—it was a bad file. It demonstrated the extreme fragility of a monoculture tech ecosystem. Delta Air Lines lost $500M in a few days because their crew-scheduling software lacked manual fallbacks.',
        defconDelta: 0,
        choices: [
            {
                id: 'deploy_manual_fallback',
                label: '📝 Deploy analog/manual fallback protocols immediately',
                description: 'Use whiteboards, phone calls, and cash. Keep the cargo moving.',
                realLogic: 'During the CrowdStrike outage, airlines and hospitals that had maintained robust analog fallback procedures (paper charts, whiteboards for flight dispatch) recovered hours or days faster than those who relied 100% on the cloud.',
                cost: 2000,
                effects: { capital: +4000, data: -500, defcon: 0 },
                consequence: 'Your logistics teams break out the paper and radios. You lose data efficiency, but your ships dock and planes fly while competitors bleed. +$4,000 from fulfilling stranded rival contracts.',
                priceMods: { copper: 1.05 },
                affectsRoutes: ['r1', 'r4', 'r12'],
                routeEff: 0.9
            },
            {
                id: 'short_vendor',
                label: '📉 Short the cybersecurity vendor and paralyzed rivals',
                description: 'The vendor\'s stock is about to lose 25% of its value.',
                realLogic: 'CrowdStrike\'s stock plummeted from $340 to $250 in the days following the update. Smart traders who realized the scale of the outage in the first 2 hours aggressively shorted the stock before the general market opened.',
                cost: 1000,
                effects: { capital: +8000, data: 0, defcon: 0 },
                consequence: 'Your trading desk executes a massive short position before the algorithms lock out. +$8,000. However, your own network remains paralyzed for the turn, netting zero route income.',
                priceMods: { gold: 1.04 },
                affectsRoutes: ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15', 'r16', 'r17', 'r18', 'r19', 'r20'],
                routeEff: 0
            },
            {
                id: 'sue_for_damages',
                label: '⚖️ Class action lawsuit preparation',
                description: 'Accept the offline time, but weaponize the legal system for recovery.',
                realLogic: 'Delta Air Lines hired David Boies to sue CrowdStrike and Microsoft for $500M in damages. Software End-User License Agreements (EULAs) normally protect vendors, but gross negligence claims can pierce that shield.',
                cost: 3000,
                effects: { capital: -3000, influence: +500, defcon: 0 },
                consequence: 'You take a -$3,000 hit this turn as operations cease. However, you spearhead a coalition of furious corporations. You gain massive industry influence, ensuring compensation in future turns.',
                priceMods: {},
                affectsRoutes: ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15', 'r16', 'r17', 'r18', 'r19', 'r20'],
                routeEff: 0
            }
        ]
    },
    {
        id: 'sc_brics_currency',
        category: 'ECONOMIC',
        icon: '💶',
        title: 'BRICS Announces Gold-Backed Trade Settlement Currency',
        situation: 'At the summit in Kazan, the BRICS+ nations announce "The Unit" — a gold and commodity-backed currency designed strictly to bypass the US Dollar for cross-border trade. Gulf oil producers have agreed to accept it.',
        realWorldContext: 'De-dollarization is a slow but real process. Russia and China already settle 90% of bilateral trade in Rubles and Yuan. While a unified BRICS fiat currency is unlikely, a blockchain-based, commodity-pegged settlement unit designed specifically to evade US Treasury sanctions is actively being developed.',
        defconDelta: 1,
        choices: [
            {
                id: 'hedge_brics',
                label: '🔄 Dual-book accounting: accept USD and BRICS Unit',
                description: 'Don\'t pick a side. Build payment infrastructure for both.',
                realLogic: 'Multinational trading houses (Vitol, Trafigura) are highly pragmatic. If India wants to buy Russian oil using Dirhams or Yuan, the traders arrange the currency swap. Middlemen who bridge the fractured financial system get incredibly rich.',
                cost: 6000,
                effects: { capital: +8000, influence: 0, defcon: 0 },
                consequence: 'You become the primary quiet clearinghouse for East-West trade. +$8000 in lucrative transaction fees. You are immune to dollar-weaponization, but compliant enough to avoid US sanctions.',
                priceMods: { gold: 1.1, oil: 1.05 },
                affectsRoutes: ['r18', 'r19', 'r20'],
                routeEff: 1.1
            },
            {
                id: 'double_down_usd',
                label: '🦅 Double down on US Dollar hegemony',
                description: 'Refuse the new currency. Align strictly with Western financial systems.',
                realLogic: 'The U.S. Dollar remains 88% of all foreign exchange trades. Bet against it at your peril. US financial institutions offer the deepest, most liquid capital markets in human history. The "BRICS Unit" is likely a bureaucratic nightmare with capital controls.',
                cost: 0,
                effects: { capital: -2000, influence: +500, defcon: 0 },
                consequence: 'You lose out on Eastern trade contracts (-$2000), but the US Treasury and Wall Street reward your loyalty. Massive influence gain in Western capitals. Route efficiency to US/EU routes improves.',
                priceMods: { gold: 0.95 },
                affectsRoutes: ['r1', 'r2', 'r3', 'r14'],
                routeEff: 1.2
            },
            {
                id: 'hoard_gold',
                label: '🥇 Convert treasury reserves to physical gold',
                description: 'If trade fractures, gold is the only universal collateral.',
                realLogic: 'Since 2022, central banks (led by China, India, and Poland) have been buying gold at the fastest pace on record. If the fiat system fractures into rival blocs (Dollar vs Yuan/BRICS), gold becomes the neutral base layer for settling trade imbalances.',
                cost: 10000,
                effects: { capital: +5000, influence: +200, defcon: 0 },
                consequence: 'You drain your cash reserves to buy bullion. The announcement sends gold soaring 15%. Your portfolio instantly appreciates by +$5000. Complete immunity to fiat currency fluctuations.',
                priceMods: { gold: 1.15, copper: 1.02 },
                affectsRoutes: [],
                routeEff: 1
            }
        ]
    }
];

// Scenarios pool by difficulty/turn
export function getScenarioForTurn(turn, usedIds) {
    const available = SCENARIOS.filter(s => !usedIds.includes(s.id));
    if (available.length === 0) return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    // Weight toward critical scenarios at higher defcon
    return available[Math.floor(Math.random() * available.length)];
}
