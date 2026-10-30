# Tela de chat com IA (@blips/ai)

Guia de composição para montar uma tela de conversa com um agente: lista com
rolagem que gruda no fim, mensagens do usuário e do assistente, raciocínio,
chamadas de ferramenta, fontes, campo de prompt e sugestões.

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3
> e React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../references/v2-vs-v3.md`). Instalação e peers: skill
> **blips-ui:installing** (`references/blips-ai.md`).

## Table of Contents

- [Quando usar](#quando-usar)
- [Peças e onde estão documentadas](#peças-e-onde-estão-documentadas)
- [Peers e CSS para esta tela](#peers-e-css-para-esta-tela)
- [Anatomia](#anatomia)
- [Regra de ouro: a lib é apresentacional](#regra-de-ouro-a-lib-é-apresentacional)
- [Renderizando um UIMessage](#renderizando-um-uimessage)
- [Fluxo de agente: anexos, plano, tarefas, fila e aprovação](#fluxo-de-agente-anexos-plano-tarefas-fila-e-aprovação)
- [(a) Com o AI SDK (`useChat`)](#a-com-o-ai-sdk-usechat)
- [(b) Com eventos próprios (AgentOS do Agno)](#b-com-eventos-próprios-agentos-do-agno)
- [Estados da tela](#estados-da-tela)
- [Armadilhas](#armadilhas)

## Quando usar

- Tela ou painel de conversa com um agente/LLM, com resposta em streaming.
- Chat de suporte que mostra o que o agente fez (ferramentas, fontes,
  raciocínio) para quem opera.

Quando **não** usar:

- Chat humano-humano (atendimento, comentários): fique só com `Message` +
  `Bubble` + `MessageScroller` da @blips/ui (`../references/message.md`,
  `../references/bubble.md`, `../references/message-scroller.md`). Sem
  Streamdown, sem `@blips/ai`.
- Um campo de busca com IA que devolve um bloco único: `MessageResponse` sozinho
  (`../references/ai/message.md`), sem `Conversation`.

## Peças e onde estão documentadas

Leia a reference de cada peça antes de escrever código (props reais, armadilhas).

| Peça | Import | Reference |
|---|---|---|
| Lista com rolagem que gruda no fim | `@blips/ai/components/conversation` | `../references/ai/conversation.md` |
| Casca da mensagem (`Message`, `MessageContent`, `messageAlign`) e resposta em markdown (`MessageResponse`, `MessageActions`) | `@blips/ai/components/message` | `../references/ai/message.md` (casca: `../references/message.md`) |
| Balão do usuário | `@blips/ui/components/bubble` | `../references/bubble.md` |
| Raciocínio do modelo | `@blips/ai/components/reasoning` | `../references/ai/reasoning.md` |
| Chamada de ferramenta | `@blips/ai/components/tool` | `../references/ai/tool.md` |
| Fontes consultadas | `@blips/ai/components/sources` | `../references/ai/sources.md` |
| Campo de prompt | `@blips/ai/components/prompt-input` | `../references/ai/prompt-input.md` |
| Sugestões de pergunta | `@blips/ai/components/suggestion` | `../references/ai/suggestion.md` |
| Texto "Pensando…" animado | `@blips/ai/components/shimmer` | `../references/ai/shimmer.md` |
| Aprovação de ferramenta (human-in-the-loop) | `@blips/ai/components/confirmation` | `../references/ai/confirmation.md` |
| Citação no meio do texto | `@blips/ai/components/inline-citation` | `../references/ai/inline-citation.md` |
| Uso de tokens/contexto | `@blips/ai/components/context` | `../references/ai/context.md` |
| Anexos (prompt e mensagem) | `@blips/ai/components/attachments` | `../references/ai/attachments.md` |
| Plano do agente | `@blips/ai/components/plan` | `../references/ai/plan.md` |
| Etapas/tarefas do agente | `@blips/ai/components/task` | `../references/ai/task.md` |
| Fila de mensagens/tarefas | `@blips/ai/components/queue` | `../references/ai/queue.md` |

## Peers e CSS para esta tela

A tela completa abaixo importa `message` e `reasoning` (Streamdown) e `tool`
(que usa o `CodeBlock`, sobre o Shiki). O app declara:

```bash
pnpm add @blips/ai streamdown @streamdown/code @streamdown/math @streamdown/mermaid @streamdown/cjk shiki katex
pnpm add -D ai   # tipos UIMessage/ChatStatus: o tsc do app compila o fonte .tsx do pacote
```

`ai` é peer opcional **só de tipos**: o `@blips/ai` não usa runtime dele, mas
publica o fonte `.tsx`, então em projeto TypeScript ele entra como
`devDependency` nos dois caminhos. No caminho (a), acrescente
`pnpm add @ai-sdk/react` (ele já traz o runtime do `ai` como dependência
própria); mantenha o `ai` do app na mesma versão que o `@ai-sdk/react` fixa.
`ai` só vai para `dependencies` se o código do app importar runtime dele (ex.:
`DefaultChatTransport`).

E o CSS, porque o `MessageResponse` e o `ReasoningContent` renderizam com o
Streamdown (ajuste os `../` até o `node_modules`; em monorepo, o da raiz):

```css
@import "@blips/ui/globals.css";
@import "@blips/ai/styles.css";
@import "streamdown/styles.css";
@import "katex/dist/katex.min.css";
@source "../node_modules/streamdown/dist/*.js";
@source "../node_modules/@streamdown/code/dist/*.js";
@source "../node_modules/@streamdown/math/dist/*.js";
@source "../node_modules/@streamdown/mermaid/dist/*.js";
@source "../node_modules/@streamdown/cjk/dist/*.js";
```

Os quatro plugins `@streamdown/*` são importados estaticamente pelo `message` e
pelo `reasoning`, então todos entram no `@source`. O `@streamdown/math` usa o
KaTeX, que não injeta o próprio CSS: sem `katex` (dependência direta) e o
`katex.min.css`, as fórmulas saem sem estilo.

## Anatomia

```
<div className="flex h-dvh flex-col">          altura definida: o Conversation é flex-1
  <Conversation>                                 rolagem + gruda no fim (use-stick-to-bottom)
    <ConversationContent>
      <ConversationEmptyState />                 sem mensagens (title/description em pt-BR!)
      <Message align={messageAlign(role)}>        casca da @blips/ui
        <MessageContent>
          <Bubble><BubbleContent/></Bubble>       part "text" do usuário
          <Reasoning/>                            part "reasoning"
          <Tool/>                                 part "tool-*" / "dynamic-tool"
          <MessageResponse/>                      part "text" do assistente
          <Sources/>                              parts "source-url" agrupadas
          <MessageActions/>                       copiar / gerar de novo
        </MessageContent>
      </Message>
      <Shimmer>Pensando…</Shimmer>                status "submitted"
    </ConversationContent>
    <ConversationScrollButton aria-label=… />
  </Conversation>
  <Suggestions/>                                 só com a conversa vazia
  <PromptInput onSubmit={({ text, files }) => …}>
    <PromptInputBody><PromptInputTextarea/></PromptInputBody>
    <PromptInputFooter>
      <PromptInputTools/>                        anexos, seletor de modelo…
      <PromptInputSubmit status={status} onStop={stop}/>
    </PromptInputFooter>
  </PromptInput>
</div>
```

## Regra de ouro: a lib é apresentacional

Os componentes recebem dados prontos (`parts`, `state`, `status`, `isStreaming`)
e não falam com servidor nenhum. O `@blips/ai` importa `ai` **só como tipo**: o
contrato de dados é o `UIMessage` do AI SDK, mas quem produz esse `UIMessage` é
o app.

- **Caminho (a)**: o `useChat` do AI SDK já entrega `messages: UIMessage[]` e
  `status: ChatStatus`. Passe direto.
- **Caminho (b)**: o backend fala outro protocolo (AgentOS do Agno, WebSocket
  próprio, n8n). O app traduz os eventos para `UIMessage["parts"]` e
  `ChatStatus` num reducer seu. **Esse mapeamento mora no app, nunca na lib**
  (não abra PR no `@blips/ai` para "suportar o Agno").

Os dois caminhos usam o **mesmo** componente de mensagem, abaixo.

## Renderizando um UIMessage

Um componente do app que percorre `message.parts` e escolhe a peça por
`part.type`. Repare que ele **compõe** a casca da @blips/ui (`Message`,
`MessageContent`, `Bubble`) em vez de recriar bolha ou lista.

```tsx
// chat-message.tsx
"use client";

import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
  messageAlign,
} from "@blips/ai/components/message";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@blips/ai/components/reasoning";
import { Shimmer } from "@blips/ai/components/shimmer";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@blips/ai/components/sources";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
  type ToolPart,
} from "@blips/ai/components/tool";
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import {
  ArrowClockwiseIcon,
  CaretDownIcon,
  CopyIcon,
} from "@phosphor-icons/react";
import type { SourceUrlUIPart, UIMessage } from "ai";

type Part = UIMessage["parts"][number];

// Sem o helper isToolUIPart do `ai`: o app pode nem ter o runtime do AI SDK.
const isToolPart = (part: Part): part is ToolPart =>
  part.type === "dynamic-tool" || part.type.startsWith("tool-");

const thinkingMessage = (isStreaming: boolean, duration?: number) => {
  if (isStreaming || duration === 0) {
    return <Shimmer duration={1}>Pensando…</Shimmer>;
  }
  if (duration === undefined) {
    return <span>Pensou por alguns segundos</span>;
  }
  return <span>Pensou por {duration} s</span>;
};

function ToolCall({ part }: { part: ToolPart }) {
  return (
    <Tool defaultOpen={part.state === "output-error"}>
      {part.type === "dynamic-tool" ? (
        <ToolHeader
          state={part.state}
          title={part.title}
          toolName={part.toolName}
          type={part.type}
        />
      ) : (
        <ToolHeader state={part.state} type={part.type} />
      )}
      <ToolContent>
        <ToolInput input={part.input} />
        <ToolOutput errorText={part.errorText} output={part.output} />
      </ToolContent>
    </Tool>
  );
}

export function ChatMessage({
  message,
  isStreaming,
  onRegenerate,
}: {
  message: UIMessage;
  /** true só na última mensagem do assistente enquanto status === "streaming" */
  isStreaming: boolean;
  onRegenerate?: () => void;
}) {
  const isUser = message.role === "user";
  const sources = message.parts.filter(
    (part): part is SourceUrlUIPart => part.type === "source-url"
  );
  const text = message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");

  return (
    <Message align={messageAlign(message.role)}>
      <MessageContent>
        {message.parts.map((part, index) => {
          const key = `${message.id}-${index}`;
          if (part.type === "text") {
            return isUser ? (
              <Bubble key={key}>
                <BubbleContent>{part.text}</BubbleContent>
              </Bubble>
            ) : (
              <MessageResponse
                isAnimating={isStreaming && part.state === "streaming"}
                key={key}
              >
                {part.text}
              </MessageResponse>
            );
          }
          if (part.type === "reasoning") {
            return (
              <Reasoning
                isStreaming={isStreaming && part.state === "streaming"}
                key={key}
              >
                <ReasoningTrigger getThinkingMessage={thinkingMessage} />
                <ReasoningContent>{part.text}</ReasoningContent>
              </Reasoning>
            );
          }
          if (isToolPart(part)) {
            return <ToolCall key={key} part={part} />;
          }
          // source-url vai agrupado abaixo; step-start, file e data-* ficam a cargo do app.
          return null;
        })}

        {sources.length > 0 && (
          <Sources>
            <SourcesTrigger count={sources.length}>
              <span className="font-medium">
                {sources.length === 1
                  ? "1 fonte consultada"
                  : `${sources.length} fontes consultadas`}
              </span>
              <CaretDownIcon className="size-4" />
            </SourcesTrigger>
            <SourcesContent>
              {sources.map((source) => (
                <Source
                  href={source.url}
                  key={source.sourceId}
                  title={source.title ?? source.url}
                />
              ))}
            </SourcesContent>
          </Sources>
        )}

        {!isUser && !isStreaming && text && (
          <MessageActions>
            <MessageAction
              onClick={() => navigator.clipboard.writeText(text)}
              tooltip="Copiar"
            >
              <CopyIcon className="size-4" />
            </MessageAction>
            {onRegenerate && (
              <MessageAction onClick={onRegenerate} tooltip="Gerar de novo">
                <ArrowClockwiseIcon className="size-4" />
              </MessageAction>
            )}
          </MessageActions>
        )}
      </MessageContent>
    </Message>
  );
}
```

Mapa `part.type` → peça:

| `part.type` | Peça | Props que vêm da part |
|---|---|---|
| `text` (usuário) | `Bubble` > `BubbleContent` | `part.text` (texto puro, sem markdown) |
| `text` (assistente) | `MessageResponse` | `children={part.text}`, `isAnimating` (streaming e `part.state === "streaming"`) |
| `reasoning` | `Reasoning` + `ReasoningTrigger` + `ReasoningContent` | `isStreaming` (idem), `children={part.text}` |
| `tool-<nome>` / `dynamic-tool` | `Tool` + `ToolHeader` + `ToolContent` + `ToolInput` + `ToolOutput` | `type`, `state`, `toolName` (só `dynamic-tool`), `input`, `output`, `errorText` |
| `tool-*` com `state: "approval-requested"` | `Confirmation` (`../references/ai/confirmation.md`) | `approval`, `state` |
| `source-url` | `Sources` > `Source` (agrupadas por mensagem) | `url`, `title`, `sourceId` (key) |
| `file` | `Attachments` > `AttachmentPart` (`../references/ai/attachments.md`; ver [Fluxo de agente](#fluxo-de-agente-anexos-plano-tarefas-fila-e-aprovação)) | `{ ...part, id }` como `data` |
| `step-start` | separador de etapa → `Task` (idem) | — |
| `data-*` | decisão do app (ex.: `data-plan` → `Plan`) | `part.data` |

## Fluxo de agente: anexos, plano, tarefas, fila e aprovação

A tela acima cobre pergunta → resposta. Um agente que **trabalha** (planeja,
executa em etapas, pede permissão, recebe arquivos) acrescenta cinco peças.
Cada uma tem lugar fixo na tela; todas são apresentacionais, e os dados vêm do
app (parts do `useChat` no caminho (a), eventos do AgentOS mapeados no
caminho (b)).

```
<div className="flex h-dvh flex-col">
  <Conversation>
    <ConversationContent>
      <Message align="end">                          usuário
        <MessageContent>
          <Attachments variant="grid">…</Attachments>  ① parts "file" da mensagem enviada
          <Bubble>…</Bubble>
        </MessageContent>
      </Message>
      <Message align="start">                        assistente
        <MessageContent>
          <Plan isStreaming>…</Plan>                   ② plano antes de executar
          <Task><TaskTrigger title="Consultar títulos"/>…</Task>  ③ uma Task por etapa
          <Tool>                                       tool call da etapa
            <ToolHeader/>
            <ToolContent>
              <Confirmation approval state>…</Confirmation>   ⑤ aprovação humana
              <ToolInput/> <ToolOutput/>
            </ToolContent>
          </Tool>
          <MessageResponse/>
        </MessageContent>
      </Message>
    </ConversationContent>
  </Conversation>
  <Queue>…</Queue>                                   ④ fila, fora da conversa, colada no prompt
  <PromptInput>
    <PromptInputHeader>
      <Attachments variant="inline">…</Attachments>  ① anexos antes do envio
    </PromptInputHeader>
    …
  </PromptInput>
