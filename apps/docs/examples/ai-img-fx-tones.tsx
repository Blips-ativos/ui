"use client";

import type { BlipsImgFxTone } from "@blips/ai/fx/img-fx";
import { BlipsImageGeneration } from "@blips/ai/fx/img-fx";

const tons: { tone: BlipsImgFxTone; rotulo: string }[] = [
  { tone: "primary", rotulo: "primary (padrão)" },
  { tone: "neutral", rotulo: "neutral" },
];

export default function AiImgFxTones() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {tons.map(({ tone, rotulo }) => (
        <figure className="flex flex-col items-center gap-2" key={tone}>
          <BlipsImageGeneration tone={tone}>
            <div className="size-48 rounded-xl border bg-card" />
          </BlipsImageGeneration>
          <figcaption className="font-mono text-muted-foreground text-xs">
            {rotulo}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
