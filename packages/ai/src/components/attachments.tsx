"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/attachments.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import {
  AttachmentAction,
  Attachment as AttachmentBase,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@blips/ui/components/attachment";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@blips/ui/components/hover-card";
import { cn } from "@blips/ui/lib/utils";
import {
  FileTextIcon,
  GlobeIcon,
  type Icon,
  ImageIcon,
  MusicNotesIcon,
  PaperclipIcon,
  VideoIcon,
  XIcon,
} from "@phosphor-icons/react";
import type { FileUIPart, SourceDocumentUIPart } from "ai";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

// A casca do anexo é a da @blips/ui, reexportada com a mesma identidade: não
// existe uma segunda família Attachment no @blips/ai. Este arquivo acrescenta
// só o que é de IA: partes FileUIPart/SourceDocumentUIPart, prévia e remoção.
export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@blips/ui/components/attachment";

// ============================================================================
// Tipos
// ============================================================================

export type AttachmentData =
  | (FileUIPart & { id: string })
  | (SourceDocumentUIPart & { id: string });

export type AttachmentMediaCategory =
  | "image"
  | "video"
  | "audio"
  | "document"
  | "source"
  | "unknown";

export type AttachmentVariant = "grid" | "inline" | "list";

/** Textos padrão usados quando a parte não traz nome de arquivo ou título. */
export interface AttachmentLabels {
  attachment: string;
  image: string;
  source: string;
}

const DEFAULT_LABELS: AttachmentLabels = {
  attachment: "Anexo",
  image: "Imagem",
  source: "Fonte",
};

const mediaCategoryIcons: Record<AttachmentMediaCategory, Icon> = {
  audio: MusicNotesIcon,
  document: FileTextIcon,
  image: ImageIcon,
  source: GlobeIcon,
  unknown: PaperclipIcon,
  video: VideoIcon,
};

// ============================================================================
// Utilitários
// ============================================================================

export const getMediaCategory = (
  data: AttachmentData
): AttachmentMediaCategory => {
  if (data.type === "source-document") {
    return "source";
  }

  const mediaType = data.mediaType ?? "";

  if (mediaType.startsWith("image/")) {
    return "image";
  }
  if (mediaType.startsWith("video/")) {
    return "video";
  }
  if (mediaType.startsWith("audio/")) {
    return "audio";
  }
  if (mediaType.startsWith("application/") || mediaType.startsWith("text/")) {
    return "document";
  }

  return "unknown";
};

export const getAttachmentLabel = (
  data: AttachmentData,
  labels: Partial<AttachmentLabels> = {}
): string => {
  const l = { ...DEFAULT_LABELS, ...labels };

  if (data.type === "source-document") {
    return data.title || data.filename || l.source;
  }

  const category = getMediaCategory(data);
  return data.filename || (category === "image" ? l.image : l.attachment);
};

// ============================================================================
// Contextos
// ============================================================================

interface AttachmentsContextValue {
  labels: AttachmentLabels;
  variant: AttachmentVariant;
}

const AttachmentsContext = createContext<AttachmentsContextValue | null>(null);

interface AttachmentContextValue {
  data: AttachmentData;
  mediaCategory: AttachmentMediaCategory;
  onRemove?: () => void;
  variant: AttachmentVariant;
}

const AttachmentContext = createContext<AttachmentContextValue | null>(null);

// ============================================================================
// Hooks
// ============================================================================

export const useAttachmentsContext = (): AttachmentsContextValue =>
  useContext(AttachmentsContext) ?? {
    labels: DEFAULT_LABELS,
    variant: "grid" as const,
  };

export const useAttachmentContext = () => {
  const ctx = useContext(AttachmentContext);
  if (!ctx) {
    throw new Error(
      "Attachment components must be used within <AttachmentPart>"
    );
  }
  return ctx;
};

// ============================================================================
// Attachments - contêiner
// ============================================================================

export type AttachmentsProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AttachmentVariant;
  /** Textos padrão (pt-BR) para partes sem nome; troque os que precisar. */
  labels?: Partial<AttachmentLabels>;
};

