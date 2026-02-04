import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "next-themes",
    /^@radix-ui\/.*/,
    "cmdk",
    "sonner",
    "vaul",
    "embla-carousel-react",
    "react-day-picker",
    "react-resizable-panels",
    "input-otp",
    "lucide-react",
  ],
  treeshake: true,
  minify: false,
});
