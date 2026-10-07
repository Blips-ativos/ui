"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/context.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { Button } from "@blips/ui/components/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@blips/ui/components/hover-card";
import { Progress } from "@blips/ui/components/progress";
import { cn } from "@blips/ui/lib/utils";
import type { LanguageModelUsage } from "ai";
import type { ComponentProps, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { getUsage } from "tokenlens";

const PERCENT_MAX = 100;
const ICON_RADIUS = 10;
const ICON_VIEWBOX = 24;
const ICON_CENTER = 12;
const ICON_STROKE_WIDTH = 2;

type ModelId = string;

interface ContextSchema {
  usedTokens: number;
  maxTokens: number;
  usage?: LanguageModelUsage;
  modelId?: ModelId;
  /**
   * Locale da formatação de números, porcentagem e custo. Padrão: "pt-BR".
   * O custo vem do tokenlens sempre em dólar; só a formatação muda (ex.: "US$ 0,01").
   */
  locale?: string;
}

const DEFAULT_LOCALE = "pt-BR";

const formatPercent = (locale: string, value: number) =>
  new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    style: "percent",
  }).format(value);

const formatCompact = (locale: string, value: number) =>
  new Intl.NumberFormat(locale, { notation: "compact" }).format(value);

const formatUSD = (locale: string, value: number) =>
  new Intl.NumberFormat(locale, { currency: "USD", style: "currency" }).format(
    value
  );

const ContextContext = createContext<
  (ContextSchema & { locale: string }) | null
>(null);

const useContextValue = () => {
  const context = useContext(ContextContext);

  if (!context) {
    throw new Error("Os componentes Context precisam estar dentro de Context");
  }

  return context;
};

export type ContextProps = ComponentProps<typeof HoverCard> & ContextSchema;

export const Context = ({
  usedTokens,
  maxTokens,
  usage,
  modelId,
  locale = DEFAULT_LOCALE,
  ...props
}: ContextProps) => {
  const contextValue = useMemo(
    () => ({ locale, maxTokens, modelId, usage, usedTokens }),
    [locale, maxTokens, modelId, usage, usedTokens]
  );

  return (
    <ContextContext.Provider value={contextValue}>
      <HoverCard {...props} />
    </ContextContext.Provider>
  );
};

const ContextIcon = ({ label }: { label: string }) => {
  const { usedTokens, maxTokens } = useContextValue();
  const circumference = 2 * Math.PI * ICON_RADIUS;
  const usedPercent = usedTokens / maxTokens;
  const dashOffset = circumference * (1 - usedPercent);

  return (
    <svg
      aria-label={label}
      height="20"
      role="img"
      style={{ color: "currentcolor" }}
      viewBox={`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`}
      width="20"
    >
      <circle
        cx={ICON_CENTER}
        cy={ICON_CENTER}
        fill="none"
        opacity="0.25"
        r={ICON_RADIUS}
        stroke="currentColor"
        strokeWidth={ICON_STROKE_WIDTH}
      />
      <circle
        cx={ICON_CENTER}
        cy={ICON_CENTER}
        fill="none"
        opacity="0.7"
        r={ICON_RADIUS}
        stroke="currentColor"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        strokeWidth={ICON_STROKE_WIDTH}
        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
      />
    </svg>
  );
};

// No Base UI os atrasos de abrir/fechar ficam no trigger (no Radix ficavam na
// raiz); o padrão 0/0 do upstream foi movido para cá.
export type ContextTriggerProps = ComponentProps<typeof Button> &
  Pick<ComponentProps<typeof HoverCardTrigger>, "closeDelay" | "delay"> & {
    /** `aria-label` do ícone de anel. Padrão: "Uso do contexto do modelo". */
    iconLabel?: string;
  };

