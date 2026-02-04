import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registryPath = path.join(__dirname, "../registry");
const outputPath = path.join(__dirname, "../public/r");

// Read registry.json
const registry = JSON.parse(
  fs.readFileSync(path.join(registryPath, "registry.json"), "utf-8")
);

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
