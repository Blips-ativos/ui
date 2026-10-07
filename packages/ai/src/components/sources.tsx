"use client";
// Adaptado de vercel/ai-elements (packages/elements/src/sources.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { cn } from "@blips/ui/lib/utils";
import { BookIcon, CaretDownIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";

// No Base UI o Collapsible.Root já renderiza uma <div>; as props são as do Root
// (open, defaultOpen, onOpenChange, disabled, render) mais as da <div>.
// `className` só string nas três partes: o `cn` (clsx) descarta funções do estado.
export type SourcesProps = Omit<
  ComponentProps<typeof Collapsible>,
  "className"
> & {
  className?: string;
};

export const Sources = ({ className, ...props }: SourcesProps) => (
  <Collapsible
    className={cn("not-prose mb-4 text-primary text-xs", className)}
    {...props}
  />
);

export type SourcesTriggerProps = Omit<
  ComponentProps<typeof CollapsibleTrigger>,
  "className"
> & {
  className?: string;
  count: number;
  /** Texto do gatilho sem `children`. Padrão: "Usou N fonte(s)". */
  getLabel?: (count: number) => ReactNode;
};

const defaultGetLabel = (count: number) =>
  `Usou ${count} ${count === 1 ? "fonte" : "fontes"}`;

export const SourcesTrigger = ({
  className,
  count,
  getLabel = defaultGetLabel,
  children,
  ...props
}: SourcesTriggerProps) => (
  <CollapsibleTrigger
    className={cn("flex items-center gap-2", className)}
    {...props}
  >
    {children ?? (
      <>
        {/* <span> em vez do <p> do upstream: <p> não é conteúdo válido de <button>. */}
        <span className="font-medium">{getLabel(count)}</span>
        <CaretDownIcon className="h-4 w-4" />
      </>
    )}
  </CollapsibleTrigger>
);

export type SourcesContentProps = Omit<
  ComponentProps<typeof CollapsibleContent>,
  "className"
> & { className?: string };

export const SourcesContent = ({
  className,
  ...props
}: SourcesContentProps) => (
  <CollapsibleContent
    className={cn(
      "mt-3 flex w-fit flex-col gap-2",
      "data-closed:fade-out-0 data-closed:slide-out-to-top-2 data-open:slide-in-from-top-2 outline-none data-closed:animate-out data-open:animate-in",
      className
    )}
    {...props}
  />
);

export type SourceProps = ComponentProps<"a">;

export const Source = ({ href, title, children, ...props }: SourceProps) => (
  <a
    className="flex items-center gap-2"
    href={href}
    rel="noreferrer"
    target="_blank"
    {...props}
  >
    {children ?? (
      <>
        <BookIcon className="h-4 w-4" />
        <span className="block font-medium">{title}</span>
      </>
    )}
  </a>
);
