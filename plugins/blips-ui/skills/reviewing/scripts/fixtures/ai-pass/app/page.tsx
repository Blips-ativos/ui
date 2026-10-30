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
