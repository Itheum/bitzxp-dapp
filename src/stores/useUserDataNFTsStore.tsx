import create from 'zustand';
import { Connection, PublicKey } from '@solana/web3.js';

interface UserDataNFTsStore {
  nfts: any[];
  getUserDataNfts: (publicKey: PublicKey) => void;
}

const useUserDataNFTsStore = create<UserDataNFTsStore>((set, _get) => ({
  nfts: [],
  getUserDataNfts: async (publicKey) => {
    let nfts = [];
    try {
      console.log(process.env.NEXT_PUBLIC_HELIUS_API_KEY);
      const resp = await fetch(
        `https://devnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: `${publicKey.toBase58()}-${new Date().getTime()}`,
            method: 'getAssetsByOwner',
            params: {
              ownerAddress: publicKey.toBase58(),
              page: 1,
              limit: 1000,
            },
          }),
        },
      );
      const data = await resp.json();
      nfts = data.result.items;
    } catch (e) {
      console.log(`error getting nfts: `, e);
    }
    set((s) => {
      s.nfts = nfts;
      console.log(`nfts updated, `, nfts);
    });
  },
}));

export default useUserDataNFTsStore;
