"use client";
// Adaptado de vercel/ai-elements (packages/elements/src/task.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { cn } from "@blips/ui/lib/utils";
import { CaretDownIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";

export type TaskItemFileProps = ComponentProps<"div">;

export const TaskItemFile = ({
  children,
  className,
  ...props
}: TaskItemFileProps) => (
  <div
    className={cn(
      "inline-flex items-center gap-1 rounded-md border bg-secondary px-1.5 py-0.5 text-foreground text-xs",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type TaskItemProps = ComponentProps<"div">;

export const TaskItem = ({ children, className, ...props }: TaskItemProps) => (
  <div className={cn("text-muted-foreground text-sm", className)} {...props}>
    {children}
  </div>
);

export type TaskProps = ComponentProps<typeof Collapsible>;

export const Task = ({ defaultOpen = true, ...props }: TaskProps) => (
  <Collapsible defaultOpen={defaultOpen} {...props} />
);

export type TaskTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
  title: string;
};

// No Base UI o trigger expõe `data-panel-open` (no Radix era data-state=open).
// `className` do Base UI pode ser função do estado; resolve antes de mesclar.
export const TaskTrigger = ({
  children,
  className,
  title,
  ...props
}: TaskTriggerProps) => (
  <CollapsibleTrigger
    className={(state) =>
      cn(
        "group",
        typeof className === "function" ? className(state) : className
      )
    }
    {...props}
  >
    {children ?? (
      <span className="flex w-full cursor-pointer items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground">
        <MagnifyingGlassIcon className="size-4" />
        <span className="text-sm">{title}</span>
        <CaretDownIcon className="size-4 transition-transform group-data-panel-open:rotate-180" />
      </span>
    )}
  </CollapsibleTrigger>
);

export type TaskContentProps = ComponentProps<typeof CollapsibleContent>;

export const TaskContent = ({
  children,
  className,
  ...props
}: TaskContentProps) => (
  <CollapsibleContent
    className={(state) =>
      cn(
        "data-closed:fade-out-0 data-closed:slide-out-to-top-2 data-open:slide-in-from-top-2 text-popover-foreground outline-none data-closed:animate-out data-open:animate-in",
        typeof className === "function" ? className(state) : className
      )
    }
    {...props}
  >
    <div className="mt-4 space-y-2 border-muted border-l-2 pl-4">
      {children}
    </div>
  </CollapsibleContent>
);
