"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/schema-display.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { Badge } from "@blips/ui/components/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { cn } from "@blips/ui/lib/utils";
import { CaretRightIcon } from "@phosphor-icons/react";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface SchemaParameter {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  location?: "path" | "query" | "header";
}

interface SchemaProperty {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  properties?: SchemaProperty[];
  items?: SchemaProperty;
}

interface SchemaDisplayContextType {
  method: HttpMethod;
  path: string;
  description?: string;
  parameters?: SchemaParameter[];
  requestBody?: SchemaProperty[];
  responseBody?: SchemaProperty[];
  requiredLabel: string;
}

const DEFAULT_REQUIRED_LABEL = "obrigatório";

const SchemaDisplayContext = createContext<SchemaDisplayContextType>({
  method: "GET",
  path: "",
  requiredLabel: DEFAULT_REQUIRED_LABEL,
});

const methodStyles: Record<HttpMethod, string> = {
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  PATCH:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PUT: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

const requiredBadgeClassName =
  "bg-red-100 text-red-700 text-xs dark:bg-red-900/30 dark:text-red-400";

const caretClassName =
  "size-4 shrink-0 text-muted-foreground transition-transform group-data-panel-open:rotate-90";

export type SchemaDisplayHeaderProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayHeader = ({
  className,
  children,
  ...props
}: SchemaDisplayHeaderProps) => (
  <div
    className={cn("flex items-center gap-3 border-b px-4 py-3", className)}
    {...props}
  >
    {children}
  </div>
);

export type SchemaDisplayMethodProps = ComponentProps<typeof Badge>;

export const SchemaDisplayMethod = ({
  className,
  children,
  ...props
}: SchemaDisplayMethodProps) => {
  const { method } = useContext(SchemaDisplayContext);

  return (
    <Badge
      className={cn("font-mono text-xs", methodStyles[method], className)}
      variant="secondary"
      {...props}
    >
      {children ?? method}
    </Badge>
  );
};

// Destaca os parâmetros de rota ({id}) com nós React, sem innerHTML.
const highlightPath = (path: string): ReactNode[] =>
  path.split(/(\{[^}]+\})/g).map((segment, index) =>
    /^\{[^}]+\}$/.test(segment) ? (
      <span
        className="text-blue-600 dark:text-blue-400"
        // biome-ignore lint/suspicious/noArrayIndexKey: segmentos estáticos derivados do path
        key={index}
      >
        {segment}
      </span>
    ) : (
      segment
    )
  );

export type SchemaDisplayPathProps = HTMLAttributes<HTMLSpanElement>;

export const SchemaDisplayPath = ({
  className,
  children,
  ...props
}: SchemaDisplayPathProps) => {
  const { path } = useContext(SchemaDisplayContext);

  return (
    <span className={cn("font-mono text-sm", className)} {...props}>
      {children ?? highlightPath(path)}
    </span>
  );
};

export type SchemaDisplayDescriptionProps =
  HTMLAttributes<HTMLParagraphElement>;

export const SchemaDisplayDescription = ({
  className,
  children,
  ...props
}: SchemaDisplayDescriptionProps) => {
  const { description } = useContext(SchemaDisplayContext);

  return (
    <p
      className={cn(
        "border-b px-4 py-3 text-muted-foreground text-sm",
        className
      )}
      {...props}
    >
      {children ?? description}
    </p>
  );
};

export type SchemaDisplayContentProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayContent = ({
  className,
  children,
  ...props
}: SchemaDisplayContentProps) => (
  <div className={cn("divide-y", className)} {...props}>
    {children}
  </div>
);

export type SchemaDisplayParameterProps = HTMLAttributes<HTMLDivElement> &
  SchemaParameter & {
    /** Texto do selo de campo obrigatório. Padrão: o do SchemaDisplay ("obrigatório"). */
    requiredLabel?: string;
  };

