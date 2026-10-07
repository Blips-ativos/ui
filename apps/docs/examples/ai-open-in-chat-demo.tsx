"use client";

import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInCursor,
  OpenInLabel,
  OpenInScira,
  OpenInSeparator,
  OpenInT3,
  OpenInTrigger,
  OpenInv0,
} from "@blips/ai/components/open-in-chat";

const consulta =
  "Explique a diferença entre cancelamento e distrato em um contrato de locação de equipamento.";

export default function AiOpenInChatDemo() {
  return (
    <OpenIn query={consulta}>
      <OpenInTrigger />
      <OpenInContent>
        <OpenInLabel>Continuar a conversa em</OpenInLabel>
        <OpenInSeparator />
        <OpenInClaude />
        <OpenInChatGPT />
        <OpenInT3 />
        <OpenInScira />
        <OpenInSeparator />
        <OpenInv0 />
        <OpenInCursor />
      </OpenInContent>
    </OpenIn>
  );
}
