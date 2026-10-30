# Checkpoint

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/checkpoint`

Marco discreto entre mensagens da conversa: ícone de marcador, um botão
pequeno ("Restaurar este ponto") com tooltip opcional e uma linha
(`Separator`) que ocupa o resto da largura. Serve para o usuário voltar a
conversa (ou o estado do agente) até ali. Adaptado do `checkpoint` do AI
Elements (Apache-2.0).

## Quando usar (e quando não)

- **Use** entre mensagens, onde existe um estado salvo para restaurar: antes
  de o agente editar arquivos, depois de uma etapa concluída, a cada
  aprovação.
- **Não use** como separador decorativo sem ação: `Separator` da @blips/ui.
- **Não use** para separar dias ou sessões: um rótulo de data com
  `Separator` resolve.
- **Não use** para desfazer uma ação do usuário na UI: `toast` com "Desfazer"
  (`sonner.md`/`toast.md`).

## Peers exigidos

Nenhum além da @blips/ai (usa `Button`, `Separator`, `Tooltip` da @blips/ui e
`@phosphor-icons/react`). O componente não importa `ai`.

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. Se o seu código tipar as mensagens com o
AI SDK, `ai` é peer opcional e só de tipos (`import type`): num projeto
TypeScript entra como **devDependency** (`pnpm add -D ai`).

## API

Exports: `Checkpoint`, `CheckpointIcon`, `CheckpointTrigger` e os tipos
`CheckpointProps`, `CheckpointIconProps`, `CheckpointTriggerProps`.

| Componente | Props reais | Notas |
|---|---|---|
| `Checkpoint` | props de `<div>` | `flex items-center gap-0.5 overflow-hidden text-muted-foreground`. Renderiza os `children` e **acrescenta um `Separator` no fim**. |
| `CheckpointIcon` | `IconProps` do Phosphor (`size`, `weight`, `className`…) | `BookmarkSimpleIcon` `size-4`. Com `children`, renderiza só eles no lugar do ícone. |
| `CheckpointTrigger` | props do `Button` da @blips/ui + `tooltip?: string` | `variant="ghost"`, `size="sm"`, `type="button"` por padrão. Com `tooltip`, envolve num `Tooltip` (`TooltipTrigger render={<Button/>}`, conteúdo `side="bottom" align="start"`). |

## Composição com a @blips/ui

- O botão é o `Button` da @blips/ui; `variant`/`size` livres.
- O tooltip usa o `Tooltip` da @blips/ui v3 **sem** `TooltipProvider` próprio:
  ponha um `<TooltipProvider>` na raiz do app (padrão da lib) para abrir sem
  atraso (`tooltip.md`).
- Na conversa: entre dois `Message` da @blips/ui, dentro do
  `ConversationContent` (`conversation.md`). A restauração é do app: AI SDK,
  `setMessages(messages.slice(0, indice + 1))`; Agno, retomar a sessão do
  ponto salvo pela sua API.

## Exemplo v3 que compila

```tsx
"use client";

import {
  Checkpoint,
  CheckpointIcon,
  CheckpointTrigger,
} from "@blips/ai/components/checkpoint";

export function MarcoRestauravel({ onRestaurar }: { onRestaurar: () => void }) {
  return (
    <Checkpoint>
      <CheckpointIcon />
      <CheckpointTrigger
        onClick={onRestaurar}
        tooltip="Volta a conversa para antes da emissão do boleto"
      >
        Restaurar este ponto
      </CheckpointTrigger>
    </Checkpoint>
  );
}
```

## Armadilhas

- **O `Separator` é automático.** Não acrescente outro: ele já vem depois dos
  `children` e estica até o fim da linha.
- **`CheckpointIcon` com `children` ignora as props do ícone** (`className`,
  `size`): passe o ícone pronto, ex. `<CheckpointIcon><ClockCounterClockwiseIcon
  className="size-4" /></CheckpointIcon>`, ou passe o ícone Phosphor direto em
  `Checkpoint`.
- **Sem texto padrão.** O rótulo do botão e o tooltip são seus, em pt-BR; um
  botão só com ícone precisa de `aria-label`.
- `tooltip` aceita só string.
