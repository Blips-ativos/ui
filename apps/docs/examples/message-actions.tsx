"use client";

import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import { Button } from "@blips/ui/components/button";
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@blips/ui/components/message";
import {
  ArrowClockwiseIcon,
  CopyIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react";

export default function MessageActionsDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-10">
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Qual o status do deploy?</BubbleContent>
          </Bubble>
          <MessageFooter>
            <Button variant="ghost" size="icon" aria-label="Copiar">
              <CopyIcon />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Tentar de novo">
              <ArrowClockwiseIcon />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              A falha de instalação vem do pacote do workspace. Posso abrir a
              linha exata do log ou refazer o deploy.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <Button variant="ghost" size="icon" aria-label="Copiar">
              <CopyIcon />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Gostei">
              <ThumbsUpIcon />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Não gostei">
              <ThumbsDownIcon />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Manda o link que eu dou uma olhada.</BubbleContent>
          </Bubble>
          <MessageFooter className="gap-2">
            <span className="font-normal text-destructive">Falha no envio</span>
            <Button variant="secondary" size="xs">
              Reenviar
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  );
}
