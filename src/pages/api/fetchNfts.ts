// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PublicKey } from '@solana/web3.js';
import { DATA_NFT_COLLECTION_ID } from 'config';
import { EnvironmentsEnum } from 'models/types';
type Data = {
  nfts?: any;
  message?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const {
      query: { publicKeyb58 },
    } = req;
    const publicKey = new PublicKey(publicKeyb58);
    const network = process.env.NEXT_PUBLIC_ENV_NETWORK;
    const url =
      network === EnvironmentsEnum.mainnet
        ? 'https://mainnet.helius-rpc.com'
        : 'https://devnet.helius-rpc.com';
    const resp = await fetch(`${url}/?api-key=${process.env.HELIUS_API_KEY}`, {
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
    });
    const data = await resp.json();
    const nfts = data.result.items.filter((nft) => {
      const collection = nft.grouping.find((g) => g.group_key === 'collection');
      if (collection) {
        if (process.env.NEXT_PUBLIC_ENV_NETWORK === EnvironmentsEnum.mainnet) {
          return collection.group_value === DATA_NFT_COLLECTION_ID;
        } else {
          return (
            collection.group_value === DATA_NFT_COLLECTION_ID &&
            nft.content.json_uri.includes('GetBitz') &&
            nft.content.json_uri.includes('Main')
          );
        }
      } else {
        return false;
      }
    });
    res.status(200).json({ nfts: nfts });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
}
