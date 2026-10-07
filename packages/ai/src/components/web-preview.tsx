"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/web-preview.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { Button } from "@blips/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { Input } from "@blips/ui/components/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";
import { cn } from "@blips/ui/lib/utils";
import { CaretDownIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface WebPreviewContextValue {
  url: string;
  setUrl: (url: string) => void;
  consoleOpen: boolean;
  setConsoleOpen: (open: boolean) => void;
}

const WebPreviewContext = createContext<WebPreviewContextValue | null>(null);

const useWebPreview = () => {
  const context = useContext(WebPreviewContext);
  if (!context) {
    throw new Error("WebPreview components must be used within a WebPreview");
  }
  return context;
};

export type WebPreviewProps = ComponentProps<"div"> & {
  defaultUrl?: string;
  onUrlChange?: (url: string) => void;
};

export const WebPreview = ({
  className,
  children,
  defaultUrl = "",
  onUrlChange,
  ...props
}: WebPreviewProps) => {
  const [url, setUrl] = useState(defaultUrl);
  const [consoleOpen, setConsoleOpen] = useState(false);

  const handleUrlChange = useCallback(
    (newUrl: string) => {
      setUrl(newUrl);
      onUrlChange?.(newUrl);
    },
    [onUrlChange]
  );

  const contextValue = useMemo<WebPreviewContextValue>(
    () => ({
      consoleOpen,
      setConsoleOpen,
      setUrl: handleUrlChange,
      url,
    }),
    [consoleOpen, handleUrlChange, url]
  );

  return (
    <WebPreviewContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex size-full flex-col rounded-lg border bg-card",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </WebPreviewContext.Provider>
  );
};

export type WebPreviewNavigationProps = ComponentProps<"div">;

export const WebPreviewNavigation = ({
  className,
  children,
  ...props
}: WebPreviewNavigationProps) => (
  <div
    className={cn("flex items-center gap-1 border-b p-2", className)}
    {...props}
  >
    {children}
  </div>
);

export type WebPreviewNavigationButtonProps = ComponentProps<typeof Button> & {
  tooltip?: string;
};

// No Base UI o trigger renderiza o próprio Button via `render`, sem aninhar um
// <button> dentro de outro. O texto do tooltip também vira o rótulo acessível
// (o botão costuma ter só ícone); passe `aria-label` para trocar.
export const WebPreviewNavigationButton = ({
  onClick,
  disabled,
  tooltip,
  children,
  ...props
}: WebPreviewNavigationButtonProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={tooltip}
            className="h-8 w-8 p-0 hover:text-foreground"
            disabled={disabled}
            onClick={onClick}
            size="sm"
            type="button"
            variant="ghost"
            {...props}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export type WebPreviewUrlProps = ComponentProps<typeof Input>;

export const WebPreviewUrl = ({
  value,
  onChange,
  onKeyDown,
  ...props
}: WebPreviewUrlProps) => {
  const { url, setUrl } = useWebPreview();
  const [prevUrl, setPrevUrl] = useState(url);
  const [inputValue, setInputValue] = useState(url);

  // Sync input value with context URL when it changes externally (derived state pattern)
  if (url !== prevUrl) {
    setPrevUrl(url);
    setInputValue(url);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange?.(event);
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        const target = event.target as HTMLInputElement;
        setUrl(target.value);
      }
      onKeyDown?.(event);
    },
    [setUrl, onKeyDown]
  );

  return (
    <Input
      aria-label="URL"
      className="h-8 flex-1 text-sm"
      onChange={onChange ?? handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Digite a URL..."
      value={value ?? inputValue}
      {...props}
    />
  );
};

export type WebPreviewBodyProps = ComponentProps<"iframe"> & {
  loading?: ReactNode;
};

export const WebPreviewBody = ({
  className,
  loading,
  src,
  ...props
}: WebPreviewBodyProps) => {
  const { url } = useWebPreview();

  return (
    <div className="flex-1">
      <iframe
        className={cn("size-full", className)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        src={(src ?? url) || undefined}
        title="Prévia"
        {...props}
      />
      {loading}
    </div>
  );
};

export type WebPreviewConsoleProps = ComponentProps<"div"> & {
  logs?: {
    level: "log" | "warn" | "error";
    message: string;
    timestamp: Date;
  }[];
  /** Texto do gatilho do console. Padrão: "Console". */
  label?: ReactNode;
  /** Texto exibido quando não há logs. Padrão: "Nenhuma saída no console". */
  emptyMessage?: ReactNode;
};

export const WebPreviewConsole = ({
  className,
  logs = [],
  label = "Console",
  emptyMessage = "Nenhuma saída no console",
  children,
  ...props
}: WebPreviewConsoleProps) => {
  const { consoleOpen, setConsoleOpen } = useWebPreview();

  return (
    <Collapsible
      className={cn("border-t bg-muted/50 font-mono text-sm", className)}
      onOpenChange={setConsoleOpen}
      open={consoleOpen}
      {...props}
    >
      <CollapsibleTrigger
        render={
          <Button
            className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-muted/50"
            variant="ghost"
          />
        }
      >
        {label}
        <CaretDownIcon
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            consoleOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          "px-4 pb-4",
          "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 outline-none data-closed:animate-out data-open:animate-in"
        )}
      >
        <div className="max-h-48 space-y-1 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-muted-foreground">{emptyMessage}</p>
          ) : (
            logs.map((log) => (
              <div
                className={cn(
                  "text-xs",
                  log.level === "error" && "text-destructive",
                  log.level === "warn" && "text-yellow-600",
                  log.level === "log" && "text-foreground"
                )}
                key={`${log.timestamp.getTime()}-${log.level}-${log.message}`}
              >
                <span className="text-muted-foreground">
                  {log.timestamp.toLocaleTimeString("pt-BR")}
                </span>{" "}
                {log.message}
              </div>
            ))
          )}
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
