# Geopolitik: The Crisis Economy

**Free to play at: [geopolitik-crisis-economy.vercel.app](https://geopolitik-crisis-economy.vercel.app/)**

**Geopolitik: The Crisis Economy** is a strategic economic and geopolitical simulator where players act as shadow megacorporations or superpowers. The goal is to build a resilient global supply chain that thrives on the instability of other nations, achieving global market dominance without triggering global annihilation or suffering complete economic collapse.

## Key Features

- **Scenario-Driven Gameplay**: Every turn presents a high-stakes scenario based on actual geopolitical events (OPEC cuts, Red Sea attacks, SWIFT sanctions, etc.).
- **Global Consequence Logic**: Each choice explains the "Real-World Logic" behind geopolitical and economic mechanics.
- **GPS-Accurate World Map**: Interactive world map with real latitude/longitude for all major global hubs, rendered using a precise `d3-geo` projection.
- **Tactical Visuals**: High-fidelity map labels featuring **Country Flags** and **Dynamic Zoom/Pan** capabilities for precise strategic monitoring.
- **Dynamic Market Simulation**: Live commodity prices (Oil, Gold, Lithium, etc.) that react to global events and player decisions.
- **Crisis Dashboard**: A premium military/cyber-themed interface featuring dedicated scenario cards, consequence explainers, and real-time strategic monitoring.

## Why Geopolitik?

Unlike traditional strategy games that rely on abstract points, **Geopolitik** is designed to simulate the actual friction points of the global economy:
- **Educational Realism**: Every scenario is based on real-world political science and economics, such as *Debt-Trap Diplomacy*, *Market Hedging*, and *Logistical Interdiction*.
- **Consequence Explanations**: The game doesn't just give you a "Game Over"—it explains the logical chain of events that led to a specific outcome, making it a powerful tool for understanding global affairs.
- **High-Fidelity Data**: Map nodes are based on real-world GPS coordinates for major trade hubs and transit points.

## Preview

![Welcome Screen](screenshots/welcome_screen.png)
*Establish your strategic command*

![Choose Faction](screenshots/choose_faction.png)
*Select your global power*

![Lead the Globe](screenshots/lead_the_globe.png)
*The Crisis Dashboard in action*

![Make Decisions](screenshots/make_decisions.png)
*High-stakes geopolitical scenarios*

![Accept Consequences](screenshots/accept_consequences.png)
*Real-world logic and consequences*

## Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Logic**: Vanilla JavaScript (ES Modules)
- **Mapping**: [D3-geo](https://d3js.org/d3-geo) & [TopoJSON](https://github.com/topojson/topojson)
- **UI & Styling**: Vanilla CSS and HTML5

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm (v7.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/geopolitik-crisis-economy.git
   cd geopolitik-crisis-economy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Factions & Specializations

Choose your path to global supremacy. Each faction offers unique logistical and economic advantages:

- **🌐 NOMAD CORP**: Stateless megacorporation with unmatched logistics. (+20% trade speed, -15% reroute cost)
- **⚔️ IRON PACT**: Defense conglomerate turned power broker. (+30% military protection, -25% base action costs)
- **🤖 SILKROAD AI**: Algorithmic supremacy through AI market analysis. (+35% market prediction, +20% data income)
- **❄️ ARCTIC SYNDICATE**: Controls critical polar mineral deposits. (+25% resource extraction, weather immunity)
- **⛽ GULF CARTEL**: Commands critical energy infrastructure. (+40% oil income, choke point control bonus)
- **👻 CYBER GHOSTS**: Shadow network with eyes everywhere. (+50% cyber ops, -30% intelligence costs)

---

## Detailed Gameplay Guide

### 1. The Tactical Map
The world map is your primary interface. It displays:
- **Major Economic Hubs**: (NYC, London, Shanghai) which generate capital.
- **Resource Deposits**: (Ural Oil Fields, Siberian Mines) critical for maintaining your supply chain.
- **Choke Points**: (Suez Canal, Malacca Strait) high-risk areas where single events can block global trade.
- **Shipping Lanes**: Real-time trade routes that fluctuate in efficiency based on geopolitical stability.

### 2. The Scenario System (The Core Loop)
At the start of each turn, a **Geopolitical Scenario** is triggered.
- **Read the Situation**: Understand the immediate threat (e.g., a cyber attack on Rotterdam or a naval blockade).
- **Check Real-World Logic**: Hover over the "Real-World Context" to understand the actual geopolitical mechanics at play.
- **Evaluate Choices**: Every choice has a cost (Capital, Oil, or Data) and a range of effects on DEFCON, Market prices, and Route efficiency.

### 3. Market & Commodities
The commodities market (Oil, Gold, Lithium, Wheat) is volatile.
- Prices react dynamically to scenarios. (e.g., War in the Middle East spikes Oil).
- High dominance relies on maintaining a high Capital-to-GDP ratio.
- Use your **AI Strategic Advisor** to predict upcoming market shocks.

### 4. Strategic Objectives
- **Win Condition**: Reach **90%+ Global Dominance**. This is achieved by building infrastructure, accumulating massive capital, and controlling the world's most valuable trade routes.
- **Lose Conditions**:
    - **DEFCON 1**: If your aggressive choices escalate global tensions to the point of nuclear exchange.
    - **Economic Collapse**: If your capital falls to zero and your supply chain is permanently severed.

---

## Strategic Tips
- **Hedge your bets**: Don't put all your trade routes through a single choke point like the Suez Canal.
- **Watch the DEFCON**: Powerful actions often raise DEFCON. If you're at DEFCON 2, consider playing a diplomatic "Free" option to cool tensions.
- **Invest in Infrastructure**: Data centers and Military bases are expensive but can halve the damage from future scenarios in their regions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

Developed as a modern strategic simulator inspired by high-stakes geopolitical analysis.
