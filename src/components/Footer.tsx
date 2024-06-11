import { FC } from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import { useNetworkConfiguration } from 'contexts/NetworkConfigurationProvider';

export const Footer: FC = () => {
  const { publicRuntimeConfig } = getConfig();
  const version = publicRuntimeConfig?.version;
  const { networkConfiguration, setNetworkConfiguration } =
    useNetworkConfiguration();
  return (
    <footer className="flex flex-col items-center justify-end w-full h-full py-2">
      <div>
        <a
          {...{
            target: '_blank',
          }}
          className="flex items-center text-white text-sm"
          href="https://itheum.io"
        >
          Made with ♥ by Itheum
        </a>
      </div>
      <div>
        v{version} | {networkConfiguration}
      </div>
    </footer>
  );
};
