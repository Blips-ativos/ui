# Question

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/question`

Pergunta do agente ao usuário **numa única tela**: enunciado, descrição,
opções em botões (escolha única ou múltipla, com `role="radio"`/`"checkbox"`
e `aria-checked`), campo livre opcional e botão de envio que só habilita com
alguma resposta. É um `<form>`; o `onSubmit` entrega `{ selectedValues, text }`
já limpo. Adaptado do `question` do repositório do AI Elements (Apache-2.0;
não está no registry publicado).

## Quando usar (e quando não)

- **Use** quando o agente para e pergunta algo curto ao usuário no meio do
  run ("Qual contrato?", "Quer receber por WhatsApp ou e-mail?"), com
  opções sugeridas e espaço para responder com as próprias palavras.
- **Não use** para **várias perguntas em sequência**, uma por vez, com
  progresso e Voltar/Pular: isso é o `Questionnaire` da @blips/ui
  (`../questionnaire.md`), que já existe na v3. Não recrie etapas com vários
  `Question`.
- **Não use** para aprovar ou recusar uma ferramenta: `Confirmation`
  (`confirmation.md`).
- **Não use** para sugestões de próxima pergunta do usuário: `Suggestion`
  (`suggestion.md`).
- **Não use** como formulário de app (cadastro, filtros): `Form`/`Field` da
  @blips/ui.

## Peers exigidos

Nenhum além da @blips/ai (usa `Button` e `Textarea` da @blips/ui). O
componente não importa `ai`.

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. Se o seu código tipar as parts com o AI
SDK, `ai` é peer opcional e só de tipos (`import type`): num projeto
TypeScript entra como **devDependency** (`pnpm add -D ai`).

## API

Tipos de dados exportados:

```ts
interface QuestionValue { selectedValues: readonly string[]; text: string }
interface QuestionResponse { selectedValues: readonly string[]; text?: string }
```

| Componente | Props reais | Notas |
|---|---|---|
| `Question` | props de `<form>` (sem `defaultValue`, `value`, `onSubmit` nativos) + `selectionMode?: "single" \| "multiple"` (`"single"`), `value?: QuestionValue`, `defaultValue?: QuestionValue`, `onValueChange?: (value: QuestionValue) => void`, `onSubmit?: (response: QuestionResponse, event: FormEvent<HTMLFormElement>) => void \| Promise<void>`, `disabled?: boolean` (`false`) | `<form>` `space-y-4 rounded-lg border bg-background p-4`. Faz `preventDefault`; não chama `onSubmit` sem resposta ou com `disabled`. O `text` sai com `trim()` e vira `undefined` se vazio. |
| `QuestionPrompt` | props de `<p>` | Enunciado, `font-medium text-sm`. |
| `QuestionDescription` | props de `<p>` | `text-muted-foreground text-sm`. |
| `QuestionOptions` | props de `<div>` | `flex flex-wrap gap-2`, `role="radiogroup"` (single) ou `"group"` (multiple). |
| `QuestionOption` | props do `Button` sem `value` + `value: string` (obrigatório) | Alterna a seleção. Visual `outline`, `default` quando selecionada (a menos que você passe `variant`). Sem `children`, mostra o `value`. Single: clicar na selecionada desmarca. |
| `QuestionInput` | props do `Textarea` sem `value`/`defaultValue` | Controlado pelo contexto (`text`); `min-h-20`. Passe `aria-label` ou `placeholder`. |
| `QuestionActions` | props de `<div>` | `flex justify-end gap-2`. |
| `QuestionSubmit` | props do `Button` | `type="submit"`, texto padrão **"Enviar"**; desabilitado sem seleção nem texto. |

Os subcomponentes que leem o contexto (`QuestionOptions`, `QuestionOption`,
`QuestionInput`, `QuestionSubmit`) lançam erro fora de `Question`.

## Composição com a @blips/ui

- Opções são `Button` da @blips/ui; o campo é o `Textarea` da @blips/ui.
- Num chat: dentro do `MessageContent` do `Message` (papel do assistente) da
  @blips/ui, no lugar do `MessageResponse` daquela vez. Depois de
  respondida, troque o `Question` pela resposta do usuário num `Bubble`
  (ou passe `disabled`).
- Fluxo: AI SDK, a pergunta é uma tool sem `execute` no cliente (part
  `tool-perguntar` em `input-available`) e o `onSubmit` chama
  `addToolOutput({ tool, toolCallId, output: response })` do `useChat`; Agno, a pausa do
  run por input do usuário e a continuação com a resposta, mapeadas no app.

## Exemplo v3 que compila

```tsx
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

export function PerguntaCanal({
  respondida,
  onResponder,
}: {
  respondida: boolean;
  onResponder: (resposta: QuestionResponse) => void;
}) {
  return (
    <Question disabled={respondida} onSubmit={(resposta) => onResponder(resposta)}>
      <QuestionPrompt>Por onde você quer receber a segunda via?</QuestionPrompt>
      <QuestionDescription>
        Escolha um canal ou escreva outro contato abaixo.
      </QuestionDescription>
      <QuestionOptions>
        <QuestionOption value="whatsapp">WhatsApp</QuestionOption>
        <QuestionOption value="email">E-mail</QuestionOption>
      </QuestionOptions>
      <QuestionInput
        aria-label="Outro contato"
        placeholder="Ex.: financeiro@empresa.com.br"
      />
      <QuestionActions>
        <QuestionSubmit />
      </QuestionActions>
    </Question>
  );
}
```

## Armadilhas

- **É um `<form>`.** Não aninhe dentro de outro `<form>` (ex.: o
  `PromptInput`); coloque ao lado.
- **`variant` fixo apaga o destaque de seleção.** O `QuestionOption` só troca
  `outline`→`default` quando você **não** passa `variant`.
- **Controlado de verdade.** Com `value`, o estado só muda se você atualizar
  em `onValueChange`; sem isso, os cliques não aparecem.
- **`onClick` do `QuestionOption` recebe o evento do Base UI**
  (`BaseUIEvent<MouseEvent>`, assinatura do `Button` da @blips/ui), não um
  `MouseEvent` puro.
- `QuestionInput` não aceita `value`/`defaultValue`: o texto inicial vai em
  `defaultValue={{ selectedValues: [], text: "..." }}` no `Question`.
- Para várias perguntas, use `Questionnaire` da @blips/ui: o `Question` não
  tem etapas.
