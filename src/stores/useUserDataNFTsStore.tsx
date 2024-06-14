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
      const resp = await fetch(
        `/api/fetchNfts?publicKeyb58=${publicKey.toBase58()}`,
      );
      const data = await resp.json();
      // QmaSwqUPtMivhgbNDU2K6LJhetu8zK4A2w6dwCdN51GXDF
      // MainM
      nfts = data.nfts.filter((nft) =>
        nft.content.json_uri.includes('arweave'),
      );
      console.log(nfts);
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
