"use client";

import type { BlipsVoiceBeamProps } from "@blips/ai/fx/voice-glow";
import { BlipsVoiceBeam } from "@blips/ai/fx/voice-glow";

function vozSimulada() {
  const t = performance.now() / 1000;
  return Math.max(0, Math.sin(t * 5.3) * Math.sin(t * 1.3)) * 0.85;
}

const variantes: {
  rotulo: string;
  props: Partial<BlipsVoiceBeamProps>;
}[] = [
  { rotulo: "Padrão Blips", props: {} },
  { rotulo: 'colorVariant="mono"', props: { colorVariant: "mono" } },
  {
    rotulo: "colors próprias",
    props: {
      colors: ["#fcba28", "#f0b100", "#f0b100"],
      bandColors: { core: "#ffffff", above: "#ffdf20" },
    },
  },
];

export default function AiVoiceGlowCores() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {variantes.map(({ rotulo, props }) => (
        <div className="flex flex-col items-center gap-2" key={rotulo}>
          <BlipsVoiceBeam level={vozSimulada} {...props}>
            <div className="h-16 w-52 rounded-xl border bg-card" />
          </BlipsVoiceBeam>
          <span className="font-mono text-muted-foreground text-xs">
            {rotulo}
          </span>
        </div>
      ))}
    </div>
  );
}
