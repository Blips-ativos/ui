"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * `true` quando o usuário pediu menos movimento no sistema. No servidor e na
 * hidratação vale `false`; o valor real entra logo depois, sem divergência.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
}

/**
 * Suporte a WebGL detectado no cliente, depois de montar: `undefined` no
 * servidor e no primeiro render, `true` ou `false` em seguida. Serve para não
 * montar efeitos que criam o renderer sem tratar a falta de contexto (um erro
 * no commit derrubaria a árvore inteira do React).
 */
export function useWebGLSupport(): boolean | undefined {
  const [supported, setSupported] = useState<boolean>();
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setSupported(
        Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"))
      );
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}
