import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.amazonaws.com", // Notion file uploads
      },
      {
        protocol: "https",
        hostname: "**.notion.so", // Notion avatars / workspace icons
      },
    ],
  },
};

export default nextConfig;
