import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH
    ? `${process.env.NEXT_PUBLIC_BASE_PATH}/${process.env.NEXT_PUBLIC_SITE}`
    : process.env.NEXT_PUBLIC_SITE
      ? `/${process.env.NEXT_PUBLIC_SITE}`
      : "",
  transpilePackages: ["@wevisdemo/ui"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
