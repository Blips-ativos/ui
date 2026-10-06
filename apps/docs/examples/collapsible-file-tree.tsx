import { Button } from "@blips/ui/components/button";
import { Card, CardContent, CardHeader } from "@blips/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { Tabs, TabsList, TabsTrigger } from "@blips/ui/components/tabs";
import { CaretRightIcon, FileIcon, FolderIcon } from "@phosphor-icons/react";

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] };

const fileTree: FileTreeItem[] = [
  {
    name: "components",
    items: [
      {
        name: "ui",
        items: [
          { name: "button.tsx" },
          { name: "card.tsx" },
          { name: "dialog.tsx" },
          { name: "input.tsx" },
        ],
      },
      { name: "login-form.tsx" },
      { name: "register-form.tsx" },
    ],
  },
  {
    name: "lib",
    items: [{ name: "utils.ts" }, { name: "api.ts" }],
  },
  {
    name: "hooks",
    items: [{ name: "use-media-query.ts" }, { name: "use-debounce.ts" }],
  },
  { name: "app.tsx" },
  { name: "layout.tsx" },
  { name: "package.json" },
  { name: "README.md" },
];

function renderItem(fileItem: FileTreeItem) {
  if ("items" in fileItem) {
    return (
      <Collapsible key={fileItem.name}>
        <CollapsibleTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="group w-full justify-start transition-none"
            />
          }
        >
          <CaretRightIcon className="transition-transform group-data-panel-open:rotate-90" />
          <FolderIcon />
          {fileItem.name}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 ml-5">
          <div className="flex flex-col gap-1">
            {fileItem.items.map((child) => renderItem(child))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      key={fileItem.name}
      variant="link"
      size="sm"
      className="w-full justify-start gap-2 text-foreground"
    >
      <FileIcon />
      <span>{fileItem.name}</span>
    </Button>
  );
}

export default function CollapsibleFileTree() {
  return (
    <Card className="mx-auto w-full max-w-[16rem] gap-2" size="sm">
      <CardHeader>
        <Tabs defaultValue="explorer">
          <TabsList className="w-full">
            <TabsTrigger value="explorer">Arquivos</TabsTrigger>
            <TabsTrigger value="outline">Estrutura</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {fileTree.map((item) => renderItem(item))}
        </div>
      </CardContent>
    </Card>
  );
}
