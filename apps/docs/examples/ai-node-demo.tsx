"use client";

import "@xyflow/react/dist/style.css";

import { Canvas } from "@blips/ai/components/canvas";
import { Edge } from "@blips/ai/components/edge";
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
import { Button } from "@blips/ui/components/button";
import { DotsThreeIcon } from "@phosphor-icons/react";
import type {
  Edge as FlowEdge,
  Node as FlowNode,
  NodeProps as FlowNodeProps,
} from "@xyflow/react";

type FerramentaData = {
  nome: string;
  descricao: string;
  parametros: Record<string, string>;
  status: string;
  handles: { target: boolean; source: boolean };
};

type Ferramenta = FlowNode<FerramentaData, "ferramenta">;

const FerramentaNode = ({ data }: FlowNodeProps<Ferramenta>) => (
  <Node handles={data.handles}>
    <NodeHeader>
      <NodeTitle>{data.nome}</NodeTitle>
      <NodeDescription>{data.descricao}</NodeDescription>
      <NodeAction>
        <Button aria-label="Mais ações" size="icon-sm" variant="ghost">
          <DotsThreeIcon />
        </Button>
      </NodeAction>
    </NodeHeader>
    <NodeContent>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        {Object.entries(data.parametros).map(([chave, valor]) => (
          <div className="contents" key={chave}>
            <dt className="text-muted-foreground">{chave}</dt>
            <dd className="font-mono">{valor}</dd>
          </div>
        ))}
      </dl>
    </NodeContent>
    <NodeFooter>
      <Badge variant="secondary">{data.status}</Badge>
    </NodeFooter>
  </Node>
);

const nodeTypes = { ferramenta: FerramentaNode };
const edgeTypes = { animated: Edge.Animated };

const nodes: Ferramenta[] = [
  {
    id: "buscar",
    type: "ferramenta",
    position: { x: 0, y: 0 },
    data: {
      nome: "buscar_contrato",
      descricao: "Localiza o contrato pelo CNPJ",
      parametros: { cnpj: "12.345.678/0001-90" },
      status: "Concluída",
      handles: { target: false, source: true },
    },
  },
  {
    id: "titulos",
    type: "ferramenta",
    position: { x: 480, y: 0 },
    data: {
      nome: "consultar_titulos",
      descricao: "Lista os títulos em aberto",
      parametros: { contrato: "CT-2026-0042", situacao: "em_aberto" },
      status: "Em execução",
      handles: { target: true, source: false },
    },
  },
];

const edges: FlowEdge[] = [
  { id: "e1", source: "buscar", target: "titulos", type: "animated" },
];

export default function AiNodeDemo() {
  return (
    <div className="h-80 w-full overflow-hidden rounded-md border">
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
