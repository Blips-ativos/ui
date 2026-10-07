"use client";

// Adaptado de vercel/ai-elements (packages/elements/src/persona.tsx @ 6a9d5b1),
// Copyright 2023 Vercel, Inc., Apache License 2.0.
// Modificado pela Blips: primitivas Base UI da @blips/ui, ícones Phosphor e tokens da @blips/ui.

import { cn } from "@blips/ui/lib/utils";
import type { RiveParameters } from "@rive-app/react-webgl2";
import {
  useRive,
  useStateMachineInput,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceColor,
} from "@rive-app/react-webgl2";
import type { FC, ReactNode } from "react";
import { memo, useEffect, useMemo, useRef, useState } from "react";

// Adia a inicialização do Rive em um frame para que o ciclo de desmontagem
// imediata do Strict Mode nunca crie um contexto WebGL2. Só a segunda montagem
// (a real) inicializa, evitando esgotar os contextos.
const useStrictModeSafeInit = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => {
      cancelAnimationFrame(id);
      setReady(false);
    };
  }, []);

  return ready;
};

export type PersonaState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "asleep";

export interface PersonaProps {
  state: PersonaState;
  onLoad?: RiveParameters["onLoad"];
  onLoadError?: RiveParameters["onLoadError"];
  onReady?: () => void;
  onPause?: RiveParameters["onPause"];
  onPlay?: RiveParameters["onPlay"];
  onStop?: RiveParameters["onStop"];
  className?: string;
  variant?: keyof typeof sources;
  /**
   * URL de um arquivo `.riv` que substitui o da variante. O arquivo precisa
   * ter a state machine `default` com as entradas `listening`, `thinking`,
   * `speaking` e `asleep` (e, para cor dinâmica, um view model com `color`).
   */
  src?: string;
}

// A state machine dos visuais do AI Elements se chama sempre 'default'.
const stateMachine = "default";

// Os .riv abaixo são da Vercel: o upstream os carrega em runtime do blob
// storage dela, sem licença declarada, e o pacote não os redistribui. Servem
// para desenvolvimento e demonstração; em produção, o recomendado é hospedar
// os próprios arquivos e apontá-los pela prop `src`.
const sources = {
  command: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/command-2.0.riv",
  },
  glint: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/glint-2.0.riv",
  },
  halo: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/halo-2.0.riv",
  },
  mana: {
    dynamicColor: false,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/mana-2.0.riv",
  },
  obsidian: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/obsidian-2.0.riv",
  },
  opal: {
    dynamicColor: false,
    hasModel: false,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/orb-1.2.riv",
  },
};

type PersonaTheme = "light" | "dark";

