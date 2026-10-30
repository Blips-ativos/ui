# Connection

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/connection`

Linha de conexão **em andamento** do React Flow: a curva que segue o cursor
enquanto o usuário arrasta de um handle até outro nó, no `Canvas`
(`canvas.md`). Bezier horizontal fina em `var(--color-ring)` com um círculo na
ponta preenchido com `var(--color-background)` (funciona no tema escuro).

## Quando usar (e quando não)

- **Use** em canvas **editáveis** (o usuário liga nós), passando em
  `connectionLineComponent`.
- **Não use** num canvas só de leitura (sem `onConnect`): a linha nunca
  aparece; não há ganho em registrá-la.
- **Não use** para a aresta já criada: isso é `Edge` (`edge.md`).

## Peers exigidos

`@xyflow/react` (^12), com o CSS `@xyflow/react/dist/style.css` importado uma
vez pelo app (detalhes em `canvas.md`). O módulo só importa **tipos** do React
Flow, mas o `Canvas` que o usa precisa do pacote.

```bash
pnpm add @blips/ai @xyflow/react
```

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

Export único: `Connection`, tipado como `ConnectionLineComponent` do React
Flow. Não tem props suas: o React Flow passa as `ConnectionLineComponentProps`,
e o componente usa só `fromX`, `fromY`, `toX`, `toY`.

| Aspecto | Valor |
|---|---|
| Caminho | `M from C (meio, fromY) (meio, toY) to`: curva que sai e chega na horizontal, com controle no meio do eixo X |
| Traço | `stroke="var(--color-ring)"`, `strokeWidth={1}`, `fill="none"`, classe `animated` |
| Ponta | `<circle r={3}>` em `(toX, toY)`, `fill="var(--color-background)"`, mesmo traço |

Não muda de cor quando a conexão é inválida (ignora `connectionStatus`). Para
isso, escreva o seu `ConnectionLineComponent` lendo `connectionStatus`.

## Composição com a @blips/ui

- Cores pelos tokens `--color-ring` e `--color-background` da @blips/ui.
- Pareie com `Edge.Animated`/`Edge.Temporary` (`edge.md`): a linha de arraste
  tem o mesmo desenho horizontal das arestas finais.

## Exemplo v3

```tsx
"use client";

import "@xyflow/react/dist/style.css";

import { Canvas } from "@blips/ai/components/canvas";
import { Connection } from "@blips/ai/components/connection";
import { Node, NodeHeader, NodeTitle } from "@blips/ai/components/node";
import type {
  Connection as FlowConnection,
  Edge as FlowEdge,
  Node as FlowNode,
  NodeProps as FlowNodeProps,
} from "@xyflow/react";
import { addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import { useCallback } from "react";

type BlocoNode = FlowNode<{ titulo: string }, "bloco">;

function Bloco({ data }: FlowNodeProps<BlocoNode>) {
  return (
    <Node className="w-48" handles={{ source: true, target: true }}>
      <NodeHeader>
        <NodeTitle>{data.titulo}</NodeTitle>
      </NodeHeader>
    </Node>
  );
}

const nodeTypes = { bloco: Bloco };

const iniciais: BlocoNode[] = [
  {
    id: "gatilho",
    type: "bloco",
    position: { x: 0, y: 0 },
    data: { titulo: "Gatilho" },
  },
  {
    id: "resumo",
    type: "bloco",
    position: { x: 300, y: 0 },
    data: { titulo: "Resumir chamado" },
  },
];

export function EditorDeFluxo() {
  // O Canvas não é genérico: o estado usa o Node base do React Flow.
  const [nodes, , onNodesChange] = useNodesState<FlowNode>(iniciais);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>([]);

  const onConnect = useCallback(
    (conexao: FlowConnection) => setEdges((atuais) => addEdge(conexao, atuais)),
    [setEdges]
  );

  return (
    <div className="h-80 w-full rounded-lg border">
      <Canvas
        connectionLineComponent={Connection}
        edges={edges}
        nodeTypes={nodeTypes}
        nodes={nodes}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
      />
    </div>
  );
}
```

## Armadilhas

- **Passe a referência, não JSX:** `connectionLineComponent={Connection}`, e
  não `{<Connection />}`.
- Nome `Connection` colide com o tipo `Connection` do `@xyflow/react` (o do
  `onConnect`): importe o tipo com alias (`Connection as FlowConnection`).
- A curva é sempre horizontal (sai e chega de lado), mesmo arrastando de um
  handle em cima/embaixo: combina com o `Node` da @blips/ai (handles
  laterais), não com layouts verticais.
- **`Canvas` não é genérico** (`CanvasProps` = `ReactFlowProps` com os tipos
  base): `useNodesState<SeuNode>` não casa com `onNodesChange`. Tipe o estado
  com o `Node` base (`useNodesState<FlowNode>(…)`) e deixe o tipo específico
  no custom node.
- Sem `onConnect` o arraste até cria a linha, mas nada fica: a aresta nova é
  estado seu (`addEdge`).
