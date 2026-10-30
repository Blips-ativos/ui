# Sandbox

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/sandbox`

Cartão recolhível (aberto por padrão) de uma execução de código pelo agente:
cabeçalho com ícone de código, título e o mesmo badge de status do `Tool`
(estados do AI SDK, rótulos pt-BR), e abaixo abas sublinhadas (`Tabs` da
@blips/ui) para código, saída, arquivos etc. Adaptado do `sandbox` do AI
Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para uma tool de execução de código (code interpreter, sandbox
  Python/Node, script SQL) em que o usuário quer ver o código **e** o
  resultado, alternando por abas.
- **Não use** para uma tool call qualquer (consulta, API): isso é o `Tool`
  (`tool.md`), com parâmetros e resultado em JSON.
- **Não use** só para a saída de um comando: isso é o `Terminal`
  (`terminal.md`), que pode ir dentro de uma aba do `Sandbox`.
- **Não use** para prévia de página gerada: isso é o `WebPreview`
  (`web-preview.md`), também encaixável numa aba.

## Import

```tsx
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
```

## Peers exigidos

- `shiki`: o `SandboxHeader` reaproveita o `getStatusBadge` do `tool.tsx`,
  que importa o `CodeBlock`, que importa o Shiki estaticamente. Mesmo sem
  usar `CodeBlock` no conteúdo, o build quebra sem ele.
- `ai`: peer opcional e só de tipos (`state: ToolUIPart["state"]`). Como a
  @blips/ai publica o fonte `.tsx`, num projeto TypeScript instale como
  **devDependency**; no seu código, sempre `import type`.

```bash
pnpm add @blips/ai shiki
pnpm add -D ai
```

## API

| Componente | Props reais | Notas |
|---|---|---|
| `Sandbox` | props do `Collapsible` da @blips/ui (`open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `className` string ou função de estado) | **`defaultOpen` já é `true`** (passe `defaultOpen={false}` para começar fechado). Moldura `not-prose group mb-4 rounded-md border overflow-hidden`. |
| `SandboxHeader` | `state: ToolUIPart["state"]` (obrigatório), `title?: string`, `className?: string` | `CollapsibleTrigger` com `CodeIcon`, título, `getStatusBadge(state)` e caret que gira aberto. **Não aceita outras props nem `children`**, nem rótulos de status próprios (usa os padrão do `Tool`). |
| `SandboxContent` | props do `CollapsibleContent` | Painel com animação de entrada/saída. |
| `SandboxTabs` | props do `Tabs` da @blips/ui (`value`, `defaultValue`, `onValueChange`, …, semântica Base UI), com `className` **só string** | `w-full gap-0`. |
| `SandboxTabsBar` | `ComponentProps<"div">` | Faixa com borda em cima e embaixo; ponha a `SandboxTabsList` e, se quiser, ações à direita. |
| `SandboxTabsList` | props do `TabsList`, `className` só string | Lista sem fundo nem padding. |
| `SandboxTabsTrigger` | props do `TabsTrigger` (`value` obrigatório), `className` só string | Aba sublinhada: `data-active:border-primary`. |
| `SandboxTabContent` | props do `TabsContent` (`value`), `className` só string | `mt-0 text-sm`, sem padding: o conteúdo traz o próprio. |

Nas quatro partes de abas o tipo troca o `className` do Base UI (string ou
função de estado) por `string`: os wrappers de `Tabs` da @blips/ui mesclam com
`cn`, que descartaria uma função. Para estilo por estado, use as variantes
`data-active:`/`data-disabled:` na string. O `Sandbox` (raiz) continua aceitando
função de estado.

Tipos exportados: `SandboxRootProps` (atenção ao nome), `SandboxHeaderProps`,
`SandboxContentProps`, `SandboxTabsProps`, `SandboxTabsBarProps`,
`SandboxTabsListProps`, `SandboxTabsTriggerProps`, `SandboxTabContentProps`.

Estados e rótulos do badge (vêm do `Tool`): `input-streaming` Pendente ·
`input-available` Executando · `approval-requested` Aguardando aprovação ·
`approval-responded` Respondida · `output-available` Concluída ·
`output-denied` Negada · `output-error` Erro.

## Composição com a @blips/ui

- Aba de código: `CodeBlock` (`code-block.md`) com
  `className="rounded-none border-0"` e o `CodeBlockCopyButton` em
  `CodeBlockActions` posicionado no canto.
- Aba de saída: `Terminal` (`terminal.md`) com `className="rounded-none
  border-0"`, ou um `<pre>` simples para texto curto.
- Aba de tabela de resultado (SQL, pandas): `Table` da @blips/ui dentro de um
  `ScrollArea`.
- No chat, vai no `MessageContent` do `Message` da @blips/ui, sem `Bubble`,
  um `Sandbox` por part de tool de execução (no lugar do `Tool`).

## Exemplo v3 que compila

```tsx
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
import { Terminal } from "@blips/ai/components/terminal";
import type { ToolUIPart } from "ai";

type Execucao = {
  arquivo: string;
  codigo: string;
  saida: string;
  state: ToolUIPart["state"];
};

export function ExecucaoDeCodigo({ execucao }: { execucao: Execucao }) {
  const rodando = execucao.state === "input-available";

  return (
    <Sandbox>
      <SandboxHeader state={execucao.state} title={execucao.arquivo} />
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
              code={execucao.codigo}
              language="python"
            >
              <CodeBlockActions className="absolute top-2 right-2">
                <CodeBlockCopyButton aria-label="Copiar código" />
              </CodeBlockActions>
            </CodeBlock>
          </SandboxTabContent>
          <SandboxTabContent value="saida">
            <Terminal
              className="rounded-none border-0"
              isStreaming={rodando}
              output={execucao.saida}
            />
          </SandboxTabContent>
        </SandboxTabs>
      </SandboxContent>
    </Sandbox>
  );
}
```

(O `Terminal` exige o peer `ansi-to-react`: `terminal.md`.)

## Armadilhas

- **Esquecer o `shiki`** quebra o build mesmo sem `CodeBlock` na tela: o
  status do cabeçalho vem do módulo do `Tool`.
- **Começa aberto.** Diferente do `Tool`, o `Sandbox` tem `defaultOpen`
  `true`; numa lista longa de execuções, feche os concluídos
  (`defaultOpen={execucao.state !== "output-available"}`).
- **`SandboxHeader` fechado para extensão.** Sem `children` nem
  `statusLabels`: para rótulos diferentes ou ações no cabeçalho, monte um
  `CollapsibleTrigger` próprio com `getStatusBadge(state, labels)` de
  `@blips/ai/components/tool` em vez de forçar props no header.
- **Ações dentro do header viram parte do botão.** O header é o trigger
  (`<button>`); um botão aninhado ali é HTML inválido. Ponha ações na
  `SandboxTabsBar` (à direita da lista).
- **`value` igual no trigger e no conteúdo.** Uma aba cujo `value` não casa
  com nenhum `SandboxTabContent` fica vazia. Passe sempre `defaultValue` (ou
  `value`) no `SandboxTabs` com o `value` da aba inicial, como no exemplo.
- **Seletores da v3.** Para customizar, use `data-active:` (aba) e
  `group-data-open:` (cartão); `data-[state=active]` e `data-[state=open]`
  são da v2 e não casam.
