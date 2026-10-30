"use client";

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@blips/ui/components/questionnaire";
import * as React from "react";

const items = [
  {
    name: "direcao",
    required: true,
    choices: [
      { value: "delegacao" },
      { value: "perguntas" },
      { value: "ambos" },
    ],
  },
  {
    name: "sinais",
    choices: [
      { value: "progresso" },
      { value: "decisoes" },
      { value: "riscos" },
    ],
  },
  {
    name: "prazo",
    required: true,
    choices: [{ value: "semana" }, { value: "ciclo" }, { value: "depois" }],
  },
] as const;

export default function QuestionnaireDemo() {
  const [result, setResult] = React.useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(
      `Direção: ${data.get("direcao") ?? "nenhuma"} · Sinais: ${
        data.getAll("sinais").join(", ") || "nenhum"
      } · Prazo: ${data.get("prazo") ?? "nenhum"}`
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Questionnaire
        defaultItem="direcao"
        items={items}
        shortcuts="letters"
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />
        <QuestionnaireItem name="direcao" required>
          <QuestionnaireTitle>O que vamos prototipar agora?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Escolha uma direção ou escreva outra resposta.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="delegacao">
              <span className="font-medium">Delegação para subagentes</span>
              <QuestionnaireChoiceDescription>
                Mostrar quando o trabalho é delegado e o que volta.
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="perguntas">
              <span className="font-medium">Perguntas ao usuário</span>
              <QuestionnaireChoiceDescription>
                Mostrar opções enquanto o agente espera uma resposta.
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="ambos">
              <span className="font-medium">Os dois juntos</span>
              <QuestionnaireChoiceDescription>
                Explorar um padrão de interação unificado.
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireInput
              aria-label="Outra direção"
              placeholder="Digite outra direção…"
            />
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireItem name="sinais" multiple>
          <QuestionnaireTitle>
            O que toda atualização de progresso deve trazer?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Marque todas as que se aplicam, ou pule a pergunta.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="progresso">
              Progresso
            </QuestionnaireChoice>
            <QuestionnaireChoice value="decisoes">Decisões</QuestionnaireChoice>
            <QuestionnaireChoice value="riscos">Riscos</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireItem name="prazo" required>
          <QuestionnaireTitle>Quando revisitamos isso?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Escolha quando o tema volta para a pauta.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="semana">
              Esta semana
            </QuestionnaireChoice>
            <QuestionnaireChoice value="ciclo">
              Próximo ciclo
            </QuestionnaireChoice>
            <QuestionnaireChoice value="depois">Mais tarde</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnairePrevious>Voltar</QuestionnairePrevious>
          <QuestionnaireSkip>Pular</QuestionnaireSkip>
          <QuestionnaireNext>Avançar</QuestionnaireNext>
          <QuestionnaireSubmit>Salvar respostas</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
      {result ? (
        <p role="status" className="text-xs text-muted-foreground">
          {result}
        </p>
      ) : null}
    </div>
  );
}
