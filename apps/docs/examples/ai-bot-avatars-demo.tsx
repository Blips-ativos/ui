"use client";

import { BlipsBotAvatar } from "@blips/ai/fx/bot-avatars";

export default function AiBotAvatarsDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <BlipsBotAvatar aria-label="Salvador" size={96} type="clover" />
      <div className="flex items-start gap-3">
        <BlipsBotAvatar aria-label="Salvador" type="clover" />
        <div className="max-w-64 space-y-1">
          <p className="font-medium text-sm">Salvador</p>
          <p className="text-muted-foreground text-sm">
            Encontrei o contrato do cliente. A próxima parcela vence no dia 10.
          </p>
        </div>
      </div>
    </div>
  );
}
