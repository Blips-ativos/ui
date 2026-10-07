# Queue

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/queue`

Caixa compacta com seções recolhíveis (ex.: "3 mensagens na fila", "5
tarefas") e listas roláveis de itens: bolinha de status, texto que fica riscado
quando concluído, descrição, ações que aparecem no hover e anexos (miniatura de
imagem ou chip de arquivo). Adaptado do `queue` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para o que está **pendente**: mensagens que o usuário enviou
  enquanto o agente ainda respondia (fila de envio), ou a lista de afazeres
  (todos) que o agente mantém e vai concluindo.
- Costuma ficar **acima do `PromptInput`** (`prompt-input.md`), colado nele.
- **Não use** para o plano antes da execução: `Plan` (`plan.md`).
- **Não use** para os passos já executados com resultado: `ChainOfThought`
  (`chain-of-thought.md`) ou `Task` (`task.md`).
- **Não use** como lista genérica de dados: `Item`/`Table` da @blips/ui.

## Peers exigidos

Nenhum além da @blips/ai (usa `Button`, `Collapsible`, `ScrollArea` da
@blips/ui e `@phosphor-icons/react`). O componente não importa `ai`.

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. Se o seu código tipar as mensagens com o
AI SDK, `ai` é peer opcional e só de tipos (`import type`): num projeto
TypeScript entra como **devDependency** (`pnpm add -D ai`).

## API

Tipos de dados exportados (só ajudam a tipar o seu estado; nenhum componente
os exige):

```ts
interface QueueMessagePart { type: string; text?: string; url?: string; filename?: string; mediaType?: string }
interface QueueMessage { id: string; parts: QueueMessagePart[] }
interface QueueTodo { id: string; title: string; description?: string; status?: "pending" | "completed" }
```

| Componente | Props reais | Notas |
|---|---|---|
| `Queue` | props de `<div>` | Moldura `rounded-xl border bg-background shadow-xs`, `flex-col gap-2`. |
| `QueueSection` | props do `Collapsible` (`open`, `defaultOpen`, `onOpenChange`…) | **Aberta por padrão** (`defaultOpen = true`). |
| `QueueSectionTrigger` | props de `<button>` | É o `CollapsibleTrigger` (já é `<button>`), faixa `bg-muted/40` com `group`. |
| `QueueSectionLabel` | props de `<span>` + `label: string` (obrigatório), `count?: number`, `icon?: ReactNode` | Renderiza caret (gira com `group-data-panel-open`), `icon` e o texto `"{count} {label}"`. |
| `QueueSectionContent` | props do `CollapsibleContent` | |
| `QueueList` | props do `ScrollArea` | `ScrollArea` com um `<ul>` dentro de um `div max-h-40`: limita a altura em 10rem e rola o resto. Os filhos devem ser `QueueItem` (`<li>`). |
| `QueueItem` | props de `<li>` | `group`, `hover:bg-muted`. |
| `QueueItemIndicator` | props de `<span>` + `completed?: boolean` (`false`) | Bolinha de 10px; concluída fica apagada. |
| `QueueItemContent` | props de `<span>` + `completed?: boolean` | `line-clamp-1`; concluído fica `line-through`. |
| `QueueItemDescription` | props de `<div>` + `completed?: boolean` | `ml-6 text-xs`. |
| `QueueItemActions` | props de `<div>` | `flex gap-1`. |
| `QueueItemAction` | props do `Button` **sem** `variant`/`size` | Botão ghost de ícone, `opacity-0` até o hover ou foco do `QueueItem`. Passe `aria-label`. |
| `QueueItemAttachment` | props de `<div>` | Linha `flex-wrap gap-2` para os anexos. |
| `QueueItemImage` | props de `<img>` | 32×32, `object-cover`, `alt=""` por padrão. |
| `QueueItemFile` | props de `<span>` | Chip com `PaperclipIcon`; `children` (nome) truncado em 100px. |

## Composição com a @blips/ui

- Já usa `Collapsible`, `ScrollArea` e `Button` da @blips/ui v3. O estado
  aberto da seção vem de `data-panel-open` no trigger (Base UI).
- Ícones Phosphor no `icon` do `QueueSectionLabel` e dentro de
  `QueueItemAction` (`TrashIcon`, `ArrowUpIcon`…).
- Ao lado do `PromptInput`: coloque o `Queue` logo acima, com a mesma largura
  (`components/ai-chat.md`). Mapeamento: fila de envio = mensagens do usuário
  guardadas no app enquanto `status !== "ready"` (AI SDK) ou enquanto o run do
  Agno não terminou; todos = a lista que a tool de "todo" do agente devolve.

## Exemplo v3 que compila

```tsx
"use client";

import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemContent,
  QueueItemDescription,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
  type QueueTodo,
} from "@blips/ai/components/queue";
import { ListChecksIcon, TrashIcon } from "@phosphor-icons/react";

export function TarefasDoAgente({
  tarefas,
  onRemover,
}: {
  tarefas: QueueTodo[];
  onRemover: (id: string) => void;
}) {
  const pendentes = tarefas.filter((t) => t.status !== "completed").length;

  return (
    <Queue>
      <QueueSection>
        <QueueSectionTrigger>
          <QueueSectionLabel
            count={pendentes}
            icon={<ListChecksIcon className="size-4" />}
            label="tarefas pendentes"
          />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            {tarefas.map((tarefa) => {
              const feita = tarefa.status === "completed";
              return (
                <QueueItem key={tarefa.id}>
                  <div className="flex items-center gap-2">
                    <QueueItemIndicator completed={feita} />
                    <QueueItemContent completed={feita}>
                      {tarefa.title}
                    </QueueItemContent>
                    <QueueItemActions>
                      <QueueItemAction
                        aria-label="Remover tarefa"
                        onClick={() => onRemover(tarefa.id)}
                      >
                        <TrashIcon className="size-3" />
                      </QueueItemAction>
                    </QueueItemActions>
                  </div>
                  {tarefa.description && (
                    <QueueItemDescription completed={feita}>
                      {tarefa.description}
                    </QueueItemDescription>
                  )}
                </QueueItem>
              );
            })}
          </QueueList>
        </QueueSectionContent>
      </QueueSection>
    </Queue>
  );
}
```

## Armadilhas

- **`QueueSectionLabel` escreve `"{count} {label}"`.** Sem `count`, sai só o
  label com um espaço na frente; flexione o texto você mesmo ("1 tarefa" /
  "3 tarefas").
- **`QueueItemAction` fica invisível até o hover ou o foco**
  (`opacity-0`, com `group-hover:opacity-100`, `group-focus-within:opacity-100`
  e `focus-visible:opacity-100`): pelo teclado ela aparece, mas em telas de
  toque não há hover. Se a ação for essencial, sobrescreva com
  `className="opacity-100"`.
- `QueueItemAction` não aceita `variant`/`size` (tipo omite); o visual é fixo.
- `QueueList` já tem o `<ul>`: os filhos diretos precisam ser `QueueItem`
  (`<li>`), não `<div>`.
- `QueueItemImage` tem `alt=""` (decorativo) por padrão: passe um `alt` se a
  imagem carrega informação.
- Sem texto padrão: todo rótulo é seu, em pt-BR.
