"use client";
// Adaptado de vercel/ai-elements (packages/elements/src/chain-of-thought.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { Badge } from "@blips/ui/components/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { cn } from "@blips/ui/lib/utils";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { BrainIcon, CaretDownIcon, DotIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import { createContext, memo, useContext, useMemo } from "react";

import { useControllableState } from "../lib/use-controllable-state";

interface ChainOfThoughtContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChainOfThoughtContext = createContext<ChainOfThoughtContextValue | null>(
  null
);

const useChainOfThought = () => {
  const context = useContext(ChainOfThoughtContext);
  if (!context) {
    throw new Error(
      "Os componentes ChainOfThought precisam estar dentro de ChainOfThought"
    );
  }
  return context;
};

export type ChainOfThoughtProps = ComponentProps<"div"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const ChainOfThought = memo(
  ({
    className,
    open,
    defaultOpen = false,
    onOpenChange,
    children,
    ...props
  }: ChainOfThoughtProps) => {
    const [isOpen, setIsOpen] = useControllableState({
      defaultProp: defaultOpen,
      onChange: onOpenChange,
      prop: open,
    });

    const chainOfThoughtContext = useMemo(
      () => ({ isOpen, setIsOpen }),
      [isOpen, setIsOpen]
    );

    // Diferente do upstream (um Collapsible no header e outro no conteúdo), um
    // único Collapsible na raiz: trigger e painel ficam no mesmo root e o
    // `aria-controls` do header aponta para o painel que existe de fato.
    // O Base UI chama onOpenChange(open, eventDetails); setIsOpen usa só o booleano.
    return (
      <ChainOfThoughtContext.Provider value={chainOfThoughtContext}>
        <Collapsible
          className={cn("not-prose w-full space-y-4", className)}
          onOpenChange={(next) => setIsOpen(next)}
          open={isOpen}
          {...props}
        >
          {children}
        </Collapsible>
      </ChainOfThoughtContext.Provider>
    );
  }
);

// Em ChainOfThoughtHeader e ChainOfThoughtContent: no Base UI, `className` pode ser função do estado; resolve antes de mesclar
// para não perder a classe do consumidor (o clsx descarta funções).
export type ChainOfThoughtHeaderProps = ComponentProps<
  typeof CollapsibleTrigger
>;

export const ChainOfThoughtHeader = memo(
  ({ className, children, ...props }: ChainOfThoughtHeaderProps) => {
    const { isOpen } = useChainOfThought();

    return (
      <CollapsibleTrigger
        className={(state) =>
          cn(
            "flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground",
            typeof className === "function" ? className(state) : className
          )
        }
        {...props}
      >
        <BrainIcon className="size-4" />
        <span className="flex-1 text-left">
          {children ?? "Cadeia de raciocínio"}
        </span>
        <CaretDownIcon
          className={cn(
            "size-4 transition-transform",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </CollapsibleTrigger>
    );
  }
);

export type ChainOfThoughtStepProps = ComponentProps<"div"> & {
  // Componente de ícone do Phosphor (no upstream era LucideIcon).
  icon?: PhosphorIcon;
  label: ReactNode;
  description?: ReactNode;
  status?: "complete" | "active" | "pending";
};

const stepStatusStyles = {
  active: "text-foreground",
  complete: "text-muted-foreground",
  pending: "text-muted-foreground/50",
};

export const ChainOfThoughtStep = memo(
  ({
    className,
    icon: Icon = DotIcon,
    label,
    description,
    status = "complete",
    children,
    ...props
  }: ChainOfThoughtStepProps) => (
    <div
      className={cn(
        "flex gap-2 text-sm",
        stepStatusStyles[status],
        "fade-in-0 slide-in-from-top-2 animate-in",
        className
      )}
      {...props}
    >
      <div className="relative mt-0.5">
        <Icon className="size-4" />
        <div className="absolute top-7 bottom-0 left-1/2 -mx-px w-px bg-border" />
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div>{label}</div>
        {description && (
          <div className="text-muted-foreground text-xs">{description}</div>
        )}
        {children}
      </div>
    </div>
  )
);

export type ChainOfThoughtSearchResultsProps = ComponentProps<"div">;

export const ChainOfThoughtSearchResults = memo(
  ({ className, ...props }: ChainOfThoughtSearchResultsProps) => (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
);

export type ChainOfThoughtSearchResultProps = ComponentProps<typeof Badge>;

export const ChainOfThoughtSearchResult = memo(
  ({ className, children, ...props }: ChainOfThoughtSearchResultProps) => (
    <Badge
      className={cn("gap-1 px-2 py-0.5 font-normal text-xs", className)}
      variant="secondary"
      {...props}
    >
      {children}
    </Badge>
  )
);

export type ChainOfThoughtContentProps = ComponentProps<
  typeof CollapsibleContent
>;

export const ChainOfThoughtContent = memo(
  ({ className, children, ...props }: ChainOfThoughtContentProps) => {
    // Garante o erro de uso fora do ChainOfThought, como no upstream.
    useChainOfThought();

    return (
      <CollapsibleContent
        className={(state) =>
          cn(
            "mt-2 space-y-3",
            "data-closed:fade-out-0 data-closed:slide-out-to-top-2 data-open:slide-in-from-top-2 text-popover-foreground outline-none data-closed:animate-out data-open:animate-in",
            typeof className === "function" ? className(state) : className
          )
        }
        {...props}
      >
        {children}
      </CollapsibleContent>
    );
  }
);

export type ChainOfThoughtImageProps = ComponentProps<"div"> & {
  caption?: string;
};

export const ChainOfThoughtImage = memo(
  ({ className, children, caption, ...props }: ChainOfThoughtImageProps) => (
    <div className={cn("mt-2 space-y-2", className)} {...props}>
      <div className="relative flex max-h-[22rem] items-center justify-center overflow-hidden rounded-lg bg-muted p-3">
        {children}
      </div>
      {caption && <p className="text-muted-foreground text-xs">{caption}</p>}
    </div>
  )
);

ChainOfThought.displayName = "ChainOfThought";
ChainOfThoughtHeader.displayName = "ChainOfThoughtHeader";
ChainOfThoughtStep.displayName = "ChainOfThoughtStep";
ChainOfThoughtSearchResults.displayName = "ChainOfThoughtSearchResults";
ChainOfThoughtSearchResult.displayName = "ChainOfThoughtSearchResult";
ChainOfThoughtContent.displayName = "ChainOfThoughtContent";
ChainOfThoughtImage.displayName = "ChainOfThoughtImage";
