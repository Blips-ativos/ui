"use client";

import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationQuote,
  InlineCitationSource,
  InlineCitationText,
} from "@blips/ai/components/inline-citation";

const fontes = [
  {
    title: "Pix — Banco Central do Brasil",
    url: "https://www.bcb.gov.br/estabilidadefinanceira/pix",
    description:
      "O Pix é o meio de pagamento instantâneo criado pelo Banco Central, disponível 24 horas por dia, todos os dias.",
    quote: "As transferências são liquidadas em poucos segundos.",
  },
  {
    title: "Estatísticas do Pix",
    url: "https://www.bcb.gov.br/estabilidadefinanceira/estatisticaspix",
    description:
      "Dados mensais de volume e quantidade de transações feitas com o Pix desde o lançamento, em novembro de 2020.",
  },
];

export default function AiInlineCitationDemo() {
  return (
    <p className="max-w-md text-sm leading-relaxed">
      O cliente pode quitar a parcela na hora pelo Pix.{" "}
      <InlineCitation>
        <InlineCitationText>
          O pagamento cai em segundos e funciona inclusive em fins de semana e
          feriados
        </InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger sources={fontes.map((f) => f.url)} />
          <InlineCitationCardBody>
            <InlineCitationCarousel>
              <InlineCitationCarouselHeader>
                <InlineCitationCarouselPrev />
                <InlineCitationCarouselNext />
                <InlineCitationCarouselIndex />
              </InlineCitationCarouselHeader>
              <InlineCitationCarouselContent>
                {fontes.map((fonte) => (
                  <InlineCitationCarouselItem key={fonte.url}>
                    <InlineCitationSource
                      description={fonte.description}
                      title={fonte.title}
                      url={fonte.url}
                    />
                    {fonte.quote && (
                      <InlineCitationQuote>{fonte.quote}</InlineCitationQuote>
                    )}
                  </InlineCitationCarouselItem>
                ))}
              </InlineCitationCarouselContent>
            </InlineCitationCarousel>
          </InlineCitationCardBody>
        </InlineCitationCard>
      </InlineCitation>
      .
    </p>
  );
}
