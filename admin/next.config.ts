import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'dttkhejbslmvxevoahyw.supabase.co',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
