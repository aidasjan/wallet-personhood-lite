# On-Chain Personhood Verification

A simple, privacy-preserving system that lets users prove they’re human by solving a CAPTCHA, receive a cryptographic signature from a trusted backend, and verify their wallet address on-chain via a smart contract.

## Features

* CAPTCHA-based human verification (Google reCAPTCHA)
* Cryptographic signature issuance for verified addresses
* Smart contract for on-chain wallet verification
* Etherscan contract verification support
* Fully transparent and decentralized verification state
* Easily extendable for sybil resistance, voting, and gated access

## Tech Stack

* **Frontend**: Next.js + Google reCAPTCHA
* **Backend**: NestJS (verifies CAPTCHA and signs messages)
* **Blockchain**: Solidity smart contract deployed on Sepolia
* **Deployment & Testing**: Hardhat, Hardhat Ignition, Ethers v6

## How It Works

1. **User solves a CAPTCHA in the frontend.**
2. **CAPTCHA token is sent to the backend**, which verifies it with Google’s reCAPTCHA API.
3. **Backend signs the user's wallet address** using a trusted private key (issuing proof of personhood).
4. **User submits this signature on-chain** to a smart contract.
5. **Smart contract verifies the signature** and marks the address as human-verified.

## Getting Started

### 1. Install dependencies in all projects (backend, frontend, contracts)

```bash
yarn install
```

### 2. Setup `.env`

Create a `.env` file in both the frontend and backend based on `.env.example`

## Contracts

### Existing contracts

AddressVerifier contract is deployed on Sepolia: `0x8C6E4aAf0A8D0EF393aE16Ba6aBE61Be6251671e`

### Deploying the contract

Deploy to Sepolia:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

## Testing

Run tests with:

```bash
npx hardhat test
```

## Use Cases

* Bot-free airdrops
* Human-only voting in DAOs
* Unique-human access to dApps/games
* Identity-limited actions (one-person-one-account rules)

## License

MIT — free to use, modify, and build upon.
