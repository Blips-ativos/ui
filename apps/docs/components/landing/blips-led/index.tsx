"use client";

/**
 * Fundo da home: o "b" da Blips como silhueta escura com LEDs nas bordas, que
 * vazam luz pelo chão em volta (raycast analítico por pixel, em WebGPU).
 *
 * Origem: vercel-labs/vgpu — apps/docs/examples/triangle-led-front/index.tsx
 * (MIT). Blips: o componente preenche o pai (absolute inset-0) com um canvas
 * decorativo (aria-hidden, sem eventos), segue o tema do <html> (`light` ou
 * escuro por padrão), pausa fora da tela/aba oculta, respeita
 * `prefers-reduced-motion` e, sem WebGPU, some e deixa o fundo do pai.
 */

import { useEffect, useRef, useState } from "react";
import { createRenderer } from "./renderer";
import type { BlipsLedTheme } from "./types";

function currentTheme(): BlipsLedTheme {
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

export function BlipsLed() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!("gpu" in navigator)) {
      setFailed(true);
      return;
    }
    const framingElement =
      canvas
        .closest<HTMLElement>("[data-hero-theme]")
        ?.querySelector<HTMLElement>("[data-triangle-container]") ?? undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const renderer = createRenderer({
      canvas,
      framingElement,
      theme: currentTheme(),
      reducedMotion: motion.matches,
      onError: (error) => {
        console.warn("Fundo WebGPU da home desativado.", error);
        setFailed(true);
      },
    });

    const themeObserver = new MutationObserver(() =>
      renderer.setTheme(currentTheme())
    );
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    const onMotionChange = () => renderer.setReducedMotion(motion.matches);
    motion.addEventListener("change", onMotionChange);

    let onScreen = true;
    const syncActive = () =>
      renderer.setActive(onScreen && document.visibilityState === "visible");
    const visibility =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver((entries) => {
            onScreen = entries.some((entry) => entry.isIntersecting);
            syncActive();
          });
    visibility?.observe(canvas);
    document.addEventListener("visibilitychange", syncActive);
    syncActive();

    return () => {
      themeObserver.disconnect();
      motion.removeEventListener("change", onMotionChange);
      visibility?.disconnect();
      document.removeEventListener("visibilitychange", syncActive);
      renderer.dispose();
    };
  }, []);

  if (failed) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default BlipsLed;
