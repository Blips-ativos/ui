import { cpSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

// Resolve a raiz do @blips/brand pelo package.json (exposto no exports map)
const require = createRequire(import.meta.url);
const brandRoot = dirname(require.resolve("@blips/brand/package.json"));
const src = join(brandRoot, "assets");
const dest = join(process.cwd(), "public", "brand");

// Idempotente: limpa o destino e copia tudo de assets/
rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });

console.log(`[brand] assets sincronizados → ${dest}`);