export const ContextTrigger = ({
  children,
  closeDelay = 0,
  delay = 0,
  iconLabel = "Uso do contexto do modelo",
  ...props
}: ContextTriggerProps) => {
  const { usedTokens, maxTokens, locale } = useContextValue();
  const usedPercent = usedTokens / maxTokens;
  const renderedPercent = formatPercent(locale, usedPercent);

  if (children) {
    return (
      <HoverCardTrigger closeDelay={closeDelay} delay={delay}>
        {children}
      </HoverCardTrigger>
    );
  }

  // O botão vira o próprio trigger via `render` (como o Slot do Radix fazia), em
  // vez de ficar aninhado dentro do <a> padrão do PreviewCard.
  return (
    <HoverCardTrigger
      closeDelay={closeDelay}
      delay={delay}
      render={<Button type="button" variant="ghost" {...props} />}
    >
      <span className="font-medium text-muted-foreground">
        {renderedPercent}
      </span>
      <ContextIcon label={iconLabel} />
    </HoverCardTrigger>
  );
};

// `className` só string: o HoverCardContent da @blips/ui mescla com `cn` (clsx), que
// descarta funções; uma função do estado sumiria junto com as classes padrão.
export type ContextContentProps = Omit<
  ComponentProps<typeof HoverCardContent>,
  "className"
> & { className?: string };

export const ContextContent = ({
  className,
  ...props
}: ContextContentProps) => (
  <HoverCardContent
    className={cn("min-w-60 divide-y overflow-hidden p-0", className)}
    {...props}
  />
);

export type ContextContentHeaderProps = ComponentProps<"div">;

export const ContextContentHeader = ({
  children,
  className,
  ...props
}: ContextContentHeaderProps) => {
  const { usedTokens, maxTokens, locale } = useContextValue();
  const usedPercent = usedTokens / maxTokens;
  const displayPct = formatPercent(locale, usedPercent);
  const used = formatCompact(locale, usedTokens);
  const total = formatCompact(locale, maxTokens);

  return (
    <div className={cn("w-full space-y-2 p-3", className)} {...props}>
      {children ?? (
        <>
          <div className="flex items-center justify-between gap-3 text-xs">
            <p>{displayPct}</p>
            <p className="font-mono text-muted-foreground">
              {used} / {total}
            </p>
          </div>
          <div className="space-y-2">
            {/* Sem o `bg-muted` do upstream: na @blips/ui a raiz do Progress envolve a
                trilha (que já é bg-muted e arredondada); o fundo na raiz vazava nos cantos. */}
            <Progress value={usedPercent * PERCENT_MAX} />
          </div>
        </>
      )}
    </div>
  );
};

export type ContextContentBodyProps = ComponentProps<"div">;

export const ContextContentBody = ({
  children,
  className,
  ...props
}: ContextContentBodyProps) => (
  <div className={cn("w-full p-3", className)} {...props}>
    {children}
  </div>
);

export type ContextContentFooterProps = ComponentProps<"div"> & {
  /** Rótulo do custo total. Padrão: "Custo total". */
  label?: ReactNode;
};

export const ContextContentFooter = ({
  children,
  className,
  label = "Custo total",
  ...props
}: ContextContentFooterProps) => {
  const { modelId, usage, locale } = useContextValue();
  const costUSD = modelId
    ? getUsage({
        modelId,
        usage: {
          input: usage?.inputTokens ?? 0,
          output: usage?.outputTokens ?? 0,
        },
      }).costUSD?.totalUSD
    : undefined;
  const totalCost = formatUSD(locale, costUSD ?? 0);

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-3 bg-secondary p-3 text-xs",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span className="text-muted-foreground">{label}</span>
          <span>{totalCost}</span>
        </>
      )}
    </div>
  );
};

const TokensWithCost = ({
  tokens,
  costText,
  locale,
}: {
  tokens?: number;
  costText?: string;
  locale: string;
}) => (
  <span>
    {tokens === undefined ? "—" : formatCompact(locale, tokens)}
    {costText ? (
      <span className="ml-2 text-muted-foreground">• {costText}</span>
    ) : null}
  </span>
);

export type ContextInputUsageProps = ComponentProps<"div"> & {
  /** Rótulo da linha. Padrão: "Entrada". */
  label?: ReactNode;
};

