"use client";

import {
  Question,
  QuestionActions,
  QuestionDescription,
  QuestionInput,
  QuestionOption,
  QuestionOptions,
  QuestionPrompt,
  type QuestionResponse,
  QuestionSubmit,
} from "@blips/ai/components/question";
import { useState } from "react";

const opcoes = [
  { value: "boleto", label: "Boleto" },
  { value: "pix", label: "Pix" },
  { value: "cartao", label: "Cartão de crédito" },
];

export default function AiQuestionDemo() {
  const [resposta, setResposta] = useState<QuestionResponse | null>(null);

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Question disabled={resposta !== null} onSubmit={setResposta}>
        <QuestionPrompt>Como o cliente prefere pagar o acordo?</QuestionPrompt>
        <QuestionDescription>
          Escolha uma forma ou escreva outra condição.
        </QuestionDescription>
        <QuestionOptions>
          {opcoes.map((opcao) => (
            <QuestionOption key={opcao.value} value={opcao.value}>
              {opcao.label}
            </QuestionOption>
          ))}
        </QuestionOptions>
        <QuestionInput placeholder="Outra condição (opcional)" />
        <QuestionActions>
          <QuestionSubmit />
        </QuestionActions>
      </Question>
      {resposta && (
        <p className="text-muted-foreground text-xs">
          Enviado: {resposta.selectedValues.join(", ") || "nenhuma opção"}
          {resposta.text ? ` · "${resposta.text}"` : ""}
        </p>
      )}
    </div>
  );
}
