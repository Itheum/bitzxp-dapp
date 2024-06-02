export const computeRemainingCooldown = (
  startTime: number,
  cooldown: number,
) => {
  const timePassedFromLastPlay = Date.now() - startTime;
  const _cooldown = cooldown - timePassedFromLastPlay;

  return _cooldown > 0 ? _cooldown + Date.now() : 0;
};

export function shortenAddress(value: string, length: number = 6): string {
  return value.slice(0, length) + ' ... ' + value.slice(-length);
}

export const getApi = (chainID: string) => {
  const envKey =
    chainID === '1'
      ? 'NEXT_PUBLIC_API_MAINNET_KEY'
      : 'NEXT_PUBLIC_API_DEVNET_KEY';
  const defaultUrl =
    chainID === '1' ? 'api.multiversx.com' : 'devnet-api.multiversx.com';

  return process.env[envKey] || defaultUrl;
};

const unescape = (str: string) => {
  return str.replace(/-/g, '+').replace(/_/g, '/');
};

const decodeValue = (str: string) => {
  return Buffer.from(unescape(str), 'base64').toString('utf8');
};

export const decodeNativeAuthToken = (accessToken: string) => {
  const tokenComponents = accessToken.split('.');
  if (tokenComponents.length !== 3) {
    throw new Error('Native Auth Token has invalid length');
  }

  const [address, body, signature] = accessToken.split('.');
  const parsedAddress = decodeValue(address);
  const parsedBody = decodeValue(body);
  const bodyComponents = parsedBody.split('.');
  if (bodyComponents.length !== 4) {
    throw new Error('Native Auth Token Body has invalid length');
  }

  const [origin, blockHash, ttl, extraInfo] = bodyComponents;

  let parsedExtraInfo;
  try {
    parsedExtraInfo = JSON.parse(decodeValue(extraInfo));
  } catch {
    throw new Error('Extra Info INvalid');
  }

  const parsedOrigin = decodeValue(origin);

  const result = {
    ttl: Number(ttl),
    origin: parsedOrigin,
    address: parsedAddress,
    extraInfo: parsedExtraInfo,
    signature,
    blockHash,
    body: parsedBody,
  };

  // if empty object, delete extraInfo ('e30' = encoded '{}')
  if (extraInfo === 'e30') {
    delete result.extraInfo;
  }

  return result;
};

export const getApiDataMarshal = (chainID: string) => {
  const envKey =
    chainID === '1'
      ? 'NEXT_PUBLIC_DATAMARSHAL_MAINNET_API'
      : 'NEXT_PUBLIC_DATAMARSHAL_DEVNET_API';
  const defaultUrl =
    chainID === '1'
      ? 'https://api.itheumcloud.com/datamarshalapi/router/v1'
      : 'https://api.itheumcloud-stg.com/datamarshalapi/router/v1';
  return process.env[envKey] || defaultUrl;
};
export const sleep = (sec: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
};

export const getApiWeb2Apps = (networkMode: string) => {
  const envKey =
    networkMode === 'mainnet'
      ? 'NEXT_PUBLIC_WEB2_APPS_MAINNET_API'
      : 'NEXT_PUBLIC_WEB2_APPS_DEVNET_API';
  const defaultUrl =
    networkMode === 'mainnet'
      ? 'https://api.itheumcloud.com'
      : 'https://api.itheumcloud-stg.com';

  return process.env[envKey] || defaultUrl;
};

export enum BlobDataType {
  TEXT,
  IMAGE,
  AUDIO,
  SVG,
  PDF,
  VIDEO,
}

export interface ViewDataReturnType {
  data: any;
  contentType: string;
  error?: string;
}

export interface ExtendedViewDataReturnType extends ViewDataReturnType {
  blobDataType: BlobDataType;
}

export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);

  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    });
  }
};
