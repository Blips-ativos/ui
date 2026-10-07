"use client";

import {
  type AttachmentData,
  AttachmentPart,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@blips/ai/components/attachments";
import { useState } from "react";

const iniciais: AttachmentData[] = [
  {
    id: "1",
    type: "file",
    filename: "equipamento.jpg",
    mediaType: "image/jpeg",
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    type: "file",
    filename: "nota-fiscal.pdf",
    mediaType: "application/pdf",
    url: "#",
  },
  {
    id: "3",
    type: "file",
    filename: "audio-cliente.ogg",
    mediaType: "audio/ogg",
    url: "#",
  },
];

export default function AiAttachmentsDemo() {
  const [anexos, setAnexos] = useState(iniciais);

  return (
    <div className="flex w-full max-w-md justify-end">
      <Attachments variant="grid">
        {anexos.map((anexo) => (
          <AttachmentPart
            className="w-24"
            data={anexo}
            key={anexo.id}
            onRemove={() =>
              setAnexos((atual) => atual.filter((a) => a.id !== anexo.id))
            }
          >
            <AttachmentPreview />
            <AttachmentRemove />
          </AttachmentPart>
        ))}
      </Attachments>
    </div>
  );
}
