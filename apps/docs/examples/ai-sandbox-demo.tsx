"use client";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
} from "@blips/ai/components/code-block";
import {
  Sandbox,
  SandboxContent,
  SandboxHeader,
  SandboxTabContent,
  SandboxTabs,
  SandboxTabsBar,
  SandboxTabsList,
  SandboxTabsTrigger,
} from "@blips/ai/components/sandbox";

const codigo = `def parcelas_em_atraso(parcelas: list[dict]) -> int:
    return sum(1 for p in parcelas if p["status"] == "atrasada")


print(parcelas_em_atraso(carregar_parcelas("CT-2026-0412")))`;

export default function AiSandboxDemo() {
  return (
    <div className="w-full max-w-xl">
      <Sandbox>
        <SandboxHeader state="output-available" title="analise_parcelas.py" />
        <SandboxContent>
          <SandboxTabs defaultValue="codigo">
            <SandboxTabsBar>
              <SandboxTabsList>
                <SandboxTabsTrigger value="codigo">Código</SandboxTabsTrigger>
                <SandboxTabsTrigger value="saida">Saída</SandboxTabsTrigger>
              </SandboxTabsList>
            </SandboxTabsBar>
            <SandboxTabContent value="codigo">
              <CodeBlock
                className="rounded-none border-0"
                code={codigo}
                language="python"
              >
                <CodeBlockActions className="absolute top-2 right-2">
                  <CodeBlockCopyButton aria-label="Copiar código" />
                </CodeBlockActions>
              </CodeBlock>
            </SandboxTabContent>
            <SandboxTabContent value="saida">
              <pre className="p-4 font-mono text-muted-foreground text-xs">
                0{"\n"}Nenhuma parcela em atraso no contrato CT-2026-0412.
              </pre>
            </SandboxTabContent>
          </SandboxTabs>
        </SandboxContent>
      </Sandbox>
    </div>
  );
}
