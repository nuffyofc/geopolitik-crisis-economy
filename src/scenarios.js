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
    }
];

// Scenarios pool by difficulty/turn
export function getScenarioForTurn(turn, usedIds) {
    const available = SCENARIOS.filter(s => !usedIds.includes(s.id));
    if (available.length === 0) return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    // Weight toward critical scenarios at higher defcon
    return available[Math.floor(Math.random() * available.length)];
}
