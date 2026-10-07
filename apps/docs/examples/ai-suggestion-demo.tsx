"use client";

import { Suggestion, Suggestions } from "@blips/ai/components/suggestion";
import * as React from "react";

const suggestions = [
  "Qual o status do meu contrato?",
  "Como abro um chamado de garantia?",
  "Quero a segunda via do boleto",
  "Qual a diferença entre locação e venda?",
  "Como funciona o distrato?",
];

export default function AiSuggestionDemo() {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <div className="flex w-full max-w-lg min-w-0 flex-col gap-4">
      <Suggestions>
        {suggestions.map((suggestion) => (
          <Suggestion
            key={suggestion}
            onClick={setSelected}
            suggestion={suggestion}
          />
        ))}
      </Suggestions>
      <p className="text-muted-foreground text-xs">
        {selected ? `Enviado: “${selected}”` : "Clique em uma sugestão."}
      </p>
    </div>
  );
}
