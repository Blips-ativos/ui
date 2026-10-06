"use client";

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@blips/ui/components/questionnaire";

const items = [
  {
    name: "plano",
    required: true,
    choices: [
      { value: "basico" },
      { value: "pro" },
      { value: "enterprise", disabled: true },
    ],
  },
] as const;

export default function QuestionnaireDisabledDemo() {
  return (
    <Questionnaire
      className="w-full max-w-md"
      defaultItem="plano"
      items={items}
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireItem name="plano" required>
        <QuestionnaireTitle>Escolha um plano</QuestionnaireTitle>
        <QuestionnaireDescription>
          O Enterprise não está disponível para a sua conta.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="basico">
            <span className="font-medium">Básico</span>
            <QuestionnaireChoiceDescription>
              Para pessoas e times pequenos
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="pro">
            <span className="font-medium">Pro</span>
            <QuestionnaireChoiceDescription>
              Para empresas em crescimento
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="enterprise" disabled>
            <span className="font-medium">Enterprise</span>
            <QuestionnaireChoiceDescription>
              Para times grandes
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireSubmit>Continuar</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
