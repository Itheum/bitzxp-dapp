import create from 'zustand';
import { Connection, PublicKey } from '@solana/web3.js';
import { notify } from 'utils/notifications';
import { DATA_NFT_COLLECTION_ID } from 'config';

interface UserDataNFTsStore {
  nfts: any[];
  getUserDataNfts: (publicKey: PublicKey, network: string) => void;
}

const useUserDataNFTsStore = create<UserDataNFTsStore>((set, _get) => ({
  nfts: [],
  getUserDataNfts: async (publicKey, network) => {
    let nfts = [];
    try {
      const url =
        network === 'mainnet'
          ? 'https://mainnet.helius-rpc.com'
          : 'https://devnet.helius-rpc.com';
      const resp = await fetch(
        `${url}/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`,
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
      nfts = data.result.items.filter(
        (nft) =>
          nft.grouping.find((g) => g.group_key === 'collection').group_value ===
          DATA_NFT_COLLECTION_ID,
      );
    } catch (e) {
      notify({
        type: 'error',
        message: 'User owned NFTs fetch failed',
        description: (e as Error).message,
      });
    }
    set((s) => {
      console.log(nfts);
      s.nfts = nfts;
    });
  },
}));

export default useUserDataNFTsStore;
