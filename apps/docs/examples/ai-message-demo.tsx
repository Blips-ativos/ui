"use client";

import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
  messageAlign,
} from "@blips/ai/components/message";
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import {
  ArrowClockwiseIcon,
  CopyIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const messages: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    text: "Qual a diferença entre locação e venda de equipamento?",
  },
  {
    id: "m2",
    role: "assistant",
    text: `Na **locação**, o equipamento continua sendo da Blips e você paga uma mensalidade pelo uso. Na **venda**, ele passa a ser seu.

| | Locação | Venda |
| --- | --- | --- |
| Propriedade | Blips | Cliente |
| Manutenção | Inclusa | Garantia de fábrica |
| Pagamento | Mensal | À vista ou parcelado |

Quer que eu simule os dois cenários para o seu caso?`,
  },
];

export default function AiMessageDemo() {
  return (
    <div className="flex w-full max-w-lg min-w-0 flex-col gap-8">
      {messages.map((message) => (
        <Message align={messageAlign(message.role)} key={message.id}>
          <MessageContent>
            {message.role === "user" ? (
              <Bubble>
                <BubbleContent>{message.text}</BubbleContent>
              </Bubble>
            ) : (
              <>
                <MessageResponse>{message.text}</MessageResponse>
                <MessageActions>
                  <MessageAction tooltip="Copiar">
                    <CopyIcon />
                  </MessageAction>
                  <MessageAction tooltip="Gerar de novo">
                    <ArrowClockwiseIcon />
                  </MessageAction>
                  <MessageAction label="Gostei">
                    <ThumbsUpIcon />
                  </MessageAction>
                  <MessageAction label="Não gostei">
                    <ThumbsDownIcon />
                  </MessageAction>
                </MessageActions>
              </>
            )}
          </MessageContent>
        </Message>
      ))}
    </div>
  );
}