export const ContextInputUsage = ({
  className,
  children,
  label = "Entrada",
  ...props
}: ContextInputUsageProps) => {
  const { usage, modelId, locale } = useContextValue();
  const inputTokens = usage?.inputTokens ?? 0;

  if (children) {
    return children;
  }

  if (!inputTokens) {
    return null;
  }

  const inputCost = modelId
    ? getUsage({
        modelId,
        usage: { input: inputTokens, output: 0 },
      }).costUSD?.totalUSD
    : undefined;
  const inputCostText = formatUSD(locale, inputCost ?? 0);

  return (
    <div
      className={cn("flex items-center justify-between text-xs", className)}
      {...props}
    >
      <span className="text-muted-foreground">{label}</span>
      <TokensWithCost
        locale={locale}
        costText={inputCostText}
        tokens={inputTokens}
      />
    </div>
  );
};

export type ContextOutputUsageProps = ComponentProps<"div"> & {
  /** Rótulo da linha. Padrão: "Saída". */
  label?: ReactNode;
};

export const ContextOutputUsage = ({
  className,
  children,
  label = "Saída",
  ...props
}: ContextOutputUsageProps) => {
  const { usage, modelId, locale } = useContextValue();
  const outputTokens = usage?.outputTokens ?? 0;

  if (children) {
    return children;
  }

  if (!outputTokens) {
    return null;
  }

  const outputCost = modelId
    ? getUsage({
        modelId,
        usage: { input: 0, output: outputTokens },
      }).costUSD?.totalUSD
    : undefined;
  const outputCostText = formatUSD(locale, outputCost ?? 0);

  return (
    <div
      className={cn("flex items-center justify-between text-xs", className)}
      {...props}
    >
      <span className="text-muted-foreground">{label}</span>
      <TokensWithCost
        locale={locale}
        costText={outputCostText}
        tokens={outputTokens}
      />
    </div>
  );
};

export type ContextReasoningUsageProps = ComponentProps<"div"> & {
  /** Rótulo da linha. Padrão: "Raciocínio". */
  label?: ReactNode;
};

export const ContextReasoningUsage = ({
  className,
  children,
  label = "Raciocínio",
  ...props
}: ContextReasoningUsageProps) => {
  const { usage, modelId, locale } = useContextValue();
  // Campo de detalhe: existe no ai 6 e 7 (o `reasoningTokens` de topo saiu no 7).
  const reasoningTokens = usage?.outputTokenDetails?.reasoningTokens ?? 0;

  if (children) {
    return children;
  }

  if (!reasoningTokens) {
    return null;
  }

  const reasoningCost = modelId
    ? getUsage({
        modelId,
        usage: { reasoningTokens },
      }).costUSD?.totalUSD
    : undefined;
  const reasoningCostText = formatUSD(locale, reasoningCost ?? 0);

  return (
    <div
      className={cn("flex items-center justify-between text-xs", className)}
      {...props}
    >
      <span className="text-muted-foreground">{label}</span>
      <TokensWithCost
        locale={locale}
        costText={reasoningCostText}
        tokens={reasoningTokens}
      />
    </div>
  );
};

export type ContextCacheUsageProps = ComponentProps<"div"> & {
  /** Rótulo da linha. Padrão: "Cache". */
  label?: ReactNode;
};

export const ContextCacheUsage = ({
  className,
  children,
  label = "Cache",
  ...props
}: ContextCacheUsageProps) => {
  const { usage, modelId, locale } = useContextValue();
  // Campo de detalhe: existe no ai 6 e 7 (o `cachedInputTokens` saiu no 7).
  const cacheTokens = usage?.inputTokenDetails?.cacheReadTokens ?? 0;

  if (children) {
    return children;
  }

  if (!cacheTokens) {
    return null;
  }

  const cacheCost = modelId
    ? getUsage({
        modelId,
        usage: { cacheReads: cacheTokens, input: 0, output: 0 },
      }).costUSD?.totalUSD
    : undefined;
  const cacheCostText = formatUSD(locale, cacheCost ?? 0);

  return (
    <div
      className={cn("flex items-center justify-between text-xs", className)}
      {...props}
    >
      <span className="text-muted-foreground">{label}</span>
      <TokensWithCost
        locale={locale}
        costText={cacheCostText}
        tokens={cacheTokens}
      />
    </div>
  );
};
