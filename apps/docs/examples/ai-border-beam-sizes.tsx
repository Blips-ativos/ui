"use client";

import type { BorderBeamSize } from "@blips/ai/fx/border-beam";
import { BlipsBorderBeam } from "@blips/ai/fx/border-beam";

const tamanhos: { size: BorderBeamSize; rotulo: string }[] = [
  { size: "sm", rotulo: "sm" },
  { size: "md", rotulo: "md" },
  { size: "line", rotulo: "line" },
  { size: "pulse-inner", rotulo: "pulse-inner" },
  { size: "pulse-outside", rotulo: "pulse-outside" },
];

export default function AiBorderBeamSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {tamanhos.map(({ size, rotulo }) => (
        <BlipsBorderBeam key={size} size={size}>
          <div className="flex h-16 w-32 items-center justify-center rounded-lg border bg-card font-mono text-xs">
            {rotulo}
          </div>
        </BlipsBorderBeam>
      ))}
    </div>
  );
}
