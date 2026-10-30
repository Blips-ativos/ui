"use client";

import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
  SnippetText,
} from "@blips/ai/components/snippet";
import { useState } from "react";

const comandos = [
  { gerenciador: "pnpm", code: "pnpm add @blips/ai shiki" },
  { gerenciador: "npm", code: "npm install @blips/ai shiki" },
  { gerenciador: "bun", code: "bun add @blips/ai shiki" },
];

export default function AiSnippetGerenciadores() {
  const [aviso, setAviso] = useState("");

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      {comandos.map(({ gerenciador, code }) => (
        <Snippet code={code} key={gerenciador}>
          <SnippetAddon>
            <SnippetText>{gerenciador}</SnippetText>
          </SnippetAddon>
          <SnippetInput
            aria-label={`Comando de instalação com ${gerenciador}`}
          />
          <SnippetAddon align="inline-end">
            <SnippetCopyButton
              onCopy={() => setAviso(`Comando do ${gerenciador} copiado.`)}
              onError={(error) =>
                setAviso(
                  error instanceof Error
                    ? error.message
                    : "Não foi possível copiar."
                )
              }
            />
          </SnippetAddon>
        </Snippet>
      ))}
      <p aria-live="polite" className="min-h-5 text-muted-foreground text-xs">
        {aviso}
      </p>
    </div>
  );
}
