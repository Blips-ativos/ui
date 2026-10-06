# Message

Import: `@blips/ui/components/message`

> **Só existe na v3.x.** Em repo v2 (`@blips/ui` 2.x) o Message não existe (nem
> `Bubble`, `Marker` e `MessageScroller`): monte a conversa com `div` + flex e
> `Avatar`, ou proponha a migração para a v3. Veja `v2-vs-v3.md`.

Estrutura de uma mensagem de conversa (chat de suporte, agente de IA,
comentários): alinhamento à esquerda/direita, avatar, cabeçalho (autor, hora),
conteúdo e rodapé (status, ações). O balão em si é o `Bubble` (`bubble.md`); a
lista rolável com "ir para o fim" é o `MessageScroller` (`message-scroller.md`);
status como "Pensando…" é o `Marker` (`marker.md`); anexos, o `Attachment`
(`attachment.md`).

Exports: `MessageGroup`, `Message`, `MessageAvatar`, `MessageContent`,
`MessageHeader`, `MessageFooter`. Componentes HTML puros (sem primitiva), sem
`"use client"`.

| Componente | Descrição |
|---|---|
| `MessageGroup` | Agrupa mensagens seguidas do mesmo autor (`flex-col gap-1.5`). |
| `Message` | Linha da mensagem (`flex gap-1.5 text-xs/relaxed`). Prop **`align`**: `"start"` (padrão, à esquerda, quem responde) ou `"end"` (à direita, quem escreve; inverte a ordem com `flex-row-reverse`). Exposta como `data-align`. |
| `MessageAvatar` | Contêiner redondo do avatar (`min-w-8 rounded-full bg-muted`), alinhado à base. Vazio, reserva o espaço (útil em `MessageGroup` para alinhar mensagens sem avatar). Coloque um `Avatar` dentro. |
| `MessageContent` | Coluna com header, balões e footer (`flex-col gap-2`). Com `align="end"`, alinha os filhos à direita. |
| `MessageHeader` | Linha discreta acima do balão (`text-[0.625rem] font-medium text-muted-foreground`): autor, horário. |
| `MessageFooter` | Linha abaixo do balão: status ("Entregue"), ações (`Button size="xs"`). Com `align="end"`, alinha à direita. |

- Com `Bubble variant="ghost"`, header e footer perdem o padding lateral para alinhar com o texto.
- Quando há `MessageFooter`, o avatar sobe para ficar alinhado ao balão.
- Textos de interface (autor, status) em pt-BR.

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar";
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import { Button } from "@blips/ui/components/button";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@blips/ui/components/message";

export function Conversa() {
  return (
    <div className="flex w-full max-w-md flex-col gap-10">
      <Message align="end">
        <MessageContent>
          <MessageHeader className="justify-end">Você</MessageHeader>
          <Bubble>
            <BubbleContent>Dá para mandar a atualização ainda hoje?</BubbleContent>
          </Bubble>
          <MessageFooter className="gap-2">
            <span>Entregue</span>
            <Button variant="ghost" size="xs">
              Desfazer
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>

      <MessageGroup>
        <Message>
          <MessageAvatar />
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>Olhei os logs.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="/suporte.png" alt="Olivia" />
              <AvatarFallback>OL</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <MessageHeader>
              <span>Olivia</span>
              <span className="ml-auto font-normal">há 1 min</span>
            </MessageHeader>
            <Bubble variant="muted">
              <BubbleContent>
                A nova tentativa terminou e as faturas que faltavam já entraram.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </MessageGroup>
    </div>
  );
}
```

## Exemplos na docs

`message-demo`, `message-avatar`, `message-group`, `message-header-footer`, `message-actions`, `message-attachment` (em `apps/docs/examples/`).