// Lê o tema efetivo da @blips/ui: `data-theme` ou classe `.dark` no <html>,
// com `prefers-color-scheme` como último recurso. Só é chamada em efeito.
const getCurrentTheme = (): PersonaTheme => {
  const root = document.documentElement;
  const attr = root.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") {
    return attr;
  }
  if (root.classList.contains("dark")) {
    return "dark";
  }
  if (root.classList.contains("light")) {
    return "light";
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Diferente do upstream, o estado inicial é fixo ("light") e o tema real é
// lido no efeito: nada de `window`/`document` no render, para funcionar em SSR
// sem divergência de hidratação.
const useTheme = (enabled: boolean) => {
  const [theme, setTheme] = useState<PersonaTheme>("light");

  useEffect(() => {
    // Variantes sem cor dinâmica não precisam de observadores.
    if (!enabled) {
      return;
    }

    setTheme(getCurrentTheme());

    // Observa mudanças de classe/atributo no <html>.
    const observer = new MutationObserver(() => {
      setTheme(getCurrentTheme());
    });

    observer.observe(document.documentElement, {
      attributeFilter: ["class", "data-theme"],
      attributes: true,
    });

    // Observa a troca de tema do sistema operacional.
    let mql: MediaQueryList | null = null;
    const handleMediaChange = () => {
      setTheme(getCurrentTheme());
    };

    if (window.matchMedia) {
      mql = window.matchMedia("(prefers-color-scheme: dark)");
      mql.addEventListener("change", handleMediaChange);
    }

    return () => {
      observer.disconnect();
      if (mql) {
        mql.removeEventListener("change", handleMediaChange);
      }
    };
  }, [enabled]);

  return theme;
};

interface PersonaWithModelProps {
  rive: ReturnType<typeof useRive>["rive"];
  source: (typeof sources)[keyof typeof sources];
  children: ReactNode;
}

const PersonaWithModel = memo(
  ({ rive, source, children }: PersonaWithModelProps) => {
    const theme = useTheme(source.dynamicColor);
    const viewModel = useViewModel(rive, { useDefault: true });
    const viewModelInstance = useViewModelInstance(viewModel, {
      rive,
      useDefault: true,
    });
    const viewModelInstanceColor = useViewModelInstanceColor(
      "color",
      viewModelInstance
    );

    useEffect(() => {
      if (!(viewModelInstanceColor && source.dynamicColor)) {
        return;
      }

      const [r, g, b] = theme === "dark" ? [255, 255, 255] : [0, 0, 0];
      viewModelInstanceColor.setRgb(r, g, b);
    }, [viewModelInstanceColor, theme, source.dynamicColor]);

    return children;
  }
);

PersonaWithModel.displayName = "PersonaWithModel";

interface PersonaWithoutModelProps {
  children: ReactNode;
}

const PersonaWithoutModel = memo(
  ({ children }: PersonaWithoutModelProps) => children
);

PersonaWithoutModel.displayName = "PersonaWithoutModel";

export const Persona: FC<PersonaProps> = memo(
  ({
    variant = "obsidian",
    state = "idle",
    onLoad,
    onLoadError,
    onReady,
    onPause,
    onPlay,
    onStop,
    className,
    src,
  }) => {
    const source = sources[variant];

    if (!source) {
      throw new Error(`Variante inválida: ${variant}`);
    }

    // Estabiliza os callbacks para o useRive não reinicializar.
    const callbacksRef = useRef({
      onLoad,
      onLoadError,
      onPause,
      onPlay,
      onReady,
      onStop,
    });

    useEffect(() => {
      callbacksRef.current = {
        onLoad,
        onLoadError,
        onPause,
        onPlay,
        onReady,
        onStop,
      };
    }, [onLoad, onLoadError, onPause, onPlay, onReady, onStop]);

    const stableCallbacks = useMemo(
      () => ({
        onLoad: ((loadedRive) =>
          callbacksRef.current.onLoad?.(
            loadedRive
          )) as RiveParameters["onLoad"],
        onLoadError: ((err) =>
          callbacksRef.current.onLoadError?.(
            err
          )) as RiveParameters["onLoadError"],
        onPause: ((event) =>
          callbacksRef.current.onPause?.(event)) as RiveParameters["onPause"],
        onPlay: ((event) =>
          callbacksRef.current.onPlay?.(event)) as RiveParameters["onPlay"],
        onReady: () => callbacksRef.current.onReady?.(),
        onStop: ((event) =>
          callbacksRef.current.onStop?.(event)) as RiveParameters["onStop"],
      }),
      []
    );

    // Adia a inicialização em um frame para não criar (e vazar) um contexto
    // WebGL2 na montagem descartável do Strict Mode.
    const ready = useStrictModeSafeInit();

    const { rive, RiveComponent } = useRive(
      ready
        ? {
            autoplay: true,
            onLoad: stableCallbacks.onLoad,
            onLoadError: stableCallbacks.onLoadError,
            onPause: stableCallbacks.onPause,
            onPlay: stableCallbacks.onPlay,
            onRiveReady: stableCallbacks.onReady,
            onStop: stableCallbacks.onStop,
            src: src ?? source.source,
            stateMachines: stateMachine,
          }
        : null
    );

    const listeningInput = useStateMachineInput(
      rive,
      stateMachine,
      "listening"
    );
    const thinkingInput = useStateMachineInput(rive, stateMachine, "thinking");
    const speakingInput = useStateMachineInput(rive, stateMachine, "speaking");
    const asleepInput = useStateMachineInput(rive, stateMachine, "asleep");

    // As entradas da state machine do Rive são objetos mutáveis definidos por
    // atribuição direta: é a API do Rive, não um antipadrão de React.
    useEffect(() => {
      if (listeningInput) {
        listeningInput.value = state === "listening";
      }
      if (thinkingInput) {
        thinkingInput.value = state === "thinking";
      }
      if (speakingInput) {
        speakingInput.value = state === "speaking";
      }
      if (asleepInput) {
        asleepInput.value = state === "asleep";
      }
    }, [state, listeningInput, thinkingInput, speakingInput, asleepInput]);

    const Component = source.hasModel ? PersonaWithModel : PersonaWithoutModel;

    return (
      <Component rive={rive} source={source}>
        <RiveComponent className={cn("size-16 shrink-0", className)} />
      </Component>
    );
  }
);

Persona.displayName = "Persona";
