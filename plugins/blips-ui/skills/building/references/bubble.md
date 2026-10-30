# Bubble

Import: `@blips/ui/components/bubble`

> **Só existe na v3.x.** Num repo em `@blips/ui` 2.x este import não existe: monte
> o balão com `div` + tokens do tema, ou proponha a migração para a v3 (ver
> `references/v2-vs-v3.md`).

Balão de mensagem de chat (usuário, agente, sistema), com variantes de cor,
alinhamento e reações. Costuma ser usado dentro de `Message`
(`references/message.md`) e de `MessageScroller` (`references/message-scroller.md`).

## v3.x — Base UI

Exports: `BubbleGroup`, `Bubble`, `BubbleContent`, `BubbleReactions`.
(`bubbleVariants`/`bubbleReactionsVariants` não são exportados.)

| Componente | Props / descrição |
|---|---|
| `Bubble` | `variant?: "default" \| "secondary" \| "muted" \| "tinted" \| "outline" \| "ghost" \| "destructive"` (padrão `default` = `bg-primary`), `align?: "start" \| "end"` (padrão `start`; `end` encosta à direita). Largura máxima `80%` (`ghost`: 100%). Também se alinha à direita quando está num `Message` com `data-align="end"`. |
| `BubbleContent` | O balão em si: `rounded-lg px-2.5 py-1.5 text-xs/relaxed`, quebra palavras longas. Aceita `render` (`useRender`) para virar `<button>`/`<a>` clicável (ganha hover e ring de foco). |
| `BubbleReactions` | Selo de reações sobre a borda do balão. `side?: "top" \| "bottom"` (padrão `bottom`), `align?: "start" \| "end"` (padrão `end`). Com botões dentro, tira o padding. |
| `BubbleGroup` | Pilha de balões consecutivos do mesmo autor (`flex-col gap-2`). |

Regras:

- Convenção de chat: mensagem do usuário `align="end"`; agente/atendente `variant="muted"` ou `"secondary"` em `start`; erro de envio `variant="destructive"`.
- Reações só com emoji precisam de `role="img"` + `aria-label` descrevendo a reação; botões de reação, `aria-label`.
- Deixe espaço vertical extra (`gap`) quando houver `BubbleReactions`: o selo sai para fora do balão.

```tsx
"use client";

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@blips/ui/components/bubble";
import { Button } from "@blips/ui/components/button";
import { ThumbsDownIcon, ThumbsUpIcon } from "@phosphor-icons/react";

export function ConversaSuporte() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <BubbleGroup>
        <Bubble variant="muted">
          <BubbleContent>Oi! Em que posso ajudar?</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>Posso consultar contratos, boletos e chamados.</BubbleContent>
        </Bubble>
      </BubbleGroup>

      <Bubble align="end">
        <BubbleContent>Qual o vencimento do meu próximo boleto?</BubbleContent>
      </Bubble>

      <Bubble variant="tinted">
        <BubbleContent>Vence em 10/11/2026, no valor de R$ 1.240,00.</BubbleContent>
        <BubbleReactions className="bg-background">
          <Button variant="secondary" size="icon-xs" aria-label="Resposta útil">
            <ThumbsUpIcon />
          </Button>
          <Button variant="secondary" size="icon-xs" aria-label="Resposta não útil">
            <ThumbsDownIcon />
          </Button>
        </BubbleReactions>
      </Bubble>

      {/* Balão clicável */}
      <Bubble variant="outline">
        <BubbleContent render={<button type="button" onClick={() => abrirBoleto()} />}>
          Ver segunda via do boleto
        </BubbleContent>
      </Bubble>
    </div>
  );
}
```

## Exemplos na docs

`bubble-demo`, `bubble-variants`, `bubble-group`, `bubble-reactions`, `bubble-link`, `bubble-collapsible`.
