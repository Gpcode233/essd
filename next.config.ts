import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.resolve(__dirname),
  async redirects() {
    return [
      {
        source: "/fixtures",
        destination: "/championship",
        permanent: true,
      },
      {
        source: "/schools",
        destination: "/championship",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
