import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Shows cache HIT/MISS for every fetch in the terminal during `next dev`.
  logging: { fetches: { fullUrl: true } },
};

export default nextConfig;
