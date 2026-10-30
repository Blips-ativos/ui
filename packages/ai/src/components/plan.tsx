"use client";
// Adaptado de vercel/ai-elements (packages/elements/src/plan.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { cn } from "@blips/ui/lib/utils";
import { CaretUpDownIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import { createContext, useContext, useMemo } from "react";

import { Shimmer } from "./shimmer";

interface PlanContextValue {
  isStreaming: boolean;
}

const PlanContext = createContext<PlanContextValue | null>(null);

const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("Plan components must be used within Plan");
  }
  return context;
};

export type PlanProps = ComponentProps<typeof Collapsible> & {
  isStreaming?: boolean;
};

export const Plan = ({
  className,
  isStreaming = false,
  children,
  ...props
}: PlanProps) => {
  const contextValue = useMemo(() => ({ isStreaming }), [isStreaming]);

  // O Collapsible renderiza o Card (render prop do Base UI).
  // `className` do Base UI pode ser função do estado; resolve antes de mesclar.
  return (
    <PlanContext.Provider value={contextValue}>
      <Collapsible
        className={(state) =>
          cn(
            "shadow-none",
            typeof className === "function" ? className(state) : className
          )
        }
        data-slot="plan"
        render={<Card />}
        {...props}
      >
        {children}
      </Collapsible>
    </PlanContext.Provider>
  );
};

export type PlanHeaderProps = ComponentProps<typeof CardHeader>;

export const PlanHeader = ({ className, ...props }: PlanHeaderProps) => (
  <CardHeader
    className={cn("flex items-start justify-between", className)}
    data-slot="plan-header"
    {...props}
  />
);

export type PlanTitleProps = Omit<
  ComponentProps<typeof CardTitle>,
  "children"
> & {
  children: string;
};

export const PlanTitle = ({ children, ...props }: PlanTitleProps) => {
  const { isStreaming } = usePlan();

  return (
    <CardTitle data-slot="plan-title" {...props}>
      {isStreaming ? <Shimmer>{children}</Shimmer> : children}
    </CardTitle>
  );
};

export type PlanDescriptionProps = Omit<
  ComponentProps<typeof CardDescription>,
  "children"
> & {
  children: string;
};

export const PlanDescription = ({
  className,
  children,
  ...props
}: PlanDescriptionProps) => {
  const { isStreaming } = usePlan();

  return (
    <CardDescription
      className={cn("text-balance", className)}
      data-slot="plan-description"
      {...props}
    >
      {isStreaming ? <Shimmer>{children}</Shimmer> : children}
    </CardDescription>
  );
};

export type PlanActionProps = ComponentProps<typeof CardAction>;

export const PlanAction = (props: PlanActionProps) => (
  <CardAction data-slot="plan-action" {...props} />
);

export type PlanContentProps = ComponentProps<typeof CardContent>;

export const PlanContent = (props: PlanContentProps) => (
  <CollapsibleContent
    render={<CardContent data-slot="plan-content" {...props} />}
  />
);

export type PlanFooterProps = ComponentProps<"div">;

export const PlanFooter = (props: PlanFooterProps) => (
  <CardFooter data-slot="plan-footer" {...props} />
);

export type PlanTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
  // Texto para leitores de tela (no upstream era fixo em inglês).
  label?: string;
};

export const PlanTrigger = ({
  className,
  label = "Alternar plano",
  ...props
}: PlanTriggerProps) => (
  <CollapsibleTrigger
    className={(state) =>
      cn(
        "size-8",
        typeof className === "function" ? className(state) : className
      )
    }
    data-slot="plan-trigger"
    render={<Button size="icon" variant="ghost" />}
    {...props}
  >
    <CaretUpDownIcon className="size-4" />
    <span className="sr-only">{label}</span>
  </CollapsibleTrigger>
);
