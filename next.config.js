/** @type {import('next').NextConfig} */
const { webpack } = require('next/dist/compiled/webpack/webpack');
const { version } = require('./package.json');

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'devnet-media.elrond.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'devnet-explorer.multiversx.com',
        pathname: '**',
      },
    ],
  },
  publicRuntimeConfig: {
    version,
  },
};

module.exports = nextConfig;
