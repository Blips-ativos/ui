# Toolbar

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/toolbar`

Barra de ações de **um nó** do `Canvas` (`canvas.md`): o `NodeToolbar` do
React Flow com o visual da @blips/ui (`flex gap-1 rounded-sm border
bg-background p-1.5`), por padrão **embaixo** do nó e visível quando o nó está
selecionado. Não escala com o zoom: os botões continuam clicáveis com o grafo
afastado.

## Quando usar (e quando não)

- **Use** para ações do nó: editar, duplicar, executar só esta etapa, apagar,
  ver logs.
- **Não use** para ações do canvas inteiro: isso é `Panel` (`panel.md`).
- **Não use** como barra de ferramentas da página ou de um editor de texto:
  fora de um custom node não há nó para ancorar. Use `ButtonGroup` da
  @blips/ui.
- Ação única e óbvia (um botão "abrir"): ponha em `NodeAction` do `Node`
  (`node.md`), sempre visível, em vez de esconder numa toolbar.

## Peers exigidos

`@xyflow/react` (^12), com o CSS `@xyflow/react/dist/style.css` importado uma
vez pelo app (detalhes em `canvas.md`).

```bash
pnpm add @blips/ai @xyflow/react
```

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

Exports: `Toolbar` e o tipo `ToolbarProps` (= `ComponentProps` do
`NodeToolbar` do React Flow: props de `div` + as abaixo).

| Prop | Tipo | Padrão | Notas |
|---|---|---|---|
| `position` | `Position` | `Position.Bottom` | **Padrão da Blips** (o React Flow usa `Top`). `Position.Top`, `.Right`, `.Left`, `.Bottom` do `@xyflow/react`. |
| `isVisible` | `boolean` | — | Sem valor, aparece quando o nó (e só ele) está selecionado. `true` fixa visível. |
| `nodeId` | `string \| string[]` | o nó atual | Para ancorar em outro nó ou num grupo. |
| `offset` | `number` | `10` | Distância do nó, em px. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alinhamento ao longo do lado. |
| `className` | `string` | — | Mesclado com `cn` depois das classes da Blips. |
| `children` | `ReactNode` | — | Os botões. |

## Composição com a @blips/ui

- Botões: `Button` da @blips/ui `variant="ghost"`, `size="icon-sm"`, ícone
  Phosphor `*Icon`, `aria-label` pt-BR. Ação destrutiva com
  `variant="destructive"` e confirmação em `AlertDialog` da @blips/ui (na v3 o
  `AlertDialogAction` não fecha sozinho).
- Separador entre grupos: `Separator` da @blips/ui
  `orientation="vertical"` com `className="h-4"`.

## Exemplo v3

```tsx
"use client";

import {
  Node,
  NodeContent,
  NodeHeader,
  NodeTitle,
} from "@blips/ai/components/node";
import { Toolbar } from "@blips/ai/components/toolbar";
import { Button } from "@blips/ui/components/button";
import { Separator } from "@blips/ui/components/separator";
import { CopyIcon, PlayIcon, TrashIcon } from "@phosphor-icons/react";
import type {
  Node as FlowNode,
  NodeProps as FlowNodeProps,
} from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";

type EtapaNode = FlowNode<{ titulo: string; resumo: string }, "etapa">;

export function EtapaComAcoes({ id, data }: FlowNodeProps<EtapaNode>) {
  const { deleteElements } = useReactFlow();

  return (
    <>
      <Node handles={{ source: true, target: true }}>
        <NodeHeader>
          <NodeTitle>{data.titulo}</NodeTitle>
        </NodeHeader>
        <NodeContent>
          <p className="text-muted-foreground text-xs">{data.resumo}</p>
        </NodeContent>
      </Node>
      <Toolbar>
        <Button
          aria-label="Executar só esta etapa"
          size="icon-sm"
          variant="ghost"
        >
          <PlayIcon />
        </Button>
        <Button aria-label="Duplicar etapa" size="icon-sm" variant="ghost">
          <CopyIcon />
        </Button>
        <Separator className="h-4" orientation="vertical" />
        <Button
          aria-label="Apagar etapa"
          onClick={() => deleteElements({ nodes: [{ id }] })}
          size="icon-sm"
          variant="ghost"
        >
          <TrashIcon />
        </Button>
      </Toolbar>
    </>
  );
}

// Registro (fora de componente): <Canvas nodeTypes={nodeTypes} … />
export const nodeTypes = { etapa: EtapaComAcoes };
```

## Armadilhas

- **Só dentro de um custom node** (ou com `nodeId` explícito, dentro do
  `<ReactFlow>`). Solto na página, lança erro de store; dentro do canvas mas
  fora de um nó, sem `nodeId`, não aparece.
- **Invisível até selecionar.** Num canvas com `elementsSelectable={false}`
  (ou só de leitura) ninguém seleciona o nó: passe `isVisible` se a barra
  precisar aparecer.
- Com vários nós selecionados ao mesmo tempo, a toolbar some (padrão do React
  Flow): ações em lote vão num `Panel`.
- O padrão é `Position.Bottom`, diferente do React Flow. Para em cima:
  `position={Position.Top}` (importe `Position` do `@xyflow/react`).
- Fica no portal do viewport do React Flow, não dentro do `Card`: estilos do
  `Node` (ex.: `text-xs` herdado) não chegam nela.
