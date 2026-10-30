"use client";

import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelectorSeparator,
  ModelSelectorTrigger,
} from "@blips/ai/components/model-selector";
import { Button } from "@blips/ui/components/button";
import { CaretUpDownIcon } from "@phosphor-icons/react";
import { Fragment, useState } from "react";

const grupos = [
  {
    rotulo: "Anthropic",
    modelos: [
      { id: "claude-sonnet", nome: "Claude Sonnet", provedor: "anthropic" },
      { id: "claude-haiku", nome: "Claude Haiku", provedor: "anthropic" },
    ],
  },
  {
    rotulo: "OpenAI",
    modelos: [
      { id: "gpt-5", nome: "GPT-5", provedor: "openai" },
      { id: "gpt-5-mini", nome: "GPT-5 mini", provedor: "openai" },
    ],
  },
  {
    rotulo: "Google",
    modelos: [{ id: "gemini-pro", nome: "Gemini Pro", provedor: "google" }],
  },
];

const todos = grupos.flatMap((g) => g.modelos);

export default function AiModelSelectorDemo() {
  const [aberto, setAberto] = useState(false);
  const [selecionado, setSelecionado] = useState("claude-sonnet");
  const atual = todos.find((m) => m.id === selecionado);

  return (
    <ModelSelector onOpenChange={setAberto} open={aberto}>
      <ModelSelectorTrigger
        render={<Button className="w-56 justify-between" variant="outline" />}
      >
        {atual && <ModelSelectorLogo provider={atual.provedor} />}
        <ModelSelectorName>{atual?.nome}</ModelSelectorName>
        <CaretUpDownIcon className="size-4 text-muted-foreground" />
      </ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput />
        <ModelSelectorList>
          <ModelSelectorEmpty />
          {grupos.map((grupo, indice) => (
            <Fragment key={grupo.rotulo}>
              {indice > 0 && <ModelSelectorSeparator />}
              <ModelSelectorGroup heading={grupo.rotulo}>
                {grupo.modelos.map((modelo) => (
                  <ModelSelectorItem
                    data-checked={modelo.id === selecionado}
                    key={modelo.id}
                    onSelect={() => {
                      setSelecionado(modelo.id);
                      setAberto(false);
                    }}
                    value={modelo.nome}
                  >
                    <ModelSelectorLogo provider={modelo.provedor} />
                    <ModelSelectorName>{modelo.nome}</ModelSelectorName>
                  </ModelSelectorItem>
                ))}
              </ModelSelectorGroup>
            </Fragment>
          ))}
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  );
}
