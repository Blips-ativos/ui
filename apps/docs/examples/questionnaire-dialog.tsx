"use client";

import { Button } from "@blips/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
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
    name: "canal",
    required: true,
    choices: [{ value: "whatsapp" }, { value: "email" }, { value: "chat" }],
  },
  {
    name: "frequencia",
    required: true,
    choices: [{ value: "diaria" }, { value: "semanal" }],
  },
] as const;

export default function QuestionnaireDialogDemo() {
  const [open, setOpen] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        Abrir questionário
      </DialogTrigger>
      <DialogContent>
        <Questionnaire
          defaultItem="canal"
          items={items}
          onSubmit={handleSubmit}
        >
          <DialogHeader>
            <DialogTitle className="sr-only">
              Preferências de contato
            </DialogTitle>
            <DialogDescription className="sr-only">
              Responda duas perguntas sobre como prefere ser avisado.
            </DialogDescription>
            <QuestionnaireProgress
              className="font-semibold tracking-widest text-foreground uppercase"
              render={(props, state) => (
                <span {...props}>
                  Pergunta {state.current} de {state.total}
                </span>
              )}
            />
          </DialogHeader>
          <QuestionnaireItem name="canal" required>
            <QuestionnaireTitle>
              Por onde prefere ser avisado?
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="whatsapp">
                WhatsApp
              </QuestionnaireChoice>
              <QuestionnaireChoice value="email">E-mail</QuestionnaireChoice>
              <QuestionnaireChoice value="chat">
                Google Chat
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="frequencia" required>
            <QuestionnaireTitle>Com que frequência?</QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="diaria">Diária</QuestionnaireChoice>
              <QuestionnaireChoice value="semanal">Semanal</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <DialogFooter>
            <QuestionnaireActions>
              <QuestionnairePrevious>Voltar</QuestionnairePrevious>
              <QuestionnaireNext>Avançar</QuestionnaireNext>
              <QuestionnaireSubmit>Concluir</QuestionnaireSubmit>
            </QuestionnaireActions>
          </DialogFooter>
        </Questionnaire>
      </DialogContent>
    </Dialog>
  );
}
