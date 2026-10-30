"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/test-results.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { Badge } from "@blips/ui/components/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { cn } from "@blips/ui/lib/utils";
import {
  CaretRightIcon,
  CheckCircleIcon,
  CircleIcon,
  RecordIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

type TestStatus = "passed" | "failed" | "skipped" | "running";

interface TestResultsSummary {
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  duration?: number;
}

// Rótulos das contagens por status (padrão em pt-BR; troque pela prop `labels`).
export interface TestResultsLabels {
  passed: string;
  failed: string;
  skipped: string;
}

const defaultLabels: TestResultsLabels = {
  failed: "com falha",
  passed: "aprovados",
  skipped: "ignorados",
};

interface TestResultsContextType {
  summary?: TestResultsSummary;
}

const TestResultsContext = createContext<TestResultsContextType>({});

const numberFormat = new Intl.NumberFormat("pt-BR");
const secondsFormat = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const formatDuration = (ms: number) => {
  if (ms < 1000) {
    return `${numberFormat.format(ms)} ms`;
  }
  return `${secondsFormat.format(ms / 1000)} s`;
};

export type TestResultsHeaderProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsHeader = ({
  className,
  children,
  ...props
}: TestResultsHeaderProps) => (
  <div
    className={cn(
      "flex items-center justify-between border-b px-4 py-3",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type TestResultsDurationProps = HTMLAttributes<HTMLSpanElement>;

export const TestResultsDuration = ({
  className,
  children,
  ...props
}: TestResultsDurationProps) => {
  const { summary } = useContext(TestResultsContext);

  if (!summary?.duration) {
    return null;
  }

  return (
    <span className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children ?? formatDuration(summary.duration)}
    </span>
  );
};

export type TestResultsSummaryProps = HTMLAttributes<HTMLDivElement> & {
  /** Rótulos das contagens. Padrão: "aprovados", "com falha", "ignorados". */
  labels?: Partial<TestResultsLabels>;
};

export const TestResultsSummary = ({
  className,
  children,
  labels,
  ...props
}: TestResultsSummaryProps) => {
  const { summary } = useContext(TestResultsContext);

  if (!summary) {
    return null;
  }

  const l = { ...defaultLabels, ...labels };

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {children ?? (
        <>
          <Badge
            className="gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            variant="secondary"
          >
            <CheckCircleIcon className="size-3" />
            {summary.passed} {l.passed}
          </Badge>
          {summary.failed > 0 && (
            <Badge
              className="gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              variant="secondary"
            >
              <XCircleIcon className="size-3" />
              {summary.failed} {l.failed}
            </Badge>
          )}
          {summary.skipped > 0 && (
            <Badge
              className="gap-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              variant="secondary"
            >
              <CircleIcon className="size-3" />
              {summary.skipped} {l.skipped}
            </Badge>
          )}
        </>
      )}
    </div>
  );
};

export type TestResultsProps = HTMLAttributes<HTMLDivElement> & {
  summary?: TestResultsSummary;
};

export const TestResults = ({
  summary,
  className,
  children,
  ...props
}: TestResultsProps) => {
  const contextValue = useMemo(() => ({ summary }), [summary]);

  return (
    <TestResultsContext.Provider value={contextValue}>
      <div
        className={cn("rounded-lg border bg-background", className)}
        {...props}
      >
        {children ??
          (summary && (
            <TestResultsHeader>
              <TestResultsSummary />
              <TestResultsDuration />
            </TestResultsHeader>
          ))}
      </div>
    </TestResultsContext.Provider>
  );
};

export type TestResultsProgressProps = HTMLAttributes<HTMLDivElement> & {
  /** Texto abaixo da barra. Padrão: "{aprovados}/{total} testes aprovados". */
  formatLabel?: (passed: number, total: number) => ReactNode;
};

const defaultProgressLabel = (passed: number, total: number) =>
  `${passed}/${total} testes aprovados`;

export const TestResultsProgress = ({
  className,
  children,
  formatLabel = defaultProgressLabel,
  ...props
}: TestResultsProgressProps) => {
  const { summary } = useContext(TestResultsContext);

  if (!summary) {
    return null;
  }

  // Evita NaN quando não há testes.
  const passedPercent =
    summary.total > 0 ? (summary.passed / summary.total) * 100 : 0;
  const failedPercent =
    summary.total > 0 ? (summary.failed / summary.total) * 100 : 0;

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children ?? (
        <>
          <div className="flex h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="bg-green-500 transition-all"
              style={{ width: `${passedPercent}%` }}
            />
            <div
              className="bg-red-500 transition-all"
              style={{ width: `${failedPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-muted-foreground text-xs">
            <span>{formatLabel(summary.passed, summary.total)}</span>
            <span>{passedPercent.toFixed(0)}%</span>
          </div>
        </>
      )}
    </div>
  );
};

export type TestResultsContentProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsContent = ({
  className,
  children,
  ...props
}: TestResultsContentProps) => (
  <div className={cn("space-y-2 p-4", className)} {...props}>
    {children}
  </div>
);

interface TestSuiteContextType {
  name: string;
  status: TestStatus;
}

const TestSuiteContext = createContext<TestSuiteContextType>({
  name: "",
  status: "passed",
});

const statusStyles: Record<TestStatus, string> = {
  failed: "text-red-600 dark:text-red-400",
  passed: "text-green-600 dark:text-green-400",
  running: "text-blue-600 dark:text-blue-400",
  skipped: "text-yellow-600 dark:text-yellow-400",
};

const statusIcons: Record<TestStatus, ReactNode> = {
  failed: <XCircleIcon className="size-4" />,
  passed: <CheckCircleIcon className="size-4" />,
  running: <RecordIcon className="size-4 animate-pulse" />,
  skipped: <CircleIcon className="size-4" />,
};

const TestStatusIcon = ({ status }: { status: TestStatus }) => (
  <span className={cn("shrink-0", statusStyles[status])}>
    {statusIcons[status]}
  </span>
);

export type TestSuiteProps = ComponentProps<typeof Collapsible> & {
  name: string;
  status: TestStatus;
};

// No Base UI, `className` pode ser função do estado; resolve antes de mesclar
// para não perder a classe do consumidor (o clsx descarta funções).
export const TestSuite = ({
  name,
  status,
  className,
  children,
  ...props
}: TestSuiteProps) => {
  const contextValue = useMemo(() => ({ name, status }), [name, status]);

  return (
    <TestSuiteContext.Provider value={contextValue}>
      <Collapsible
        className={(state) =>
          cn(
            "rounded-lg border",
            typeof className === "function" ? className(state) : className
          )
        }
        {...props}
      >
        {children}
      </Collapsible>
    </TestSuiteContext.Provider>
  );
};

export type TestSuiteNameProps = ComponentProps<typeof CollapsibleTrigger>;

export const TestSuiteName = ({
  className,
  children,
  ...props
}: TestSuiteNameProps) => {
  const { name, status } = useContext(TestSuiteContext);

  return (
    <CollapsibleTrigger
      className={(state) =>
        cn(
          "group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    >
      {/* No Base UI o trigger expõe `data-panel-open` (não `data-state`). */}
      <CaretRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-data-panel-open:rotate-90" />
      <TestStatusIcon status={status} />
      <span className="font-medium text-sm">{children ?? name}</span>
    </CollapsibleTrigger>
  );
};

export type TestSuiteStatsProps = HTMLAttributes<HTMLDivElement> & {
  passed?: number;
  failed?: number;
  skipped?: number;
  /** Rótulos das contagens. Padrão: "aprovados", "com falha", "ignorados". */
  labels?: Partial<TestResultsLabels>;
};

export const TestSuiteStats = ({
  passed = 0,
  failed = 0,
  skipped = 0,
  labels,
  className,
  children,
  ...props
}: TestSuiteStatsProps) => {
  const l = { ...defaultLabels, ...labels };

  return (
    <div
      className={cn("ml-auto flex items-center gap-2 text-xs", className)}
      {...props}
    >
      {children ?? (
        <>
          {passed > 0 && (
            <span className="text-green-600 dark:text-green-400">
              {passed} {l.passed}
            </span>
          )}
          {failed > 0 && (
            <span className="text-red-600 dark:text-red-400">
              {failed} {l.failed}
            </span>
          )}
          {skipped > 0 && (
            <span className="text-yellow-600 dark:text-yellow-400">
              {skipped} {l.skipped}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export type TestSuiteContentProps = ComponentProps<typeof CollapsibleContent>;

export const TestSuiteContent = ({
  className,
  children,
  ...props
}: TestSuiteContentProps) => (
  <CollapsibleContent
    className={(state) =>
      cn(
        "border-t",
        typeof className === "function" ? className(state) : className
      )
    }
    {...props}
  >
    <div className="divide-y">{children}</div>
  </CollapsibleContent>
);

interface TestContextType {
  name: string;
  status: TestStatus;
  duration?: number;
}

const TestContext = createContext<TestContextType>({
  name: "",
  status: "passed",
});

export type TestNameProps = HTMLAttributes<HTMLSpanElement>;

export const TestName = ({ className, children, ...props }: TestNameProps) => {
  const { name } = useContext(TestContext);

  return (
    <span className={cn("flex-1", className)} {...props}>
      {children ?? name}
    </span>
  );
};

export type TestDurationProps = HTMLAttributes<HTMLSpanElement>;

export const TestDuration = ({
  className,
  children,
  ...props
}: TestDurationProps) => {
  const { duration } = useContext(TestContext);

  if (duration === undefined) {
    return null;
  }

  return (
    <span
      className={cn("ml-auto text-muted-foreground text-xs", className)}
      {...props}
    >
      {children ?? `${numberFormat.format(duration)} ms`}
    </span>
  );
};

export type TestStatusProps = HTMLAttributes<HTMLSpanElement>;

export const TestStatus = ({
  className,
  children,
  ...props
}: TestStatusProps) => {
  const { status } = useContext(TestContext);

  return (
    <span
      className={cn("shrink-0", statusStyles[status], className)}
      {...props}
    >
      {children ?? statusIcons[status]}
    </span>
  );
};

export type TestProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  status: TestStatus;
  duration?: number;
};

export const Test = ({
  name,
  status,
  duration,
  className,
  children,
  ...props
}: TestProps) => {
  const contextValue = useMemo(
    () => ({ duration, name, status }),
    [duration, name, status]
  );

  return (
    <TestContext.Provider value={contextValue}>
      <div
        className={cn("flex items-center gap-2 px-4 py-2 text-sm", className)}
        {...props}
      >
        {children ?? (
          <>
            <TestStatus />
            <TestName />
            {duration !== undefined && <TestDuration />}
          </>
        )}
      </div>
    </TestContext.Provider>
  );
};

export type TestErrorProps = HTMLAttributes<HTMLDivElement>;

export const TestError = ({
  className,
  children,
  ...props
}: TestErrorProps) => (
  <div
    className={cn(
      "mt-2 rounded-md bg-red-50 p-3 dark:bg-red-900/20",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type TestErrorMessageProps = HTMLAttributes<HTMLParagraphElement>;

export const TestErrorMessage = ({
  className,
  children,
  ...props
}: TestErrorMessageProps) => (
  <p
    className={cn(
      "font-medium text-red-700 text-sm dark:text-red-400",
      className
    )}
    {...props}
  >
    {children}
  </p>
);

export type TestErrorStackProps = HTMLAttributes<HTMLPreElement>;

export const TestErrorStack = ({
  className,
  children,
  ...props
}: TestErrorStackProps) => (
  <pre
    className={cn(
      "mt-2 overflow-auto font-mono text-red-600 text-xs dark:text-red-400",
      className
    )}
    {...props}
  >
    {children}
  </pre>
);