</div>
```

| Momento | Peça (reference) | Onde entra | Dados no caminho (a) — AI SDK | Dados no caminho (b) — AgentOS |
|---|---|---|---|---|
| ① Usuário anexa arquivos | `Attachments variant="inline"` + `AttachmentPart` + `AttachmentPreview` + `AttachmentRemove` (`../references/ai/attachments.md`) | `PromptInputHeader` | `usePromptInputAttachments().files` (já `FileUIPart & { id }`); `onRemove={() => remove(file.id)}`; no envio, `onSubmit({ text, files })` → `sendMessage({ text, files })` | os mesmos `files` do `PromptInput`; a rota do app os encaminha ao run. O app guarda as parts `file` na mensagem do usuário que ele mesmo monta |
| ① Mensagem enviada com anexos | `Attachments variant="grid"` (cola à direita) | `MessageContent` do usuário, **acima** do `Bubble` | parts `type: "file"`; dê um `id` estável: `{ ...part, id: \`${message.id}-${i}\` }` | as parts `file` guardadas no envio |
| ② Plano antes de executar | `Plan` + `PlanHeader`/`PlanTitle`/`PlanDescription` + `PlanContent` + `PlanFooter` (`../references/ai/plan.md`) | `MessageContent` do assistente, **antes** das tools e da resposta | uma data part sua (`data-plan`, tipada no `UIMessage`) ou o `output` de uma tool de planejamento; `isStreaming` enquanto a part chega na última mensagem | o resultado da tool/membro de planejamento do Team; `isStreaming` entre o `ToolCallStarted` e o `ToolCallCompleted` dela. "Executar plano" no `PlanFooter` chama o `sendMessage` do app |
| ③ Execução em etapas | `Task` + `TaskTrigger title` + `TaskContent` > `TaskItem`/`TaskItemFile` (`../references/ai/task.md`) | `MessageContent` do assistente, uma `Task` por etapa; o `Tool` de cada chamada pode ir dentro do `TaskContent` | agrupe as parts por passo (`step-start` separa os passos do loop de tools) | agrupe por membro do Team (eventos com `parent_run_id`, pelo `run_id` do membro) ou pela etapa do plano; é aqui que a fala interna de membro **pode** aparecer, como item de tarefa, nunca no texto da resposta |
| ④ Fila | `Queue` + `QueueSection` + `QueueSectionTrigger`/`QueueSectionLabel` + `QueueList` > `QueueItem` (`../references/ai/queue.md`) | **Fora** do `Conversation`, logo acima do `PromptInput`, mesma largura | mensagens que o usuário enviou enquanto `status !== "ready"` (estado do app, enviadas uma a uma quando o run termina) e/ou os todos que uma tool do agente devolve | idem: fila do app enquanto o run não terminou; todos vindos do output da tool de tarefas |
| ⑤ Aprovação humana | `Confirmation` + `ConfirmationTitle` + `ConfirmationRequest`/`ConfirmationAccepted`/`ConfirmationRejected` + `ConfirmationActions` (`../references/ai/confirmation.md`) | dentro do `ToolContent` da tool que pediu aprovação (abra o `Tool` nesse estado) | part com `state: "approval-requested"` e `part.approval`; botões chamam `addToolApprovalResponse({ id: part.approval.id, approved })` do `useChat` | `TeamRunPaused` → part com `state: "approval-requested"` e um `approval` montado pelo app; a decisão vai na chamada de continuação do run (rota do app), e o estado passa a `approval-responded` |

Regras do fluxo:

- **Ordem dentro da mensagem do assistente** = ordem das parts: plano →
  etapas/tools → resposta. Não reordene no front para "ficar bonito"; o
  usuário precisa ver o que veio antes.
- **`Plan`/`Task`/`Queue` não substituem `Tool`.** `Tool` é o detalhe de uma
  chamada (parâmetros, resultado); `Task` agrupa chamadas numa etapa legível;
  `Plan` é a intenção antes de agir; `ChainOfThought` é a alternativa em linha
  do tempo compacta. Escolha um nível por tela e não duplique a mesma
  informação em dois.
- **Aprovação pendente pausa o agente.** Com uma part em
  `approval-requested`, o run está parado esperando a decisão. Decida no app o
  que fazer com mensagens novas nesse intervalo (desabilitar o envio ou
  guardá-las na `Queue`); não as mande ao agente como se nada estivesse
  pendente.
- **Anexos: `inline` no prompt, `grid` na mensagem.** As duas variantes
  compõem o `Attachment` da @blips/ui; não monte miniatura à mão.
- Peers: nenhuma dessas cinco peças exige peer além de `ai` (tipos) em
  `attachments` e `confirmation`; o `Plan` usa o `Shimmer` no título em
  streaming.

## (a) Com o AI SDK (`useChat`)

`useChat` vem de `@ai-sdk/react` (sem opções, usa `POST /api/chat`; passe
`transport: new DefaultChatTransport({ api })` de `ai` para outra rota). O
`status` (`"submitted" | "streaming" | "ready" | "error"`) alimenta o
`PromptInputSubmit`, o `Shimmer` e o `isStreaming` da última mensagem.

```tsx
// page.tsx
"use client";

import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@blips/ai/components/conversation";
import { Message, MessageContent } from "@blips/ai/components/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@blips/ai/components/prompt-input";
import { Shimmer } from "@blips/ai/components/shimmer";
import { Suggestion, Suggestions } from "@blips/ai/components/suggestion";
import { ChatCircleDotsIcon } from "@phosphor-icons/react";
import { ChatMessage } from "./chat-message";

const SUGESTOES = [
  "Qual o status do meu contrato?",
  "Como abro um chamado de garantia?",
  "Quando vence a próxima parcela?",
];

export default function ChatPage() {
  const { messages, status, sendMessage, regenerate, stop } = useChat();
  const last = messages.at(-1);

  return (
    <div className="flex h-dvh flex-col">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              description="Pergunte sobre contratos, equipamentos ou financeiro."
              icon={<ChatCircleDotsIcon className="size-8" />}
              title="Como posso ajudar?"
            />
          ) : (
            messages.map((message) => (
              <ChatMessage
                isStreaming={
                  status === "streaming" &&
                  message.id === last?.id &&
                  message.role === "assistant"
                }
                key={message.id}
                message={message}
                onRegenerate={
                  message.id === last?.id ? () => regenerate() : undefined
                }
              />
            ))
          )}
          {status === "submitted" && (
            <Message align="start">
              <MessageContent>
                <Shimmer>Pensando…</Shimmer>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton aria-label="Ir para o fim da conversa" />
      </Conversation>

      <div className="grid gap-2 p-4">
        {messages.length === 0 && (
          <Suggestions>
            {SUGESTOES.map((sugestao) => (
              <Suggestion
                key={sugestao}
                onClick={(texto) => void sendMessage({ text: texto })}
                suggestion={sugestao}
              />
            ))}
          </Suggestions>
        )}
        <PromptInput
          onSubmit={({ text, files }) => {
            if (!text.trim() && files.length === 0) return;
            void sendMessage({ text, files });
          }}
        >
          <PromptInputBody>
            <PromptInputTextarea placeholder="Pergunte ao agente…" />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit onStop={() => void stop()} status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
```

## (b) Com eventos próprios (AgentOS do Agno)

O AgentOS responde `POST /teams/{id}/runs` (ou `/agents/{id}/runs`) com SSE:
`event: <Nome>\ndata: <JSON>`. O app converte cada evento em parts com uma
função pura e expõe a mesma forma do `useChat` (`messages`, `status`,
`sendMessage`, `stop`). O `ChatMessage` acima é reaproveitado sem mudança.

| Evento do AgentOS | Vira |
|---|---|
| `TeamRunContent` / `RunContent` com `content` | delta numa part `text` (`state: "streaming"`) |
| `reasoning_content` (no `*RunContent`), `ReasoningStep` / `TeamReasoningStep`, `ReasoningContentDelta` / `TeamReasoningContentDelta` | delta numa part `reasoning` (só o campo `reasoning_content`: o `content` do `ReasoningStep` é objeto) |
| `ToolCallStarted` / `TeamToolCallStarted` | part `dynamic-tool`, `state: "input-available"`, `input = tool.tool_args` |
| `ToolCallCompleted` / `TeamToolCallCompleted` | mesma part (por `tool_call_id`), `state: "output-available"`, `output = tool.result` |
| `ToolCallError` / `TeamToolCallError` | `state: "output-error"`, `errorText = error` (campo do evento; o `tool` não tem erro) |
| `TeamRunCompleted` / `RunCompleted` | fecha as parts (`state: "done"`), `status: "ready"` |
| `TeamRunError` / `RunError` | `status: "error"` |
| `TeamRunPaused` (ferramenta pedindo confirmação) | part com `state: "approval-requested"` → `Confirmation` |
| qualquer evento com `parent_run_id` | **ignorado no texto**: é fala interna de membro do Team |
| primeiro evento que gera part | `status: "submitted"` → `"streaming"` |

```ts
// use-agno-chat.ts
"use client";

import type { ChatStatus, DynamicToolUIPart, UIMessage } from "ai";
import { useCallback, useRef, useState } from "react";

// Só o que o mapeamento lê dos eventos SSE do AgentOS (Agno). Cada evento chega
// como "event: <Nome>\ndata: <JSON>\n\n".
type AgnoEvent = {
  event: string;
  run_id?: string;
  parent_run_id?: string | null;
  // string em RunContent; objeto em ReasoningStep e com saída estruturada
  content?: unknown;
  reasoning_content?: string | null;
  error?: string | null; // ToolCallError: o erro vem no evento, não no tool
  tool?: {
    tool_call_id?: string;
    tool_name?: string;
    tool_args?: Record<string, unknown>;
    result?: unknown;
  };
};

type Part = UIMessage["parts"][number];

const upsertTool = (parts: Part[], next: DynamicToolUIPart): Part[] => {
  const index = parts.findIndex(
    (p) => p.type === "dynamic-tool" && p.toolCallId === next.toolCallId
  );
  if (index === -1) return [...parts, next];
  return parts.map((p, i) => (i === index ? next : p));
};

const appendDelta = (
  parts: Part[],
  type: "text" | "reasoning",
  delta: string
): Part[] => {
  const last = parts.at(-1);
  if (last?.type === type && last.state === "streaming") {
    return [...parts.slice(0, -1), { ...last, text: last.text + delta }];
  }
  return [...parts, { type, text: delta, state: "streaming" }];
};

const closeStreaming = (parts: Part[]): Part[] =>
  parts.map((p) =>
    (p.type === "text" || p.type === "reasoning") && p.state === "streaming"
      ? { ...p, state: "done" }
      : p
  );

/** Evento do AgentOS → parts do UIMessage do assistente. Função pura, testável. */
export function applyAgnoEvent(parts: Part[], ev: AgnoEvent): Part[] {
  // Fala interna de membro do Team (subagente) tem parent_run_id: não é a
  // resposta do turno. Mostre num Tool/ChainOfThought se quiser; nunca no texto.
  if (ev.parent_run_id) return parts;

  switch (ev.event) {
    case "RunContent":
    case "TeamRunContent": {
      let next = parts;
      if (ev.reasoning_content) {
        next = appendDelta(next, "reasoning", ev.reasoning_content);
      }
      return typeof ev.content === "string" && ev.content
        ? appendDelta(next, "text", ev.content)
        : next;
    }
    case "ReasoningStep":
    case "ReasoningContentDelta":
    case "TeamReasoningStep":
    case "TeamReasoningContentDelta":
      return ev.reasoning_content
        ? appendDelta(parts, "reasoning", ev.reasoning_content)
        : parts;
    case "ToolCallStarted":
    case "TeamToolCallStarted":
      return upsertTool(closeStreaming(parts), {
        type: "dynamic-tool",
        toolCallId: ev.tool?.tool_call_id ?? crypto.randomUUID(),
        toolName: ev.tool?.tool_name ?? "ferramenta",
        state: "input-available",
        input: ev.tool?.tool_args ?? {},
      });
    case "ToolCallCompleted":
    case "TeamToolCallCompleted":
      return upsertTool(parts, {
        type: "dynamic-tool",
        toolCallId: ev.tool?.tool_call_id ?? crypto.randomUUID(),
        toolName: ev.tool?.tool_name ?? "ferramenta",
        state: "output-available",
        input: ev.tool?.tool_args ?? {},
        output: ev.tool?.result,
      });
    case "ToolCallError":
    case "TeamToolCallError":
      return upsertTool(parts, {
        type: "dynamic-tool",
        toolCallId: ev.tool?.tool_call_id ?? crypto.randomUUID(),
        toolName: ev.tool?.tool_name ?? "ferramenta",
        state: "output-error",
        input: ev.tool?.tool_args,
        errorText: ev.error ?? "Falha na ferramenta",
      });
    case "RunCompleted":
    case "TeamRunCompleted":
    case "RunError":
    case "TeamRunError":
      return closeStreaming(parts);
    default:
      return parts;
  }
}

/** Lê o corpo SSE e entrega cada evento já parseado. */
async function* readSse(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) return;
    buffer += decoder.decode(value, { stream: true });
    let end = buffer.indexOf("\n\n");
    while (end !== -1) {
      const block = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      const data = block
        .split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trim())
        .join("");
      if (data) yield JSON.parse(data) as AgnoEvent;
      end = buffer.indexOf("\n\n");
    }
  }
}

/**
 * Mesmo formato do useChat ({ messages, status, sendMessage, stop }) sobre o
 * AgentOS. `endpoint` é uma rota do PRÓPRIO app (ex.: /api/agentos/teams/salvador/runs)
 * que repassa ao AgentOS com o Bearer no servidor — o token nunca vai ao browser.
 */
export function useAgnoChat({ endpoint }: { endpoint: string }) {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("ready");
  const abortRef = useRef<AbortController | null>(null);
  const sessionRef = useRef<string>(crypto.randomUUID());

  const sendMessage = useCallback(
    async ({ text }: { text: string }) => {
      const userMessage: UIMessage = {
        id: crypto.randomUUID(),
        role: "user",
        parts: [{ type: "text", text }],
      };
      const assistantId = crypto.randomUUID();
      setMessages((prev) => [...prev, userMessage]);
      setStatus("submitted");

      const form = new FormData();
      form.append("message", text);
      form.append("stream", "true");
      form.append("session_id", sessionRef.current);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: form,
          headers: { Accept: "text/event-stream" },
          signal: controller.signal,
        });
        if (!(response.ok && response.body))
          throw new Error(`HTTP ${response.status}`);

        let parts: Part[] = [];
        for await (const ev of readSse(response.body)) {
          if (ev.event === "RunError" || ev.event === "TeamRunError") {
            setStatus("error");
          }
          const next = applyAgnoEvent(parts, ev);
          if (next === parts) continue;
          parts = next;
          setMessages((prev) =>
            prev.some((m) => m.id === assistantId)
              ? prev.map((m) =>
                  m.id === assistantId ? { ...m, parts: next } : m
                )
              : [...prev, { id: assistantId, role: "assistant", parts: next }]
          );
          setStatus((s) => (s === "submitted" ? "streaming" : s));
        }
        setStatus((s) => (s === "error" ? s : "ready"));
      } catch (error) {
        setStatus(controller.signal.aborted ? "ready" : "error");
        if (!controller.signal.aborted) console.error(error);
      }
    },
    [endpoint]
  );

  const stop = useCallback(async () => {
    abortRef.current?.abort();
  }, []);

  return { messages, status, sendMessage, stop };
}
```

```tsx
// page.tsx
"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@blips/ai/components/conversation";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@blips/ai/components/prompt-input";
import { ChatMessage } from "./chat-message";
import { useAgnoChat } from "./use-agno-chat";

export default function AgnoChatPage() {
  const { messages, status, sendMessage, stop } = useAgnoChat({
    endpoint: "/api/agentos/teams/salvador/runs",
  });
  const last = messages.at(-1);

  return (
    <div className="flex h-dvh flex-col">
      <Conversation>
        <ConversationContent>
          {messages.map((message) => (
            <ChatMessage
              isStreaming={status === "streaming" && message.id === last?.id}
              key={message.id}
              message={message}
            />
          ))}
        </ConversationContent>
        <ConversationScrollButton aria-label="Ir para o fim da conversa" />
      </Conversation>
      <PromptInput
        className="p-4"
        onSubmit={({ text }) => {
          if (text.trim()) void sendMessage({ text });
        }}
      >
        <PromptInputBody>
          <PromptInputTextarea placeholder="Pergunte ao agente…" />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit onStop={() => void stop()} status={status} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
```

A rota `/api/agentos/...` é do app (route handler do Next ou proxy do Vite) e
injeta `Authorization: Bearer …` no servidor. Os nomes de evento e campos acima
foram conferidos no Agno 3.1 (`agno/run/team.py` e `agno/run/agent.py`): no Team,
todo evento tem prefixo `Team` (inclusive os de raciocínio). Confira contra a
versão que o agente roda.

## Estados da tela

| Estado | Como aparece |
|---|---|
| Conversa vazia | `ConversationEmptyState` com `title`/`description`/`icon` em pt-BR + `Suggestions` acima do prompt |
| `status === "submitted"` | `Message align="start"` com `<Shimmer>Pensando…</Shimmer>` (ainda não há mensagem do assistente) |
| `status === "streaming"` | `isStreaming` só na última mensagem do assistente; `PromptInputSubmit` vira botão de parar (com `onStop`) |
| `status === "error"` | `PromptInputSubmit` mostra o ícone de erro; mostre um `Alert` da @blips/ui (`../references/alert.md`) com "Tentar de novo" chamando `regenerate()` |
| Ferramenta falhou | `ToolOutput` mostra `errorText` em `bg-destructive/10`; o exemplo passa `defaultOpen` quando a part já monta em `output-error` (`defaultOpen` só vale na montagem: para abrir quando o estado muda, controle `open`) |

## Armadilhas

- **Textos padrão já são pt-BR.** `ConversationEmptyState` ("Nenhuma mensagem
  ainda"), `ReasoningTrigger`, `SourcesTrigger` ("Usou N fontes"),
  `PromptInputTextarea` ("O que você gostaria de saber?"), rótulos de status do
  `ToolHeader` e cabeçalhos de `ToolInput`/`ToolOutput` já saem em português.
  Para outro texto, use as props (`title`/`description`, `getThinkingMessage`,
  `children`, `placeholder`, `statusLabels`, `label`/`errorLabel`); não remonte
  o componente só para traduzir.
- **`Conversation` precisa de altura.** Ele é `flex-1 overflow-y-hidden`: o pai
  precisa ser `flex flex-col` com altura definida (`h-dvh`, `h-full` dentro de
  um layout com altura). Sem isso a lista cresce e o "grudar no fim" não age.
- **Não recrie a bolha nem a lista.** Nada de `div` com `role === "user" ?
  "bg-primary ml-auto" : …`, `scrollIntoView` em `useEffect` ou `react-markdown`:
  é `Message align={messageAlign(role)}` + `Bubble`, `Conversation` e
  `MessageResponse`. O check da **blips-ui:reviewing** acusa esses padrões.
- **`Message` não tem `from`.** O AI Elements usava `<Message from="user">`; aqui
  o lado é `align` (`messageAlign(role)` traduz o papel).
- **`MessageResponse` para o assistente, `Bubble` para o usuário.** Texto do
  usuário não passa pelo Streamdown (markdown digitado pelo usuário viraria
  formatação).
- **`isAnimating`/`isStreaming` só na última mensagem.** Passar `true` em todas
  deixa o cursor de streaming e o "Pensando…" nas mensagens antigas.
- **Keys.** Use `message.id` nas mensagens e `${message.id}-${index}` nas parts
  (parts não têm id próprio, exceto ferramentas: `toolCallId`).
- **`onClick` do `Suggestion` recebe a string**, não o evento.
- **`PromptInput.onSubmit` recebe `{ text, files }`.** Sem
  `PromptInputProvider`, o texto é limpo na hora do envio (`form.reset()`),
  antes de `onSubmit` rodar. Os anexos (e o texto, com `PromptInputProvider`) só
  são limpos se `onSubmit` não lançar ou se a Promise devolvida resolver; se ela
  rejeitar, ficam para o usuário tentar de novo. O exemplo usa
  `void sendMessage(...)`: devolve `undefined`, então tudo é limpo na hora e o
  erro aparece pelo `status === "error"`.
- **`ai` é peer só de tipos, mas o `tsc` do app precisa dele.** Os exports
  apontam para o fonte `.tsx`; sem `ai` instalado, `conversation`, `message`,
  `tool`, `confirmation`, `context`, `prompt-input`, `attachments`, `agent`,
  `sandbox`, `image`, `audio-player` e `transcription` dão TS2307 no `tsc` do
  app. Em projeto TypeScript: `pnpm add -D ai` (sem runtime; `dependencies` só
  se o código do app importar runtime do `ai`).
- **Markdown sem estilo.** Faltou o CSS do Streamdown (`streamdown/styles.css`,
  o `@source` do `streamdown/dist` e dos plugins `@streamdown/*`, e o
  `katex.min.css` para fórmulas; seção [Peers e CSS para esta tela](#peers-e-css-para-esta-tela)).
  O `@blips/ai/styles.css` só cobre as classes do próprio pacote.
- **Nada de helper runtime do `ai` no caminho (b).** `isToolUIPart`,
  `getToolName` e afins puxam o runtime do AI SDK. Um type guard de uma linha
  (`part.type === "dynamic-tool" || part.type.startsWith("tool-")`) resolve.
- **Fala interna de subagente.** No AgentOS, evento com `parent_run_id` é de
  membro do Team; somá-lo ao texto mistura o raciocínio do subagente com a
  resposta. Ignore no texto (ou mostre num `Tool`/`ChainOfThought`).
- **Token no browser.** Nunca chame o AgentOS direto do cliente com o Bearer:
  passe por uma rota do app.
- **Imports por subpath.** Não existe barrel `@blips/ai`; primitivas sempre de
  `@blips/ui/components/<x>`. Ícones Phosphor com sufixo `Icon`.
