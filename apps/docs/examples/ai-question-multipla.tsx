"use client";

import {
  Question,
  QuestionActions,
  QuestionOption,
  QuestionOptions,
  QuestionPrompt,
  QuestionSubmit,
  type QuestionValue,
} from "@blips/ai/components/question";
import { useState } from "react";

const documentos = [
  "Contrato social",
  "Comprovante de endereço",
  "Extrato bancário",
  "Nota fiscal do equipamento",
];

export default function AiQuestionMultipla() {
  const [valor, setValor] = useState<QuestionValue>({
    selectedValues: ["Contrato social"],
    text: "",
  });

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Question
        onSubmit={() => undefined}
        onValueChange={setValor}
        selectionMode="multiple"
        value={valor}
      >
        <QuestionPrompt>Quais documentos o cliente já enviou?</QuestionPrompt>
        <QuestionOptions>
          {documentos.map((documento) => (
            <QuestionOption key={documento} size="sm" value={documento} />
          ))}
        </QuestionOptions>
        <QuestionActions>
          <QuestionSubmit>Confirmar documentos</QuestionSubmit>
        </QuestionActions>
      </Question>
      <p className="text-muted-foreground text-xs">
        Selecionados: {valor.selectedValues.length}
      </p>
    </div>
  );
}
