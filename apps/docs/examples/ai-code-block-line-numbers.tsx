"use client";

import { CodeBlock } from "@blips/ai/components/code-block";

const code = `type Contrato = {
  id: string;
  cliente: string;
  status: "ativo" | "suspenso" | "encerrado";
};

export function estaAtivo(contrato: Contrato) {
  return contrato.status === "ativo";
}`;

export default function AiCodeBlockLineNumbers() {
  return (
    <CodeBlock
      className="max-w-xl"
      code={code}
      language="typescript"
      showLineNumbers
    />
  );
}
