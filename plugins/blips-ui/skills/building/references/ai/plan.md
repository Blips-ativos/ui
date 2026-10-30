# Plan

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/plan`

Plano do agente num `Card` da @blips/ui que recolhe: título e descrição (que
viram `Shimmer` enquanto `isStreaming`), ação no canto (o botão de alternar) e
o conteúdo (os passos), que abre e fecha. Por baixo é um `Collapsible` (Base
UI) que renderiza o `Card` via `render`. Adaptado do `plan` do AI Elements
(Apache-2.0).

## Quando usar (e quando não)

- **Use** quando o agente anuncia **o que vai fazer** antes de executar
  (modo plano, "vou fazer 1, 2, 3"), e o plano ainda pode estar chegando em
  streaming.
- **Não use** para o progresso de execução de cada passo (buscando, feito):
  isso é `ChainOfThought` (`chain-of-thought.md`) ou `Task` (`task.md`).
- **Não use** para uma lista de pendências que o usuário ou o agente vão
  riscando: isso é `Queue` (`queue.md`).
- **Não use** para o raciocínio livre do modelo: `Reasoning` (`reasoning.md`).

## Peers exigidos

Nenhum além da @blips/ai (usa `Card`, `Collapsible`, `Button` da @blips/ui, o
`Shimmer` da própria @blips/ai e `@phosphor-icons/react`). O componente não
importa `ai`.

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. Se o seu código tipar as parts com o AI
SDK, `ai` é peer opcional e só de tipos (`import type`): num projeto
TypeScript entra como **devDependency** (`pnpm add -D ai`).

## API

Exports: `Plan`, `PlanHeader`, `PlanTitle`, `PlanDescription`, `PlanAction`,
`PlanContent`, `PlanFooter`, `PlanTrigger` e os tipos `*Props` de cada um.

| Componente | Props reais | Notas |
|---|---|---|
| `Plan` | props do `Collapsible` da @blips/ui (`open`, `defaultOpen`, `onOpenChange`, `disabled`, `className` string ou função) + `isStreaming?: boolean` (`false`) | Renderiza um `Card` (`render={<Card />}`) com `shadow-none`. **Começa fechado** (padrão do Collapsible): passe `defaultOpen` para abrir. Provê o contexto. |
| `PlanHeader` | props do `CardHeader` | `flex items-start justify-between`. |
| `PlanTitle` | props do `CardTitle` sem `children` + `children: string` (obrigatório) | Com `isStreaming`, vira `<Shimmer>`. |
| `PlanDescription` | props do `CardDescription` sem `children` + `children: string` (obrigatório) | `text-balance`; `Shimmer` com `isStreaming`. |
| `PlanAction` | props do `CardAction` | Canto direito do header (lugar do `PlanTrigger`). |
| `PlanContent` | props do `CardContent` | É o `CollapsibleContent`: some quando fechado. |
| `PlanFooter` | props de `<div>` | `CardFooter`; **fica visível** mesmo com o plano fechado. |
| `PlanTrigger` | props do `CollapsibleTrigger` + `label?: string` (`"Alternar plano"`) | `Button size="icon" variant="ghost"` `size-8` com `CaretUpDownIcon`; `label` é o texto `sr-only`. |

`PlanTitle` e `PlanDescription` lançam erro fora de `Plan`.

## Composição com a @blips/ui

- É um `Card` da @blips/ui: `PlanHeader`/`PlanTitle`/`PlanDescription`/
  `PlanAction`/`PlanFooter` são os slots do Card com `data-slot` próprio.
- Os passos dentro de `PlanContent` são livres: lista `ol` simples, `Item`
  da @blips/ui, ou `Checkbox` desabilitado para "feito".
- Ação principal no rodapé: `Button` da @blips/ui em `PlanFooter` ("Executar
  plano"), que continua visível com o card fechado.
- Num chat: dentro do `MessageContent` do `Message` da @blips/ui, antes da
  resposta. Streaming: `isStreaming` = a part do plano ainda chegando
  (AI SDK: `status === "streaming"` e é a última mensagem; Agno: entre o
  evento de início e o de conclusão do passo de planejamento, mapeado no app).

## Exemplo v3 que compila

```tsx
"use client";

import {
  Plan,
  PlanAction,
  PlanContent,
  PlanDescription,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from "@blips/ai/components/plan";
import { Button } from "@blips/ui/components/button";

const passos = [
  "Buscar os contratos ativos do cliente pelo CNPJ",
  "Conferir as parcelas em aberto",
  "Emitir a segunda via do boleto mais antigo",
];

export function PlanoDoAgente({
  emAndamento,
  onExecutar,
}: {
  emAndamento: boolean;
  onExecutar: () => void;
}) {
  return (
    <Plan defaultOpen isStreaming={emAndamento}>
      <PlanHeader>
        <div>
          <PlanTitle>Segunda via do boleto</PlanTitle>
          <PlanDescription>
            Vou localizar o contrato e emitir a segunda via da parcela vencida.
          </PlanDescription>
        </div>
        <PlanAction>
          <PlanTrigger />
        </PlanAction>
      </PlanHeader>
      <PlanContent>
        <ol className="list-decimal space-y-1 pl-4 text-sm">
          {passos.map((passo) => (
            <li key={passo}>{passo}</li>
          ))}
        </ol>
      </PlanContent>
      <PlanFooter className="justify-end">
        <Button disabled={emAndamento} onClick={onExecutar} size="sm">
          Executar plano
        </Button>
      </PlanFooter>
    </Plan>
  );
}
```

## Armadilhas

- **Começa fechado.** Sem `defaultOpen` (ou `open`), o `PlanContent` não
  aparece até clicar no `PlanTrigger`.
- **Sem `PlanTrigger`, não há como abrir.** O header não é clicável; ponha o
  trigger (ou controle `open` você mesmo).
- **`PlanTitle` e `PlanDescription` só aceitam string.** O `Shimmer` anima
  texto; JSX como filho não compila.
- `PlanFooter` fica fora do conteúdo recolhível: o que estiver nele aparece
  sempre.
- O estado aberto vem de `data-open`/`data-panel-open` (Base UI v3), não de
  `data-[state=open]`: estilize por eles.
- `"use client"` (contexto e Collapsible).
