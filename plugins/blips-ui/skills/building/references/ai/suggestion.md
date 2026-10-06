# Suggestion

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/suggestion`

Faixa horizontal rolável de sugestões de pergunta ("Qual o vencimento do meu
boleto?", "Abrir chamado de garantia") que a pessoa clica para mandar ao agente.
Cada sugestão é um `Button` da @blips/ui em formato pílula; a faixa é um
`ScrollArea` com barra horizontal escondida.

## Quando usar (e quando não)

- **Use** no estado vazio da conversa (perguntas iniciais) ou abaixo da última
  resposta (próximos passos sugeridos pelo agente).
- **Não use** para filtros ou seleção de opções de formulário: isso é
  `ToggleGroup`, `RadioGroup` ou `Badge`.
- **Não use** para ações sobre a mensagem (copiar, refazer): isso é
  `MessageActions` (`message.md`).
- Para escolha estruturada que o agente pede (opções de um questionário), veja o
  `Questionnaire` da @blips/ui (`../questionnaire.md`).

## Peers exigidos

Nenhum.

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

| Export | Props | Notas |
|---|---|---|
| `Suggestions` | Props do `ScrollArea` (Base UI `ScrollArea.Root`) | Root `w-full overflow-x-auto whitespace-nowrap`. O `className` vai para a **linha interna** (`flex w-max flex-nowrap items-center gap-2`), não para o root. |
| `Suggestion` | Props do `Button` (sem `onClick`) + `suggestion: string`, `onClick?: (suggestion: string) => void` | Padrão `variant="outline"`, `size="sm"`, `rounded-full px-4`, `type="button"`. Sem `children`, mostra o próprio `suggestion`. |

## Composição com a @blips/ui

- Dentro do `ConversationEmptyState` (`conversation.md`) como `children`, junto
  de título/descrição montados à mão.
- Acima do `PromptInput` (`prompt-input.md`), na mesma coluna.
- `variant`/`size` são os do `Button` da @blips/ui (`size="sm"` = 24px,
  `text-xs`). Para um destaque, `variant="secondary"`.
- Com ícone: passe `children` (`<LightningIcon /> Texto`); o `suggestion`
  continua sendo o valor entregue no `onClick`.

## Exemplo v3

```tsx
"use client";

import { Suggestion, Suggestions } from "@blips/ai/components/suggestion";

const sugestoes = [
  "Qual o vencimento do meu próximo boleto?",
  "Quero a segunda via do contrato",
  "Meu equipamento parou de funcionar",
  "Como funciona o distrato?",
];

export function SugestoesIniciais({
  onEnviar,
}: {
  onEnviar: (texto: string) => void;
}) {
  return (
    <Suggestions>
      {sugestoes.map((texto) => (
        <Suggestion key={texto} onClick={onEnviar} suggestion={texto} />
      ))}
    </Suggestions>
  );
}
```

## Armadilhas

- `onClick` recebe a **string** da sugestão, não o evento. `onClick={(e) =>
  e.preventDefault()}` não faz o que parece.
- `className` em `Suggestions` estiliza a linha interna. Para mexer no root
  (largura, margem), envolva num `div`.
- Props exclusivas do Radix ScrollArea (`type`, `scrollHideDelay`) não existem
  no Base UI.
- Texto longo não quebra (`whitespace-nowrap`): mantenha as sugestões curtas,
  ou a faixa fica dependente de rolagem lateral, que no desktop sem trackpad é
  difícil de descobrir.
- Ao clicar, mande a pergunta direto (`sendMessage`) ou preencha o input: decida
  e mantenha igual no app todo. Não faça as duas coisas.
