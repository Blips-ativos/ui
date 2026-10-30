"use client";

import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@blips/ui/components/bubble";
import { Button } from "@blips/ui/components/button";
import { ThumbsDownIcon, ThumbsUpIcon } from "@phosphor-icons/react";

export default function BubbleReactionsDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-12">
      <Bubble>
        <BubbleContent>Mensagem de uma linha.</BubbleContent>
        <BubbleReactions role="img" aria-label="Reação: joinha">
          <span>👍</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="secondary" align="end">
        <BubbleContent>
          Uma mensagem mais longa, que quebra em várias linhas, para conferir o
          deslocamento da reação.
        </BubbleContent>
        <BubbleReactions
          side="bottom"
          align="start"
          role="img"
          aria-label="Reações: joinha, surpresa"
        >
          <span>👍</span>
          <span>😮</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>Reação posicionada em cima.</BubbleContent>
        <BubbleReactions
          side="top"
          align="end"
          role="img"
          aria-label="Reação: fogo"
        >
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="tinted">
        <BubbleContent>Vamos ao cinema e depois jantar. Topa?</BubbleContent>
        <BubbleReactions className="gap-1 bg-background">
          <Button variant="secondary" size="icon-xs" aria-label="Topo">
            <ThumbsUpIcon />
          </Button>
          <Button variant="secondary" size="icon-xs" aria-label="Não topo">
            <ThumbsDownIcon />
          </Button>
        </BubbleReactions>
      </Bubble>
    </div>
  );
}
