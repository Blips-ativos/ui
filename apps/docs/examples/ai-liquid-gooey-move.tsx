"use client";

import { BlipsLiquid } from "@blips/ai/fx/liquid-gooey";
import { useState } from "react";

const abas = ["Resposta", "Raciocínio", "Fontes"];

export default function AiLiquidGooeyMove() {
  const [ativa, setAtiva] = useState(0);

  return (
    <div className="rounded-lg bg-muted p-1">
      <BlipsLiquid className="relative" tone="card">
        {/* effect="move": você move o indicador; o líquido segue com rastro.
            Itens observados não têm caixa própria: posicione o filho. */}
        <BlipsLiquid.Item effect="move">
          <div
            className="absolute top-0 left-0 h-8 w-24 rounded-md transition-transform duration-300"
            style={{ transform: `translateX(${ativa * 96}px)` }}
          />
        </BlipsLiquid.Item>
        <div className="relative flex" role="tablist">
          {abas.map((aba, i) => (
            <button
              aria-selected={ativa === i}
              className={`h-8 w-24 font-medium text-xs transition-colors ${
                ativa === i ? "" : "text-muted-foreground"
              }`}
              key={aba}
              onClick={() => setAtiva(i)}
              role="tab"
              type="button"
            >
              {aba}
            </button>
          ))}
        </div>
      </BlipsLiquid>
    </div>
  );
}
