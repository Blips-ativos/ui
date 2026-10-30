import path from "node:path";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

// Fundo "vidro líquido" da home (exemplo typegpu-liquid-glass do vgpu, MIT): as
// funções "use gpu" do TypeGPU precisam do transform Babel do unplugin-typegpu,
// aplicado só aos .ts dessa pasta (como no next.config do próprio vgpu).
const typegpuBabelLoader = {
  loader: "babel-loader",
  options: {
    babelrc: false,
    configFile: false,
    presets: ["@babel/preset-typescript"],
    plugins: ["unplugin-typegpu/babel"],
  },
};

const config = {
  reactStrictMode: true,
  transpilePackages: [
    "@blips/ui",
    // Cena do prisma da home (vgpu, MIT): os pacotes publicam ESM moderno.
    "vgpu",
    "@vgpu/core",
    "@vgpu/wgsl",
    "@vgpu/wgsl-std",
  ],
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
    // Shaders WGSL da cena do prisma (dev/build com Turbopack).
    rules: {
      "*.wgsl": { loaders: ["@vgpu/wgsl/loader-webpack"], as: "*.js" },
      // TypeGPU ("use gpu") do fundo vidro líquido.
      "**/components/landing/liquid-glass/*.ts": {
        loaders: [typegpuBabelLoader],
        as: "*.js",
      },
    },
  },
  // Shaders WGSL da cena do prisma (o site roda com --webpack): o loader da vgpu
  // resolve os imports entre .wgsl e devolve o módulo de shader.
  webpack: (webpackConfig: { module: { rules: unknown[] } }) => {
    webpackConfig.module.rules.push({
      test: /\.wgsl$/,
      loader: "@vgpu/wgsl/loader-webpack",
    });
    // TypeGPU ("use gpu") do fundo vidro líquido: o Babel roda antes do SWC do
    // Next (`enforce: "pre"`), só tirando os tipos e anotando as funções.
    webpackConfig.module.rules.push({
      test: /components[\\/]landing[\\/]liquid-glass[\\/].*\.ts$/,
      enforce: "pre",
      use: [typegpuBabelLoader],
    });
    return webpackConfig;
  },
} satisfies NextConfig;

export default withMDX(config);
