"use client";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@blips/ai/components/code-block";
import { FileCodeIcon } from "@phosphor-icons/react";

const code = `from agno.team import Team

salvador = Team(
    name="salvador",
    members=[],
    instructions="Atenda o cliente com base no contrato vigente.",
)

resposta = salvador.run("Qual o status do meu contrato?")
print(resposta.content)`;

export default function AiCodeBlockDemo() {
  return (
    <CodeBlock className="max-w-xl" code={code} language="python">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileCodeIcon size={14} />
          <CodeBlockFilename>agente.py</CodeBlockFilename>
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton aria-label="Copiar código" />
        </CodeBlockActions>
      </CodeBlockHeader>
    </CodeBlock>
  );
}