export const Attachments = ({
  variant = "grid",
  labels,
  className,
  children,
  ...props
}: AttachmentsProps) => {
  const contextValue = useMemo(
    () => ({ labels: { ...DEFAULT_LABELS, ...labels }, variant }),
    [labels, variant]
  );

  return (
    <AttachmentsContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex items-start",
          variant === "list" ? "flex-col gap-2" : "flex-wrap gap-2",
          variant === "grid" && "ml-auto w-fit",
          className
        )}
        data-slot="attachments"
        data-variant={variant}
        {...props}
      >
        {children}
      </div>
    </AttachmentsContext.Provider>
  );
};

// ============================================================================
// AttachmentPart - item ligado a uma parte do AI SDK
// ============================================================================

// No upstream este item se chamava `Attachment` e recebia `data`. Aqui o nome
// `Attachment` é a casca da @blips/ui; o item de IA é o AttachmentPart, que
// renderiza essa casca com orientação/tamanho derivados da variante.
const variantToBase = {
  grid: { orientation: "vertical", size: "default" },
  inline: { orientation: "horizontal", size: "xs" },
  list: { orientation: "horizontal", size: "default" },
} as const;

export type AttachmentPartProps = Omit<
  ComponentProps<typeof AttachmentBase>,
  "orientation" | "size"
> & {
  data: AttachmentData;
  onRemove?: () => void;
};

export const AttachmentPart = ({
  data,
  onRemove,
  className,
  children,
  ...props
}: AttachmentPartProps) => {
  const { variant } = useAttachmentsContext();
  const mediaCategory = getMediaCategory(data);

  const contextValue = useMemo<AttachmentContextValue>(
    () => ({ data, mediaCategory, onRemove, variant }),
    [data, mediaCategory, onRemove, variant]
  );

  return (
    <AttachmentContext.Provider value={contextValue}>
      <AttachmentBase
        className={cn(
          variant === "inline" && "min-w-0",
          variant === "list" && "w-full",
          className
        )}
        data-variant={variant}
        {...variantToBase[variant]}
        {...props}
      >
        {children}
      </AttachmentBase>
    </AttachmentContext.Provider>
  );
};

// ============================================================================
// AttachmentPreview - prévia da mídia
// ============================================================================

export type AttachmentPreviewProps = HTMLAttributes<HTMLDivElement> & {
  fallbackIcon?: ReactNode;
};

export const AttachmentPreview = ({
  fallbackIcon,
  className,
  ...props
}: AttachmentPreviewProps) => {
  const { data, mediaCategory } = useAttachmentContext();
  const { labels } = useAttachmentsContext();

  const isImage = mediaCategory === "image" && data.type === "file" && data.url;
  const isVideo = mediaCategory === "video" && data.type === "file" && data.url;

  const renderContent = () => {
    if (isImage && data.type === "file") {
      return (
        <img
          alt={data.filename || labels.image}
          className="size-full object-cover"
          height={96}
          src={data.url}
          width={96}
        />
      );
    }

    if (isVideo && data.type === "file") {
      return <video className="size-full object-cover" muted src={data.url} />;
    }

    const CategoryIcon = mediaCategoryIcons[mediaCategory];
    return fallbackIcon ?? <CategoryIcon className="text-muted-foreground" />;
  };

  return (
    <AttachmentMedia
      className={className}
      variant={isImage || isVideo ? "image" : "icon"}
      {...props}
    >
      {renderContent()}
    </AttachmentMedia>
  );
};

// ============================================================================
// AttachmentInfo - nome e tipo
// ============================================================================

export type AttachmentInfoProps = HTMLAttributes<HTMLDivElement> & {
  showMediaType?: boolean;
};

export const AttachmentInfo = ({
  showMediaType = false,
  ...props
}: AttachmentInfoProps) => {
  const { data, variant } = useAttachmentContext();
  const { labels } = useAttachmentsContext();
  const label = getAttachmentLabel(data, labels);

  if (variant === "grid") {
    return null;
  }

  return (
    <AttachmentContent {...props}>
      <AttachmentTitle>{label}</AttachmentTitle>
      {showMediaType && data.mediaType && (
        <AttachmentDescription>{data.mediaType}</AttachmentDescription>
      )}
    </AttachmentContent>
  );
};

