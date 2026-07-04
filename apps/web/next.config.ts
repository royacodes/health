import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

const nextConfig: NextConfig = {
  transpilePackages: ["@healthy/ui", "@healthy/types", "@healthy/utils", "@healthy/config"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${API_URL}/api/auth/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
