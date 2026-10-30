"use client";

import "@xyflow/react/dist/style.css";

import { Canvas } from "@blips/ai/components/canvas";
import { Connection } from "@blips/ai/components/connection";
import { Edge } from "@blips/ai/components/edge";
import {
  Node,
  NodeDescription,
  NodeHeader,
  NodeTitle,
} from "@blips/ai/components/node";
import {
  addEdge,
  type Connection as FlowConnection,
  type Edge as FlowEdge,
  type Node as FlowNode,
  type NodeProps as FlowNodeProps,
  useEdgesState,
} from "@xyflow/react";
import { useCallback } from "react";

type BlocoData = {
  titulo: string;
  descricao: string;
  handles: { target: boolean; source: boolean };
};

type Bloco = FlowNode<BlocoData, "bloco">;

const BlocoNode = ({ data }: FlowNodeProps<Bloco>) => (
  <Node className="w-56" handles={data.handles}>
    <NodeHeader className="rounded-md border-b-0">
      <NodeTitle>{data.titulo}</NodeTitle>
      <NodeDescription>{data.descricao}</NodeDescription>
    </NodeHeader>
  </Node>
);

const nodeTypes = { bloco: BlocoNode };
const edgeTypes = { animated: Edge.Animated };

const nodes: Bloco[] = [
  {
    id: "agente",
    type: "bloco",
    position: { x: 0, y: 60 },
    data: {
      titulo: "Agente Salvador",
      descricao: "Arraste do ponto à direita",
      handles: { target: false, source: true },
    },
  },
  {
    id: "contrato",
    type: "bloco",
    position: { x: 380, y: 0 },
    data: {
      titulo: "Subagente de contrato",
      descricao: "Solte aqui para ligar",
      handles: { target: true, source: false },
    },
  },
  {
    id: "financeiro",
    type: "bloco",
    position: { x: 380, y: 130 },
    data: {
      titulo: "Subagente financeiro",
      descricao: "Solte aqui para ligar",
      handles: { target: true, source: false },
    },
  },
];

export default function AiConnectionDemo() {
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>([]);

  const onConnect = useCallback(
    (conexao: FlowConnection) =>
      setEdges((atuais) => addEdge({ ...conexao, type: "animated" }, atuais)),
    [setEdges]
  );

  return (
    <div className="h-72 w-full overflow-hidden rounded-md border">
      <Canvas
        fitViewOptions={{ maxZoom: 1 }}
        connectionLineComponent={Connection}
        edges={edges}
        edgeTypes={edgeTypes}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
      />
    </div>
  );
}