export const SchemaDisplayParameter = ({
  name,
  type,
  required,
  description,
  location,
  requiredLabel,
  className,
  ...props
}: SchemaDisplayParameterProps) => {
  const context = useContext(SchemaDisplayContext);

  return (
    <div className={cn("px-4 py-3 pl-10", className)} {...props}>
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm">{name}</span>
        <Badge className="text-xs" variant="outline">
          {type}
        </Badge>
        {location && (
          <Badge className="text-xs" variant="secondary">
            {location}
          </Badge>
        )}
        {required && (
          <Badge className={requiredBadgeClassName} variant="secondary">
            {requiredLabel ?? context.requiredLabel}
          </Badge>
        )}
      </div>
      {description && (
        <p className="mt-1 text-muted-foreground text-sm">{description}</p>
      )}
    </div>
  );
};

export type SchemaDisplayParametersProps = ComponentProps<
  typeof Collapsible
> & {
  /** Título da seção. Padrão: "Parâmetros". */
  label?: ReactNode;
};

export const SchemaDisplayParameters = ({
  className,
  children,
  label = "Parâmetros",
  ...props
}: SchemaDisplayParametersProps) => {
  const { parameters } = useContext(SchemaDisplayContext);

  return (
    <Collapsible className={className} defaultOpen {...props}>
      <CollapsibleTrigger className="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50">
        <CaretRightIcon className={caretClassName} />
        <span className="font-medium text-sm">{label}</span>
        <Badge className="ml-auto text-xs" variant="secondary">
          {parameters?.length}
        </Badge>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="divide-y border-t">
          {children ??
            parameters?.map((param) => (
              <SchemaDisplayParameter key={param.name} {...param} />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export type SchemaDisplayPropertyProps = HTMLAttributes<HTMLDivElement> &
  SchemaProperty & {
    depth?: number;
    /** Texto do selo de campo obrigatório. Padrão: o do SchemaDisplay ("obrigatório"). */
    requiredLabel?: string;
  };

export const SchemaDisplayProperty = ({
  name,
  type,
  required,
  description,
  properties,
  items,
  depth = 0,
  requiredLabel,
  className,
  ...props
}: SchemaDisplayPropertyProps) => {
  const context = useContext(SchemaDisplayContext);
  const resolvedRequiredLabel = requiredLabel ?? context.requiredLabel;
  const hasNested = properties || items;
  const paddingLeft = 40 + depth * 16;

  if (hasNested) {
    return (
      <Collapsible defaultOpen={depth < 2}>
        <CollapsibleTrigger
          className={cn(
            "group flex w-full items-center gap-2 py-3 text-left transition-colors hover:bg-muted/50",
            className
          )}
          style={{ paddingLeft }}
        >
          <CaretRightIcon className={caretClassName} />
          <span className="font-mono text-sm">{name}</span>
          <Badge className="text-xs" variant="outline">
            {type}
          </Badge>
          {required && (
            <Badge className={requiredBadgeClassName} variant="secondary">
              {resolvedRequiredLabel}
            </Badge>
          )}
        </CollapsibleTrigger>
        {description && (
          <p
            className="pb-2 text-muted-foreground text-sm"
            style={{ paddingLeft: paddingLeft + 24 }}
          >
            {description}
          </p>
        )}
        <CollapsibleContent>
          <div className="divide-y border-t">
            {properties?.map((prop) => (
              <SchemaDisplayProperty
                key={prop.name}
                {...prop}
                depth={depth + 1}
                requiredLabel={requiredLabel}
              />
            ))}
            {items && (
              <SchemaDisplayProperty
                {...items}
                depth={depth + 1}
                name={`${name}[]`}
                requiredLabel={requiredLabel}
              />
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div
      className={cn("py-3 pr-4", className)}
      style={{ paddingLeft }}
      {...props}
    >
      <div className="flex items-center gap-2">
        {/* Espaçador para alinhar com as linhas que têm seta */}
        <span className="size-4" />
        <span className="font-mono text-sm">{name}</span>
        <Badge className="text-xs" variant="outline">
          {type}
        </Badge>
        {required && (
          <Badge className={requiredBadgeClassName} variant="secondary">
            {resolvedRequiredLabel}
          </Badge>
        )}
      </div>
      {description && (
        <p className="mt-1 pl-6 text-muted-foreground text-sm">{description}</p>
      )}
    </div>
  );
};

export type SchemaDisplayRequestProps = ComponentProps<typeof Collapsible> & {
  /** Título da seção. Padrão: "Corpo da requisição". */
  label?: ReactNode;
};

export const SchemaDisplayRequest = ({
  className,
  children,
  label = "Corpo da requisição",
  ...props
}: SchemaDisplayRequestProps) => {
  const { requestBody } = useContext(SchemaDisplayContext);

  return (
    <Collapsible className={className} defaultOpen {...props}>
      <CollapsibleTrigger className="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50">
        <CaretRightIcon className={caretClassName} />
        <span className="font-medium text-sm">{label}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-t">
          {children ??
            requestBody?.map((prop) => (
              <SchemaDisplayProperty key={prop.name} {...prop} depth={0} />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export type SchemaDisplayResponseProps = ComponentProps<typeof Collapsible> & {
  /** Título da seção. Padrão: "Resposta". */
  label?: ReactNode;
};

export const SchemaDisplayResponse = ({
  className,
  children,
  label = "Resposta",
  ...props
}: SchemaDisplayResponseProps) => {
  const { responseBody } = useContext(SchemaDisplayContext);

  return (
    <Collapsible className={className} defaultOpen {...props}>
      <CollapsibleTrigger className="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50">
        <CaretRightIcon className={caretClassName} />
        <span className="font-medium text-sm">{label}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-t">
          {children ??
            responseBody?.map((prop) => (
              <SchemaDisplayProperty key={prop.name} {...prop} depth={0} />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export type SchemaDisplayProps = HTMLAttributes<HTMLDivElement> & {
  method: HttpMethod;
  path: string;
  description?: string;
  parameters?: SchemaParameter[];
  requestBody?: SchemaProperty[];
  responseBody?: SchemaProperty[];
  /** Texto do selo de campo obrigatório em todo o schema. Padrão: "obrigatório". */
  requiredLabel?: string;
};

export const SchemaDisplay = ({
  method,
  path,
  description,
  parameters,
  requestBody,
  responseBody,
  requiredLabel = DEFAULT_REQUIRED_LABEL,
  className,
  children,
  ...props
}: SchemaDisplayProps) => {
  const contextValue = useMemo(
    () => ({
      description,
      method,
      parameters,
      path,
      requestBody,
      requiredLabel,
      responseBody,
    }),
    [
      description,
      method,
      parameters,
      path,
      requestBody,
      requiredLabel,
      responseBody,
    ]
  );

  return (
    <SchemaDisplayContext.Provider value={contextValue}>
      <div
        className={cn(
          "overflow-hidden rounded-lg border bg-background",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <SchemaDisplayHeader>
              <div className="flex items-center gap-3">
                <SchemaDisplayMethod />
                <SchemaDisplayPath />
              </div>
            </SchemaDisplayHeader>
            {description && <SchemaDisplayDescription />}
            <SchemaDisplayContent>
              {parameters && parameters.length > 0 && (
                <SchemaDisplayParameters />
              )}
              {requestBody && requestBody.length > 0 && (
                <SchemaDisplayRequest />
              )}
              {responseBody && responseBody.length > 0 && (
                <SchemaDisplayResponse />
              )}
            </SchemaDisplayContent>
          </>
        )}
      </div>
    </SchemaDisplayContext.Provider>
  );
};

export type SchemaDisplayBodyProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayBody = ({
  className,
  children,
  ...props
}: SchemaDisplayBodyProps) => (
  <div className={cn("divide-y", className)} {...props}>
    {children}
  </div>
);

export type SchemaDisplayExampleProps = HTMLAttributes<HTMLPreElement>;

export const SchemaDisplayExample = ({
  className,
  children,
  ...props
}: SchemaDisplayExampleProps) => (
  <pre
    className={cn(
      "mx-4 mb-4 overflow-auto rounded-md bg-muted p-4 font-mono text-sm",
      className
    )}
    {...props}
  >
    {children}
  </pre>
);
