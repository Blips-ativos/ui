import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.join(__dirname, "..");
const srcPath = path.join(packageRoot, "src");
const registryPath = path.join(packageRoot, "registry");
const outputPath = path.join(packageRoot, "public/r");
const registryJsonPath = path.join(registryPath, "registry.json");

// A cópia em registry/default/ é gerada a partir de src/ — nunca editar à mão.
// `node scripts/build-registry.js --sync` regenera a cópia, o registry/index.ts
// e as dependências de cada item do registry.json; sem a flag, o build só
// confere que está tudo em sincronia e falha se não estiver.
const SYNC = process.argv.includes("--sync");

// Pastas copiadas de src/ → registry/default/, com o tipo do item no registry.
const SOURCES = [
  { dir: "components", out: "default/ui", type: "registry:ui" },
  { dir: "hooks", out: "default/hooks", type: "registry:hook" },
];

// Pacotes que entram no registry com a versão do package.json da lib
// (mudança de major quebra a API — recharts 2 → 3, por exemplo).
const VERSIONED_DEPENDENCIES = new Set(["recharts"]);

const pkg = JSON.parse(
  fs.readFileSync(path.join(packageRoot, "package.json"), "utf-8")
);

// Imports relativos da lib (o tsup não tem alias) viram os aliases do shadcn,
// que é o que o projeto consumidor tem.
function toRegistrySource(source) {
  return source
    .replaceAll('from "../lib/utils"', 'from "@/lib/utils"')
    .replaceAll(/from "\.\.\/hooks\/([^"]+)"/g, 'from "@/hooks/$1"');
}

function itemName(file) {
  return path.basename(file).replace(/\.tsx?$/, "");
}

function listSources() {
  const files = [];
  for (const source of SOURCES) {
    const dir = path.join(srcPath, source.dir);
    for (const file of fs.readdirSync(dir).sort()) {
      if (!/\.tsx?$/.test(file)) continue;
      files.push({
        name: itemName(file),
        type: source.type,
        srcFile: path.join(dir, file),
        registryFile: `${source.out}/${file}`,
      });
    }
  }
  return files;
}

// dependencies / registryDependencies derivadas dos imports do componente.
function analyzeImports(source) {
  const dependencies = new Set();
  const registryDependencies = new Set();
  for (const [, specifier] of source.matchAll(/from "([^"]+)"/g)) {
    if (specifier.startsWith("./")) {
      registryDependencies.add(itemName(specifier));
    } else if (specifier.startsWith("../hooks/")) {
      registryDependencies.add(itemName(specifier));
    } else if (specifier.startsWith(".")) {
      // ../lib/utils — instalado pelo `shadcn init`, não é item do registry.
    } else {
      const parts = specifier.split("/");
      const name = specifier.startsWith("@")
        ? parts.slice(0, 2).join("/")
        : parts[0];
      if (name === "react" || name === "react-dom") continue;
      const version = pkg.dependencies?.[name];
      dependencies.add(
        VERSIONED_DEPENDENCIES.has(name) && version
          ? `${name}@${version}`
          : name
      );
    }
  }
  return {
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
  };
}

// registry/index.ts = barrel de src/index.ts apontando para a cópia.
function toRegistryIndex(source) {
  return source
    .replaceAll('from "./components/', 'from "./default/ui/')
    .replaceAll('from "./hooks/', 'from "./default/hooks/')
    .replace(/\n(\/\/[^\n]*\n)?export[^;]*from "\.\/lib\/utils";\n?/, "\n");
}

function sameArray(a = [], b = []) {
  return a.length === b.length && a.every((value, i) => value === b[i]);
}

