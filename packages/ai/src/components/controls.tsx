"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/controls.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { cn } from "@blips/ui/lib/utils";
import { Controls as ControlsPrimitive } from "@xyflow/react";
import type { ComponentProps } from "react";

export type ControlsProps = ComponentProps<typeof ControlsPrimitive>;

// O rótulo do painel sai em pt-BR por padrão. Os rótulos dos botões (zoom,
// ajustar, travar) vêm do `ariaLabelConfig` do <ReactFlow>, não deste componente.
export const Controls = ({
  className,
  "aria-label": ariaLabel = "Controles do canvas",
  ...props
}: ControlsProps) => (
  <ControlsPrimitive
    aria-label={ariaLabel}
    className={cn(
      "gap-px overflow-hidden rounded-md border bg-card p-1 shadow-none!",
      "[&>button]:rounded-md [&>button]:border-none! [&>button]:bg-transparent! [&>button]:hover:bg-secondary!",
      className
    )}
    {...props}
  />
);
