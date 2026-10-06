"use client";

import {
  Conversation,
  ConversationContent,
  ConversationDownload,
  type ConversationDownloadProps,
  ConversationScrollButton,
} from "@blips/ai/components/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
  messageAlign,
} from "@blips/ai/components/message";
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";

// Mesmo formato do UIMessage do AI SDK (id, role, parts), escrito à mão.
type ChatMessage = ConversationDownloadProps["messages"][number];

const text = (id: string, role: "user" | "assistant", value: string) =>
  ({ id, parts: [{ text: value, type: "text" }], role }) as ChatMessage;

const messages: ChatMessage[] = [
  text("m1", "user", "Oi! Meu equipamento parou de ligar."),
  text(
    "m2",
    "assistant",
    "Sinto muito por isso. Pode me passar o **número de série**? Ele fica na etiqueta atrás do equipamento."
  ),
  text("m3", "user", "É BLP-2048-XZ."),
  text(
    "m4",
    "assistant",
    "Encontrei. O equipamento está **dentro da garantia** até março de 2027. Antes de abrir o chamado, confira:\n\n1. Se a tomada tem energia.\n2. Se o disjuntor do equipamento está ligado.\n3. Se o cabo não está solto na parte de trás."
  ),
  text("m5", "user", "Já conferi tudo e continua sem ligar."),
  text(
    "m6",
    "assistant",
    "Certo. Abri o chamado **#48213** de garantia. Um técnico entra em contato em até 2 dias úteis para agendar a visita."
  ),
  text("m7", "user", "Perfeito, obrigado!"),
  text(
    "m8",
    "assistant",
    "Por nada! Você pode acompanhar o chamado por aqui mesmo, é só perguntar pelo número."
  ),
];

const getText = (message: ChatMessage) =>
  message.parts.map((part) => (part.type === "text" ? part.text : "")).join("");

export default function AiConversationDemo() {
  return (
    <div className="flex h-96 w-full max-w-lg min-w-0 flex-col overflow-hidden rounded-lg border">
      <Conversation>
        <ConversationContent>
          {messages.map((message) => (
            <Message align={messageAlign(message.role)} key={message.id}>
              <MessageContent>
                {message.role === "user" ? (
                  <Bubble>
                    <BubbleContent>{getText(message)}</BubbleContent>
                  </Bubble>
                ) : (
                  <MessageResponse>{getText(message)}</MessageResponse>
                )}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationDownload
          aria-label="Baixar conversa"
          filename="conversa.md"
          formatMessage={(message) =>
            `**${message.role === "user" ? "Cliente" : "Assistente"}:** ${getText(message)}`
          }
          messages={messages}
        />
        <ConversationScrollButton aria-label="Ir para o fim" />
      </Conversation>
    </div>
  );
}
