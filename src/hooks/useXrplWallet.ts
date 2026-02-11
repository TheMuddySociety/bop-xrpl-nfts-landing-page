import { useState, useCallback, useEffect, useRef } from 'react';

interface NFTData {
  tokenId: string;
  imageUrl: string | null;
  name: string | null;
  issuer: string;
  taxon: number;
}

interface WalletState {
  isConnecting: boolean;
  isConnected: boolean;
  walletAddress: string | null;
  nfts: NFTData[];
  selectedNft: NFTData | null;
  error: string | null;
  sdkReady: boolean;
}

// Board of Peace NFT Collection details - Update these with actual values
const BOP_NFT_ISSUER = ''; // Leave empty to accept all NFTs for now

const XAMAN_API_KEY = import.meta.env.VITE_XAMAN_API_KEY as string;

// Load XUMM SDK from CDN
function loadXummScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).Xumm) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://xaman.app/assets/cdn/xumm.min.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Xaman SDK'));
    document.head.appendChild(script);
  });
}

export function useXrplWallet() {
  const xummRef = useRef<any>(null);
  const [state, setState] = useState<WalletState>({
    isConnecting: false,
    isConnected: false,
    walletAddress: null,
    nfts: [],
    selectedNft: null,
    error: null,
    sdkReady: false,
  });

  // Load and initialize XUMM SDK
  useEffect(() => {
    if (!XAMAN_API_KEY) {
      console.warn('VITE_XAMAN_API_KEY is not set. Xaman wallet integration will not work.');
      return;
    }

    loadXummScript().then(() => {
      const XummClass = (window as any).Xumm;
      if (XummClass) {
        xummRef.current = new XummClass(XAMAN_API_KEY);
        setState(prev => ({ ...prev, sdkReady: true }));
        console.log('Xaman SDK loaded successfully');
      } else {
        console.error('Xumm class not found on window after script load');
      }
    }).catch((err) => {
      console.error('Failed to load Xaman SDK:', err);
      setState(prev => ({ ...prev, error: 'Failed to load Xaman SDK. Please refresh the page.' }));
    });
  }, []);

  const connectWallet = useCallback(async () => {
    if (!xummRef.current) {
      setState(prev => ({ ...prev, error: 'Xaman SDK not ready. Please try again.' }));
      return;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      await xummRef.current.authorize();

      // Get account address from the SDK
      const account = await xummRef.current.user?.account;

      if (!account) {
        throw new Error('Could not retrieve wallet address. Authorization may have been cancelled.');
      }

      // Fetch NFTs for this account
      const nfts = await fetchAccountNFTs(account);

      const bopNfts = BOP_NFT_ISSUER
        ? nfts.filter(nft => nft.issuer === BOP_NFT_ISSUER)
        : nfts;

      if (bopNfts.length === 0) {
        setState(prev => ({
          ...prev,
          isConnecting: false,
          isConnected: true,
          walletAddress: account,
          nfts: [],
          error: 'No Board of Peace NFTs found in this wallet. You need to hold a BOP NFT to register.',
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        isConnecting: false,
        isConnected: true,
        walletAddress: account,
        nfts: bopNfts,
        error: null,
      }));
    } catch (error) {
      console.error('Wallet connection error:', error);
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      }));
    }
  }, []);

  const selectNft = useCallback((nft: NFTData) => {
    setState(prev => ({ ...prev, selectedNft: nft }));
  }, []);

  const disconnect = useCallback(async () => {
    if (xummRef.current) {
      try {
        await xummRef.current.logout();
      } catch {
        // Ignore logout errors
      }
    }
    setState({
      isConnecting: false,
      isConnected: false,
      walletAddress: null,
      nfts: [],
      selectedNft: null,
      error: null,
      sdkReady: true,
    });
  }, []);

  return {
    ...state,
    connectWallet,
    selectNft,
    disconnect,
  };
}

// Fetch account NFTs from XRPL
async function fetchAccountNFTs(account: string): Promise<NFTData[]> {
  try {
    const response = await fetch('https://xrplcluster.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'account_nfts',
        params: [{
          account,
          ledger_index: 'validated',
          limit: 100
        }],
      }),
    });

    const data = await response.json();

    if (data.result?.error) {
      if (data.result.error === 'actNotFound') {
        throw new Error('Wallet address not found on XRPL or has no NFTs');
      }
      throw new Error(data.result.error_message || 'Failed to fetch NFTs');
    }

    const nfts = data.result?.account_nfts || [];

    const parsedNfts: NFTData[] = await Promise.all(
      nfts.map(async (nft: any) => {
        const metadata = await parseNFTMetadata(nft.URI);
        return {
          tokenId: nft.NFTokenID,
          imageUrl: metadata?.image || null,
          name: metadata?.name || `NFT #${nft.nft_serial}`,
          issuer: nft.Issuer,
          taxon: nft.NFTokenTaxon,
        };
      })
    );

    return parsedNfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw error;
  }
}

// Parse NFT metadata URI to extract image URL
async function parseNFTMetadata(uri: string | undefined): Promise<{ image?: string; name?: string } | null> {
  if (!uri) return null;

  try {
    let decodedUri = uri;
    if (/^[0-9A-Fa-f]+$/.test(uri)) {
      decodedUri = hexToString(uri);
    }

    if (decodedUri.startsWith('ipfs://')) {
      decodedUri = `https://ipfs.io/ipfs/${decodedUri.replace('ipfs://', '')}`;
    }

    if (decodedUri.startsWith('http') && (decodedUri.includes('.json') || !decodedUri.match(/\.(png|jpg|jpeg|gif|webp)$/i))) {
      try {
        const response = await fetch(decodedUri);
        const metadata = await response.json();

        let imageUrl = metadata.image || metadata.image_url;
        if (imageUrl?.startsWith('ipfs://')) {
          imageUrl = `https://ipfs.io/ipfs/${imageUrl.replace('ipfs://', '')}`;
        }

        return {
          image: imageUrl,
          name: metadata.name,
        };
      } catch {
        return { image: decodedUri };
      }
    }

    return { image: decodedUri };
  } catch {
    return null;
  }
}

// Convert hex string to UTF-8 string
function hexToString(hex: string): string {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}
