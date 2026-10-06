"use client";

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@blips/ai/components/reasoning";

export default function AiReasoningConcluido() {
  return (
    <div className="w-full max-w-lg">
      <Reasoning defaultOpen duration={4}>
        <ReasoningTrigger
          getThinkingMessage={(_, duration) => (
            <p>Pensou por {duration} segundos</p>
          )}
        />
        <ReasoningContent>
          {`O equipamento está em garantia até **março de 2027**. O defeito relatado (aquecimento irregular) é coberto, então a abertura de chamado técnico é o próximo passo.`}
        </ReasoningContent>
      </Reasoning>
    </div>
  );
}
