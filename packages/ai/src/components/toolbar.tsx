// Adaptado de vercel/ai-elements (packages/elements/src/toolbar.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { cn } from "@blips/ui/lib/utils";
import { NodeToolbar, Position } from "@xyflow/react";
import type { ComponentProps } from "react";

export type ToolbarProps = ComponentProps<typeof NodeToolbar>;

export const Toolbar = ({ className, ...props }: ToolbarProps) => (
  <NodeToolbar
    className={cn(
      "flex items-center gap-1 rounded-sm border bg-background p-1.5",
      className
    )}
    position={Position.Bottom}
    {...props}
  />
);
