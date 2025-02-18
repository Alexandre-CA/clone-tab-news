import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: [/node_modules/, /\.next/], // Ignore folders
      };
    }
    return config;
  },

};

export default nextConfig;
