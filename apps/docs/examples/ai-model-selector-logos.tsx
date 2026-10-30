"use client";

import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorShortcut,
  ModelSelectorTrigger,
} from "@blips/ai/components/model-selector";
import { Button } from "@blips/ui/components/button";

const roteadores = [
  {
    atalho: "⌘1",
    id: "litellm-padrao",
    nome: "Roteador padrão",
    provedores: ["anthropic", "openai"],
  },
  {
    atalho: "⌘2",
    id: "litellm-economico",
    nome: "Roteador econômico",
    provedores: ["google", "deepseek", "mistral"],
  },
  {
    atalho: "⌘3",
    id: "bedrock",
    nome: "Somente Bedrock",
    provedores: ["amazon-bedrock"],
  },
];

export default function AiModelSelectorLogos() {
  return (
    <ModelSelector>
      <ModelSelectorTrigger render={<Button variant="outline" />}>
        Escolher roteamento
      </ModelSelectorTrigger>
      <ModelSelectorContent title="Escolher roteamento">
        <ModelSelectorInput placeholder="Buscar roteamento…" />
        <ModelSelectorList>
          <ModelSelectorGroup heading="Roteamentos do proxy">
            {roteadores.map((r) => (
              <ModelSelectorItem key={r.id} value={r.nome}>
                <ModelSelectorLogoGroup>
                  {r.provedores.map((p) => (
                    <ModelSelectorLogo key={p} provider={p} />
                  ))}
                </ModelSelectorLogoGroup>
                <ModelSelectorName>{r.nome}</ModelSelectorName>
                <ModelSelectorShortcut>{r.atalho}</ModelSelectorShortcut>
              </ModelSelectorItem>
            ))}
          </ModelSelectorGroup>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  );
}
