"use client";

import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from "@blips/ai/components/chain-of-thought";
import {
  DatabaseIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";

export default function AiChainOfThoughtDemo() {
  return (
    <div className="w-full max-w-lg">
      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader>Raciocínio do agente</ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            icon={MagnifyingGlassIcon}
            label="Buscando o contrato do cliente"
            status="complete"
          >
            <ChainOfThoughtSearchResults>
              <ChainOfThoughtSearchResult>
                CT-2026-0412
              </ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>
                CT-2025-1187
              </ChainOfThoughtSearchResult>
            </ChainOfThoughtSearchResults>
          </ChainOfThoughtStep>
          <ChainOfThoughtStep
            description="14 de 36 parcelas pagas, nenhuma em atraso."
            icon={DatabaseIcon}
            label="Consultando o financeiro"
            status="complete"
          />
          <ChainOfThoughtStep
            icon={FileTextIcon}
            label="Lendo a política de antecipação"
            status="active"
          />
          <ChainOfThoughtStep label="Redigindo a resposta" status="pending" />
        </ChainOfThoughtContent>
      </ChainOfThought>
    </div>
  );
}
