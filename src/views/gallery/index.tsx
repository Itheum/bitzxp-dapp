import { FC, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import useUserDataNFTsStore from 'stores/useUserDataNFTsStore';
import Image from 'next/image';

export const GalleryView: FC = ({}) => {
  const wallet = useWallet();
  const nfts = useUserDataNFTsStore((s) => s.nfts);
  const { getUserDataNfts } = useUserDataNFTsStore();

  useEffect(() => {
    if (wallet.publicKey) {
      getUserDataNfts(wallet.publicKey);
    }
  }, [wallet.publicKey, getUserDataNfts]);

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
