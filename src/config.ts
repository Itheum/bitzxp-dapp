import { EnvironmentsEnum } from 'models/types';

export const DATA_NFT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_ENV_NETWORK === EnvironmentsEnum.mainnet
    ? 'me2Sj97xewgEodSCRs31jFEyA1m3FQFzziqVXK9SVHX'
    : '6MgvQSDUU3Z2a5MQqPeStUyCo1AXrB8xJhyBc8YYH3uk';
