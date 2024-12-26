import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'nwggcsvrdecagyjodybz.supabase.co',
      },
    ],
  },
};

export default nextConfig;
