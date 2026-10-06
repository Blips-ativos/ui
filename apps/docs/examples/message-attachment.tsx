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
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import { Message, MessageContent } from "@blips/ui/components/message";
import { DownloadIcon, FileTextIcon } from "@phosphor-icons/react";

export default function MessageAttachmentDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Message align="end">
        <MessageContent>
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              {/* biome-ignore lint/performance/noImgElement: demo com imagem externa, sem next/image */}
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                alt="Escritório"
              />
            </AttachmentMedia>
          </Attachment>
          <Bubble>
            <BubbleContent>
              Segue a imagem. Consegue colocar como capa do PDF?
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              Pronto. Aqui está o PDF com a capa nova.
            </BubbleContent>
          </Bubble>
          <Attachment>
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>relatorio-vendas.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 2,4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                aria-label="Baixar relatorio-vendas.pdf"
                size="icon-sm"
                variant="secondary"
              >
                <DownloadIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </MessageContent>
      </Message>
    </div>
  );
}
