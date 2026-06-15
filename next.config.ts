import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.BASE_PATH ?? "",
  transpilePackages: ["@wevisdemo/ui"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
