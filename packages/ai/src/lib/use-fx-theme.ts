"use client";

// Tema efetivo (claro/escuro) para os efeitos de src/fx. A @blips/ui marca o
// modo escuro com a classe `.dark` (ou `data-theme`) no <html>; sem marca,
// cai para `prefers-color-scheme`. O border-beam só conhece a media query, por
// isso o wrapper resolve o tema aqui e o passa fixo.

import { useSyncExternalStore } from "react";

export type FxTheme = "dark" | "light";

const QUERY = "(prefers-color-scheme: dark)";

function readTheme(): FxTheme {
  const root = document.documentElement;
  const attr = root.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  if (root.classList.contains("dark")) return "dark";
  if (root.classList.contains("light")) return "light";
  return window.matchMedia(QUERY).matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme"],
  });
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

/** Tema do documento, atualizado ao vivo. No servidor, devolve `light`. */
export function useFxTheme(): FxTheme {
  return useSyncExternalStore(subscribe, readTheme, () => "light");
}
