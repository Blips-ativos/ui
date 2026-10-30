"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/voice-selector.tsx @ 6a9d5b1),
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
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog";
import { Spinner } from "@blips/ui/components/spinner";
import { cn } from "@blips/ui/lib/utils";
import {
  DotIcon,
  GenderFemaleIcon,
  GenderIntersexIcon,
  GenderMaleIcon,
  GenderNeuterIcon,
  GenderNonbinaryIcon,
  GenderTransgenderIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useControllableState } from "../lib/use-controllable-state";

interface VoiceSelectorContextValue {
  value: string | undefined;
  setValue: (value: string | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const VoiceSelectorContext = createContext<VoiceSelectorContextValue | null>(
  null
);

export const useVoiceSelector = () => {
  const context = useContext(VoiceSelectorContext);
  if (!context) {
    throw new Error(
      "VoiceSelector components must be used within VoiceSelector"
    );
  }
  return context;
};

// open/onOpenChange do Base UI recebem também os detalhes do evento; aqui
// valem as assinaturas simples do upstream, controladas pelo componente.
export type VoiceSelectorProps = Omit<
  ComponentProps<typeof Dialog>,
  "open" | "onOpenChange" | "defaultOpen"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const VoiceSelector = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: VoiceSelectorProps) => {
  const [value, setValue] = useControllableState<string | undefined>({
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: valueProp,
  });

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => setOpen(nextOpen),
    [setOpen]
  );

  const handleValueChange = useCallback(
    (nextValue: string | undefined) => setValue(nextValue),
    [setValue]
  );

  const voiceSelectorContext = useMemo(
    () => ({
      open,
      setOpen: handleOpenChange,
      setValue: handleValueChange,
      value,
    }),
    [value, handleValueChange, open, handleOpenChange]
  );

  return (
    <VoiceSelectorContext.Provider value={voiceSelectorContext}>
      <Dialog onOpenChange={handleOpenChange} open={open} {...props}>
        {children}
      </Dialog>
    </VoiceSelectorContext.Provider>
  );
};

export type VoiceSelectorTriggerProps = ComponentProps<typeof DialogTrigger>;

export const VoiceSelectorTrigger = (props: VoiceSelectorTriggerProps) => (
  <DialogTrigger {...props} />
);

export type VoiceSelectorContentProps = ComponentProps<typeof DialogContent> & {
  title?: ReactNode;
};

export const VoiceSelectorContent = ({
  className,
  children,
  title = "Seletor de voz",
  ...props
}: VoiceSelectorContentProps) => (
  // O Base UI só liga aria-describedby quando há DialogDescription; o
  // `aria-describedby={undefined}` do upstream (silenciar aviso do Radix) sai.
  <DialogContent className={cn("p-0", className)} {...props}>
    <DialogTitle className="sr-only">{title}</DialogTitle>
    <Command className="**:data-[slot=command-input-wrapper]:h-auto">
      {children}
    </Command>
  </DialogContent>
);

export type VoiceSelectorDialogProps = ComponentProps<typeof CommandDialog>;

export const VoiceSelectorDialog = ({
  title = "Seletor de voz",
  description = "Busque uma voz para selecionar.",
  ...props
}: VoiceSelectorDialogProps) => (
  <CommandDialog description={description} title={title} {...props} />
);

export type VoiceSelectorInputProps = ComponentProps<typeof CommandInput>;

export const VoiceSelectorInput = ({
  className,
  placeholder = "Buscar voz...",
  ...props
}: VoiceSelectorInputProps) => (
  <CommandInput
    className={cn("h-auto py-3.5", className)}
    placeholder={placeholder}
    {...props}
  />
);

export type VoiceSelectorListProps = ComponentProps<typeof CommandList>;

export const VoiceSelectorList = (props: VoiceSelectorListProps) => (
  <CommandList {...props} />
);

export type VoiceSelectorEmptyProps = ComponentProps<typeof CommandEmpty>;

export const VoiceSelectorEmpty = ({
  children = "Nenhuma voz encontrada.",
  ...props
}: VoiceSelectorEmptyProps) => (
  <CommandEmpty {...props}>{children}</CommandEmpty>
);

export type VoiceSelectorGroupProps = ComponentProps<typeof CommandGroup>;

