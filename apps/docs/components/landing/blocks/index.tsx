import type { ReactNode } from "react";

import { BlockAtendimento } from "./atendimento";
import { BlockContratos } from "./contratos";
import { BlockFatura } from "./fatura";
import { BlockFrota } from "./frota";
import { BlockGarantia } from "./garantia";
import { BlockIndicadores } from "./indicadores";
import { BlockNotificacoes } from "./notificacoes";
import { BlockOnboarding } from "./onboarding";
import { BlockReceita } from "./receita";

/**
 * Vitrine no formato da home da Radix: três colunas de largura fixa (larga,
 * estreita, larga), cada uma uma pilha de telas, numa faixa mais larga que a
 * tela que rola na horizontal e começa na mesma margem da hero. Os papéis
 * seguem os da Radix — coluna larga: listas, preferências e gráfico; estreita:
 * formulário e documentos; larga: indicadores, conversa e lista de itens.
 */
const COLUMNS: { id: string; width: string; blocks: [string, ReactNode][] }[] =
  [
    {
      id: "operacao",
      width: "w-[640px]",
      blocks: [
        ["contratos", <BlockContratos key="contratos" />],
        ["notificacoes", <BlockNotificacoes key="notificacoes" />],
        ["receita", <BlockReceita key="receita" />],
      ],
    },
    {
      id: "documentos",
      width: "w-[416px]",
      blocks: [
        ["garantia", <BlockGarantia key="garantia" />],
        ["fatura", <BlockFatura key="fatura" />],
        ["onboarding", <BlockOnboarding key="onboarding" />],
      ],
    },
    {
      id: "acompanhamento",
      width: "w-[640px]",
      blocks: [
        ["indicadores", <BlockIndicadores key="indicadores" />],
        ["atendimento", <BlockAtendimento key="atendimento" />],
        ["frota", <BlockFrota key="frota" />],
      ],
    },
  ];

/** Telas do dia a dia da Blips montadas só com a @blips/ui, sob a hero. */
export function HomeBlocks() {
  return (
    <section className="relative z-10 -mt-[20dvh]">
      {/* Camada por baixo da vitrine: nos primeiros 20dvh vai de transparente
          ao fundo da página, por cima da cena animada da hero (fade); daí para
          baixo, fundo sólido. Os cards ficam acima dela. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex flex-col"
      >
        <div className="h-[20dvh] shrink-0 bg-linear-to-b from-transparent to-background" />
        <div className="flex-1 bg-background" />
      </div>
      {/* Faixa rolável na horizontal (focável para quem navega por teclado).
          `relative` a torna o bloco de contenção dos elementos absolutos dos
          cards (ex.: textos sr-only): sem isso eles escapam do overflow e
          esticam a página inteira na horizontal. */}
      <div
        role="region"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: região rolável precisa de foco para o teclado
        tabIndex={0}
        aria-label="Exemplos de telas, role na horizontal"
        className="relative overflow-x-auto outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <div className="flex w-max items-start gap-8 px-6 pt-12 pb-16 sm:px-10 sm:pb-24">
          {COLUMNS.map((column) => (
            <div
              key={column.id}
              className={`flex shrink-0 flex-col gap-8 ${column.width}`}
            >
              {column.blocks.map(([id, block]) => (
                <div key={id}>{block}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
