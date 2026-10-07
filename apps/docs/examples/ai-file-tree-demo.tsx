"use client";

import {
  FileTree,
  FileTreeFile,
  FileTreeFolder,
} from "@blips/ai/components/file-tree";
import { useState } from "react";

export default function AiFileTreeDemo() {
  const [selecionado, setSelecionado] = useState("src/agente.py");

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <FileTree
        defaultExpanded={new Set(["src", "src/tools"])}
        onSelect={setSelecionado}
        selectedPath={selecionado}
      >
        <FileTreeFolder name="src" path="src">
          <FileTreeFolder name="tools" path="src/tools">
            <FileTreeFile name="contratos.py" path="src/tools/contratos.py" />
            <FileTreeFile name="financeiro.py" path="src/tools/financeiro.py" />
          </FileTreeFolder>
          <FileTreeFile name="agente.py" path="src/agente.py" />
          <FileTreeFile name="config.py" path="src/config.py" />
        </FileTreeFolder>
        <FileTreeFolder name="tests" path="tests">
          <FileTreeFile name="test_agente.py" path="tests/test_agente.py" />
        </FileTreeFolder>
        <FileTreeFile name="pyproject.toml" path="pyproject.toml" />
        <FileTreeFile name="README.md" path="README.md" />
      </FileTree>
      <p className="text-muted-foreground text-xs">
        Selecionado: <code>{selecionado}</code>
      </p>
    </div>
  );
}
