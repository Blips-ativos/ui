"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@blips/ui/components/attachment";
import {
  FileTextIcon,
  FileZipIcon,
  PresentationIcon,
  TableIcon,
  XIcon,
} from "@phosphor-icons/react";

const files = [
  { name: "relatorio-vendas.pdf", meta: "PDF · 2,4 MB", icon: FileTextIcon },
  { name: "clientes.csv", meta: "CSV · 18 KB", icon: TableIcon },
  { name: "assets.zip", meta: "ZIP · 4,2 MB", icon: FileZipIcon },
  {
    name: "revisao-trimestral.key",
    meta: "Keynote · 9 MB",
    icon: PresentationIcon,
  },
];

export default function AttachmentVerticalDemo() {
  return (
    <AttachmentGroup className="w-full max-w-md">
      {files.map((file) => (
        <Attachment key={file.name} orientation="vertical">
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
    </AttachmentGroup>
  );
}
