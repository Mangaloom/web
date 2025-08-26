import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // all domain allowed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
