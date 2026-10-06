# Conversation

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/conversation`

Contêiner rolável de uma conversa com agente, sobre `use-stick-to-bottom`:
gruda no fim enquanto a resposta é transmitida (rolagem suave mesmo quando o
conteúdo cresce token a token), solta quando a pessoa rola para cima e oferece
o botão "ir para o fim". Traz também estado vazio e exportação da conversa em
markdown.

## Quando usar (e quando não)

- **Use** para a lista de mensagens de um chat com agente/LLM em streaming.
- **Use** `ConversationEmptyState` antes da primeira mensagem (com
  `Suggestions`, `suggestion.md`).
- **Não use junto** com `MessageScroller` da @blips/ui (`../message-scroller.md`):
  são duas soluções para o mesmo problema. Escolha uma por tela.
  - `Conversation`: streaming de IA, crescimento contínuo da última mensagem.
  - `MessageScroller`: chat humano com histórico paginado no topo (preserva a
    posição ao carregar mensagens antigas) e botões fim/início.
- **Não use** para listas que não são conversa (feed, log de auditoria): use
  `ScrollArea`.

## Peers exigidos

Nenhum obrigatório. `use-stick-to-bottom` é dependência da @blips/ai. `ai` é
opcional e só como tipo (`UIMessage`, em `ConversationDownload` e
`messagesToMarkdown`).

## API

| Export | Props | Notas |
|---|---|---|
| `Conversation` | Props do `StickToBottom` (`initial`, `resize`, `className`, `contextRef`…) | `relative flex-1 overflow-y-hidden`, `role="log"`, `initial="smooth"`, `resize="smooth"`. **Precisa de altura definida** no pai. |
| `ConversationContent` | Props do `StickToBottom.Content` | Coluna `flex flex-col gap-8 p-4`. As mensagens vão aqui. |
| `ConversationEmptyState` | `ComponentProps<"div">` + `title?: string`, `description?: string`, `icon?: ReactNode` | Padrões **em inglês** ("No messages yet"): sempre passe `title` e `description` em pt-BR. Com `children`, ignora título/descrição/ícone. |
| `ConversationScrollButton` | Props do `Button` | Só aparece quando não está no fim. Posição `absolute bottom-4` centralizado, `variant="outline"`, `size="icon"`, ícone `ArrowDownIcon`. Precisa estar **dentro** do `Conversation` (usa o contexto). |
| `ConversationDownload` | Props do `Button` (sem `onClick`) + `messages: UIMessage[]`, `filename?: string` (`"conversation.md"`), `formatMessage?: (message, index) => string` | Baixa a conversa em `.md`. `absolute top-4 right-4`. Ícone `DownloadSimpleIcon`. Só usa os parts `text`. |
| `messagesToMarkdown(messages, formatMessage?)` | `UIMessage[]` → `string` | Função pura usada pelo download. Formato padrão `**User:** texto`. |

## Composição com a @blips/ui

- Cada item do `ConversationContent` é um `Message` da @blips/ui (com
  `align={messageAlign(role)}` de `@blips/ai/components/message`), `Bubble` para
  o usuário e `MessageResponse` para o assistente (`message.md`).
- O botão de rolagem e o de download são o `Button` da @blips/ui: aceitam
  `variant`, `size`, `aria-label` e `render`.
- O `PromptInput` (`prompt-input.md`) fica **fora** do `Conversation`, abaixo,
  num `flex-col` com altura fixa.

## Exemplo v3

```tsx
"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@blips/ai/components/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
  messageAlign,
} from "@blips/ai/components/message";
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import { ChatCircleDotsIcon } from "@phosphor-icons/react";

interface MensagemTexto {
  id: string;
  role: "user" | "assistant";
  texto: string;
}

export function ListaDaConversa({ mensagens }: { mensagens: MensagemTexto[] }) {
  return (
    <div className="flex h-[480px] flex-col rounded-lg border">
      <Conversation>
        <ConversationContent>
          {mensagens.length === 0 ? (
            <ConversationEmptyState
              description="Pergunte sobre contratos, boletos ou chamados."
              icon={<ChatCircleDotsIcon className="size-6" />}
              title="Nenhuma mensagem ainda"
            />
          ) : (
            mensagens.map((m) => (
              <Message align={messageAlign(m.role)} key={m.id}>
                <MessageContent>
                  {m.role === "user" ? (
                    <Bubble>
                      <BubbleContent>{m.texto}</BubbleContent>
                    </Bubble>
                  ) : (
                    <MessageResponse>{m.texto}</MessageResponse>
                  )}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton aria-label="Ir para a última mensagem" />
      </Conversation>
    </div>
  );
}
```

## Armadilhas

- **Sem altura no pai, não rola**: o `Conversation` é `flex-1`, então o pai
  precisa ser `flex flex-col` com altura (`h-[…]`, `h-dvh`, `flex-1 min-h-0`).
- `ConversationScrollButton` e `ConversationDownload` fora do `Conversation`
  quebram (`useStickToBottomContext` sem provider).
- Textos padrão do estado vazio estão em inglês: passe `title`/`description`.
  O `formatMessage` padrão do download também escreve `**User:**`/`**Assistant:**`:
  passe um `formatMessage` com rótulos em pt-BR ("Você", nome do agente).
- O botão de rolagem só tem ícone: dê `aria-label` em pt-BR.
- Não empilhe `ScrollArea` dentro do `Conversation`: quem rola é o próprio
  `StickToBottom`.
- O `ConversationDownload` gera o arquivo no navegador; dados sensíveis da
  conversa vão parar no disco da pessoa. Avalie antes de expor.