export const VoiceSelectorGroup = (props: VoiceSelectorGroupProps) => (
  <CommandGroup {...props} />
);

export type VoiceSelectorItemProps = ComponentProps<typeof CommandItem>;

export const VoiceSelectorItem = ({
  className,
  ...props
}: VoiceSelectorItemProps) => (
  <CommandItem className={cn("px-4 py-2", className)} {...props} />
);

export type VoiceSelectorShortcutProps = ComponentProps<typeof CommandShortcut>;

export const VoiceSelectorShortcut = (props: VoiceSelectorShortcutProps) => (
  <CommandShortcut {...props} />
);

export type VoiceSelectorSeparatorProps = ComponentProps<
  typeof CommandSeparator
>;

export const VoiceSelectorSeparator = (props: VoiceSelectorSeparatorProps) => (
  <CommandSeparator {...props} />
);

export type VoiceSelectorGenderProps = ComponentProps<"span"> & {
  value?:
    | "male"
    | "female"
    | "transgender"
    | "androgyne"
    | "non-binary"
    | "intersex";
};

export const VoiceSelectorGender = ({
  className,
  value,
  children,
  ...props
}: VoiceSelectorGenderProps) => {
  let icon: ReactNode | null = null;

  switch (value) {
    case "male": {
      icon = <GenderMaleIcon className="size-4" />;
      break;
    }
    case "female": {
      icon = <GenderFemaleIcon className="size-4" />;
      break;
    }
    case "transgender": {
      icon = <GenderTransgenderIcon className="size-4" />;
      break;
    }
    case "androgyne": {
      icon = <GenderNeuterIcon className="size-4" />;
      break;
    }
    case "non-binary": {
      icon = <GenderNonbinaryIcon className="size-4" />;
      break;
    }
    case "intersex": {
      icon = <GenderIntersexIcon className="size-4" />;
      break;
    }
    default: {
      icon = <DotIcon className="size-4" />;
    }
  }

  return (
    <span className={cn("text-muted-foreground text-xs", className)} {...props}>
      {children ?? icon}
    </span>
  );
};

export type VoiceSelectorAccentProps = ComponentProps<"span"> & {
  value?:
    | "american"
    | "british"
    | "australian"
    | "canadian"
    | "irish"
    | "scottish"
    | "indian"
    | "south-african"
    | "new-zealand"
    | "spanish"
    | "french"
    | "german"
    | "italian"
    | "portuguese"
    | "brazilian"
    | "mexican"
    | "argentinian"
    | "japanese"
    | "chinese"
    | "korean"
    | "russian"
    | "arabic"
    | "dutch"
    | "swedish"
    | "norwegian"
    | "danish"
    | "finnish"
    | "polish"
    | "turkish"
    | "greek"
    | string;
};

export const VoiceSelectorAccent = ({
  className,
  value,
  children,
  ...props
}: VoiceSelectorAccentProps) => {
  let emoji: string | null = null;

  switch (value) {
    case "american": {
      emoji = "🇺🇸";
      break;
    }
    case "british": {
      emoji = "🇬🇧";
      break;
    }
    case "australian": {
      emoji = "🇦🇺";
      break;
    }
    case "canadian": {
      emoji = "🇨🇦";
      break;
    }
    case "irish": {
      emoji = "🇮🇪";
      break;
    }
    case "scottish": {
      emoji = "🏴󠁧󠁢󠁳󠁣󠁴󠁿";
      break;
    }
    case "indian": {
      emoji = "🇮🇳";
      break;
    }
    case "south-african": {
      emoji = "🇿🇦";
      break;
    }
    case "new-zealand": {
      emoji = "🇳🇿";
      break;
    }
    case "spanish": {
      emoji = "🇪🇸";
      break;
    }
    case "french": {
      emoji = "🇫🇷";
      break;
    }
    case "german": {
      emoji = "🇩🇪";
      break;
    }
    case "italian": {
      emoji = "🇮🇹";
      break;
    }
    case "portuguese": {
      emoji = "🇵🇹";
      break;
    }
    case "brazilian": {
      emoji = "🇧🇷";
      break;
    }
    case "mexican": {
      emoji = "🇲🇽";
      break;
    }
    case "argentinian": {
      emoji = "🇦🇷";
      break;
    }
    case "japanese": {
      emoji = "🇯🇵";
      break;
    }
    case "chinese": {
      emoji = "🇨🇳";
      break;
    }
    case "korean": {
      emoji = "🇰🇷";
      break;
    }
    case "russian": {
      emoji = "🇷🇺";
      break;
    }
    case "arabic": {
      emoji = "🇸🇦";
      break;
    }
    case "dutch": {
      emoji = "🇳🇱";
      break;
    }
    case "swedish": {
      emoji = "🇸🇪";
      break;
    }
    case "norwegian": {
      emoji = "🇳🇴";
      break;
    }
    case "danish": {
      emoji = "🇩🇰";
      break;
    }
    case "finnish": {
      emoji = "🇫🇮";
      break;
    }
    case "polish": {
      emoji = "🇵🇱";
      break;
    }
    case "turkish": {
      emoji = "🇹🇷";
      break;
    }
    case "greek": {
      emoji = "🇬🇷";
      break;
    }
    default: {
      emoji = null;
    }
  }

  return (
    <span className={cn("text-muted-foreground text-xs", className)} {...props}>
      {children ?? emoji}
    </span>
  );
};

