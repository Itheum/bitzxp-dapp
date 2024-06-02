import { PublicKey } from '@solana/web3.js';

export async function itheumPreaccess() {
  const chainId = 'SD';
  const preaccessUrl = `https://api.itheumcloud-stg.com/datamarshalapi/router/v1/preaccess?chainId=${chainId}`;
  const response = await fetch(preaccessUrl);
  const data = await response.json();
  return data.nonce;
}

export async function itheumViewData(
  assetId: string,
  nonce: string,
  signature: string,
  address: PublicKey,
  config?: any,
): Promise<Response> {
  const chainId = 'SD';
  const accessUrl = `https://api.itheumcloud-stg.com/datamarshalapi/router/v1/access?nonce=${nonce}&NFTId=${assetId}&signature=${signature}&chainId=${chainId}&accessRequesterAddr=${address.toBase58()}`;
  const response = await fetch(accessUrl, config);
  return response;
}

export async function itheumViewDataInNewTab(
  assetId: string,
  nonce: string,
  signature: string,
  address: PublicKey,
) {
  const response = await itheumViewData(assetId, nonce, signature, address);
  const data = await response.blob();
  const url = window.URL.createObjectURL(data);
  window.open(url, '_blank');
}
