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
} from "@blips/ui/components/message";

export default function MessageAvatarDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-10">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>Deu algum erro. Sabe o que foi?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent className="space-y-2">
              <div>
                Olhei o último deploy: o build falhou na instalação das
                dependências.
              </div>
              <div>Consegue mandar a mensagem de erro exata dos logs?</div>
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="destructive">
            <BubbleContent>Não foi possível enviar a mensagem.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  );
}
