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
