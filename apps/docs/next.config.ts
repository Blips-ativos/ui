import path from "node:path";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@blips/ui"],
  // SSG total: exporta HTML estático para o Firebase Hosting. Não há rotas de
  // API nem nada dinâmico, então todas as rotas são pré-renderizadas em `out/`.
  output: "export",
  // `next/image` (logos + componente Image do MDX) não otimiza em build
  // estático — serve as imagens como estão.
  images: { unoptimized: true },
  // Cada rota vira `out/<rota>/index.html`, servido nativamente pelo Hosting.
  trailingSlash: true,
  // Monorepo: pin Turbopack's root to the workspace root so page modules
  // resolve correctly (Next 16 + Turbopack mis-infers it otherwise).
  turbopack: {
    root: path.resolve(import.meta.dirname, "../.."),
  },
};

export default withMDX(config);
