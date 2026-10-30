"use client";

import {
  type AttachmentData,
  AttachmentEmpty,
  AttachmentHoverCard,
  AttachmentHoverCardContent,
  AttachmentHoverCardTrigger,
  AttachmentInfo,
  AttachmentPart,
  AttachmentPreview,
  Attachments,
} from "@blips/ai/components/attachments";

const foto: AttachmentData = {
  id: "1",
  type: "file",
  filename: "placa-do-equipamento.jpg",
  mediaType: "image/jpeg",
  url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=80",
};

export default function AiAttachmentsHover() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Attachments variant="inline">
        <AttachmentHoverCard openDelay={200}>
          <AttachmentHoverCardTrigger
            render={
              <AttachmentPart data={foto} tabIndex={0}>
                <AttachmentPreview />
                <AttachmentInfo />
              </AttachmentPart>
            }
          />
          <AttachmentHoverCardContent>
            {/* biome-ignore lint/performance/noImgElement: demo com imagem externa, sem next/image */}
            <img
              alt={foto.filename}
              className="max-h-64 rounded-md object-cover"
              height={256}
              src={foto.type === "file" ? foto.url : undefined}
              width={256}
            />
          </AttachmentHoverCardContent>
        </AttachmentHoverCard>
      </Attachments>
      <div className="rounded-lg border border-dashed">
        <AttachmentEmpty />
      </div>
    </div>
  );
}
