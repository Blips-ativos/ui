"use client";

import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInTrigger,
} from "@blips/ai/components/open-in-chat";
import { Button } from "@blips/ui/components/button";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";

export default function AiOpenInChatTrigger() {
  return (
    <OpenIn query="Resuma as regras de garantia de um equipamento locado.">
      <OpenInTrigger
        aria-label="Abrir em outro chat"
        render={<Button size="icon" variant="ghost" />}
      >
        <ArrowSquareOutIcon />
      </OpenInTrigger>
      <OpenInContent>
        <OpenInClaude>Perguntar ao Claude</OpenInClaude>
        <OpenInChatGPT>Perguntar ao ChatGPT</OpenInChatGPT>
      </OpenInContent>
    </OpenIn>
  );
}
