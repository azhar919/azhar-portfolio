import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Shared-element + page transitions via React <ViewTransition>
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
      },
    ],
  },
};

export default nextConfig;
