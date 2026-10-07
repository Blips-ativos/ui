"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/audio-player.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { buttonVariants } from "@blips/ui/components/button";
import {
  ButtonGroup,
  ButtonGroupText,
} from "@blips/ui/components/button-group";
import { cn } from "@blips/ui/lib/utils";
import type { Experimental_SpeechResult as SpeechResult } from "ai";
import {
  MediaControlBar,
  MediaController,
  MediaDurationDisplay,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
// Registra o dicionário em português do media-chrome (rótulos e aria-label
// dos botões e faixas). O idioma ativo vem do atributo `lang` do controlador.
import "media-chrome/lang/pt";
import type { ComponentProps, CSSProperties } from "react";

export type AudioPlayerProps = Omit<
  ComponentProps<typeof MediaController>,
  "audio"
>;

// `lang` padrão em pt-BR: o media-chrome traduz os textos de acessibilidade a
// partir dele. Passe outro `lang` para trocar o idioma. Atenção: no
// media-chrome o idioma é global à página, não por player.
export const AudioPlayer = ({
  children,
  style,
  lang = "pt-BR",
  ...props
}: AudioPlayerProps) => (
  <MediaController
    audio
    data-slot="audio-player"
    lang={lang}
    style={
      {
        "--media-background-color": "transparent",
        "--media-button-icon-height": "1rem",
        "--media-button-icon-width": "1rem",
        "--media-control-background": "transparent",
        "--media-control-hover-background": "var(--color-accent)",
        "--media-control-padding": "0",
        "--media-font": "var(--font-sans)",
        "--media-font-size": "10px",
        "--media-icon-color": "currentColor",
        "--media-preview-time-background": "var(--color-background)",
        "--media-preview-time-border-radius": "var(--radius-md)",
        "--media-preview-time-text-shadow": "none",
        "--media-primary-color": "var(--color-primary)",
        "--media-range-bar-color": "var(--color-primary)",
        "--media-range-track-background": "var(--color-secondary)",
        "--media-secondary-color": "var(--color-secondary)",
        "--media-text-color": "var(--color-foreground)",
        "--media-tooltip-arrow-display": "none",
        "--media-tooltip-background": "var(--color-background)",
        "--media-tooltip-border-radius": "var(--radius-md)",
        ...style,
      } as CSSProperties
    }
    {...props}
  >
    {children}
  </MediaController>
);

export type AudioPlayerElementProps = Omit<ComponentProps<"audio">, "src"> &
  (
    | {
        data: SpeechResult["audio"];
      }
    | {
        src: string;
      }
  );

export const AudioPlayerElement = (props: AudioPlayerElementProps) => {
  // O upstream espalhava `data` no <audio>; aqui ele é consumido antes.
  const { data, src, ...rest } = props as Omit<
    ComponentProps<"audio">,
    "src"
  > & {
    data?: SpeechResult["audio"];
    src?: string;
  };

  return (
    <audio
      data-slot="audio-player-element"
      slot="media"
      src={
        src ??
        (data ? `data:${data.mediaType};base64,${data.base64}` : undefined)
      }
      {...rest}
    />
  );
};

export type AudioPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const AudioPlayerControlBar = ({
  children,
  ...props
}: AudioPlayerControlBarProps) => (
  <MediaControlBar data-slot="audio-player-control-bar" {...props}>
    <ButtonGroup orientation="horizontal">{children}</ButtonGroup>
  </MediaControlBar>
);

// Os botões do media-chrome são custom elements que já fazem papel de botão
// (role="button", tabindex e ativação por Enter/Espaço). Por isso recebem só
// as classes de `buttonVariants`, sem o Button da @blips/ui: com
// `nativeButton={false}` o Base UI também dispararia o clique pelo teclado, e
// Enter/Espaço alternariam duas vezes (play e pause no mesmo toque).
const mediaButtonClassName = buttonVariants({
  size: "icon-sm",
  variant: "outline",
});

export type AudioPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;

export const AudioPlayerPlayButton = ({
  className,
  ...props
}: AudioPlayerPlayButtonProps) => (
  <MediaPlayButton
    className={cn(mediaButtonClassName, "bg-transparent", className)}
    data-slot="audio-player-play-button"
    {...props}
  />
);

export type AudioPlayerSeekBackwardButtonProps = ComponentProps<
  typeof MediaSeekBackwardButton
>;

export const AudioPlayerSeekBackwardButton = ({
  className,
  seekOffset = 10,
  ...props
}: AudioPlayerSeekBackwardButtonProps) => (
  <MediaSeekBackwardButton
    className={cn(mediaButtonClassName, className)}
    data-slot="audio-player-seek-backward-button"
    seekOffset={seekOffset}
    {...props}
  />
);

export type AudioPlayerSeekForwardButtonProps = ComponentProps<
  typeof MediaSeekForwardButton
>;

export const AudioPlayerSeekForwardButton = ({
  className,
  seekOffset = 10,
  ...props
}: AudioPlayerSeekForwardButtonProps) => (
  <MediaSeekForwardButton
    className={cn(mediaButtonClassName, className)}
    data-slot="audio-player-seek-forward-button"
    seekOffset={seekOffset}
    {...props}
  />
);

export type AudioPlayerTimeDisplayProps = ComponentProps<
  typeof MediaTimeDisplay
>;

export const AudioPlayerTimeDisplay = ({
  className,
  ...props
}: AudioPlayerTimeDisplayProps) => (
  <ButtonGroupText
    className="bg-transparent"
    render={
      <MediaTimeDisplay
        className={cn("tabular-nums", className)}
        data-slot="audio-player-time-display"
        {...props}
      />
    }
  />
);

export type AudioPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;

export const AudioPlayerTimeRange = ({
  className,
  ...props
}: AudioPlayerTimeRangeProps) => (
  <ButtonGroupText
    className="bg-transparent"
    render={
      <MediaTimeRange
        className={cn("", className)}
        data-slot="audio-player-time-range"
        {...props}
      />
    }
  />
);

export type AudioPlayerDurationDisplayProps = ComponentProps<
  typeof MediaDurationDisplay
>;

export const AudioPlayerDurationDisplay = ({
  className,
  ...props
}: AudioPlayerDurationDisplayProps) => (
  <ButtonGroupText
    className="bg-transparent"
    render={
      <MediaDurationDisplay
        className={cn("tabular-nums", className)}
        data-slot="audio-player-duration-display"
        {...props}
      />
    }
  />
);

export type AudioPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;

export const AudioPlayerMuteButton = ({
  className,
  ...props
}: AudioPlayerMuteButtonProps) => (
  <ButtonGroupText
    className="bg-transparent"
    render={
      <MediaMuteButton
        className={cn("", className)}
        data-slot="audio-player-mute-button"
        {...props}
      />
    }
  />
);

export type AudioPlayerVolumeRangeProps = ComponentProps<
  typeof MediaVolumeRange
>;

export const AudioPlayerVolumeRange = ({
  className,
  ...props
}: AudioPlayerVolumeRangeProps) => (
  <ButtonGroupText
    className="bg-transparent"
    render={
      <MediaVolumeRange
        className={cn("", className)}
        data-slot="audio-player-volume-range"
        {...props}
      />
    }
  />
);
