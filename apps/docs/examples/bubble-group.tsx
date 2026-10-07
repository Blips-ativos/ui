"use client";

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@blips/ui/components/bubble";

export default function BubbleGroupDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <BubbleGroup>
        <Bubble variant="secondary">
          <BubbleContent>Terminei a auditoria.</BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>
            A saída do registry está limpa, mas achei uma rota antiga.
          </BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>Quer que eu remova agora?</BubbleContent>
        </Bubble>
      </BubbleGroup>
      <BubbleGroup>
        <Bubble variant="tinted" align="end">
          <BubbleContent>Sim, pode limpar.</BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent>
            Depois roda o build do registry de novo.
          </BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  );
}
