# Task

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/task`

Tarefa recolhível do agente: uma linha clicável com lupa, título e caret
(gira ao abrir) e, abaixo, os itens da tarefa num trilho com borda à esquerda
(`border-l-2`), com chips de arquivo (`TaskItemFile`) no meio do texto.
Adaptado do `task` do AI Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** para agrupar **o que o agente fez numa etapa**: "Buscando
  contratos" → "Li 3 arquivos", "Encontrei 2 contratos ativos". Vale tanto
  para a etapa em andamento quanto para o histórico.
- **Não use** para passos com status visual por passo (ícone, imagem,
  resultados de busca em linha do tempo): `ChainOfThought`
  (`chain-of-thought.md`) é mais rico.
- **Não use** para o plano antes da execução: `Plan` (`plan.md`).
- **Não use** para uma chamada de ferramenta com argumentos e resultado:
  `Tool` (`tool.md`).
- **Não use** para pendências que vão sendo riscadas: `Queue` (`queue.md`).

## Peers exigidos

Nenhum além da @blips/ai (usa `Collapsible` da @blips/ui e
`@phosphor-icons/react`). O componente não importa `ai`.

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. Se o seu código tipar as parts com o AI
SDK, `ai` é peer opcional e só de tipos (`import type`): num projeto
TypeScript entra como **devDependency** (`pnpm add -D ai`).

## API

Exports: `Task`, `TaskTrigger`, `TaskContent`, `TaskItem`, `TaskItemFile` e os
tipos `*Props` de cada um.

| Componente | Props reais | Notas |
|---|---|---|
| `Task` | props do `Collapsible` (`open`, `defaultOpen`, `onOpenChange`, `disabled`…) | **Aberta por padrão** (`defaultOpen = true`). Sem moldura. |
| `TaskTrigger` | props do `CollapsibleTrigger` + `title: string` (obrigatório) | Sem `children`, mostra `MagnifyingGlassIcon` + `title` + caret (`group-data-panel-open:rotate-180`). Com `children`, eles substituem esse conteúdo (o `title` continua obrigatório no tipo). É um `<button>`. |
| `TaskContent` | props do `CollapsibleContent` | Envolve os filhos em `mt-4 space-y-2 border-l-2 border-muted pl-4`; anima com `data-open`/`data-closed`. |
| `TaskItem` | props de `<div>` | `text-muted-foreground text-sm`. |
| `TaskItemFile` | props de `<div>` | Chip `inline-flex rounded-md border bg-secondary text-xs`: nome do arquivo, com ícone opcional como filho. |

## Composição com a @blips/ui

- Já usa o `Collapsible` da @blips/ui v3 (Base UI). Estado: `data-panel-open`
  no trigger, `data-open`/`data-closed` no conteúdo.
- Trocar a lupa por um ícone da etapa: passe `children` ao `TaskTrigger`
  (ex.: `FileTextIcon` + título + `CaretDownIcon` com
  `group-data-panel-open:rotate-180`) — o trigger já tem a classe `group`.
- Etapa em andamento: o título pode ir dentro de `Shimmer` (`shimmer.md`) via
  `children` do `TaskTrigger`.
- Num chat: dentro do `MessageContent` do `Message` da @blips/ui, uma `Task`
  por etapa. Mapeamento das etapas (eventos de tool do AgentOS, parts
  `tool-*` do AI SDK agrupadas) fica no app.

## Exemplo v3 que compila

```tsx
"use client";

import {
  Task,
  TaskContent,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
} from "@blips/ai/components/task";
import { FileTextIcon } from "@phosphor-icons/react";

export function EtapaBuscaContratos() {
  return (
    <Task>
      <TaskTrigger title="Buscando contratos do cliente" />
      <TaskContent>
        <TaskItem>
          Consultei a base de contratos pelo CNPJ 12.345.678/0001-90.
        </TaskItem>
        <TaskItem>
          Li{" "}
          <TaskItemFile>
            <FileTextIcon className="size-3" />
            contrato-2026-041.pdf
          </TaskItemFile>{" "}
          e{" "}
          <TaskItemFile>
            <FileTextIcon className="size-3" />
            aditivo-01.pdf
          </TaskItemFile>
        </TaskItem>
        <TaskItem>Encontrei 2 contratos ativos e 1 parcela em aberto.</TaskItem>
      </TaskContent>
    </Task>
  );
}
```

## Armadilhas

- **`title` é obrigatório** mesmo quando você passa `children` ao
  `TaskTrigger` (o tipo exige); com `children`, ele não aparece.
- **`children` no `TaskTrigger` substitui tudo**, inclusive caret e lupa:
  recoloque o que quiser manter.
- Dentro do trigger (que é `<button>`), use só conteúdo de frase
  (`<span>`, ícones); `<div>`/`<p>` dentro de `<button>` é HTML inválido.
- Começa aberta. Para histórico longo, passe `defaultOpen={false}` nas
  etapas concluídas.
- Estilize o aberto por `data-panel-open`/`data-open` (v3), não por
  `data-[state=open]`.
- Sem texto padrão: os textos são seus, em pt-BR.
