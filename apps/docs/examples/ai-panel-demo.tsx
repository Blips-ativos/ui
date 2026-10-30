"use client";

import "@xyflow/react/dist/style.css";

import { Canvas } from "@blips/ai/components/canvas";
import {
  Node,
  NodeDescription,
  NodeHeader,
  NodeTitle,
} from "@blips/ai/components/node";
import { Panel } from "@blips/ai/components/panel";
import { Badge } from "@blips/ui/components/badge";
import { Button } from "@blips/ui/components/button";
import { FloppyDiskIcon, PlayIcon } from "@phosphor-icons/react";
import type {
  Node as FlowNode,
  NodeProps as FlowNodeProps,
} from "@xyflow/react";

type EtapaData = {
  titulo: string;
  descricao: string;
};

type Etapa = FlowNode<EtapaData, "etapa">;

const EtapaNode = ({ data }: FlowNodeProps<Etapa>) => (
  <Node className="w-56" handles={{ target: false, source: false }}>
    <NodeHeader className="rounded-md border-b-0">
      <NodeTitle>{data.titulo}</NodeTitle>
      <NodeDescription>{data.descricao}</NodeDescription>
    </NodeHeader>
  </Node>
);

const nodeTypes = { etapa: EtapaNode };

const nodes: Etapa[] = [
  {
    id: "rascunho",
    type: "etapa",
    position: { x: 0, y: 0 },
    data: { titulo: "Qualificar lead", descricao: "Rascunho do fluxo" },
  },
];

export default function AiPanelDemo() {
  return (
    <div className="h-72 w-full overflow-hidden rounded-md border">
      <Canvas
        fitViewOptions={{ maxZoom: 1 }}
        nodes={nodes}
        nodeTypes={nodeTypes}
      >
        <Panel position="top-left">
          <div className="flex items-center gap-2 px-2 py-1">
            <span className="font-medium text-sm">Fluxo comercial</span>
            <Badge variant="outline">Rascunho</Badge>
          </div>
        </Panel>
        <Panel className="flex gap-1" position="top-right">
          <Button size="sm" variant="ghost">
            <FloppyDiskIcon data-icon="inline-start" />
            Salvar
          </Button>
          <Button size="sm">
            <PlayIcon data-icon="inline-start" />
            Executar
          </Button>
        </Panel>
        <Panel position="bottom-left">
          <p className="px-2 py-1 text-muted-foreground text-xs">
            1 etapa · última edição há 2 min
          </p>
        </Panel>
      </Canvas>
    </div>
  );
}
