"use client";

import "@xyflow/react/dist/style.css";

import { Canvas } from "@blips/ai/components/canvas";
import { Edge } from "@blips/ai/components/edge";
import {
  Node,
  NodeDescription,
  NodeHeader,
  NodeTitle,
} from "@blips/ai/components/node";
import type {
  Edge as FlowEdge,
  Node as FlowNode,
  NodeProps as FlowNodeProps,
} from "@xyflow/react";

type PassoData = {
  titulo: string;
  descricao: string;
  handles: { target: boolean; source: boolean };
};

type Passo = FlowNode<PassoData, "passo">;

const PassoNode = ({ data }: FlowNodeProps<Passo>) => (
  <Node className="w-56" handles={data.handles}>
    <NodeHeader className="rounded-md border-b-0">
      <NodeTitle>{data.titulo}</NodeTitle>
      <NodeDescription>{data.descricao}</NodeDescription>
    </NodeHeader>
  </Node>
);

const nodeTypes = { passo: PassoNode };
const edgeTypes = { animated: Edge.Animated, temporary: Edge.Temporary };

const nodes: Passo[] = [
  {
    id: "pergunta",
    type: "passo",
    position: { x: 0, y: 60 },
    data: {
      titulo: "Pergunta do cliente",
      descricao: "Entrada",
      handles: { target: false, source: true },
    },
  },
  {
    id: "rag",
    type: "passo",
    position: { x: 360, y: 0 },
    data: {
      titulo: "Base de conhecimento",
      descricao: "Caminho executado",
      handles: { target: true, source: false },
    },
  },
  {
    id: "humano",
    type: "passo",
    position: { x: 360, y: 140 },
    data: {
      titulo: "Atendente humano",
      descricao: "Caminho possível",
      handles: { target: true, source: false },
    },
  },
];

const edges: FlowEdge[] = [
  // Edge.Animated: fluxo ativo, com um ponto percorrendo a curva.
  { id: "ativo", source: "pergunta", target: "rag", type: "animated" },
  // Edge.Temporary: ligação tracejada, para caminhos ainda não percorridos.
  { id: "possivel", source: "pergunta", target: "humano", type: "temporary" },
];

export default function AiEdgeDemo() {
  return (
    <div className="h-72 w-full overflow-hidden rounded-md border">
      <Canvas
        fitViewOptions={{ maxZoom: 1 }}
        edges={edges}
        edgeTypes={edgeTypes}
        nodes={nodes}
        nodeTypes={nodeTypes}
      />
    </div>
  );
}
