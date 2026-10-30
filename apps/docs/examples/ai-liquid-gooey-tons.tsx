"use client";

import type { BlipsLiquidTone } from "@blips/ai/fx/liquid-gooey";
import { BlipsLiquid } from "@blips/ai/fx/liquid-gooey";
import { Button } from "@blips/ui/components/button";
import { useState } from "react";

const tons: BlipsLiquidTone[] = ["primary", "card", "muted", "secondary"];

export default function AiLiquidGooeyTons() {
  const [juntos, setJuntos] = useState(true);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {tons.map((tone) => (
          <div className="flex flex-col items-center gap-2" key={tone}>
            {/* pr-6 reserva o curso do segundo chip quando ele se afasta. */}
            <BlipsLiquid className="flex gap-1 pr-6" tone={tone}>
              <BlipsLiquid.Item>
                <span className="flex h-7 items-center rounded-full px-3 text-xs">
                  Resumir
                </span>
              </BlipsLiquid.Item>
              <BlipsLiquid.Item transition="bouncy" x={juntos ? 0 : 24}>
                <span className="flex h-7 items-center rounded-full px-3 text-xs">
                  Explicar
                </span>
              </BlipsLiquid.Item>
            </BlipsLiquid>
            <span className="font-mono text-muted-foreground text-xs">
              {tone}
            </span>
          </div>
        ))}
      </div>
      <Button onClick={() => setJuntos((v) => !v)} size="sm" variant="outline">
        {juntos ? "Separar" : "Juntar"}
      </Button>
    </div>
  );
}
