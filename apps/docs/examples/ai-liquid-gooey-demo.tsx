"use client";

import { BlipsLiquid } from "@blips/ai/fx/liquid-gooey";
import {
  ArticleIcon,
  PaperclipIcon,
  PlusIcon,
  TranslateIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

const acoes = [
  { rotulo: "Resumir", Icone: ArticleIcon, x: -52, y: -28 },
  { rotulo: "Traduzir", Icone: TranslateIcon, x: 0, y: -56 },
  { rotulo: "Anexar arquivo", Icone: PaperclipIcon, x: 52, y: -28 },
];

export default function AiLiquidGooeyDemo() {
  const [aberto, setAberto] = useState(false);

  return (
    // O grupo reserva o espaço do menu aberto: as gotas viajam dentro dele.
    <BlipsLiquid className="relative h-28 w-44">
      {acoes.map(({ rotulo, Icone, x, y }, i) => (
        <BlipsLiquid.Item
          className="absolute bottom-0 left-1/2 -ml-5"
          delay={aberto ? i * 40 : 0}
          key={rotulo}
          transition="bouncy"
          x={aberto ? x : 0}
          y={aberto ? y : 0}
        >
          <button
            aria-label={rotulo}
            className="flex size-10 items-center justify-center rounded-full"
            tabIndex={aberto ? 0 : -1}
            title={rotulo}
            type="button"
          >
            <Icone className="size-4" />
          </button>
        </BlipsLiquid.Item>
      ))}
      <BlipsLiquid.Item className="absolute bottom-0 left-1/2 -ml-5">
        <button
          aria-expanded={aberto}
          aria-label={aberto ? "Fechar ações" : "Abrir ações"}
          className="flex size-10 items-center justify-center rounded-full"
          onClick={() => setAberto((v) => !v)}
          type="button"
        >
          <PlusIcon
            className="size-4 transition-transform duration-200"
            style={{ transform: aberto ? "rotate(45deg)" : undefined }}
          />
        </button>
      </BlipsLiquid.Item>
    </BlipsLiquid>
  );
}
