import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@blips/ui"],
  experimental: {
    optimizePackageImports: ["@blips/ui"],
  },
};

export default withMDX(config);
