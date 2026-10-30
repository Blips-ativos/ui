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
import { XIcon } from "@phosphor-icons/react";

const images = [
  {
    name: "escritorio.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
  },
  {
    name: "mesa.jpg",
    meta: "JPG · 1,1 MB",
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
  },
  {
    name: "sala.jpg",
    meta: "JPG · 940 KB",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
  },
];

export default function AttachmentImageDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Attachment className="w-full">
        <AttachmentMedia variant="image">
          {/* biome-ignore lint/performance/noImgElement: demo com imagem externa, sem next/image */}
          <img src={images[0].src} alt="Escritório" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{images[0].name}</AttachmentTitle>
          <AttachmentDescription>{images[0].meta}</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label={`Remover ${images[0].name}`}>
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <AttachmentGroup>
        {images.map((image) => (
          <Attachment key={image.name} orientation="vertical">
            <AttachmentMedia variant="image">
              {/* biome-ignore lint/performance/noImgElement: demo com imagem externa, sem next/image */}
              <img src={image.src} alt={image.name} />
            </AttachmentMedia>
          </Attachment>
        ))}
        <Attachment state="uploading" orientation="vertical">
          <AttachmentMedia variant="image">
            {/* biome-ignore lint/performance/noImgElement: demo com imagem externa, sem next/image */}
            <img src={images[1].src} alt="Imagem sendo enviada" />
          </AttachmentMedia>
        </Attachment>
      </AttachmentGroup>
    </div>
  );
}
