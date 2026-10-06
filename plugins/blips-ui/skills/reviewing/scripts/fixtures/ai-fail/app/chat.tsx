"use client";

// Fixture que FALHA de propósito: cada import abaixo viola uma regra da @blips/ai.
import { Conversation } from "@blips/ai";
import { CodeBlock } from "@blips/ai/components/code-block";
import { Loader } from "@blips/ai/components/loader";
import { Message, MessageResponse } from "@blips/ai/components/message";
import { Tool } from "@blips/ai/src/components/tool";
// biome-ignore lint/style/useImportType: a fixture importa o tipo como valor de propósito
import { ChatStatus, DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import { Message as AiMessage } from "@/components/ai-elements/message";

export const transport = new DefaultChatTransport({ api: "/api/chat" });

export function Chat({
  messages,
  status,
}: {
  messages: UIMessage[];
  status: ChatStatus;
}) {
  return (
    <Conversation data-status={status}>
      <Loader />
      {messages.map((message) => (
        <Message from={message.role} key={message.id}>
          <MessageResponse>{message.id}</MessageResponse>
          <ReactMarkdown>{message.id}</ReactMarkdown>
          <CodeBlock code="{}" language="json" />
          <Tool />
          <AiMessage />
        </Message>
      ))}
    </Conversation>
  );
}
