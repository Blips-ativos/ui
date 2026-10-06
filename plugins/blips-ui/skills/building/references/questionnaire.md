# Questionnaire

Import: `@blips/ui/components/questionnaire`

> **Só existe na v3.x.** Em repo v2 (`@blips/ui` 2.x) o Questionnaire não existe:
> monte as etapas com `RadioGroup`/`Checkbox` + `Field` e navegação própria, ou
> proponha a migração para a v3. Veja `v2-vs-v3.md`.

Questionário de várias perguntas, **uma por vez**, com escolhas (única ou
múltipla), resposta livre, atalhos de teclado, progresso ("1 de 3") e navegação
Voltar/Pular/Avançar/Enviar. Pensado para agentes de IA que perguntam ao usuário,
onboarding curto e pesquisas. É um `<form>` de verdade: as respostas saem no
`FormData` do `onSubmit`. Construído sobre `@shadcn/react/questionnaire`
(dependência da lib), com `"use client"`.

Exports: `Questionnaire`, `QuestionnaireProgress`, `QuestionnaireItem`,
`QuestionnaireTitle`, `QuestionnaireDescription`, `QuestionnaireChoices`,
`QuestionnaireChoice`, `QuestionnaireChoiceDescription`, `QuestionnaireInput`,
`QuestionnaireError`, `QuestionnaireActions`, `QuestionnairePrevious`,
`QuestionnaireSkip`, `QuestionnaireNext`, `QuestionnaireSubmit`.

## Componentes e props

| Componente | Props principais |
|---|---|
| `Questionnaire` | Raiz `<form>`. `items` (definição das perguntas, ver abaixo), `defaultItem` / `item` + `onItemChange(name)` (pergunta ativa, não controlada / controlada), `shortcuts` (`"letters"` A/B/C ou `"numbers"` 1/2/3), `onSubmit`, `onReset` e demais props de `<form>`. |
| `QuestionnaireProgress` | Texto de progresso (`text-[0.625rem] tabular-nums`). Aceita `render` com estado `{ current, total, first, last }`. |
| `QuestionnaireItem` | Uma pergunta (`<fieldset>`). `name` (obrigatório, casa com `items`), `multiple` (várias escolhas = checkbox; sem ele, radio), `required`, `disabled`, `invalid`, `onStatusChange(status)` (`"unanswered" \| "answered" \| "skipped"`). |
| `QuestionnaireTitle` | Pergunta (`<legend>`, `text-sm font-semibold`). |
| `QuestionnaireDescription` | Texto de apoio (`text-xs/relaxed text-muted-foreground`). |
| `QuestionnaireChoices` | Lista das escolhas (`grid gap-1.5`). |
| `QuestionnaireChoice` | Uma escolha (cartão clicável `rounded-xl border`, com indicador de radio/checkbox e atalho). `value` (obrigatório), `checked`/`defaultChecked`/`onChange`, `disabled`. Estado: `data-checked`, `data-type="radio" \| "checkbox"`. |
| `QuestionnaireChoiceDescription` | Linha secundária dentro da escolha. |
| `QuestionnaireInput` | Resposta livre ("Outro…") dentro de `QuestionnaireChoices`. `type` (`text`, `email`, `number`, `date`…), `value`/`defaultValue`/`onChange`, `placeholder`. Precisa de `aria-label`. |
| `QuestionnaireError` | Mensagem quando a pergunta obrigatória fica sem resposta (`text-destructive`). |
| `QuestionnaireActions` | Linha dos botões (grid: Voltar à esquerda, Pular e Avançar/Enviar à direita). |
| `QuestionnairePrevious` / `QuestionnaireSkip` / `QuestionnaireNext` / `QuestionnaireSubmit` | Botões com o visual do `Button` (`variant`, `size`; Previous/Skip `outline`, Next/Submit `default`). Aparecem/somem sozinhos conforme a etapa (Submit só na última). |

**`items`** (na raiz): `{ name: string; required?: boolean; disabled?: boolean; choices?: { value: string; disabled?: boolean }[] }[]`, na ordem das perguntas. Use `as const`.

- Os rótulos padrão dos botões estão em inglês ("Previous", "Skip", "Next", "Submit"): **sempre passe `children` em pt-BR**.
- Enter avança; com `shortcuts`, a tecla da letra/número marca a escolha.
- Botões têm `min-h-11` no mobile (alvo de toque) e altura normal a partir de `sm`.

## Exemplo

```tsx
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

const items = [
  {
    name: "objetivo",
    required: true,
    choices: [{ value: "locacao" }, { value: "compra" }],
  },
  {
    name: "canais",
    choices: [{ value: "whatsapp" }, { value: "email" }, { value: "telefone" }],
  },
] as const;

export function QuestionarioDeOnboarding({
  salvar,
}: {
  salvar: (respostas: {
    objetivo: FormDataEntryValue | null;
    canais: FormDataEntryValue[];
  }) => void;
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    salvar({
      objetivo: dados.get("objetivo"),
      canais: dados.getAll("canais"),
    });
  }

  return (
    <Questionnaire
      items={items}
      defaultItem="objetivo"
      shortcuts="letters"
      onSubmit={handleSubmit}
      className="max-w-md"
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="objetivo" required>
        <QuestionnaireTitle>O que você procura?</QuestionnaireTitle>
        <QuestionnaireDescription>Escolha uma opção ou escreva outra.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="locacao">
            <span className="font-medium">Locação</span>
            <QuestionnaireChoiceDescription>Pagamento mensal, sem compra.</QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="compra">
            <span className="font-medium">Compra</span>
            <QuestionnaireChoiceDescription>O equipamento fica com você.</QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireInput aria-label="Outro objetivo" placeholder="Outro objetivo…" />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="canais" multiple>
        <QuestionnaireTitle>Por onde prefere falar com a gente?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="whatsapp">WhatsApp</QuestionnaireChoice>
          <QuestionnaireChoice value="email">E-mail</QuestionnaireChoice>
          <QuestionnaireChoice value="telefone">Telefone</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious>Voltar</QuestionnairePrevious>
        <QuestionnaireSkip>Pular</QuestionnaireSkip>
        <QuestionnaireNext>Avançar</QuestionnaireNext>
        <QuestionnaireSubmit>Enviar respostas</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
```

Dentro de `Card` ou `Dialog`, o `Questionnaire` vai no conteúdo; o título do
diálogo continua obrigatório (`DialogTitle`).

## Exemplos na docs

`questionnaire-demo`, `questionnaire-card`, `questionnaire-dialog`, `questionnaire-disabled` (em `apps/docs/examples/`).
