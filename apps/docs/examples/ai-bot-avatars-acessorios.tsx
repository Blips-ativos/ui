"use client";

import type { BotAvatarProps } from "@blips/ai/fx/bot-avatars";
import { BlipsBotAvatar } from "@blips/ai/fx/bot-avatars";

const variacoes: { rotulo: string; props: BotAvatarProps }[] = [
  { rotulo: "hat=beret", props: { type: "blob", hat: "beret" } },
  { rotulo: "glasses=round", props: { type: "square", glasses: "round" } },
  { rotulo: "headphones", props: { type: "circle", headphones: true } },
  { rotulo: "bowTie", props: { type: "pill", bowTie: true } },
  { rotulo: "shading=plastic", props: { type: "drop", shading: "plastic" } },
  { rotulo: "shading=fabric", props: { type: "cloud", shading: "fabric" } },
];

export default function AiBotAvatarsAcessorios() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {variacoes.map(({ rotulo, props }) => (
        <div className="flex flex-col items-center gap-3" key={rotulo}>
          <BlipsBotAvatar aria-label={rotulo} size={56} {...props} />
          <span className="font-mono text-muted-foreground text-xs">
            {rotulo}
          </span>
        </div>
      ))}
    </div>
  );
}
