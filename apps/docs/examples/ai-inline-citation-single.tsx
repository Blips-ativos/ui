"use client";

import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationSource,
  InlineCitationText,
} from "@blips/ai/components/inline-citation";

const fonte = {
  title: "Código de Defesa do Consumidor — art. 49",
  url: "https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm",
  description:
    "O consumidor pode desistir do contrato no prazo de 7 dias a contar da assinatura, sempre que a contratação ocorrer fora do estabelecimento comercial.",
};

export default function AiInlineCitationSingle() {
  return (
    <p className="max-w-md text-sm leading-relaxed">
      Contratos fechados pela internet têm{" "}
      <InlineCitation>
        <InlineCitationText>
          prazo de arrependimento de 7 dias
        </InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger delay={150} sources={[fonte.url]} />
          <InlineCitationCardBody className="p-4">
            <InlineCitationSource
              description={fonte.description}
              title={fonte.title}
              url={fonte.url}
            />
          </InlineCitationCardBody>
        </InlineCitationCard>
      </InlineCitation>
      .
    </p>
  );
}
