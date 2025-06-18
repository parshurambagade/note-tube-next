import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ['i.ytimg.com']
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
