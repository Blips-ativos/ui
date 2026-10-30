"use client";

import type { ImageGenerationPreset } from "@blips/ai/fx/img-fx";
import { BlipsImageGeneration } from "@blips/ai/fx/img-fx";

const presets: { preset: ImageGenerationPreset; rotulo: string }[] = [
  { preset: "pixels-organic", rotulo: "pixels-organic" },
  { preset: "pixels-mechanic", rotulo: "pixels-mechanic" },
  { preset: "sweep-gradient", rotulo: "sweep-gradient" },
];

export default function AiImgFxPresets() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {presets.map(({ preset, rotulo }) => (
        <figure className="flex flex-col items-center gap-2" key={preset}>
          <BlipsImageGeneration preset={preset}>
            <div className="size-40 rounded-xl border bg-card" />
          </BlipsImageGeneration>
          <figcaption className="font-mono text-muted-foreground text-xs">
            {rotulo}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
