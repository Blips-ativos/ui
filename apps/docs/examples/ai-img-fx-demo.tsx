"use client";

import type { CyclePhase, ImageGenerationHandle } from "@blips/ai/fx/img-fx";
import { BlipsImageGeneration } from "@blips/ai/fx/img-fx";
import { Button } from "@blips/ui/components/button";
import { useRef, useState } from "react";

// Ilustrações em SVG inline: a demo não busca imagem em servidor externo.
function ilustracao(ceu: string, sol: string, morro: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480"><defs><linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ceu}"/><stop offset="1" stop-color="${sol}"/></linearGradient></defs><rect width="480" height="480" fill="url(#c)"/><circle cx="330" cy="190" r="70" fill="${sol}"/><path d="M0 330 Q120 250 240 320 T480 300 V480 H0Z" fill="${morro}"/><path d="M0 390 Q160 330 300 390 T480 380 V480 H0Z" fill="#1c1917" opacity="0.55"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const imagens = [
  ilustracao("#1e3a5f", "#fcba28", "#3f6212"),
  ilustracao("#7c2d12", "#fde68a", "#a16207"),
  ilustracao("#312e81", "#f0abfc", "#0f766e"),
];

export default function AiImgFxDemo() {
  const ref = useRef<ImageGenerationHandle>(null);
  const [fase, setFase] = useState<CyclePhase>("idle");
  const comImagem = fase === "reveal" || fase === "visible";

  return (
    <div className="flex flex-col items-center gap-4">
      <BlipsImageGeneration
        images={imagens}
        onCycle={(evento) => setFase(evento.phase)}
        ref={ref}
      >
        <div className="size-64 rounded-xl border bg-card" />
      </BlipsImageGeneration>
      <div className="flex gap-2">
        <Button
          onClick={() =>
            comImagem
              ? ref.current?.triggerRegenerate({ durationMs: 3000 })
              : ref.current?.triggerReveal({ hold: "manual" })
          }
        >
          {comImagem ? "Gerar outra" : "Gerar imagem"}
        </Button>
        <Button
          disabled={!comImagem}
          onClick={() => ref.current?.triggerHide()}
          variant="outline"
        >
          Descartar
        </Button>
      </div>
    </div>
  );
}
