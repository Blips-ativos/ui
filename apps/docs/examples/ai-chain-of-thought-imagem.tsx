"use client";

import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtStep,
} from "@blips/ai/components/chain-of-thought";
import { ChartBarIcon, ImageIcon } from "@phosphor-icons/react";

const barras = [42, 58, 35, 71, 64, 80];

export default function AiChainOfThoughtImagem() {
  return (
    <div className="w-full max-w-lg">
      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader>
          Análise de uso do equipamento
        </ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            icon={ChartBarIcon}
            label="Gerando o gráfico de uso dos últimos 6 meses"
          >
            <ChainOfThoughtImage caption="Horas de uso por mês, de maio a outubro.">
              <div className="flex h-32 w-full items-end gap-2">
                {barras.map((altura, i) => (
                  <div
                    className="flex-1 rounded-sm bg-primary/70"
                    // biome-ignore lint/suspicious/noArrayIndexKey: lista fixa
                    key={i}
                    style={{ height: `${altura}%` }}
                  />
                ))}
              </div>
            </ChainOfThoughtImage>
          </ChainOfThoughtStep>
          <ChainOfThoughtStep
            icon={ImageIcon}
            label="Uso estável, com pico em outubro"
            status="active"
          />
        </ChainOfThoughtContent>
      </ChainOfThought>
    </div>
  );
}
