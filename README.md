# Aliens Vs Robots

IBM unpaid internship project for team Bytes.

## Project Overview

Aliens Vs Robots is an engaging web game developed using React, with plans to integrate a unique NFT system. Players can earn NFTs based on their quest progress upon completing the game.

## Key Features

- Engaging gameplay with a sci-fi theme.
- Developed with React, utilizing JavaScript, CSS, and HTML.
- Future integration of an NFT system to reward players.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Foundry**: A toolkit for Ethereum application development, written in Rust.
- **Forge**: Ethereum testing framework.
- **Cast**: Swiss army knife for interacting with EVM smart contracts.
- **Anvil**: Local Ethereum node.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cosminmarian53/Aliens-Vs-Robots.git
   cd Aliens-Vs-Robots
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production.
- `npm run eject`: Ejects the project from Create React App setup, giving full control over the build tools and configuration.

## Foundry Usage

### Build

```shell
forge build
```

### Test

```shell
forge test
```

### Format

```shell
forge fmt
```

### Gas Snapshots

```shell
forge snapshot
```

### Anvil

```shell
anvil
```

### Deploy

```shell
forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```
Note: this is only an example, the contract is different!!
### Cast

```shell
cast <subcommand>
```

### Help

```shell
forge --help
anvil --help
cast --help
```

## Contribution

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## Contact

For any inquiries or support, please contact [cosminmarian53](https://github.com/cosminmarian53).

---

### **Note**: The game is almost finished. Later, I will implement an NFT system, in which the player, after finishing the game, will receive a few NFTs based on their quest progress.
###  **Second Note**: This game has been branched out. One version for Web2.0 and another for Web3. The main branch contains the Web2.0 version and the web3-ethereum contains the Web3 version.
### **Third Note**: The game is complete!! The main branch is completely viable, and fully functional, and depends whether you want to use the Web2 version or the Web3 version.
```
