// Adaptado de vercel/ai-elements (packages/elements/src/model-selector.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { Button } from "@blips/ui/components/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@blips/ui/components/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog";
import { cn } from "@blips/ui/lib/utils";
import { XIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";

export type ModelSelectorProps = ComponentProps<typeof Dialog>;

export const ModelSelector = (props: ModelSelectorProps) => (
  <Dialog {...props} />
);

export type ModelSelectorTriggerProps = ComponentProps<typeof DialogTrigger>;

export const ModelSelectorTrigger = (props: ModelSelectorTriggerProps) => (
  <DialogTrigger {...props} />
);

export type ModelSelectorContentProps = ComponentProps<typeof DialogContent> & {
  title?: ReactNode;
  /** Rótulo acessível do botão de fechar. Padrão "Fechar". */
  closeLabel?: string;
};

export const ModelSelectorContent = ({
  className,
  children,
  title = "Selecionar modelo",
  closeLabel = "Fechar",
  showCloseButton = true,
  ...props
}: ModelSelectorContentProps) => (
  <DialogContent
    aria-describedby={undefined}
    className={cn("overflow-hidden p-0", className)}
    // O botão de fechar da @blips/ui traz rótulo fixo em inglês; renderizamos o
    // nosso, com o mesmo visual, para o rótulo sair em pt-BR e ser trocável.
    showCloseButton={false}
    {...props}
  >
    <DialogTitle className="sr-only">{title}</DialogTitle>
    <Command>{children}</Command>
    {showCloseButton && (
      <DialogClose
        render={
          <Button
            className="absolute top-2 right-2"
            size="icon-sm"
            variant="ghost"
          />
        }
      >
        <XIcon />
        <span className="sr-only">{closeLabel}</span>
      </DialogClose>
    )}
  </DialogContent>
);

export type ModelSelectorDialogProps = ComponentProps<typeof CommandDialog>;

export const ModelSelectorDialog = ({
  title = "Selecionar modelo",
  description = "Busque um modelo para usar…",
  ...props
}: ModelSelectorDialogProps) => (
  <CommandDialog description={description} title={title} {...props} />
);

export type ModelSelectorInputProps = ComponentProps<typeof CommandInput>;

export const ModelSelectorInput = ({
  placeholder = "Buscar modelo…",
  ...props
}: ModelSelectorInputProps) => (
  <CommandInput placeholder={placeholder} {...props} />
);

export type ModelSelectorListProps = ComponentProps<typeof CommandList>;

export const ModelSelectorList = (props: ModelSelectorListProps) => (
  <CommandList {...props} />
);

export type ModelSelectorEmptyProps = ComponentProps<typeof CommandEmpty>;

export const ModelSelectorEmpty = ({
  children = "Nenhum modelo encontrado.",
  ...props
}: ModelSelectorEmptyProps) => (
  <CommandEmpty {...props}>{children}</CommandEmpty>
);

export type ModelSelectorGroupProps = ComponentProps<typeof CommandGroup>;

export const ModelSelectorGroup = (props: ModelSelectorGroupProps) => (
  <CommandGroup {...props} />
);

export type ModelSelectorItemProps = ComponentProps<typeof CommandItem>;

export const ModelSelectorItem = (props: ModelSelectorItemProps) => (
  <CommandItem {...props} />
);

export type ModelSelectorShortcutProps = ComponentProps<typeof CommandShortcut>;

export const ModelSelectorShortcut = (props: ModelSelectorShortcutProps) => (
  <CommandShortcut {...props} />
);

export type ModelSelectorSeparatorProps = ComponentProps<
  typeof CommandSeparator
>;

export const ModelSelectorSeparator = (props: ModelSelectorSeparatorProps) => (
  <CommandSeparator {...props} />
);

export type ModelSelectorLogoProps = Omit<ComponentProps<"img">, "src"> & {
  provider:
    | "moonshotai-cn"
    | "lucidquery"
    | "moonshotai"
    | "zai-coding-plan"
    | "alibaba"
    | "xai"
    | "vultr"
    | "nvidia"
    | "upstage"
    | "groq"
    | "github-copilot"
    | "mistral"
    | "vercel"
    | "nebius"
    | "deepseek"
    | "alibaba-cn"
    | "google-vertex-anthropic"
    | "venice"
    | "chutes"
    | "cortecs"
    | "github-models"
    | "togetherai"
    | "azure"
    | "baseten"
    | "huggingface"
    | "opencode"
    | "fastrouter"
    | "google"
    | "google-vertex"
    | "cloudflare-workers-ai"
    | "inception"
    | "wandb"
    | "openai"
    | "zhipuai-coding-plan"
    | "perplexity"
    | "openrouter"
    | "zenmux"
    | "v0"
    | "iflowcn"
    | "synthetic"
    | "deepinfra"
    | "zhipuai"
    | "submodel"
    | "zai"
    | "inference"
    | "requesty"
    | "morph"
    | "lmstudio"
    | "anthropic"
    | "aihubmix"
    | "fireworks-ai"
    | "modelscope"
    | "llama"
    | "scaleway"
    | "amazon-bedrock"
    | "cerebras"
    // `string & {}` mantém o autocomplete dos provedores conhecidos aceitando qualquer string.
    | (string & {});
};

export const ModelSelectorLogo = ({
  provider,
  alt,
  className,
  ...props
}: ModelSelectorLogoProps) => (
  <img
    {...props}
    alt={alt ?? `Logotipo de ${provider}`}
    className={cn("size-3 dark:invert", className)}
    height={12}
    src={`https://models.dev/logos/${provider}.svg`}
    width={12}
  />
);

export type ModelSelectorLogoGroupProps = ComponentProps<"div">;

export const ModelSelectorLogoGroup = ({
  className,
  ...props
}: ModelSelectorLogoGroupProps) => (
  <div
    className={cn(
      "flex shrink-0 items-center -space-x-1 [&>img]:rounded-full [&>img]:bg-background [&>img]:p-px [&>img]:ring-1 dark:[&>img]:bg-foreground",
      className
    )}
    {...props}
  />
);

export type ModelSelectorNameProps = ComponentProps<"span">;

export const ModelSelectorName = ({
  className,
  ...props
}: ModelSelectorNameProps) => (
  <span className={cn("flex-1 truncate text-left", className)} {...props} />
);
