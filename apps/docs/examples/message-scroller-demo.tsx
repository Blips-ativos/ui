"use client";

import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@blips/ui/components/input-group";
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
import { ArrowUpIcon } from "@phosphor-icons/react";
import * as React from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

// Roteiro da demo: cada envio adiciona a próxima pergunta e, depois de um
// instante, a resposta correspondente.
const script: Array<[string, string]> = [
  [
    "Estou montando um chat de IA para a documentação. Como divido os componentes?",
    `Pense em três camadas, para a rolagem e o campo de texto não brigarem:

- Moldura: card ou página, título e status.
- Transcrição: a lista de mensagens com rolagem própria.
- Composer: campo de texto, enviar e parar.

O MessageScroller cuida da segunda camada: mantém a rolagem presa no fim enquanto a resposta chega e mostra um botão para voltar ao fim quando a pessoa rola para cima.`,
  ],
  [
    "E o espaçamento quando uma resposta é curta e a próxima é bem longa?",
    "Quem define o ritmo vertical é o contêiner de rolagem, não cada balão. Use um gap fixo na lista (gap-6, por exemplo) e mantenha a resposta longa num único balão, em vez de quebrar em vários.",
  ],
  ["Valeu, ajudou bastante.", "Por nada. Mande outra mensagem quando quiser."],
];

const initialMessages: ChatMessage[] = [
  { id: "m1", role: "user", text: "Oi!" },
  { id: "m2", role: "assistant", text: "Oi! Como posso ajudar?" },
];

export default function MessageScrollerDemo() {
  const [messages, setMessages] = React.useState(initialMessages);
  const [step, setStep] = React.useState(0);
  const [pending, setPending] = React.useState(false);
  const next = script[step];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!next || pending) {
      return;
    }
    const [question, answer] = next;
    setMessages((current) => [
      ...current,
      { id: `u${step}`, role: "user", text: question },
    ]);
    setPending(true);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `a${step}`, role: "assistant", text: answer },
      ]);
      setPending(false);
      setStep((current) => current + 1);
    }, 1200);
  }

  return (
    <Card className="h-120 w-full max-w-md">
      <CardHeader>
        <CardTitle>Como posso ajudar hoje?</CardTitle>
        <CardDescription>{pending ? "Respondendo…" : "Pronto"}</CardDescription>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
        <MessageScrollerProvider autoScroll>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="p-(--card-spacing)">
                {messages.map((message) => (
                  <MessageScrollerItem
                    key={message.id}
                    messageId={message.id}
                    scrollAnchor={message.role === "user"}
                  >
                    <Message align={message.role === "user" ? "end" : "start"}>
                      <MessageContent>
                        <Bubble
                          variant={
                            message.role === "user" ? "default" : "muted"
                          }
                        >
                          <BubbleContent className="whitespace-pre-wrap">
                            {message.text}
                          </BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
                {pending ? (
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
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="w-full">
          <InputGroup>
            <InputGroupTextarea
              aria-label="Mensagem"
              placeholder="Pergunte qualquer coisa…"
              className="h-10 min-h-10 overflow-y-auto"
              value={pending || !next ? "" : next[0]}
              readOnly
            />
            <InputGroupAddon align="block-end" className="p-2">
              <InputGroupButton
                variant="default"
                size="icon-sm"
                type="submit"
                disabled={!next || pending}
                className="ml-auto"
              >
                <ArrowUpIcon />
                <span className="sr-only">Enviar</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </CardFooter>
    </Card>
  );
}
