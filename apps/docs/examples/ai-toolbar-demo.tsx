"use client";

import "@xyflow/react/dist/style.css";

import { Canvas } from "@blips/ai/components/canvas";
import {
  Node,
  NodeContent,
  NodeDescription,
  NodeHeader,
  NodeTitle,
} from "@blips/ai/components/node";
import { Toolbar } from "@blips/ai/components/toolbar";
import { Button } from "@blips/ui/components/button";
import { CopyIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import type {
  Node as FlowNode,
  NodeProps as FlowNodeProps,
} from "@xyflow/react";

type EtapaData = {
  titulo: string;
  descricao: string;
  conteudo: string;
};

type Etapa = FlowNode<EtapaData, "etapa">;

const EtapaNode = ({ data }: FlowNodeProps<Etapa>) => (
  <>
    <Node className="w-64" handles={{ target: false, source: false }}>
      <NodeHeader>
        <NodeTitle>{data.titulo}</NodeTitle>
        <NodeDescription>{data.descricao}</NodeDescription>
      </NodeHeader>
      <NodeContent>
        <p className="text-sm">{data.conteudo}</p>
      </NodeContent>
    </Node>
    {/* Sem isVisible, a toolbar só aparece com o nó selecionado. */}
    <Toolbar isVisible>
      <Button aria-label="Editar etapa" size="icon-sm" variant="ghost">
        <PencilSimpleIcon />
      </Button>
      <Button aria-label="Duplicar etapa" size="icon-sm" variant="ghost">
        <CopyIcon />
      </Button>
      <Button aria-label="Remover etapa" size="icon-sm" variant="ghost">
        <TrashIcon />
      </Button>
    </Toolbar>
  </>
);

const nodeTypes = { etapa: EtapaNode };

const nodes: Etapa[] = [
  {
    id: "resumo",
    type: "etapa",
    position: { x: 0, y: 0 },
    data: {
      titulo: "Resumir atendimento",
      descricao: "Etapa do agente",
      conteudo: "Gera um resumo da conversa para o histórico do cliente.",
    },
  },
];

export default function AiToolbarDemo() {
  return (
    <div className="h-72 w-full overflow-hidden rounded-md border">
      <Canvas
        fitViewOptions={{ maxZoom: 1 }}
        nodes={nodes}
        nodeTypes={nodeTypes}
      />
    </div>
  );
}
