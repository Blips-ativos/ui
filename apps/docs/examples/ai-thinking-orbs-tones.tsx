"use client";

import type { BlipsOrbTone } from "@blips/ai/fx/thinking-orbs";
import { BlipsThinkingOrb } from "@blips/ai/fx/thinking-orbs";

const tons: BlipsOrbTone[] = [
  "primary",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "neutral",
];

export default function AiThinkingOrbsTones() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {tons.map((tone) => (
        <div className="flex flex-col items-center gap-2" key={tone}>
          <BlipsThinkingOrb aria-label={`Tom ${tone}`} size={32} tone={tone} />
          <span className="font-mono text-muted-foreground text-xs">
            {tone}
          </span>
        </div>
      ))}
    </div>
  );
}
