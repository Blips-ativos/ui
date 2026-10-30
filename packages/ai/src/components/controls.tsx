"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/controls.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { cn } from "@blips/ui/lib/utils";
import { Controls as ControlsPrimitive } from "@xyflow/react";
import type { ComponentProps } from "react";

export type ControlsProps = ComponentProps<typeof ControlsPrimitive>;

// Os rótulos do painel e dos botões (zoom, ajustar, travar) vêm do
// `ariaLabelConfig` do <ReactFlow>; o <Canvas> já os entrega em pt-BR. Sem
// padrão fixo de `aria-label` aqui, senão ele anularia o `controls.ariaLabel`
// que o consumidor passar ao Canvas. A prop `aria-label` continua sobrescrevendo.
export const Controls = ({ className, ...props }: ControlsProps) => (
  <ControlsPrimitive
    className={cn(
      "gap-px overflow-hidden rounded-md border bg-card p-1 shadow-none!",
      "[&>button]:rounded-md [&>button]:border-none! [&>button]:bg-transparent! [&>button]:hover:bg-secondary!",
      className
    )}
    {...props}
  />
);
