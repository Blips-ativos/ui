"use client";

import { PromptInputSubmit } from "@blips/ai/components/prompt-input";
import { InputGroup, InputGroupAddon } from "@blips/ui/components/input-group";
import type { ChatStatus } from "ai";

const states: { status: ChatStatus; label: string }[] = [
  { label: "Pronto", status: "ready" },
  { label: "Enviado", status: "submitted" },
  { label: "Transmitindo", status: "streaming" },
  { label: "Erro", status: "error" },
];

export default function AiPromptInputStatus() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {states.map((item) => (
        <div className="flex flex-col items-center gap-2" key={item.status}>
          <InputGroup className="w-auto">
            <InputGroupAddon align="inline-end" className="p-1">
              <PromptInputSubmit aria-label={item.label} status={item.status} />
            </InputGroupAddon>
          </InputGroup>
          <span className="text-muted-foreground text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
