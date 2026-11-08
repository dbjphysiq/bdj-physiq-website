import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Retired service pages and the flagship's old service URL. Keep these so
  // links already shared or indexed by search engines still land somewhere useful.
  async redirects() {
    return [
      { source: "/services/calibrated-surrogate-models", destination: "/calibrated-surrogates", permanent: true },
      { source: "/services/governed-operations-copilots", destination: "/services", permanent: true },
      { source: "/services/physiq-accelerators", destination: "/services", permanent: true },
      { source: "/services/ai-solutions-software", destination: "/services", permanent: true },
    ];
  },
  // Shows cache HIT/MISS for every fetch in the terminal during `next dev`.
  logging: { fetches: { fullUrl: true } },
};

export default nextConfig;
