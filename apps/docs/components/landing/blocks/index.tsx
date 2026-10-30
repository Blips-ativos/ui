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
 * Ordem pensada para o masonry de 3 colunas (CSS columns preenche de cima para
 * baixo): cards altos alternam com cards baixos para as colunas fecharem com
 * alturas parecidas.
 */
const BLOCKS: { id: string; conteudo: ReactNode }[] = [
  { id: "receita", conteudo: <BlockReceita /> },
  { id: "contratos", conteudo: <BlockContratos /> },
  { id: "notificacoes", conteudo: <BlockNotificacoes /> },
  { id: "atendimento", conteudo: <BlockAtendimento /> },
  { id: "indicadores", conteudo: <BlockIndicadores /> },
  { id: "fatura", conteudo: <BlockFatura /> },
  { id: "frota", conteudo: <BlockFrota /> },
  { id: "garantia", conteudo: <BlockGarantia /> },
  { id: "onboarding", conteudo: <BlockOnboarding /> },
];

/** Seção da home: telas do dia a dia da Blips montadas só com a @blips/ui. */
export function HomeBlocks() {
  return (
    <section aria-labelledby="home-blocks-titulo" className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="typeset typeset-docs max-w-[37em]">
          <h2 id="home-blocks-titulo">Feito com Blips UI</h2>
          <p>
            Telas do dia a dia da Blips (locação, cobrança, garantia, IoT e
            atendimento com agentes de IA) montadas só com os componentes da
            biblioteca. Tudo aqui é interativo e usa dados fictícios.
          </p>
        </div>
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
          {BLOCKS.map((block) => (
            <div key={block.id} className="mb-4 break-inside-avoid">
              {block.conteudo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
