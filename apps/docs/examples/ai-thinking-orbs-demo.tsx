"use client";

import { BlipsThinkingOrb } from "@blips/ai/fx/thinking-orbs";

export default function AiThinkingOrbsDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <BlipsThinkingOrb aria-label="Agente trabalhando" size={64} />
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <BlipsThinkingOrb aria-label="Pensando" />
        <span>Pensando na resposta…</span>
      </div>
    </div>
  );
}
