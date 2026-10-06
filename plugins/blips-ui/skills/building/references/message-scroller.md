# Message Scroller

Import: `@blips/ui/components/message-scroller`

> **Só existe na v3.x.** Em repo v2 (`@blips/ui` 2.x) o MessageScroller não
> existe: use `ScrollArea` (`scroll-area.md`) e controle a rolagem à mão
> (`scrollIntoView` no último item), ou proponha a migração para a v3. Veja
> `v2-vs-v3.md`.

Lista rolável de uma conversa (chat, agente de IA): mantém a rolagem presa no fim
enquanto chegam mensagens ou a resposta é transmitida, preserva a posição ao
carregar mensagens antigas no topo e mostra botões "ir para o fim/início" quando
a pessoa rola. Construído sobre a primitiva `@shadcn/react/message-scroller`
(dependência da lib). Use com `Message` + `Bubble` dentro de cada item.

Exports: `MessageScrollerProvider`, `MessageScroller`,
`MessageScrollerViewport`, `MessageScrollerContent`, `MessageScrollerItem`,
`MessageScrollerButton`, e os hooks `useMessageScroller`,
`useMessageScrollerScrollable`, `useMessageScrollerVisibility`.

## Estrutura

```
MessageScrollerProvider        (estado e opções)
└─ MessageScroller             (moldura relative, flex-col, overflow-hidden)
   ├─ MessageScrollerViewport  (o elemento que rola)
   │  └─ MessageScrollerContent  (coluna flex gap-6)
   │     └─ MessageScrollerItem  (uma mensagem)
   └─ MessageScrollerButton    (botão flutuante, fora do Viewport)
```

O `MessageScroller` ocupa `size-full`: o pai precisa ter altura definida (ex.:
`CardContent className="min-h-0 flex-1 overflow-hidden p-0"` dentro de um `Card`
com altura).

## Props

**MessageScrollerProvider**

| Prop | Tipo | Notas |
|---|---|---|
| `autoScroll` | `boolean` | Segue o fim enquanto chegam mensagens (se a pessoa não rolou para cima). |
| `defaultScrollPosition` | `"start" \| "end" \| "last-anchor"` | Posição inicial. |
| `scrollEdgeThreshold` | `number` | Distância (px) da borda para considerar "no fim/início". |
| `scrollPreviousItemPeek` | `number` | Quanto do item anterior fica visível ao rolar até uma âncora. |
| `scrollMargin` | `number` | Margem ao rolar até um item. |

**MessageScrollerViewport**: `preserveScrollOnPrepend` (mantém a posição ao inserir itens no topo, ex. paginação para trás). Já vem com `overflow-y-auto`, fade no rodapé (`scroll-fade-b`) e scrollbar fina.

**MessageScrollerContent**: `spacerClassName`.

**MessageScrollerItem**

| Prop | Tipo | Notas |
|---|---|---|
| `messageId` | `string` | Identifica o item para `scrollToMessage` e para a visibilidade. |
| `scrollAnchor` | `boolean` (padrão `false`) | Marca o item como âncora: ao enviar uma pergunta, a rolagem leva essa mensagem para o topo e a resposta cresce abaixo. Use `scrollAnchor={mensagem.role === "user"}`. |

Itens usam `content-visibility: auto` para listas longas.

**MessageScrollerButton**

| Prop | Tipo | Padrão |
|---|---|---|
| `direction` | `"start" \| "end"` | `"end"` |
| `behavior` | `ScrollBehavior` | — |
| `variant` / `size` | do `Button` | `"secondary"` / `"icon-sm"` |
| `render` | elemento ou função `(props, { active, direction })` | `<Button />` |

Some sozinho quando já está na borda (`data-active=false`). Sem `children`,
mostra `ArrowDownIcon` (girado para `start`) com `sr-only` em inglês ("Scroll to
end"); passe `children` para traduzir.

**Hooks** (dentro do Provider):

- `useMessageScroller()` → `{ scrollToEnd(opts?), scrollToStart(opts?), scrollToMessage(id, opts?) }`, com `opts` = `{ align?: "start" | "center" | "end" | "nearest", behavior?, scrollMargin? }`.
- `useMessageScrollerScrollable()` → `{ start: boolean, end: boolean }` (se há conteúdo para rolar em cada direção).
- `useMessageScrollerVisibility()` → `{ currentAnchorId, visibleMessageIds }`.

## Exemplo

```tsx
"use client";

import { ArrowDownIcon } from "@phosphor-icons/react";
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import { Card, CardContent, CardHeader, CardTitle } from "@blips/ui/components/card";
import { Marker, MarkerContent, MarkerIcon } from "@blips/ui/components/marker";
import { Message, MessageContent } from "@blips/ui/components/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@blips/ui/components/message-scroller";
import { Spinner } from "@blips/ui/components/spinner";

type Mensagem = { id: string; role: "user" | "assistant"; texto: string };

export function Transcricao({
  mensagens,
  pensando,
}: {
  mensagens: Mensagem[];
  pensando: boolean;
}) {
  return (
    <Card className="h-120 w-full max-w-md">
      <CardHeader>
        <CardTitle>Assistente</CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
        <MessageScrollerProvider autoScroll defaultScrollPosition="end">
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="p-(--card-spacing)">
                {mensagens.map((m) => (
                  <MessageScrollerItem
                    key={m.id}
                    messageId={m.id}
                    scrollAnchor={m.role === "user"}
                  >
                    <Message align={m.role === "user" ? "end" : "start"}>
                      <MessageContent>
                        <Bubble variant={m.role === "user" ? "default" : "muted"}>
                          <BubbleContent className="whitespace-pre-wrap">
                            {m.texto}
                          </BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
                {pensando ? (
                  <MessageScrollerItem>
                    <Marker role="status">
                      <MarkerIcon>
                        <Spinner />
                      </MarkerIcon>
                      <MarkerContent>Pensando…</MarkerContent>
                    </Marker>
                  </MessageScrollerItem>
                ) : null}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton>
              <ArrowDownIcon />
              <span className="sr-only">Ir para o fim</span>
            </MessageScrollerButton>
          </MessageScroller>
        </MessageScrollerProvider>
      </CardContent>
    </Card>
  );
}
```

Rolar por código (ex.: depois de enviar):

```tsx
function BotaoEnviar() {
  const { scrollToEnd } = useMessageScroller();
  return <Button onClick={() => { enviar(); scrollToEnd({ behavior: "smooth" }); }}>Enviar</Button>;
}
```

## Armadilhas

- Sem altura no pai, nada rola: o `MessageScroller` é `size-full`.
- O `MessageScrollerButton` vai **fora** do `Viewport`, dentro do `MessageScroller` (ele é `absolute`).
- Hooks fora do `MessageScrollerProvider` não funcionam.
- O fade do rodapé (`scroll-fade-b`) vem do `globals.css` da lib: importe o CSS da lib no app (veja a skill `installing`). As classes `scrollbar-thin` e `scrollbar-gutter-stable` do Viewport não estão definidas no `globals.css` da lib nem no Tailwind core: sem um plugin que as defina, ficam inertes (a scrollbar aparece no estilo padrão do navegador).

## Exemplos na docs

`message-scroller-demo`, `message-scroller-button` (em `apps/docs/examples/`).
