import { PublicKey } from '@solana/web3.js';
import { getApiDataMarshal } from 'components/GetBitz/utils';
import { EnvironmentsEnum } from 'models/types';

export async function itheumPreaccess(
  networkMode: EnvironmentsEnum = EnvironmentsEnum.devnet,
) {
  const chainId = networkMode === EnvironmentsEnum.devnet ? 'SD' : 'S1';
  const preaccessUrl = `${getApiDataMarshal(EnvironmentsEnum.mainnet)}/preaccess?chainId=${chainId}`;
  const response = await fetch(preaccessUrl);
  const data = await response.json();
  return data.nonce;
}

export async function itheumViewData(
  assetId: string,
  nonce: string,
  signature: string,
  address: PublicKey,
  fwdHeaderKeys?: string[],
  headers?: any,
  networkMode: EnvironmentsEnum = EnvironmentsEnum.devnet,
): Promise<Response> {
  const chainId = networkMode === EnvironmentsEnum.devnet ? 'SD' : 'S1';
  let accessUrl = `${getApiDataMarshal(EnvironmentsEnum.mainnet)}/access?nonce=${nonce}&NFTId=${assetId}&signature=${signature}&chainId=${chainId}&accessRequesterAddr=${address.toBase58()}`;
  if (fwdHeaderKeys && fwdHeaderKeys.length > 0) {
    accessUrl += `&fwdHeaderKeys=${fwdHeaderKeys.join(',')}`;
  }
  const response = await fetch(accessUrl, { headers });
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
