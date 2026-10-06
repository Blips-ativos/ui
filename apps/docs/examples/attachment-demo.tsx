"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@blips/ui/components/attachment";
import {
  FileCodeIcon,
  FileTextIcon,
  TableIcon,
  XIcon,
} from "@phosphor-icons/react";

const files = [
  { name: "relatorio-vendas.pdf", meta: "PDF · 2,4 MB", icon: FileTextIcon },
  { name: "importacao-clientes.csv", meta: "CSV · 18 KB", icon: TableIcon },
  {
    name: "message-renderer.tsx",
    meta: "TypeScript · 12 KB",
    icon: FileCodeIcon,
  },
];

export default function AttachmentDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {files.map((file) => (
        <Attachment key={file.name} className="w-full">
          <AttachmentMedia>
            <file.icon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.name}</AttachmentTitle>
            <AttachmentDescription>{file.meta}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remover ${file.name}`}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </div>
  );
}
