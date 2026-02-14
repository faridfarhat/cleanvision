import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/cleanvision',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
