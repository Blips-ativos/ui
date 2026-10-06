"use client";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@blips/ai/components/message";
import { Button } from "@blips/ui/components/button";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import * as React from "react";

// Resposta completa que a demo "transmite" aos poucos, sem chamar API.
const fullText = `Para abrir um chamado de **garantia**:

1. Tenha em mãos o número de série do equipamento.
2. Descreva o problema e, se puder, envie uma foto.
3. Informe um horário para a visita técnica.

\`\`\`bash
# Exemplo: consultar o status pelo protocolo
curl https://api.exemplo.com/chamados/12345
\`\`\`

O prazo de primeiro atendimento é de até **2 dias úteis**.`;

export default function AiMessageStreaming() {
  const [length, setLength] = React.useState(0);
  const isAnimating = length < fullText.length;

  React.useEffect(() => {
    if (!isAnimating) {
      return;
    }
    const timer = window.setTimeout(() => {
      setLength((current) => Math.min(current + 6, fullText.length));
    }, 30);
    return () => window.clearTimeout(timer);
  }, [isAnimating]);

  return (
    <div className="flex w-full max-w-lg min-w-0 flex-col gap-4">
      <Message>
        <MessageContent>
          <MessageResponse isAnimating={isAnimating}>
            {fullText.slice(0, length)}
          </MessageResponse>
        </MessageContent>
      </Message>
      <Button
        className="self-start"
        disabled={isAnimating}
        onClick={() => setLength(0)}
        size="sm"
        variant="outline"
      >
        <ArrowClockwiseIcon data-icon="inline-start" />
        Transmitir de novo
      </Button>
    </div>
  );
}
