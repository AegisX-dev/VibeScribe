import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vibe-scribe.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'vibe-scribe-git-main-aegisx-devs.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
    ],
  },
  // Enable production optimizations
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
