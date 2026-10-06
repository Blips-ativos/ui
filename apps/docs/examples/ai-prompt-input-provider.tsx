"use client";

import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputController,
} from "@blips/ai/components/prompt-input";
import { Button } from "@blips/ui/components/button";
import { useState } from "react";

const sugestoes = [
  "Qual o status do meu contrato?",
  "Quando vence a próxima fatura?",
];

function Sugestoes() {
  const { textInput } = usePromptInputController();

  return (
    <div className="flex flex-wrap gap-2">
      {sugestoes.map((texto) => (
        <Button
          key={texto}
          onClick={() => textInput.setInput(texto)}
          size="sm"
          variant="outline"
        >
          {texto}
        </Button>
      ))}
      <Button onClick={textInput.clear} size="sm" variant="ghost">
        Limpar
      </Button>
    </div>
  );
}

export default function AiPromptInputProvider() {
  const [enviada, setEnviada] = useState<string | null>(null);

  return (
    <PromptInputProvider>
      <div className="flex w-full max-w-xl flex-col gap-3">
        <Sugestoes />
        <PromptInput onSubmit={(message) => setEnviada(message.text)}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Escreva sua pergunta..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
        {enviada ? (
          <p className="text-muted-foreground text-sm">Enviado: {enviada}</p>
        ) : null}
      </div>
    </PromptInputProvider>
  );
}
