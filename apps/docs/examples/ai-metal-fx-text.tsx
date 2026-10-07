"use client";

import { BlipsMetalBadge, BlipsMetalText } from "@blips/ai/fx/metal-fx";

export default function AiMetalFxText() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <BlipsMetalText>Blips IA</BlipsMetalText>
        <BlipsMetalBadge />
      </div>
      <p className="text-muted-foreground text-xs">
        Metal dentro das letras e o selo de novidade.
      </p>
    </div>
  );
}
