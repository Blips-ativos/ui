"use client";

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@blips/ui/components/bubble";
import { Marker, MarkerContent } from "@blips/ui/components/marker";
import * as React from "react";

const quickReplies = [
  "Preciso de ajuda com a minha conta.",
  "Esqueci a minha senha.",
  "Tenho outra dúvida. Quero falar com uma pessoa.",
];

const bubbleLink = (
  // biome-ignore lint/a11y/useAnchorContent: o conteúdo vem dos children, injetados pelo render
  <a href="#bubble-link" />
);

export default function BubbleLinkDemo() {
  const [picked, setPicked] = React.useState<string | null>(null);

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Bubble>
        <BubbleContent render={bubbleLink}>Este balão é um link.</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent render={<button type="button" />}>
          Este é um botão clicável.
        </BubbleContent>
      </Bubble>
      <Marker variant="separator">
        <MarkerContent>Sugestões de resposta</MarkerContent>
      </Marker>
      <Bubble variant="muted">
        <BubbleContent>Como posso ajudar hoje?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        {quickReplies.map((reply) => (
          <Bubble key={reply} variant="outline" align="end">
            <BubbleContent
              className="border-dashed border-primary"
              render={<button type="button" onClick={() => setPicked(reply)} />}
            >
              {reply}
            </BubbleContent>
          </Bubble>
        ))}
      </BubbleGroup>
      {picked ? (
        <Marker role="status" className="justify-center">
          <MarkerContent>Você escolheu: {picked}</MarkerContent>
        </Marker>
      ) : null}
    </div>
  );
}
