/// <reference types="react-scripts" />

declare module '@metamask/jazzicon' {
  export default function (diameter: number, seed: number): HTMLElement;
}

interface Window {
  // walletLinkExtension is injected by the Coinbase Wallet extension
  ethereum?: {
    // value that is populated and returns true by the Coinbase Wallet mobile dapp browser
    isCoinbaseWallet?: true;
    isMetaMask?: true;
    isTrust?: true;
    isTokenPocket?: true;
    isRoboInu?: true;
    isTrustWallet?: true;
    autoRefreshOnNetworkChange?: boolean;
    request?: (...args: any) => Promise<any>;
    selectedProvider?: {
      close?: () => void;
      isWalletLink?: boolean;
      isMetaMask?: boolean;
    };
    providers: any;
    isConnected?: () => boolean;
  };

  roboinu?: {
    providers?: {
      ethereum?: {
        connected: boolean;
        isMetaMask: boolean;
        isRoboInu: boolean;
      };
    };
  };
  coinbaseWalletRequestProvider?: any;
  coinbaseWalletExtension?: any;
  walletLinkExtension?: any;
  WalletLink?: any;
  WalletLinkProvider?: any;

  web3?: Record<string, unknown>;
}

declare module 'content-hash' {
  declare function decode(x: string): string;
  declare function getCodec(x: string): string;
}

declare module 'multihashes' {
  declare function decode(buff: Uint8Array): {
    code: number;
    name: string;
    length: number;
    digest: Uint8Array;
  };
  declare function toB58String(hash: Uint8Array): string;
}
