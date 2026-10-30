"use client";

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@blips/ui/components/attachment";
import { FileTextIcon } from "@phosphor-icons/react";

export default function AttachmentSizesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Attachment size="default" className="w-full">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Anexo default</AttachmentTitle>
          <AttachmentDescription>PDF · 2,4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment size="sm" className="w-full">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Anexo sm</AttachmentTitle>
          <AttachmentDescription>PDF · 2,4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment size="xs" className="w-full">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Anexo xs</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
    </div>
  );
}
