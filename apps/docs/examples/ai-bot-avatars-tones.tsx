"use client";

import type { BlipsBotTone, BotAvatarType } from "@blips/ai/fx/bot-avatars";
import { BlipsBotAvatar } from "@blips/ai/fx/bot-avatars";

const agentes: { tone: BlipsBotTone; type: BotAvatarType; nome: string }[] = [
  { tone: "primary", type: "clover", nome: "Salvador" },
  { tone: "chart-1", type: "star", nome: "Aurora" },
  { tone: "chart-2", type: "droid", nome: "Nascimento" },
  { tone: "chart-3", type: "cat", nome: "Dalila" },
  { tone: "chart-4", type: "hexagon", nome: "Kiara" },
  { tone: "chart-5", type: "mech", nome: "Juarez" },
  { tone: "neutral", type: "ghost", nome: "Socorro" },
];

export default function AiBotAvatarsTones() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {agentes.map(({ tone, type, nome }) => (
        <div className="flex flex-col items-center gap-2" key={tone}>
          <BlipsBotAvatar aria-label={nome} size={48} tone={tone} type={type} />
          <span className="font-mono text-muted-foreground text-xs">
            {tone}
          </span>
        </div>
      ))}
    </div>
  );
}
