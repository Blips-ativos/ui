"use client";
// Adaptado de vercel/ai-elements (packages/elements/src/agent.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@blips/ui/components/accordion";
import { Badge } from "@blips/ui/components/badge";
import { cn } from "@blips/ui/lib/utils";
import { RobotIcon } from "@phosphor-icons/react";
import type { Tool } from "ai";
import type { ComponentProps, ReactNode } from "react";
import { memo } from "react";

import { CodeBlock } from "./code-block";

export type AgentProps = ComponentProps<"div">;

export const Agent = memo(({ className, ...props }: AgentProps) => (
  <div
    className={cn("not-prose w-full rounded-md border", className)}
    {...props}
  />
));

export type AgentHeaderProps = ComponentProps<"div"> & {
  name: string;
  model?: string;
};

export const AgentHeader = memo(
  ({ className, name, model, ...props }: AgentHeaderProps) => (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-4 p-3",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <RobotIcon className="size-4 text-muted-foreground" />
        <span className="font-medium text-sm">{name}</span>
        {model && (
          <Badge className="font-mono text-xs" variant="secondary">
            {model}
          </Badge>
        )}
      </div>
    </div>
  )
);

export type AgentContentProps = ComponentProps<"div">;

export const AgentContent = memo(
  ({ className, ...props }: AgentContentProps) => (
    <div className={cn("space-y-4 p-4 pt-0", className)} {...props} />
  )
);

export type AgentInstructionsProps = ComponentProps<"div"> & {
  children: string;
  // Rótulo da seção (no upstream era fixo em inglês).
  label?: ReactNode;
};

export const AgentInstructions = memo(
  ({
    className,
    children,
    label = "Instruções",
    ...props
  }: AgentInstructionsProps) => (
    <div className={cn("space-y-2", className)} {...props}>
      <span className="font-medium text-muted-foreground text-sm">{label}</span>
      <div className="rounded-md bg-muted/50 p-3 text-muted-foreground text-sm">
        <p>{children}</p>
      </div>
    </div>
  )
);

// No Base UI o `className` do Accordion pode ser função do estado; aqui ele vai
// para o wrapper <div> (como no upstream), então fica restrito a string.
export type AgentToolsProps = Omit<
  ComponentProps<typeof Accordion>,
  "className"
> & {
  className?: string;
  // Rótulo da seção (no upstream era fixo em inglês).
  label?: ReactNode;
};

export const AgentTools = memo(
  ({ className, label = "Ferramentas", ...props }: AgentToolsProps) => (
    <div className={cn("space-y-2", className)}>
      <span className="font-medium text-muted-foreground text-sm">{label}</span>
      <Accordion className="rounded-md border" {...props} />
    </div>
  )
);

export type AgentToolProps = ComponentProps<typeof AccordionItem> & {
  tool: Tool;
  // Texto exibido quando a ferramenta não tem descrição.
  emptyDescription?: ReactNode;
};

export const AgentTool = memo(
  ({
    className,
    tool,
    value,
    emptyDescription = "Sem descrição",
    ...props
  }: AgentToolProps) => {
    const schema =
      "jsonSchema" in tool && tool.jsonSchema
        ? tool.jsonSchema
        : tool.inputSchema;

    // `className` do Base UI pode ser função do estado; resolve antes de mesclar.
    // Na versão atual do `ai`, `description` também pode ser função (resolvida
    // em runtime pelo SDK); aqui só a string é exibida, senão cai no texto padrão.
    return (
      <AccordionItem
        className={(state) =>
          cn(
            "border-b last:border-b-0",
            typeof className === "function" ? className(state) : className
          )
        }
        value={value}
        {...props}
      >
        <AccordionTrigger className="px-3 py-2 text-sm hover:no-underline">
          {typeof tool.description === "string"
            ? tool.description
            : emptyDescription}
        </AccordionTrigger>
        <AccordionContent className="px-3 pb-3">
          <div className="rounded-md bg-muted/50">
            <CodeBlock code={JSON.stringify(schema, null, 2)} language="json" />
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }
);

export type AgentOutputProps = ComponentProps<"div"> & {
  schema: string;
  // Rótulo da seção (no upstream era fixo em inglês).
  label?: ReactNode;
};

export const AgentOutput = memo(
  ({
    className,
    schema,
    label = "Schema de saída",
    ...props
  }: AgentOutputProps) => (
    <div className={cn("space-y-2", className)} {...props}>
      <span className="font-medium text-muted-foreground text-sm">{label}</span>
      <div className="rounded-md bg-muted/50">
        <CodeBlock code={schema} language="typescript" />
      </div>
    </div>
  )
);

Agent.displayName = "Agent";
AgentHeader.displayName = "AgentHeader";
AgentContent.displayName = "AgentContent";
AgentInstructions.displayName = "AgentInstructions";
AgentTools.displayName = "AgentTools";
AgentTool.displayName = "AgentTool";
AgentOutput.displayName = "AgentOutput";
