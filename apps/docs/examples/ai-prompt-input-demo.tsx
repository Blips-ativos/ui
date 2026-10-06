"use client";

import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionAddScreenshot,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
} from "@blips/ai/components/prompt-input";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentMedia,
  AttachmentTitle,
} from "@blips/ui/components/attachment";
import { FileIcon, GlobeIcon, XIcon } from "@phosphor-icons/react";
import type { ChatStatus } from "ai";
import { useRef, useState } from "react";

const models = [
  { label: "Salvador", value: "salvador" },
  { label: "Aurora", value: "aurora" },
  { label: "Nascimento", value: "nascimento" },
];

function Anexos() {
  const attachments = usePromptInputAttachments();

  if (attachments.files.length === 0) {
    return null;
  }

  return (
    <PromptInputHeader>
      {attachments.files.map((file) => (
        <Attachment key={file.id} size="xs">
          <AttachmentMedia>
            <FileIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.filename}</AttachmentTitle>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction
              aria-label={`Remover ${file.filename}`}
              onClick={() => attachments.remove(file.id)}
            >
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </PromptInputHeader>
  );
}

export default function AiPromptInputDemo() {
  const [status, setStatus] = useState<ChatStatus>("ready");
  const [model, setModel] = useState<string | null>("salvador");
  const [webSearch, setWebSearch] = useState(false);
  const timers = useRef<number[]>([]);

  const stop = () => {
    for (const id of timers.current) {
      window.clearTimeout(id);
    }
    timers.current = [];
    setStatus("ready");
  };

  // Simula o ciclo de uma resposta: enviado → transmitindo → pronto.
  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text.trim() && message.files.length === 0) {
      return;
    }
    setStatus("submitted");
    timers.current = [
      window.setTimeout(() => setStatus("streaming"), 800),
      window.setTimeout(() => setStatus("ready"), 3000),
    ];
  };

  return (
    <PromptInput className="max-w-xl" multiple onSubmit={handleSubmit}>
      <Anexos />
      <PromptInputBody>
        <PromptInputTextarea placeholder="Pergunte sobre contratos, equipamentos ou faturas..." />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger aria-label="Adicionar" />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments label="Adicionar fotos ou arquivos" />
              <PromptInputActionAddScreenshot label="Capturar a tela" />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
          <PromptInputButton
            aria-pressed={webSearch}
            onClick={() => setWebSearch((value) => !value)}
            tooltip={{ content: "Buscar na web", shortcut: "⌘K" }}
            variant={webSearch ? "secondary" : "ghost"}
          >
            <GlobeIcon />
            <span>Busca</span>
          </PromptInputButton>
          <PromptInputSelect
            items={models}
            onValueChange={(value) => setModel(value as string | null)}
            value={model}
          >
            <PromptInputSelectTrigger size="sm">
              <PromptInputSelectValue />
            </PromptInputSelectTrigger>
            <PromptInputSelectContent>
              {models.map((item) => (
                <PromptInputSelectItem key={item.value} value={item.value}>
                  {item.label}
                </PromptInputSelectItem>
              ))}
            </PromptInputSelectContent>
          </PromptInputSelect>
        </PromptInputTools>
        <PromptInputSubmit
          aria-label={
            status === "submitted" || status === "streaming"
              ? "Parar"
              : "Enviar"
          }
          onStop={stop}
          status={status}
        />
      </PromptInputFooter>
    </PromptInput>
  );
}
