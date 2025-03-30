'use client';

import { Providers } from "./providers";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import { Suspense, useEffect, useState } from 'react';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from '@wagmi/core';
import {
  okxWallet, metaMaskWallet, coinbaseWallet, walletConnectWallet, bitgetWallet, gateWallet
} from "@rainbow-me/rainbowkit/wallets";
import { isMobile } from "@/utils";
import { PointProvider } from "@/context/PointContext";
import { OkxProvider } from '@/context/OkxContext';
import { base } from 'wagmi/chains'
import { bscTestnet,bsc } from 'wagmi/chains'
import { Auth0Provider } from "@auth0/auth0-react";

const artela = {
  id: 11822,
  name: 'Artela Testnet',
  network: 'artela-testnet',
  iconUrl: 'https://framerusercontent.com/images/xLv7JZ8nzPaZ9zk7j63YbRZHqY.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Artela',
    symbol: 'ART',
  },
  rpcUrls: {
    public: {
      http: [
        'https://betanet-rpc1.artela.network',
        'https://betanet-rpc2.artela.network'
      ]
    },
    default: {
      http: [
        'https://betanet-rpc1.artela.network',
        'https://betanet-rpc2.artela.network'
      ]
    },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://betanet-scan.artela.network/' },
    etherscan: { name: 'SnowTrace', url: 'https://betanet-scan.artela.network/' },
  },
  testnet: false,
};
const artelanet = defineChain(artela);
const desktopConnectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [okxWallet, metaMaskWallet, bitgetWallet, gateWallet, coinbaseWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'renaissance',
    projectId: '50cffcabee8015673d72dc6aaeb07371',
  }
);

export const desktopConfig = createConfig({
  connectors: desktopConnectors,
  transports: {
    // [artelanet.id]: http("https://betanet-rpc1.artela.network"),
    [bscTestnet.id]: http("https://data-seed-prebsc-1-s1.binance.org:8545")
  },
  chains: [artelanet, bscTestnet]
});

export const baseConfig = createConfig({
  connectors: desktopConnectors,
  transports: {
    [base.id]: http("https://api.zan.top/node/v1/base/mainnet/dbdad8c5d7134af2a581db8a0375ccb0"),
    [bsc.id]: http("https://bsc-dataseed1.binance.org"),
    [bscTestnet.id]: http("https://data-seed-prebsc-1-s1.binance.org:8545")
  },
  chains: [base, bsc, bscTestnet]
});


const client = new QueryClient();

const DynamicComponent = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setIsMobileView(isMobile());
  }, []);

  // const config = isMobileView ? mobileConfig : desktopConfig;
  const config = baseConfig;

  return (
    <Suspense>
      <Providers>
        <WagmiProvider config={config}>
          <QueryClientProvider client={client}>
            <Auth0Provider
              domain="dev-wvrdcf6cqd4qf0od.us.auth0.com"
              clientId="kKHVQeMp0OYGWkiwTGlv93Jn2LsC9Unb"
              authorizationParams={{
                redirect_uri: window.location.origin
              }}
            > 
              <RainbowKitProvider modalSize="compact" locale="en-US" theme={darkTheme()}>
                <PointProvider>
                  <OkxProvider>
                    {children}
                  </OkxProvider>
                </PointProvider>
              </RainbowKitProvider>
            </Auth0Provider>
          </QueryClientProvider>
        </WagmiProvider>
      </Providers>
    </Suspense>
  );
};

export default DynamicComponent;