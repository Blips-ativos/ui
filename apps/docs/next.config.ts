import path from "node:path";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@blips/ui"],
  // Monorepo: pin Turbopack's root to the workspace root so page modules
  // resolve correctly (Next 16 + Turbopack mis-infers it otherwise).
  turbopack: {
    root: path.resolve(import.meta.dirname, "../.."),
  },
};

export default withMDX(config);
