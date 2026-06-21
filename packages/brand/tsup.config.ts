import { readFileSync, writeFileSync } from "node:fs";

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/logo-loader.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  minify: false,
  // O esbuild descarta a diretiva "use client" da entry do loader; reinserimos
  // no bundle ESM (o que o Next/RSC consome via a condição `import`). O .cjs não
  // precisa — consumidores CJS não são RSC.
  onSuccess: async () => {
    const file = "dist/logo-loader.js";
    const code = readFileSync(file, "utf8");
    if (!code.startsWith('"use client"')) {
      writeFileSync(file, `"use client";\n${code}`);
    }
  },
});