// ============================================================================
// AttachmentRemove - botão de remover
// ============================================================================

export type AttachmentRemoveProps = ComponentProps<typeof AttachmentAction> & {
  label?: string;
};

export const AttachmentRemove = ({
  label = "Remover",
  className,
  children,
  onClick,
  ...props
}: AttachmentRemoveProps) => {
  const { onRemove, variant } = useAttachmentContext();

  const handleClick = useCallback(
    (event: Parameters<NonNullable<AttachmentRemoveProps["onClick"]>>[0]) => {
      event.stopPropagation();
      onClick?.(event);
      onRemove?.();
    },
    [onClick, onRemove]
  );

  if (!onRemove) {
    return null;
  }

  return (
    <AttachmentAction
      aria-label={label}
      className={cn(
        "relative z-20",
        variant === "grid" && [
          "absolute top-2 right-2 rounded-full",
          "bg-background/80 backdrop-blur-sm hover:bg-background",
          "opacity-0 transition-opacity focus-visible:opacity-100 group-hover/attachment:opacity-100",
        ],
        variant === "inline" &&
          "opacity-0 transition-opacity focus-visible:opacity-100 group-hover/attachment:opacity-100",
        variant === "list" && "size-7",
        className
      )}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {children ?? <XIcon />}
      <span className="sr-only">{label}</span>
    </AttachmentAction>
  );
};

// ============================================================================
// AttachmentHoverCard - prévia ao passar o mouse
// ============================================================================

// No Base UI os atrasos ficam no Trigger, não na raiz. O AttachmentHoverCard
// mantém `openDelay`/`closeDelay` do upstream e os repassa ao trigger por contexto.
interface AttachmentHoverCardContextValue {
  closeDelay: number;
  openDelay: number;
}

const AttachmentHoverCardContext =
  createContext<AttachmentHoverCardContextValue>({
    closeDelay: 0,
    openDelay: 0,
  });

export type AttachmentHoverCardProps = ComponentProps<typeof HoverCard> & {
  /** Atraso para abrir, em ms. Padrão 0. */
  openDelay?: number;
  /** Atraso para fechar, em ms. Padrão 0. */
  closeDelay?: number;
};

export const AttachmentHoverCard = ({
  openDelay = 0,
  closeDelay = 0,
  ...props
}: AttachmentHoverCardProps) => {
  const delays = useMemo(
    () => ({ closeDelay, openDelay }),
    [closeDelay, openDelay]
  );

  return (
    <AttachmentHoverCardContext.Provider value={delays}>
      <HoverCard {...props} />
    </AttachmentHoverCardContext.Provider>
  );
};

export type AttachmentHoverCardTriggerProps = ComponentProps<
  typeof HoverCardTrigger
>;

export const AttachmentHoverCardTrigger = ({
  delay,
  closeDelay,
  ...props
}: AttachmentHoverCardTriggerProps) => {
  const delays = useContext(AttachmentHoverCardContext);

  return (
    <HoverCardTrigger
      closeDelay={closeDelay ?? delays.closeDelay}
      delay={delay ?? delays.openDelay}
      {...props}
    />
  );
};

export type AttachmentHoverCardContentProps = ComponentProps<
  typeof HoverCardContent
>;

export const AttachmentHoverCardContent = ({
  align = "start",
  className,
  ...props
}: AttachmentHoverCardContentProps) => (
  <HoverCardContent
    align={align}
    className={cn("w-auto p-2", className)}
    {...props}
  />
);

// ============================================================================
// AttachmentEmpty - estado vazio
// ============================================================================

export type AttachmentEmptyProps = HTMLAttributes<HTMLDivElement>;

export const AttachmentEmpty = ({
  className,
  children,
  ...props
}: AttachmentEmptyProps) => (
  <div
    className={cn(
      "flex items-center justify-center p-4 text-muted-foreground text-sm",
      className
    )}
    {...props}
  >
    {children ?? "Nenhum anexo"}
  </div>
);
