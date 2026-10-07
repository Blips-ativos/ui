"use client";
// Adaptado de vercel/ai-elements (packages/elements/src/inline-citation.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { Badge } from "@blips/ui/components/badge";
import type { CarouselApi } from "@blips/ui/components/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@blips/ui/components/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@blips/ui/components/hover-card";
import { cn } from "@blips/ui/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type InlineCitationProps = ComponentProps<"span">;

export const InlineCitation = ({
  className,
  ...props
}: InlineCitationProps) => (
  <span
    className={cn("group inline items-center gap-1", className)}
    {...props}
  />
);

export type InlineCitationTextProps = ComponentProps<"span">;

export const InlineCitationText = ({
  className,
  ...props
}: InlineCitationTextProps) => (
  <span
    className={cn("transition-colors group-hover:bg-accent", className)}
    {...props}
  />
);

// No Base UI (PreviewCard) os atrasos de abrir/fechar ficam no Trigger, não no Root:
// por isso o openDelay/closeDelay={0} do upstream foi para o InlineCitationCardTrigger.
export type InlineCitationCardProps = ComponentProps<typeof HoverCard>;

export const InlineCitationCard = (props: InlineCitationCardProps) => (
  <HoverCard {...props} />
);

export type InlineCitationCardTriggerProps = ComponentProps<typeof Badge> & {
  sources: string[];
  /** Atraso para abrir o card, em ms. Padrão 0 (como no upstream). */
  delay?: number;
  /** Atraso para fechar o card, em ms. Padrão 0 (como no upstream). */
  closeDelay?: number;
  /** Texto quando `sources` está vazio. Padrão: "desconhecida". */
  fallbackLabel?: string;
};

// Evita que uma URL inválida derrube a renderização (o upstream chamava new URL direto).
const hostnameOf = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

export const InlineCitationCardTrigger = ({
  sources,
  className,
  delay = 0,
  closeDelay = 0,
  fallbackLabel = "desconhecida",
  ...props
}: InlineCitationCardTriggerProps) => (
  // O Badge renderiza um <button> (o upstream usava <span>, fora da ordem de Tab):
  // assim o trigger recebe foco pelo teclado e o PreviewCard abre no foco também.
  // As classes do Badge continuam as mesmas; o preflight do Tailwind zera o
  // visual nativo do botão.
  <HoverCardTrigger
    closeDelay={closeDelay}
    delay={delay}
    render={
      <Badge
        className={cn("ml-1 cursor-default rounded-full", className)}
        render={<button type="button" />}
        variant="secondary"
        {...props}
      />
    }
  >
    {sources[0] ? (
      <>
        {hostnameOf(sources[0])}{" "}
        {sources.length > 1 && `+${sources.length - 1}`}
      </>
    ) : (
      fallbackLabel
    )}
  </HoverCardTrigger>
);

// `className` só string: o HoverCardContent da @blips/ui mescla com `cn` (clsx),
// que descarta funções do estado.
export type InlineCitationCardBodyProps = Omit<
  ComponentProps<typeof HoverCardContent>,
  "className"
> & { className?: string };

export const InlineCitationCardBody = ({
  className,
  ...props
}: InlineCitationCardBodyProps) => (
  <HoverCardContent className={cn("relative w-80 p-0", className)} {...props} />
);

const CarouselApiContext = createContext<CarouselApi | undefined>(undefined);

const useCarouselApi = () => {
  const context = useContext(CarouselApiContext);
  return context;
};

export type InlineCitationCarouselProps = ComponentProps<typeof Carousel>;

export const InlineCitationCarousel = ({
  className,
  children,
  ...props
}: InlineCitationCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <CarouselApiContext.Provider value={api}>
      <Carousel className={cn("w-full", className)} setApi={setApi} {...props}>
        {children}
      </Carousel>
    </CarouselApiContext.Provider>
  );
};

export type InlineCitationCarouselContentProps = ComponentProps<"div">;

export const InlineCitationCarouselContent = (
  props: InlineCitationCarouselContentProps
) => <CarouselContent {...props} />;

export type InlineCitationCarouselItemProps = ComponentProps<"div">;

export const InlineCitationCarouselItem = ({
  className,
  ...props
}: InlineCitationCarouselItemProps) => (
  <CarouselItem
    className={cn("w-full space-y-2 p-4 pl-8", className)}
    {...props}
  />
);

export type InlineCitationCarouselHeaderProps = ComponentProps<"div">;

export const InlineCitationCarouselHeader = ({
  className,
  ...props
}: InlineCitationCarouselHeaderProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-2 rounded-t-md bg-secondary p-2",
      className
    )}
    {...props}
  />
);

export type InlineCitationCarouselIndexProps = ComponentProps<"div">;

export const InlineCitationCarouselIndex = ({
  children,
  className,
  ...props
}: InlineCitationCarouselIndexProps) => {
  const api = useCarouselApi();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const syncState = useCallback(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    syncState();

    api.on("select", syncState);

    return () => {
      api.off("select", syncState);
    };
  }, [api, syncState]);

  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-end px-3 py-1 text-muted-foreground text-xs",
        className
      )}
      {...props}
    >
      {children ?? `${current}/${count}`}
    </div>
  );
};

export type InlineCitationCarouselPrevProps = ComponentProps<"button">;

export const InlineCitationCarouselPrev = ({
  className,
  ...props
}: InlineCitationCarouselPrevProps) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  return (
    <button
      aria-label="Fonte anterior"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <ArrowLeftIcon className="size-4 text-muted-foreground" />
    </button>
  );
};

export type InlineCitationCarouselNextProps = ComponentProps<"button">;

export const InlineCitationCarouselNext = ({
  className,
  ...props
}: InlineCitationCarouselNextProps) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  return (
    <button
      aria-label="Próxima fonte"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <ArrowRightIcon className="size-4 text-muted-foreground" />
    </button>
  );
};

export type InlineCitationSourceProps = ComponentProps<"div"> & {
  title?: string;
  url?: string;
  description?: string;
};

export const InlineCitationSource = ({
  title,
  url,
  description,
  className,
  children,
  ...props
}: InlineCitationSourceProps) => (
  <div className={cn("space-y-1", className)} {...props}>
    {title && (
      <h4 className="truncate font-medium text-sm leading-tight">{title}</h4>
    )}
    {url && (
      <p className="truncate break-all text-muted-foreground text-xs">{url}</p>
    )}
    {description && (
      <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    )}
    {children}
  </div>
);

export type InlineCitationQuoteProps = ComponentProps<"blockquote">;

export const InlineCitationQuote = ({
  children,
  className,
  ...props
}: InlineCitationQuoteProps) => (
  <blockquote
    className={cn(
      "border-muted border-l-2 pl-3 text-muted-foreground text-sm italic",
      className
    )}
    {...props}
  >
    {children}
  </blockquote>
);
