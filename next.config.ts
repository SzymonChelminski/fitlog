import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/exercises/image/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/exercises/image/**',
      },
    ],
  },
};

export default nextConfig;
