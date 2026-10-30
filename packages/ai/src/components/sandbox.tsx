"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/sandbox.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs";
import { cn } from "@blips/ui/lib/utils";
import { CaretDownIcon, CodeIcon } from "@phosphor-icons/react";
import type { ToolUIPart } from "ai";
import type { ComponentProps } from "react";

import { getStatusBadge } from "./tool";

export type SandboxRootProps = ComponentProps<typeof Collapsible>;

// No Base UI, `className` pode ser função do estado; resolve antes de mesclar
// para não perder a classe do consumidor (o clsx descarta funções).
export const Sandbox = ({ className, ...props }: SandboxRootProps) => (
  <Collapsible
    className={(state) =>
      cn(
        "not-prose group mb-4 w-full overflow-hidden rounded-md border",
        typeof className === "function" ? className(state) : className
      )
    }
    defaultOpen
    {...props}
  />
);

export interface SandboxHeaderProps {
  title?: string;
  state: ToolUIPart["state"];
  className?: string;
}

export const SandboxHeader = ({
  className,
  title,
  state,
  ...props
}: SandboxHeaderProps) => (
  <CollapsibleTrigger
    className={cn(
      "flex w-full items-center justify-between gap-4 p-3",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">
      <CodeIcon className="size-4 text-muted-foreground" />
      <span className="font-medium text-sm">{title}</span>
      {getStatusBadge(state)}
    </div>
    <CaretDownIcon className="size-4 text-muted-foreground transition-transform group-data-open:rotate-180" />
  </CollapsibleTrigger>
);

export type SandboxContentProps = ComponentProps<typeof CollapsibleContent>;

export const SandboxContent = ({
  className,
  ...props
}: SandboxContentProps) => (
  <CollapsibleContent
    className={(state) =>
      cn(
        "data-closed:fade-out-0 data-closed:slide-out-to-top-2 data-open:slide-in-from-top-2 outline-none data-closed:animate-out data-open:animate-in",
        typeof className === "function" ? className(state) : className
      )
    }
    {...props}
  />
);

// Os wrappers de Tabs da @blips/ui mesclam `className` com `cn` (clsx), que descarta
// funções: um `className` em função do estado sumiria junto com as classes daqui.
// Por isso, nas partes de abas, `className` é só string.
export type SandboxTabsProps = Omit<
  ComponentProps<typeof Tabs>,
  "className"
> & {
  className?: string;
};

export const SandboxTabs = ({ className, ...props }: SandboxTabsProps) => (
  <Tabs className={cn("w-full gap-0", className)} {...props} />
);

export type SandboxTabsBarProps = ComponentProps<"div">;

export const SandboxTabsBar = ({
  className,
  ...props
}: SandboxTabsBarProps) => (
  <div
    className={cn(
      "flex w-full items-center border-border border-t border-b",
      className
    )}
    {...props}
  />
);

export type SandboxTabsListProps = Omit<
  ComponentProps<typeof TabsList>,
  "className"
> & { className?: string };

export const SandboxTabsList = ({
  className,
  ...props
}: SandboxTabsListProps) => (
  <TabsList
    className={cn("h-auto rounded-none border-0 bg-transparent p-0", className)}
    {...props}
  />
);

export type SandboxTabsTriggerProps = Omit<
  ComponentProps<typeof TabsTrigger>,
  "className"
> & { className?: string };

export const SandboxTabsTrigger = ({
  className,
  ...props
}: SandboxTabsTriggerProps) => (
  <TabsTrigger
    className={cn(
      "rounded-none border-0 border-transparent border-b-2 px-4 py-2 font-medium text-muted-foreground text-sm transition-colors data-active:border-primary data-active:bg-transparent data-active:text-foreground data-active:shadow-none dark:data-active:border-primary dark:data-active:bg-transparent",
      className
    )}
    {...props}
  />
);

export type SandboxTabContentProps = Omit<
  ComponentProps<typeof TabsContent>,
  "className"
> & { className?: string };

export const SandboxTabContent = ({
  className,
  ...props
}: SandboxTabContentProps) => (
  <TabsContent className={cn("mt-0 text-sm", className)} {...props} />
);
