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
import { DropdownMenuGroup } from "@blips/ui/components/dropdown-menu";

const consulta =
  "Explique a diferença entre cancelamento e distrato em um contrato de locação de equipamento.";

export default function AiOpenInChatDemo() {
  return (
    <OpenIn query={consulta}>
      <OpenInTrigger />
      <OpenInContent>
        {/* No Base UI, o rótulo do menu precisa estar dentro de um grupo. */}
        <DropdownMenuGroup>
          <OpenInLabel>Continuar a conversa em</OpenInLabel>
          <OpenInClaude />
          <OpenInChatGPT />
          <OpenInT3 />
          <OpenInScira />
        </DropdownMenuGroup>
        <OpenInSeparator />
        <OpenInv0 />
        <OpenInCursor />
      </OpenInContent>
    </OpenIn>
  );
}
