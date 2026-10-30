"use client";

import {
  type AttachmentData,
  AttachmentInfo,
  AttachmentPart,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@blips/ai/components/attachments";

const anexos: AttachmentData[] = [
  {
    id: "1",
    type: "file",
    filename: "contrato-locacao.pdf",
    mediaType: "application/pdf",
    url: "#",
  },
  {
    id: "2",
    type: "file",
    mediaType: "image/png",
    url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    type: "source-document",
    sourceId: "kb-garantia",
    mediaType: "text/markdown",
    title: "Política de garantia",
  },
];

const remover = () => undefined;

export default function AiAttachmentsVariantes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="font-medium text-muted-foreground text-xs">
          inline
        </span>
        <Attachments variant="inline">
          {anexos.map((anexo) => (
            <AttachmentPart data={anexo} key={anexo.id} onRemove={remover}>
              <AttachmentPreview />
              <AttachmentInfo />
              <AttachmentRemove />
            </AttachmentPart>
          ))}
        </Attachments>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium text-muted-foreground text-xs">list</span>
        <Attachments variant="list">
          {anexos.map((anexo) => (
            <AttachmentPart data={anexo} key={anexo.id} onRemove={remover}>
              <AttachmentPreview />
              <AttachmentInfo showMediaType />
              <AttachmentRemove />
            </AttachmentPart>
          ))}
        </Attachments>
      </div>
    </div>
  );
}
