import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  imTokenWallet,
  ledgerWallet,
  omniWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { http, WagmiProvider } from 'wagmi';
import {
  Chain,
  arbitrum,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
  zora,
} from 'wagmi/chains';

export const chains: readonly [Chain, ...Chain[]] = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  bsc,
];

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const transports = {
  [mainnet.id]: http(),
  [polygon.id]: http(),
  [optimism.id]: http(),
  [arbitrum.id]: http(),
  [base.id]: http(),
  [zora.id]: http(),
  [bsc.id]: http(),
};

const { wallets } = getDefaultWallets({
  appName: 'rainbowkit.com',
  projectId,
});

const config = getDefaultConfig({
  appName: 'rainbowkit.com',
  projectId,
  chains,
  transports,
  wallets: [
    ...wallets,
    {
      groupName: 'More',
      wallets: [
        argentWallet({ projectId }),
        trustWallet({ projectId }),
        omniWallet({ projectId }),
        imTokenWallet({ projectId }),
        ledgerWallet({ projectId }),
      ],
    },
  ],
});

const client = new QueryClient();

export function Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
