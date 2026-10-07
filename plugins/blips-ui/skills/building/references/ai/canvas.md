# Canvas

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/canvas`

Área de fluxo (grafo de nós e arestas) sobre o **React Flow** (`@xyflow/react`
12): um `<ReactFlow>` com padrões de "editor de workflow" e o `<Background>` de
pontos na cor `var(--sidebar)` da @blips/ui. É a raiz da família de canvas da
@blips/ai: `Node` (`node.md`), `Edge` (`edge.md`), `Connection`
(`connection.md`), `Controls` (`controls.md`), `Panel` (`panel.md`) e
`Toolbar` (`toolbar.md`) vivem **dentro** dele.

## Quando usar (e quando não)

- **Use** para mostrar ou editar o fluxo de um agente: etapas de um workflow
  (ex.: o que um fluxo n8n faz, migrado para Agno), plano de execução com
  dependências, roteamento entre subagentes de um `Team`.
- **Não use** para uma lista linear de passos: isso é `ChainOfThought`
  (`chain-of-thought.md`), `Plan` ou `Task` da @blips/ai, ou `Item` da
  @blips/ui. Um grafo sem ramificação é só uma lista desenhada mais caro.
- **Não use** para gráfico de dados (barras, linhas, pizza): isso é `Chart`
  (Recharts) da @blips/ui (`../chart.md`).
- **Não use** para organograma ou diagrama estático de documentação: imagem ou
  Mermaid (o `MessageResponse` já renderiza Mermaid com `@streamdown/mermaid`).

## Peers exigidos

`@xyflow/react` (^12). O import é estático: importar este subpath (ou `node`,
`edge`, `connection`, `controls`, `panel`, `toolbar`) **sem** o pacote
instalado quebra o build.

```bash
pnpm add @blips/ai @xyflow/react
```

**CSS do React Flow: o app importa, uma vez.** A @blips/ai é
`sideEffects: false` e o `Canvas` **não** importa `@xyflow/react/dist/style.css`
(o upstream importava). Sem essa folha, handles, arestas, viewport e controles
saem quebrados (sem posicionamento, sem cursor, nós empilhados). Importe no
layout raiz ou no componente cliente que monta o canvas:

```tsx
import "@xyflow/react/dist/style.css";
```

O CSS da lib segue como no resto da @blips/ai (`@import "@blips/ui/globals.css";`
e depois `@import "@blips/ai/styles.css";` no CSS global).

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

Exports: `Canvas` e o tipo `CanvasProps` (`ReactFlowProps & { children?: ReactNode }`).

Toda prop do `<ReactFlow>` passa direto (`nodes`, `edges`, `nodeTypes`,
`edgeTypes`, `onNodesChange`, `onEdgesChange`, `onConnect`,
`connectionLineComponent`, `ariaLabelConfig`…). O `Canvas` só muda os padrões,
e qualquer um deles pode ser sobrescrito por prop:

| Prop do React Flow | Padrão no Canvas | Padrão do React Flow | Efeito |
|---|---|---|---|
| `fitView` | `true` | `false` | Enquadra todos os nós ao montar. |
| `panOnDrag` | `false` | `true` | Arrastar o fundo **não** move a tela… |
| `selectionOnDrag` | `true` | `false` | …desenha uma caixa de seleção. |
| `panOnScroll` | `true` | `false` | A roda/trackpad move a tela; zoom fica na pinça ou na roda com a tecla de ativação (`zoomActivationKeyCode`, Cmd no Mac, Ctrl nos demais). |
| `zoomOnDoubleClick` | `false` | `true` | Duplo clique não dá zoom. |
| `deleteKeyCode` | `["Backspace", "Delete"]` | `"Backspace"` | Teclas que apagam a seleção (só tem efeito com `onNodesChange`/`onEdgesChange`). |
| `children` | — | — | Renderizado depois do `<Background>`: `Controls`, `Panel`, `MiniMap`… |

Fundo: `<Background bgColor="var(--sidebar)" />` fixo (padrão de pontos). Não
há prop para trocá-lo; para outro fundo, use o `<ReactFlow>` direto.

## Composição com a @blips/ui

- Nós: `Node` da @blips/ai, que é o `Card` da @blips/ui com handles
  (`node.md`). Dentro do nó, `Badge`, `Button`, `Item` da @blips/ui normais.
- Botões flutuantes: `Panel` (`panel.md`) com `Button` da @blips/ui
  (`variant="ghost"`, `size="icon-sm"`, ícones Phosphor `*Icon`).
- Zoom: `Controls` (`controls.md`).
- Moldura: o canvas ocupa 100% do pai. Ponha-o num `Card` ou numa `div` com
  altura explícita (`h-[480px]`, `h-dvh`, `flex-1 min-h-0`), nunca num pai com
  altura automática.

## Exemplo v3

```tsx
"use client";

import "@xyflow/react/dist/style.css";

import { Canvas } from "@blips/ai/components/canvas";
import { Connection } from "@blips/ai/components/connection";
import { Controls } from "@blips/ai/components/controls";
import { Edge } from "@blips/ai/components/edge";
import {
  Node,
  NodeContent,
  NodeDescription,
  NodeHeader,
  NodeTitle,
} from "@blips/ai/components/node";
import { Panel } from "@blips/ai/components/panel";
import { Button } from "@blips/ui/components/button";
import { ArrowsOutIcon } from "@phosphor-icons/react";
import type {
  Edge as FlowEdge,
  Node as FlowNode,
  NodeProps as FlowNodeProps,
} from "@xyflow/react";

