"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@blips/ui/components/questionnaire";
import * as React from "react";

const items = [
  {
    name: "tarefa",
    required: true,
    choices: [{ value: "inspecionar" }, { value: "implementar" }],
  },
  {
    name: "revisao",
    required: true,
    choices: [{ value: "sim" }, { value: "nao" }],
  },
] as const;

export default function QuestionnaireCardDemo() {
  const tarefaId = React.useId();
  const revisaoId = React.useId();
  const [done, setDone] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
  }

  const navigation = (
    <QuestionnaireActions>
      <QuestionnairePrevious>Voltar</QuestionnairePrevious>
      <QuestionnaireNext>Avançar</QuestionnaireNext>
      <QuestionnaireSubmit>{done ? "Salvo" : "Salvar"}</QuestionnaireSubmit>
    </QuestionnaireActions>
  );

  return (
    <Questionnaire
      className="w-full max-w-md"
      defaultItem="tarefa"
      items={items}
      shortcuts="numbers"
      onSubmit={handleSubmit}
    >
      <QuestionnaireItem aria-labelledby={tarefaId} name="tarefa" required>
        <Card>
          <CardHeader>
            <QuestionnaireTitle id={tarefaId} render={<CardTitle />}>
              O que o agente deve fazer agora?
            </QuestionnaireTitle>
            <QuestionnaireDescription render={<CardDescription />}>
              Escolha uma opção para continuar.
            </QuestionnaireDescription>
            <CardAction>
              <QuestionnaireProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="inspecionar">
                Inspecionar o código
              </QuestionnaireChoice>
              <QuestionnaireChoice value="implementar">
                Implementar a mudança
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </CardContent>
          <CardFooter>{navigation}</CardFooter>
        </Card>
      </QuestionnaireItem>
      <QuestionnaireItem aria-labelledby={revisaoId} name="revisao" required>
        <Card>
          <CardHeader>
            <QuestionnaireTitle id={revisaoId} render={<CardTitle />}>
              Quer revisar antes do merge?
            </QuestionnaireTitle>
            <QuestionnaireDescription render={<CardDescription />}>
              A revisão abre um resumo das mudanças.
            </QuestionnaireDescription>
            <CardAction>
              <QuestionnaireProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="sim">Sim</QuestionnaireChoice>
              <QuestionnaireChoice value="nao">Não</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </CardContent>
          <CardFooter>{navigation}</CardFooter>
        </Card>
      </QuestionnaireItem>
    </Questionnaire>
  );
}
