"use client";

import {
  FileTree,
  FileTreeActions,
  FileTreeFile,
  FileTreeFolder,
  FileTreeIcon,
  FileTreeName,
} from "@blips/ai/components/file-tree";
import { Button } from "@blips/ui/components/button";
import {
  DotsThreeIcon,
  FileCodeIcon,
  FileTextIcon,
  GearIcon,
} from "@phosphor-icons/react";

export default function AiFileTreeActions() {
  return (
    <FileTree className="w-full max-w-sm" defaultExpanded={new Set(["src"])}>
      <FileTreeFolder name="src" path="src">
        <FileTreeFile
          icon={<FileCodeIcon className="size-4 text-muted-foreground" />}
          name="agente.py"
          path="src/agente.py"
        />
        <FileTreeFile name="config.py" path="src/config.py">
          <span className="size-4 shrink-0" />
          <FileTreeIcon>
            <GearIcon className="size-4 text-muted-foreground" />
          </FileTreeIcon>
          <FileTreeName>config.py</FileTreeName>
          <FileTreeActions>
            <Button aria-label="Mais ações" size="icon-sm" variant="ghost">
              <DotsThreeIcon />
            </Button>
          </FileTreeActions>
        </FileTreeFile>
      </FileTreeFolder>
      <FileTreeFile
        icon={<FileTextIcon className="size-4 text-muted-foreground" />}
        name="README.md"
        path="README.md"
      />
    </FileTree>
  );
}
