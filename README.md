# MantaCare Donation Plattform v0.8

An innovative web3 dApp where you can donate Cryptocurrencies and Tokens to small projekts with a humanitarian focus.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

- Send Coins and Tokens with just a few clicks
- Build with safety in mind. The contract follows common safety practices and standards to ensure no money is lost in the process.
- Community driven focus on small projects, no large NGO's or too many projects to loose focus on the things that are really important.

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/naiirad/MantaCare
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`
