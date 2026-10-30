"use client";

import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@blips/ui/components/bubble";
import { Button } from "@blips/ui/components/button";
import {
  Message,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@blips/ui/components/message";

export default function MessageHeaderFooterDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-12">
      <Message align="end">
        <MessageContent>
          <MessageHeader className="justify-end">Você</MessageHeader>
          <Bubble>
            <BubbleContent>
              Dá para mandar a atualização ainda hoje?
            </BubbleContent>
          </Bubble>
          <MessageFooter className="gap-2">
            <span>Entregue</span>
            <Button variant="ghost" size="xs">
              Desfazer
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <MessageHeader>
            <span>Olivia</span>
            <span className="ml-auto font-normal">há 1 min</span>
          </MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>
              Olhei os logs. A nova tentativa terminou e as faturas que faltavam
              já estão incluídas.
            </BubbleContent>
            <BubbleReactions>
              <Button variant="ghost" size="xs">
                Obrigado
              </Button>
            </BubbleReactions>
          </Bubble>
          <MessageFooter className="gap-2">
            <span>Fila de suporte</span>
            <Button variant="ghost" size="xs">
              Copiar
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <MessageHeader className="justify-end">
            Alerta da automação
          </MessageHeader>
          <Bubble variant="destructive">
            <BubbleContent>
              O link de exportação expira em 10 minutos. Gere outro antes de
              enviar a conversa.
            </BubbleContent>
          </Bubble>
          <MessageFooter className="gap-2">
            <span>Requer ação</span>
            <Button variant="destructive" size="xs">
              Gerar de novo
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  );
}
