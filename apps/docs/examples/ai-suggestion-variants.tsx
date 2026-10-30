"use client";

import { Suggestion, Suggestions } from "@blips/ai/components/suggestion";
import { FileTextIcon, LifebuoyIcon, WalletIcon } from "@phosphor-icons/react";

export default function AiSuggestionVariants() {
  return (
    <div className="flex w-full max-w-lg min-w-0 flex-col gap-4">
      <Suggestions>
        <Suggestion suggestion="Resumir o contrato" variant="secondary" />
        <Suggestion suggestion="Explicar a fatura" variant="secondary" />
        <Suggestion suggestion="Falar com um atendente" variant="ghost" />
      </Suggestions>
      <Suggestions>
        <Suggestion suggestion="Contrato">
          <FileTextIcon data-icon="inline-start" />
          Contrato
        </Suggestion>
        <Suggestion suggestion="Financeiro">
          <WalletIcon data-icon="inline-start" />
          Financeiro
        </Suggestion>
        <Suggestion suggestion="Suporte">
          <LifebuoyIcon data-icon="inline-start" />
          Suporte
        </Suggestion>
      </Suggestions>
    </div>
  );
}
