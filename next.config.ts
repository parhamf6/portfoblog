import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'https://ingenious-blessing-e681962b65.media.strapiapp.com/*',
    //   },
    // ],
    remotePatterns: [new URL('https://ingenious-blessing-e681962b65.media.strapiapp.com/*')],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;