type EtapaData = {
  titulo: string;
  descricao: string;
  detalhe: string;
  entrada: boolean;
  saida: boolean;
};

type EtapaNode = FlowNode<EtapaData, "etapa">;

function Etapa({ data }: FlowNodeProps<EtapaNode>) {
  return (
    <Node handles={{ source: data.saida, target: data.entrada }}>
      <NodeHeader>
        <NodeTitle>{data.titulo}</NodeTitle>
        <NodeDescription>{data.descricao}</NodeDescription>
      </NodeHeader>
      <NodeContent>
        <p className="text-muted-foreground text-xs">{data.detalhe}</p>
      </NodeContent>
    </Node>
  );
}

// Fora do componente: objetos novos a cada render fazem o React Flow remontar tudo.
const nodeTypes = { etapa: Etapa };
const edgeTypes = { animada: Edge.Animated, temporaria: Edge.Temporary };

const nodes: EtapaNode[] = [
  {
    id: "entrada",
    type: "etapa",
    position: { x: 0, y: 0 },
    data: {
      titulo: "Mensagem recebida",
      descricao: "WhatsApp",
      detalhe: "O cliente pergunta sobre o boleto de outubro.",
      entrada: false,
      saida: true,
    },
  },
  {
    id: "roteador",
    type: "etapa",
    position: { x: 480, y: 0 },
    data: {
      titulo: "Roteador",
      descricao: "Team supervisor",
      detalhe: "Classifica o assunto e escolhe o subagente.",
      entrada: true,
      saida: true,
    },
  },
  {
    id: "financeiro",
    type: "etapa",
    position: { x: 960, y: -120 },
    data: {
      titulo: "Financeiro",
      descricao: "Subagente",
      detalhe: "Consulta recebíveis e segunda via.",
      entrada: true,
      saida: false,
    },
  },
  {
    id: "contrato",
    type: "etapa",
    position: { x: 960, y: 140 },
    data: {
      titulo: "Contrato",
      descricao: "Subagente",
      detalhe: "Usado quando a dúvida é sobre cláusulas.",
      entrada: true,
      saida: false,
    },
  },
];

const edges: FlowEdge[] = [
  { id: "e1", source: "entrada", target: "roteador", type: "animada" },
  { id: "e2", source: "roteador", target: "financeiro", type: "animada" },
  { id: "e3", source: "roteador", target: "contrato", type: "temporaria" },
];

const rotulos = {
  "controls.zoomIn.ariaLabel": "Aproximar",
  "controls.zoomOut.ariaLabel": "Afastar",
  "controls.fitView.ariaLabel": "Enquadrar",
  "controls.interactive.ariaLabel": "Travar ou destravar o canvas",
};

export function FluxoDoAgente() {
  return (
    <div className="h-[480px] w-full overflow-hidden rounded-lg border">
      <Canvas
        ariaLabelConfig={rotulos}
        connectionLineComponent={Connection}
        edgeTypes={edgeTypes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodes={nodes}
      >
        <Controls />
        <Panel position="top-right">
          <Button aria-label="Tela cheia" size="icon-sm" variant="ghost">
            <ArrowsOutIcon />
          </Button>
        </Panel>
      </Canvas>
    </div>
  );
}
```

Para editar (arrastar nós, apagar, conectar), controle o estado com
`useNodesState`/`useEdgesState` e passe `onNodesChange`, `onEdgesChange` e
`onConnect` (com `addEdge`) do próprio `@xyflow/react`.

## Armadilhas

- **Sem `@xyflow/react/dist/style.css` o canvas quebra.** É o erro nº 1: a
  @blips/ai não importa a folha. Importe uma vez no app.
- **Pai sem altura = canvas invisível.** O React Flow mede o contêiner; com
  altura 0 nada aparece (e ele avisa no console).
- **Arquivo cliente.** `Canvas` não tem `"use client"` (o dist do
  `@xyflow/react` tem). `nodeTypes`, `edgeTypes` e callbacks são funções e não
  atravessam a fronteira Server → Client: monte o canvas num arquivo com
  `"use client"`.
- **`nodeTypes`/`edgeTypes` fora do componente** (ou em `useMemo`). Objeto novo
  a cada render faz o React Flow avisar e remontar os nós.
- **Colisão de nomes:** `Node` e `Edge` da @blips/ai vs. os tipos `Node`,
  `Edge` e `NodeProps` do `@xyflow/react`. Importe os do React Flow com alias
  (`Node as FlowNode`, `NodeProps as FlowNodeProps`).
- **Padrões de navegação diferentes do React Flow:** arrastar o fundo seleciona
  em vez de mover. Para o comportamento clássico, passe `panOnDrag` e
  `selectionOnDrag={false}`.
- **Rótulos dos botões de zoom em inglês** ("Zoom In", "Fit View"…) até você
  passar `ariaLabelConfig` em pt-BR no `Canvas`, como no exemplo. O `Controls`
  da @blips/ai só traduz o rótulo do painel.
- **`Canvas` não é genérico**: `CanvasProps` usa os tipos base do React Flow
  (`Node`, `Edge`). Arrays tipados (`EtapaNode[]`) entram em `nodes`, mas o
  estado editável com `onNodesChange` precisa ser `useNodesState<FlowNode>`;
  `useNodesState<EtapaNode>` não compila.
- Hooks do React Flow (`useReactFlow`, `useNodesState` usado fora) num
  componente **irmão** do canvas exigem `<ReactFlowProvider>` em volta dos dois.
