# Node

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/node`

Nó de fluxo para o `Canvas` (`canvas.md`): o `Card` da @blips/ui com `Handle`s
do React Flow (entrada à esquerda, saída à direita), cabeçalho e rodapé em
`bg-secondary` separados por borda. É o visual de um nó; quem o registra no
canvas é você, como **custom node** em `nodeTypes`.

## Quando usar (e quando não)

- **Use** como corpo de cada custom node de um `Canvas`: etapa de workflow,
  subagente, tool, decisão.
- **Não use** fora de um `<ReactFlow>`/`Canvas`: o `Handle` do React Flow exige
  o contexto de um nó e quebra (erro de store/provider). Para um cartão comum,
  use `Card` da @blips/ui (`../card.md`).
- **Não use** para nós de entrada/saída de grafo minúsculos (um ponto, um
  ícone): o `Node` tem largura fixa `w-sm` (24rem). Para isso, um custom node
  próprio com `Handle` direto do React Flow.

## Peers exigidos

`@xyflow/react` (^12), com o CSS `@xyflow/react/dist/style.css` importado uma
vez pelo app (a @blips/ai não importa a folha; detalhes em `canvas.md`).

```bash
pnpm add @blips/ai @xyflow/react
```

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

| Export | Base | Props próprias | Notas |
|---|---|---|---|
| `Node` | `Card` da @blips/ui | `handles: { target: boolean; source: boolean }` (obrigatória), `size?: "default" \| "sm"` (do `Card`) | `relative w-sm h-auto gap-0 rounded-md p-0`. `target` põe um `Handle` em `Position.Left`; `source`, em `Position.Right`. Os handles vêm **antes** dos `children`. |
| `NodeHeader` | `CardHeader` | — | `border-b bg-secondary p-3! gap-0.5 rounded-t-md`. Aceita `NodeAction` (vira grid de 2 colunas, como no `Card`). |
| `NodeTitle` | `CardTitle` | — | Repasse direto. |
| `NodeDescription` | `CardDescription` | — | Repasse direto. |
| `NodeAction` | `CardAction` | — | Canto direito do header (ex.: `Button` `icon-xs` ou `Badge`). |
| `NodeContent` | `CardContent` | — | `p-3`. |
| `NodeFooter` | `CardFooter` | — | `border-t bg-secondary p-3! rounded-b-md`. |

Todos aceitam as props de `div` (`ComponentProps<"div">`) e o tipo de cada um é
exportado (`NodeProps`, `NodeHeaderProps`…).

## Composição com a @blips/ui

- Dentro do nó, componentes normais da @blips/ui: `Badge` para status
  ("concluído", "falhou"), `Button` em `NodeAction`/`NodeFooter`, `Spinner`
  enquanto a etapa roda, `Shimmer` (`shimmer.md`) para o título em andamento.
- Ações que aparecem ao selecionar o nó: `Toolbar` (`toolbar.md`) dentro do
  custom node.
- O contorno vem do `ring-1 ring-foreground/10` do `Card` base-mira (não há
  `border`). Para destacar o nó selecionado, use o `selected` que o React Flow
  passa ao custom node: `className={cn(selected && "ring-primary")}`.

## Exemplo v3

```tsx
"use client";

import {
  Node,
  NodeAction,
  NodeContent,
  NodeDescription,
  NodeFooter,
  NodeHeader,
  NodeTitle,
} from "@blips/ai/components/node";
import { Badge } from "@blips/ui/components/badge";
import { cn } from "@blips/ui/lib/utils";
import type {
  Node as FlowNode,
  NodeProps as FlowNodeProps,
} from "@xyflow/react";

type ToolData = {
  nome: string;
  descricao: string;
  status: "ok" | "erro";
  duracaoMs: number;
};

type ToolNode = FlowNode<ToolData, "tool">;

export function NoDeTool({ data, selected }: FlowNodeProps<ToolNode>) {
  return (
    <Node
      className={cn(selected && "ring-primary")}
      handles={{ source: true, target: true }}
    >
      <NodeHeader>
        <NodeTitle className="font-mono">{data.nome}</NodeTitle>
        <NodeDescription>{data.descricao}</NodeDescription>
        <NodeAction>
          <Badge variant={data.status === "ok" ? "secondary" : "destructive"}>
            {data.status === "ok" ? "concluída" : "falhou"}
          </Badge>
        </NodeAction>
      </NodeHeader>
      <NodeContent>
        <p className="text-muted-foreground text-xs">
          Busca os títulos em aberto do cliente no BigQuery.
        </p>
      </NodeContent>
      <NodeFooter>
        <span className="text-muted-foreground text-xs">
          {data.duracaoMs} ms
        </span>
      </NodeFooter>
    </Node>
  );
}

// Registro (fora de componente): <Canvas nodeTypes={nodeTypes} … />
export const nodeTypes = { tool: NoDeTool };
```

## Armadilhas

- **`handles` é obrigatória** (`{ target, source }`), mesmo que os dois sejam
  `false`. Não há handles em cima/embaixo: o `Edge.Animated` (`edge.md`) só
  sabe ligar `Right` → `Left`.
- **Não há `id` nos handles.** Para um nó com várias saídas (ex.: "sim"/"não"),
  ponha `Handle`s do `@xyflow/react` à mão com `id` e passe
  `handles={{ source: false, target: true }}` ao `Node`.
- **Nome `Node` colide com o tipo `Node` do `@xyflow/react`** (e `NodeProps`
  idem): importe os do React Flow com alias.
- **Largura fixa `w-sm`.** Troque por `className="w-64"` (o `cn` resolve o
  conflito), não por `style`.
- `p-3!` no header e no rodapé usa `!important` para vencer o `--card-spacing`
  do `Card`: um `p-*` comum no `className` não muda o espaçamento; use
  `p-2!`.
- Fora do React Flow, o `Handle` lança erro. Para prévia estática (Storybook,
  docs), envolva em `<ReactFlowProvider>` ou renderize dentro de um `Canvas`.
- Precisa do CSS do React Flow: sem ele os handles aparecem soltos no canto.
