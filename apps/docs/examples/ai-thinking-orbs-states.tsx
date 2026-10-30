"use client";

import type { OrbState } from "@blips/ai/fx/thinking-orbs";
import { BlipsThinkingOrb } from "@blips/ai/fx/thinking-orbs";

const estados: { state: OrbState; rotulo: string }[] = [
  { state: "working", rotulo: "Trabalhando" },
  { state: "searching", rotulo: "Buscando" },
  { state: "solving", rotulo: "Resolvendo" },
  { state: "listening", rotulo: "Ouvindo" },
  { state: "connecting", rotulo: "Conectando" },
  { state: "weaving", rotulo: "Combinando" },
  { state: "composing", rotulo: "Escrevendo" },
  { state: "breathing", rotulo: "Aguardando" },
  { state: "shaping", rotulo: "Montando" },
];

export default function AiThinkingOrbsStates() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {estados.map(({ state, rotulo }) => (
        <div className="flex flex-col items-center gap-2" key={state}>
          <BlipsThinkingOrb aria-label={rotulo} size={64} state={state} />
          <span className="font-mono text-muted-foreground text-xs">
            {state}
          </span>
        </div>
      ))}
    </div>
  );
}
