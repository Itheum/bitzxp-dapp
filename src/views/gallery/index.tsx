import { FC, useCallback, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import useUserDataNFTsStore from 'stores/useUserDataNFTsStore';
import Image from 'next/image';
import { itheumPreaccess, itheumViewData } from 'utils/ItheumViewData';
import { verify } from '@noble/ed25519';
import { notify } from '../../utils/notifications';
import bs58 from 'bs58';

export const GalleryView: FC = ({}) => {
  const { publicKey, signMessage } = useWallet();
  const nfts = useUserDataNFTsStore((s) => s.nfts);
  const { getUserDataNfts } = useUserDataNFTsStore();

  useEffect(() => {
    if (publicKey) {
      getUserDataNfts(publicKey);
    }
  }, [publicKey, getUserDataNfts]);

  const signPreaccess = useCallback(async () => {
    const nonce = await itheumPreaccess();
    console.log(nonce);
    try {
      if (!publicKey) throw new Error('Wallet not connected!');
      if (!signMessage)
        throw new Error('Wallet does not support message signing!');
      const message = new TextEncoder().encode(nonce);
      const signature = await signMessage(message);
      const encodedSignature = bs58.encode(signature);
      if (!verify(signature, message, publicKey.toBytes()))
        throw new Error('Invalid signature!');
      notify({
        type: 'success',
        message: 'Message signed successfully!',
        txid: encodedSignature,
      });
      return { nonce, signature: encodedSignature };
    } catch (error: any) {
      notify({
        type: 'error',
        message: 'Message signing failed!',
        description: error?.message,
      });
      console.log('error', `Sign Message failed! ${error?.message}`);
    }
  }, [publicKey, signMessage]);

  const handleViewDataClick = async (nft) => {
    const { nonce, signature } = await signPreaccess();
    const assetId = nft.id;
    const address = publicKey;
    if (!nonce || !signature || !assetId || !address) return;
    itheumViewData(assetId, nonce, signature, address);
  };

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10 mb-8">
          Gallery
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="flex flex-row justify-around align-center">
          {nfts.map((nft, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <Image
                src={nft.content.files[0].uri}
                alt={nft.content.metadata.name}
                width={160}
                height={160}
                className="rounded-lg"
              />
              <p className="text-center text-slate-300 text-sm mt-2">
                {nft.content.metadata.name}
              </p>
              <button
                type="button"
                className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
                onClick={() => {
                  handleViewDataClick(nft);
                }}
              >
                View Data
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
