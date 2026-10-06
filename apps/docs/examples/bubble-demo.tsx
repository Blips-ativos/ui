"use client";

import { Bubble, BubbleContent } from "@blips/ui/components/bubble";

export default function BubbleDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Bubble variant="muted">
        <BubbleContent>Oi! Em que posso ajudar?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Quero saber o status do meu pedido.</BubbleContent>
      </Bubble>
    </div>
  );
}
