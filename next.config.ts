import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "komikcast.li",
      },
      {
        protocol: "https",
        hostname: "*.komikcast.li",
      },
    ],
  },
};

export default nextConfig;
