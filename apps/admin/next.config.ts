import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@healthy/ui", "@healthy/types", "@healthy/utils"],
};

export default nextConfig;
