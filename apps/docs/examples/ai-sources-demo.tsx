"use client";

import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@blips/ai/components/sources";
import { CaretDownIcon } from "@phosphor-icons/react";

const fontes = [
  {
    href: "https://www.bcb.gov.br/estabilidadefinanceira/pix",
    title: "Banco Central — Pix",
  },
  {
    href: "https://www.gov.br/receitafederal/pt-br",
    title: "Receita Federal — Nota fiscal de serviço",
  },
  {
    href: "https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm",
    title: "Código de Defesa do Consumidor",
  },
];

export default function AiSourcesDemo() {
  return (
    <Sources>
      <SourcesTrigger count={fontes.length}>
        <span className="font-medium">{fontes.length} fontes consultadas</span>
        <CaretDownIcon className="size-4" />
      </SourcesTrigger>
      <SourcesContent>
        {fontes.map((fonte) => (
          <Source href={fonte.href} key={fonte.href} title={fonte.title} />
        ))}
      </SourcesContent>
    </Sources>
  );
}
