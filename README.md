# TradeX - Professional Trading Platform

Welcome to TradeX, an advanced trading platform designed for professional traders. It features a comprehensive interface for trading perpetual futures, spot, and options, enhanced with AI-powered insights, social copy trading, and DeFi capital efficiency.

![TradeX Interface](https://lovable.dev/opengraph-image-p98pqg.png)

## ✨ Features

TradeX is built with a rich set of features to provide a complete trading experience:

*   **📈 Professional Trading UI**: A clean, responsive interface featuring a real-time trading chart, an intuitive order panel, a markets sidebar, and a detailed positions table.
*   **🤖 AI Hub & Strategy Builder**: Leverage AI-driven market insights, sentiment analysis, and on-chain data to inform your trades. Build and deploy no-code automated trading strategies.
*   **💼 Comprehensive Portfolio Management**: Track your asset balances, total portfolio value, available margin, and unrealized PnL. Manage which assets are used as collateral to maximize capital efficiency.
*   **🏆 Leaderboard & Copy Trading**: View a real-time leaderboard of the top-performing traders on the platform. Automatically copy the trades of successful users to mirror their strategies.
*   **🗳️ DAO Governance**: Participate in the protocol's future by creating and voting on governance proposals. Track your voting power and see active and past proposals.
*   **🎁 Rewards & Loyalty Program**: Earn XP by completing daily trading quests. Climb loyalty tiers to unlock benefits like trading fee discounts and redeem XP in the rewards store.
*   **💰 Earn Passive Yield**: Become a liquidity provider by depositing assets into liquidity pools (e.g., USDC, ETH, BTC) and earn a share of the platform's revenue.
*   **📊 Platform Statistics**: View real-time platform metrics, including 24-hour trading volume, Total Value Locked (TVL), open interest, and the number of active traders.

## 🚀 Tech Stack

This project is built with a modern and robust technology stack:

*   **Vite**: A next-generation frontend tooling that provides a faster and leaner development experience.
*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **shadcn/ui**: A collection of re-usable UI components, built with Radix UI and Tailwind CSS.
*   **React Router**: For declarative routing and navigation within the application.
*   **TanStack Query**: For data fetching, caching, and state management.

## 📂 Project Structure

The codebase is organized to be modular and scalable. Here is a brief overview of the key directories:

```
akin-tunde-nexus-tradeverse/
├── public/              # Static assets
└── src/
    ├── components/      # Reusable components
    │   ├── trading/     # Components specific to the trading interface
    │   └── ui/          # Generic UI components from shadcn/ui
    ├── hooks/           # Custom React hooks
    ├── lib/             # Utility functions
    └── pages/           # Top-level page components for each route
```

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your machine.

*   [Install Node.js with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_GIT_URL>
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd akin-tunde-nexus-tradeverse
    ```

3.  **Install the necessary dependencies:**
    ```sh
    npm install
    ```

4.  **Start the development server:**
    This command will start the Vite development server with auto-reloading and an instant preview.
    ```sh
    npm run dev
    ```
    Your application will be available at `http://localhost:8080`.

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev`: Starts the application in development mode.
*   `npm run build`: Bundles the app for production to the `dist` folder.
*   `npm run lint`: Runs the ESLint linter to find and fix problems in your code.
*   `npm run preview`: Serves the production build locally to preview it before deployment.
