"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar";
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@blips/ui/components/message";

export default function MessageGroupDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-10">
      <MessageGroup>
        <Message>
          <MessageAvatar />
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>Conferi os endereços do registry.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://avatar.vercel.sh/shadcn"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                O JSON dos componentes e dos exemplos agora fica no registry da
                UI.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </MessageGroup>
      <MessageGroup>
        <Message align="end">
          <MessageContent>
            <Bubble variant="tinted">
              <BubbleContent>Perfeito.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble variant="tinted">
              <BubbleContent>Pode publicar a nova versão.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </MessageGroup>
    </div>
  );
}
