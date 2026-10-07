import { defineConfig } from "tsup";

// Uma entrada por componente: o pacote não tem barrel (um barrel puxaria
// todos os peers opcionais). O build valida compilação e tipos; os exports
// apontam para o fonte .tsx, como na @blips/ui.
export default defineConfig({
  entry: ["src/components/*.tsx", "src/fx/*.tsx"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  external: [
    "react",
    "react-dom",
    /^@blips\/ui(\/.*)?$/,
    /^@base-ui\/.*/,
    "@phosphor-icons/react",
    "ai",
    /^streamdown(\/.*)?$/,
    /^@streamdown\/.*/,
    /^shiki(\/.*)?$/,
    /^motion(\/.*)?$/,
    "use-stick-to-bottom",
    /^tokenlens(\/.*)?$/,
    "nanoid",
    "border-beam",
    "thinking-orbs",
    /^@xyflow\/.*/,
    /^@rive-app\/.*/,
    /^media-chrome(\/.*)?$/,
    "react-jsx-parser",
    "ansi-to-react",
    "liquid-gooey",
    "metal-fx",
    "img-fx",
    /^three(\/.*)?$/,
  ],
});
