"use client";

import { Bubble, BubbleContent } from "@blips/ui/components/bubble";

export default function BubbleVariantsDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Bubble>
        <BubbleContent>
          O default usa a cor primária, para o lado de quem está usando o chat.
        </BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>
          O secondary é a superfície neutra padrão para o assistente e a
          conversa.
        </BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>
          O muted diminui a ênfase, bom para notas do sistema.
        </BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent>
          O tinted usa um tom suave da primária quando o preenchimento cheio
          pesa demais.
        </BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>
          O outline enquadra o conteúdo com uma borda.
        </BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>
          O destructive sinaliza erros ou ações que falharam.
        </BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>
          O ghost serve para texto do assistente sem moldura: ocupa a largura
          toda do contêiner.
        </BubbleContent>
      </Bubble>
    </div>
  );
}
