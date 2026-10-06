"use client";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLanguageSelector,
  CodeBlockLanguageSelectorContent,
  CodeBlockLanguageSelectorItem,
  CodeBlockLanguageSelectorTrigger,
  CodeBlockLanguageSelectorValue,
} from "@blips/ai/components/code-block";
import { useState } from "react";
import type { BundledLanguage } from "shiki";

const exemplos: Record<
  "python" | "typescript" | "bash",
  { label: string; code: string }
> = {
  bash: {
    code: `curl -X POST https://agente.exemplo.com/runs \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"message": "Qual o status do meu contrato?"}'`,
    label: "Bash",
  },
  python: {
    code: `import httpx

resposta = httpx.post(
    "https://agente.exemplo.com/runs",
    json={"message": "Qual o status do meu contrato?"},
)`,
    label: "Python",
  },
  typescript: {
    code: `const resposta = await fetch("https://agente.exemplo.com/runs", {
  method: "POST",
  body: JSON.stringify({ message: "Qual o status do meu contrato?" }),
});`,
    label: "TypeScript",
  },
};

type Linguagem = keyof typeof exemplos;

const items = Object.entries(exemplos).map(([value, { label }]) => ({
  label,
  value,
}));

export default function AiCodeBlockLanguageSelector() {
  const [linguagem, setLinguagem] = useState<Linguagem>("python");

  return (
    <CodeBlock
      className="max-w-xl"
      code={exemplos[linguagem].code}
      language={linguagem as BundledLanguage}
    >
      <CodeBlockHeader>
        <CodeBlockLanguageSelector
          items={items}
          onValueChange={(value) => {
            if (value) {
              setLinguagem(value as Linguagem);
            }
          }}
          value={linguagem}
        >
          <CodeBlockLanguageSelectorTrigger>
            <CodeBlockLanguageSelectorValue />
          </CodeBlockLanguageSelectorTrigger>
          <CodeBlockLanguageSelectorContent>
            {items.map((item) => (
              <CodeBlockLanguageSelectorItem
                key={item.value}
                value={item.value}
              >
                {item.label}
              </CodeBlockLanguageSelectorItem>
            ))}
          </CodeBlockLanguageSelectorContent>
        </CodeBlockLanguageSelector>
        <CodeBlockActions>
          <CodeBlockCopyButton aria-label="Copiar código" />
        </CodeBlockActions>
      </CodeBlockHeader>
    </CodeBlock>
  );
}
