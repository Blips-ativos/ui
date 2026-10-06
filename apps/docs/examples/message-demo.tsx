"use client";

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@blips/ui/components/bubble";
import { Message, MessageContent } from "@blips/ui/components/message";

export default function MessageDemo() {
  return (
    <div className="flex w-full max-w-md min-w-0 flex-col gap-10">
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Vou subir pra produção rapidinho.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>São 16h55. De sexta-feira.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>É uma mudança de uma linha.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>
                É sempre uma mudança de uma linha. Roda os testes dessa vez.
              </BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>Pode mandar.</BubbleContent>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
    </div>
  );
}
