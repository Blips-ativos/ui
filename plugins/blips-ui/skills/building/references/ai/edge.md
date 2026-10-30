# Edge

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/edge`

Dois tipos de aresta customizada para o `Canvas` (`canvas.md`), num objeto
`Edge`:

- **`Edge.Animated`**: bezier sólida da saída (direita) da origem à entrada
  (esquerda) do destino, com uma bolinha `var(--primary)` percorrendo o
  caminho em loop de 2s. Para "o dado está passando por aqui agora".
- **`Edge.Temporary`**: bezier simples tracejada (`5, 5`), `stroke-ring`, fina.
  Para ligação opcional, ainda não executada ou hipotética.

## Quando usar (e quando não)

- **Use** `Edge.Animated` para o caminho que o agente está percorrendo (ou
  percorreu) e `Edge.Temporary` para ramos possíveis não escolhidos.
- **Não use** como componente JSX solto (`<Edge.Animated />`): são **tipos de
  aresta** do React Flow, registrados em `edgeTypes` e escolhidos por
  `edge.type`.
- Para a linha que aparece **enquanto o usuário arrasta** uma conexão nova, o
  componente é `Connection` (`connection.md`), não `Edge`.
- Aresta com rótulo, botão de apagar ou outro traçado (step, reta): escreva um
  custom edge com `BaseEdge`/`EdgeLabelRenderer` do `@xyflow/react`.

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

Export único: `Edge`, um objeto `{ Animated, Temporary }`. Os dois recebem as
`EdgeProps` do React Flow (quem passa é o React Flow, não você).

| Membro | Usa das `EdgeProps` | Traço | Notas |
|---|---|---|---|
| `Edge.Animated` | `id`, `source`, `target`, `markerEnd`, `style` | `BaseEdge` padrão + `<circle r=4 fill=var(--primary)>` com `animateMotion` 2s (escondido com `motion-reduce:hidden`) | Recalcula as pontas pelos handles reais: **sempre** do handle `Right` (source) da origem ao `Left` (target) do destino, ignorando `sourceX/Y`. Retorna `null` enquanto os nós não foram medidos. |
| `Edge.Temporary` | `id`, coordenadas e posições de origem/destino | `stroke-1 stroke-ring`, `strokeDasharray: "5, 5"` | Usa `getSimpleBezierPath`. Ignora `markerEnd` e `style`. |

Personalize por aresta com os campos do objeto `Edge` do React Flow:
`markerEnd` (ex.: `{ type: MarkerType.ArrowClosed }`) e `style` só têm efeito
no `Animated`.

## Composição com a @blips/ui

- Cores vêm dos tokens da @blips/ui (`--primary` na bolinha, `ring` no
  tracejado): trocam com o tema claro/escuro sem configuração.
- Combine com `Node` (`node.md`), que já põe os handles `Left`/`Right` que o
  `Edge.Animated` procura.

## Exemplo v3

```tsx
"use client";

import "@xyflow/react/dist/style.css";

import { Canvas } from "@blips/ai/components/canvas";
import { Edge } from "@blips/ai/components/edge";
import { Node, NodeHeader, NodeTitle } from "@blips/ai/components/node";
import type {
  Edge as FlowEdge,
  Node as FlowNode,
  NodeProps as FlowNodeProps,
} from "@xyflow/react";
import { MarkerType } from "@xyflow/react";

type PassoNode = FlowNode<{ titulo: string }, "passo">;

function Passo({ data }: FlowNodeProps<PassoNode>) {
  return (
    <Node className="w-56" handles={{ source: true, target: true }}>
      <NodeHeader>
        <NodeTitle>{data.titulo}</NodeTitle>
      </NodeHeader>
    </Node>
  );
}

const nodeTypes = { passo: Passo };
const edgeTypes = { animada: Edge.Animated, temporaria: Edge.Temporary };

const nodes: PassoNode[] = [
  {
    id: "a",
    type: "passo",
    position: { x: 0, y: 0 },
    data: { titulo: "Entender pedido" },
  },
  {
    id: "b",
    type: "passo",
    position: { x: 320, y: -80 },
    data: { titulo: "Consultar contrato" },
  },
  {
    id: "c",
    type: "passo",
    position: { x: 320, y: 80 },
    data: { titulo: "Escalar para humano" },
  },
];

const edges: FlowEdge[] = [
  {
    id: "a-b",
    source: "a",
    target: "b",
    type: "animada",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  { id: "a-c", source: "a", target: "c", type: "temporaria" },
];

export function CaminhoDoAgente() {
  return (
    <div className="h-80 w-full rounded-lg border">
      <Canvas
        edgeTypes={edgeTypes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodes={nodes}
      />
    </div>
  );
}
```

## Armadilhas

- **`edgeTypes` fora do componente.** Objeto novo a cada render faz o React
  Flow avisar e remontar.
- **`Edge.Animated` só liga `Right` → `Left`.** Com handles em cima/embaixo, ou
  sem handle `Right` na origem, a ponta cai em `(0, 0)` do canvas (o cálculo
  devolve `[0, 0]` quando não acha o handle). Use o `Node` da @blips/ai ou
  handles nas laterais.
- Nome `Edge` colide com o tipo `Edge` do `@xyflow/react`: importe o tipo com
  alias (`Edge as FlowEdge`).
- O `animateMotion` roda sempre, para cada aresta animada: em grafos grandes,
  troque para `Temporary` (ou uma aresta padrão) o que não estiver ativo.
  Com `prefers-reduced-motion`, a bolinha some (`motion-reduce:hidden`) e
  sobra a linha sólida; não é preciso trocar o `type` por isso.
- `Edge.Temporary` não desenha seta mesmo com `markerEnd`.
- O módulo não tem `"use client"` de propósito (é um objeto, não um
  componente), mas o `edgeTypes` só existe num arquivo cliente junto do canvas.