function writeIfChanged(file, content) {
  if (fs.existsSync(file) && fs.readFileSync(file, "utf-8") === content) {
    return false;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  return true;
}

const registryRaw = fs.readFileSync(registryJsonPath, "utf-8");
const registry = JSON.parse(registryRaw);
const sources = listSources();
const problems = [];

for (const source of sources) {
  const content = fs.readFileSync(source.srcFile, "utf-8");
  const expected = toRegistrySource(content);
  const target = path.join(registryPath, source.registryFile);
  const { dependencies, registryDependencies } = analyzeImports(content);
  const item = registry.items.find((i) => i.name === source.name);

  if (!item) {
    problems.push(
      `${source.name}: sem item no registry.json (adicione name/description)`
    );
    continue;
  }

  if (SYNC) {
    if (writeIfChanged(target, expected)) {
      console.log(`Synced: ${source.registryFile}`);
    }
    item.type = source.type;
    item.dependencies = dependencies;
    if (registryDependencies.length > 0) {
      item.registryDependencies = registryDependencies;
    } else {
      delete item.registryDependencies;
    }
    item.files = [{ path: source.registryFile, type: source.type }];
    continue;
  }

  if (!fs.existsSync(target) || fs.readFileSync(target, "utf-8") !== expected) {
    problems.push(`${source.registryFile}: cópia diferente de src/`);
  }
  if (!sameArray(item.dependencies, dependencies)) {
    problems.push(
      `${source.name}: dependencies ${JSON.stringify(item.dependencies ?? [])} ≠ imports ${JSON.stringify(dependencies)}`
    );
  }
  if (!sameArray(item.registryDependencies, registryDependencies)) {
    problems.push(
      `${source.name}: registryDependencies ${JSON.stringify(item.registryDependencies ?? [])} ≠ imports ${JSON.stringify(registryDependencies)}`
    );
  }
}

// Arquivo na cópia sem correspondente em src/ (componente removido da lib).
const sourceFiles = new Set(sources.map((s) => s.registryFile));
for (const { out } of SOURCES) {
  const dir = path.join(registryPath, out);
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir)) {
    const registryFile = `${out}/${file}`;
    if (sourceFiles.has(registryFile)) continue;
    if (SYNC) {
      fs.rmSync(path.join(dir, file));
      console.log(`Removed: ${registryFile}`);
    } else {
      problems.push(`${registryFile}: sem arquivo correspondente em src/`);
    }
  }
}

const sourceNames = new Set(sources.map((s) => s.name));
for (const item of registry.items) {
  if (!sourceNames.has(item.name)) {
    problems.push(`${item.name}: item no registry.json sem arquivo em src/`);
  }
}

const indexFile = path.join(registryPath, "index.ts");
const expectedIndex = toRegistryIndex(
  fs.readFileSync(path.join(srcPath, "index.ts"), "utf-8")
);

if (SYNC) {
  registry.items.sort((a, b) => a.name.localeCompare(b.name));
  if (writeIfChanged(indexFile, expectedIndex)) {
    console.log("Synced: index.ts");
  }
  // Só reescreve se o conteúdo mudou — a formatação fica com o Biome.
  if (JSON.stringify(JSON.parse(registryRaw)) !== JSON.stringify(registry)) {
    fs.writeFileSync(
      registryJsonPath,
      `${JSON.stringify(registry, null, 2)}\n`
    );
    console.log("Synced: registry.json (rode `pnpm check:fix` para formatar)");
  }
} else if (
  !fs.existsSync(indexFile) ||
  fs.readFileSync(indexFile, "utf-8") !== expectedIndex
) {
  problems.push("index.ts: diferente do barrel de src/index.ts");
}

if (problems.length > 0) {
  console.error("Registry fora de sincronia com src/:");
  for (const problem of problems) console.error(`  - ${problem}`);
  if (!SYNC) {
    console.error("\nRode `node scripts/build-registry.js --sync` e revise.");
  }
  process.exit(1);
}

if (SYNC) {
  console.log("\nRegistry sincronizado com src/.");
  process.exit(0);
}

// Ensure output directory exists
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// Build individual component JSON files
for (const item of registry.items) {
  const componentJson = {
    name: item.name,
    type: item.type,
    description: item.description,
    dependencies: item.dependencies || [],
    devDependencies: item.devDependencies || [],
    registryDependencies: item.registryDependencies || [],
    files: [],
  };

  // Read file contents
  for (const file of item.files) {
    const filePath = path.join(registryPath, file.path);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      componentJson.files.push({
        path: path.basename(file.path),
        content,
        type: file.type,
      });
    }
  }

  // Write component JSON
  const outputFile = path.join(outputPath, `${item.name}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(componentJson, null, 2));
  console.log(`Built: ${item.name}.json`);
}

// Write index.json with all components
const indexJson = {
  name: registry.name,
  homepage: registry.homepage,
  components: registry.items.map((item) => ({
    name: item.name,
    type: item.type,
    description: item.description,
  })),
};

fs.writeFileSync(
  path.join(outputPath, "index.json"),
  JSON.stringify(indexJson, null, 2)
);
console.log("Built: index.json");

console.log("\nRegistry build complete!");
