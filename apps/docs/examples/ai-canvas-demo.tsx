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
  NodeFooter,
  NodeHeader,
  NodeTitle,
} from "@blips/ai/components/node";
import { Panel } from "@blips/ai/components/panel";
import { Badge } from "@blips/ui/components/badge";
import type {
  Edge as FlowEdge,
  Node as FlowNode,
  NodeProps as FlowNodeProps,
} from "@xyflow/react";

type EtapaData = {
  titulo: string;
  descricao: string;
  conteudo: string;
  rodape: string;
  handles: { target: boolean; source: boolean };
};

type Etapa = FlowNode<EtapaData, "etapa">;

const EtapaNode = ({ data }: FlowNodeProps<Etapa>) => (
  <Node handles={data.handles}>
    <NodeHeader>
      <NodeTitle>{data.titulo}</NodeTitle>
      <NodeDescription>{data.descricao}</NodeDescription>
    </NodeHeader>
    <NodeContent>
      <p className="text-sm">{data.conteudo}</p>
    </NodeContent>
    <NodeFooter>
      <p className="text-muted-foreground text-xs">{data.rodape}</p>
    </NodeFooter>
  </Node>
);

// Fora do componente: o React Flow recria tudo se nodeTypes/edgeTypes mudarem de referência.
const nodeTypes = { etapa: EtapaNode };
const edgeTypes = { animated: Edge.Animated, temporary: Edge.Temporary };

const nodes: Etapa[] = [
  {
    id: "entrada",
    type: "etapa",
    position: { x: 0, y: 0 },
    data: {
      titulo: "Mensagem recebida",
      descricao: "Canal WhatsApp",
      conteudo: "“Quero saber quando vence a próxima parcela do meu contrato.”",
      rodape: "Gatilho",
      handles: { target: false, source: true },
    },
  },
  {
    id: "classificar",
    type: "etapa",
    position: { x: 500, y: 0 },
    data: {
      titulo: "Classificar intenção",
      descricao: "Agente supervisor",
      conteudo: "Intenção detectada: financeiro · confiança 0,94",
      rodape: "Modelo via LiteLLM",
      handles: { target: true, source: true },
    },
  },
  {
    id: "consultar",
    type: "etapa",
    position: { x: 1000, y: -120 },
    data: {
      titulo: "Consultar títulos",
      descricao: "Ferramenta consultar_titulos",
      conteudo: "3 títulos em aberto · próximo vencimento em 10/11/2026",
      rodape: "Somente leitura",
      handles: { target: true, source: true },
    },
  },
  {
    id: "escalar",
    type: "etapa",
    position: { x: 1000, y: 160 },
    data: {
      titulo: "Escalar para atendente",
      descricao: "Rota alternativa",
      conteudo: "Usada quando a confiança fica abaixo de 0,6",
      rodape: "Não executada",
      handles: { target: true, source: false },
    },
  },
  {
    id: "responder",
    type: "etapa",
    position: { x: 1500, y: -120 },
    data: {
      titulo: "Responder cliente",
      descricao: "Mensagem final",
      conteudo:
        "“Sua próxima parcela vence em 10/11/2026, no valor de R$ 1.250,00.”",
      rodape: "Enviada",
      handles: { target: true, source: false },
    },
  },
];

const edges: FlowEdge[] = [
  { id: "e1", source: "entrada", target: "classificar", type: "animated" },
  { id: "e2", source: "classificar", target: "consultar", type: "animated" },
  { id: "e3", source: "classificar", target: "escalar", type: "temporary" },
  { id: "e4", source: "consultar", target: "responder", type: "animated" },
];

export default function AiCanvasDemo() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-md border">
      <Canvas
        connectionLineComponent={Connection}
        edges={edges}
        edgeTypes={edgeTypes}
        nodes={nodes}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Panel position="top-left">
          <div className="flex items-center gap-2 px-2 py-1">
            <span className="font-medium text-sm">Fluxo de atendimento</span>
            <Badge variant="secondary">Concluído</Badge>
          </div>
        </Panel>
      </Canvas>
    </div>
  );
}
