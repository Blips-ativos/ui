"use client";

import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@blips/ai/components/sources";

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
      <SourcesTrigger count={fontes.length} />
      <SourcesContent>
        {fontes.map((fonte) => (
          <Source href={fonte.href} key={fonte.href} title={fonte.title} />
        ))}
      </SourcesContent>
    </Sources>
  );
}
