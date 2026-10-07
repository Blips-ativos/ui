"use client";

import type { BotAvatarState } from "@blips/ai/fx/bot-avatars";
import { BlipsBotAvatar } from "@blips/ai/fx/bot-avatars";

const estados: { state: BotAvatarState; rotulo: string }[] = [
  { state: "default", rotulo: "Disponível" },
  { state: "working", rotulo: "Trabalhando" },
  { state: "sleeping", rotulo: "Inativo" },
];

export default function AiBotAvatarsStates() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-10">
      {estados.map(({ state, rotulo }) => (
        <div className="flex flex-col items-center gap-3" key={state}>
          <BlipsBotAvatar
            aria-label={rotulo}
            face="mouth"
            size={64}
            state={state}
          />
          <span className="font-mono text-muted-foreground text-xs">
            {state}
          </span>
        </div>
      ))}
    </div>
  );
}
