"use client";

import type { VoiceBeamType } from "@blips/ai/fx/voice-glow";
import { BlipsVoiceBeam } from "@blips/ai/fx/voice-glow";
import { MicrophoneIcon } from "@phosphor-icons/react";

function vozSimulada() {
  const t = performance.now() / 1000;
  return Math.max(0, Math.sin(t * 6.1) * Math.sin(t * 1.7)) * 0.8;
}

const hospedeiros: { type: VoiceBeamType; classe: string; rotulo: string }[] = [
  {
    type: "default",
    classe: "h-20 w-72 rounded-xl",
    rotulo: "default — campo do chat",
  },
  {
    type: "pill",
    classe: "h-11 w-36 rounded-full",
    rotulo: "pill — gravando",
  },
  {
    type: "mobile",
    classe: "h-56 w-32 rounded-3xl",
    rotulo: "mobile — tela inteira",
  },
];

export default function AiVoiceGlowTypes() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-8">
      {hospedeiros.map(({ type, classe, rotulo }) => (
        <div className="flex flex-col items-center gap-2" key={type}>
          <BlipsVoiceBeam level={vozSimulada} type={type}>
            <div
              className={`flex items-center justify-center gap-1.5 border bg-card text-muted-foreground text-xs ${classe}`}
            >
              {type === "pill" ? <MicrophoneIcon className="size-3.5" /> : null}
              {type === "pill" ? "0:12" : null}
            </div>
          </BlipsVoiceBeam>
          <span className="font-mono text-muted-foreground text-xs">
            {rotulo}
          </span>
        </div>
      ))}
    </div>
  );
}
