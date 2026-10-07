"use client";

import "@xyflow/react/dist/style.css";

import { Canvas } from "@blips/ai/components/canvas";
import { Controls } from "@blips/ai/components/controls";
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
  ReactFlowProps,
} from "@xyflow/react";

type EtapaData = {
  titulo: string;
  descricao: string;
  handles: { target: boolean; source: boolean };
};

type Etapa = FlowNode<EtapaData, "etapa">;

const EtapaNode = ({ data }: FlowNodeProps<Etapa>) => (
  <Node className="w-56" handles={data.handles}>
    <NodeHeader className="rounded-md border-b-0">
      <NodeTitle>{data.titulo}</NodeTitle>
      <NodeDescription>{data.descricao}</NodeDescription>
    </NodeHeader>
  </Node>
);

const nodeTypes = { etapa: EtapaNode };
const edgeTypes = { animated: Edge.Animated };

// Os rótulos dos botões vêm do <ReactFlow>, não do Controls: traduza aqui.
const ariaLabelConfig: ReactFlowProps["ariaLabelConfig"] = {
  "controls.zoomIn.ariaLabel": "Aproximar",
  "controls.zoomOut.ariaLabel": "Afastar",
  "controls.fitView.ariaLabel": "Ajustar à tela",
  "controls.interactive.ariaLabel": "Travar ou destravar edição",
};

const nodes: Etapa[] = [
  {
    id: "coleta",
    type: "etapa",
    position: { x: 0, y: 0 },
    data: {
      titulo: "Coletar dados",
      descricao: "CNPJ e contrato",
      handles: { target: false, source: true },
    },
  },
  {
    id: "analise",
    type: "etapa",
    position: { x: 340, y: 0 },
    data: {
      titulo: "Analisar crédito",
      descricao: "Regras da política",
      handles: { target: true, source: true },
    },
  },
  {
    id: "parecer",
    type: "etapa",
    position: { x: 680, y: 0 },
    data: {
      titulo: "Emitir parecer",
      descricao: "Aprovado ou recusado",
      handles: { target: true, source: false },
    },
  },
];

const edges: FlowEdge[] = [
  { id: "e1", source: "coleta", target: "analise", type: "animated" },
  { id: "e2", source: "analise", target: "parecer", type: "animated" },
];

export default function AiControlsDemo() {
  return (
    <div className="h-72 w-full overflow-hidden rounded-md border">
      <Canvas
        fitViewOptions={{ maxZoom: 1 }}
        ariaLabelConfig={ariaLabelConfig}
        edges={edges}
        edgeTypes={edgeTypes}
        nodes={nodes}
        nodeTypes={nodeTypes}
      >
        <Controls />
      </Canvas>
    </div>
  );
}
