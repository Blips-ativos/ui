// Adaptado de vercel/ai-elements (packages/elements/src/canvas.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import type { ReactFlowProps } from "@xyflow/react";
import { Background, ReactFlow } from "@xyflow/react";
import type { ReactNode } from "react";

// O CSS do React Flow (`@xyflow/react/dist/style.css`) não é importado aqui: o
// pacote é `sideEffects: false` e o consumidor importa a folha uma vez no app.

export type CanvasProps = ReactFlowProps & {
  children?: ReactNode;
};

const deleteKeyCode = ["Backspace", "Delete"];

// Textos de acessibilidade do React Flow em pt-BR (o padrão dele é inglês).
// Quem passa `ariaLabelConfig` sobrescreve só as chaves que informar.
export const canvasAriaLabelConfig: NonNullable<
  ReactFlowProps["ariaLabelConfig"]
> = {
  "node.a11yDescription.default":
    "Pressione Enter ou Espaço para selecionar um nó. Pressione Delete para removê-lo e Esc para cancelar.",
  "node.a11yDescription.keyboardDisabled":
    "Pressione Enter ou Espaço para selecionar um nó. Depois, use as setas para movê-lo. Pressione Delete para removê-lo e Esc para cancelar.",
  "node.a11yDescription.ariaLiveMessage": ({ direction, x, y }) =>
    `Nó selecionado movido para ${direction}. Nova posição: x ${x}, y ${y}`,
  "edge.a11yDescription.default":
    "Pressione Enter ou Espaço para selecionar uma aresta. Depois, pressione Delete para removê-la ou Esc para cancelar.",
  "controls.ariaLabel": "Controles do canvas",
  "controls.zoomIn.ariaLabel": "Aproximar",
  "controls.zoomOut.ariaLabel": "Afastar",
  "controls.fitView.ariaLabel": "Ajustar à tela",
  "controls.interactive.ariaLabel": "Alternar interatividade",
  "minimap.ariaLabel": "Minimapa",
  "handle.ariaLabel": "Ponto de conexão",
};

export const Canvas = ({
  children,
  ariaLabelConfig,
  ...props
}: CanvasProps) => (
  <ReactFlow
    ariaLabelConfig={{ ...canvasAriaLabelConfig, ...ariaLabelConfig }}
    deleteKeyCode={deleteKeyCode}
    fitView
    panOnDrag={false}
    panOnScroll
    selectionOnDrag={true}
    zoomOnDoubleClick={false}
    {...props}
  >
    <Background bgColor="var(--sidebar)" />
    {children}
  </ReactFlow>
);
