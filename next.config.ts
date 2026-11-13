import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/visualise", destination: "/", permanent: true }];
  },
};

export default nextConfig;
