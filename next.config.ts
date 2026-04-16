import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: "/Users/eugenetochilin/Projects/red-square",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
