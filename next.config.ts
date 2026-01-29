import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Improve file watching for WSL2 and CSS hot reload
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second (helps with WSL2)
        aggregateTimeout: 300, // Delay before rebuilding
      };
    }
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
