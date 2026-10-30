"use client";

/**
 * Fundo da home: o "b" da Blips como vidro líquido, refratando feixes de luz
 * âmbar que atravessam a página (WebGPU, via vgpu + TypeGPU).
 *
 * Origem: vercel-labs/vgpu — apps/docs/examples/typegpu-liquid-glass/index.tsx
 * (MIT), revisão af8ab2106af8d33b5f10e60b588a0ae5fb0b02de761800e82b85bf82726a3bc4.
 * Blips: o canvas preenche o pai (absolute inset-0), é decorativo (aria-hidden,
 * sem o aria-label do exemplo, sem eventos), segue o tema do <html> (`light`
 * ou escuro por padrão), pausa fora da tela/aba oculta, respeita
 * `prefers-reduced-motion` e, sem WebGPU ou com falha ao iniciar, some e deixa
 * o fundo do pai (o exemplo pintava um fundo próprio e deixava o erro subir).
 */

import { useEffect, useRef, useState } from "react";
import { createRenderer, type LiquidGlassTheme } from "./renderer";

function currentTheme(): LiquidGlassTheme {
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

export function LiquidGlass() {
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

export default LiquidGlass;
