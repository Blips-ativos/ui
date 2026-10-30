"use client";

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@blips/ai/components/reasoning";
import { CaretDownIcon, SparkleIcon } from "@phosphor-icons/react";

export default function AiReasoningGatilho() {
  return (
    <div className="w-full max-w-lg">
      <Reasoning defaultOpen={false} duration={2}>
        <ReasoningTrigger className="group">
          <SparkleIcon className="size-4" />
          <span>Ver como cheguei a essa resposta</span>
          <CaretDownIcon className="size-4 transition-transform group-data-panel-open:rotate-180" />
        </ReasoningTrigger>
        <ReasoningContent>
          {`Somei as três parcelas em aberto (R$ 1.240,00 cada) e apliquei o desconto de antecipação de 3%.`}
        </ReasoningContent>
      </Reasoning>
    </div>
  );
}
