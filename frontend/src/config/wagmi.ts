import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { sepolia } from "@wagmi/core/chains";
import { http } from "wagmi";

const chains = [sepolia];

const transports = {
  [sepolia.id]: http(),
};

const wallets = [metaMaskWallet];

export const config = getDefaultConfig({
  appName: "Web3CaptchaId",
  projectId: "",
  wallets: [{ groupName: "Wallets", wallets }],
  transports: transports,
  chains: chains as any,
  ssr: true,
});
