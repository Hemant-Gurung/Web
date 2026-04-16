import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui", "@repo/config", "@repo/api-client"],
};

export default nextConfig;