export type VoiceSelectorAgeProps = ComponentProps<"span">;

export const VoiceSelectorAge = ({
  className,
  ...props
}: VoiceSelectorAgeProps) => (
  <span
    className={cn("text-muted-foreground text-xs tabular-nums", className)}
    {...props}
  />
);

export type VoiceSelectorNameProps = ComponentProps<"span">;

export const VoiceSelectorName = ({
  className,
  ...props
}: VoiceSelectorNameProps) => (
  <span
    className={cn("flex-1 truncate text-left font-medium", className)}
    {...props}
  />
);

export type VoiceSelectorDescriptionProps = ComponentProps<"span">;

export const VoiceSelectorDescription = ({
  className,
  ...props
}: VoiceSelectorDescriptionProps) => (
  <span className={cn("text-muted-foreground text-xs", className)} {...props} />
);

export type VoiceSelectorAttributesProps = ComponentProps<"div">;

export const VoiceSelectorAttributes = ({
  className,
  children,
  ...props
}: VoiceSelectorAttributesProps) => (
  <div className={cn("flex items-center text-xs", className)} {...props}>
    {children}
  </div>
);

export type VoiceSelectorBulletProps = ComponentProps<"span">;

export const VoiceSelectorBullet = ({
  className,
  ...props
}: VoiceSelectorBulletProps) => (
  <span
    aria-hidden="true"
    className={cn("select-none text-border", className)}
    {...props}
  >
    &bull;
  </span>
);

export type VoiceSelectorPreviewProps = Omit<
  ComponentProps<"button">,
  "children"
> & {
  playing?: boolean;
  loading?: boolean;
  onPlay?: () => void;
  /** Rótulo acessível para reproduzir a prévia. */
  playLabel?: string;
  /** Rótulo acessível para pausar a prévia. */
  pauseLabel?: string;
  /** Rótulo acessível enquanto a prévia carrega. */
  loadingLabel?: string;
};

export const VoiceSelectorPreview = ({
  className,
  playing,
  loading,
  onPlay,
  onClick,
  playLabel = "Reproduzir prévia",
  pauseLabel = "Pausar prévia",
  loadingLabel = "Carregando prévia",
  ...props
}: VoiceSelectorPreviewProps) => {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClick?.(event);
      onPlay?.();
    },
    [onClick, onPlay]
  );

  let icon = <PlayIcon className="size-3" />;
  let label = playLabel;

  if (loading) {
    // O rótulo acessível fica no botão; o Spinner é decorativo.
    icon = (
      <Spinner aria-hidden="true" className="size-3" role="presentation" />
    );
    label = loadingLabel;
  } else if (playing) {
    icon = <PauseIcon className="size-3" />;
    label = pauseLabel;
  }

  return (
    <Button
      aria-label={label}
      className={cn("size-6", className)}
      disabled={loading}
      onClick={handleClick}
      size="icon-sm"
      type="button"
      variant="outline"
      {...props}
    >
      {icon}
    </Button>
  );
};
