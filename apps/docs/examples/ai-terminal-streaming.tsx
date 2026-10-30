"use client";

import {
  Terminal,
  TerminalActions,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalStatus,
  TerminalTitle,
} from "@blips/ai/components/terminal";
import { Button } from "@blips/ui/components/button";
import { Spinner } from "@blips/ui/components/spinner";
import { useEffect, useState } from "react";

// Linhas de exemplo, entregues uma a uma para simular a saída chegando.
const linhas = [
  "\u001b[1m$ terraform plan\u001b[0m",
  "Lendo o estado remoto...",
  '\u001b[32m+\u001b[0m aws_ecs_service.agente["nascimento"] será criado',
  "\u001b[33m~\u001b[0m aws_lb_listener_rule.agentes será alterado",
  "\u001b[1mPlano:\u001b[0m 1 a criar, 1 a alterar, 0 a destruir.",
];

export default function AiTerminalStreaming() {
  const [visiveis, setVisiveis] = useState(0);
  const isStreaming = visiveis < linhas.length;

  useEffect(() => {
    if (!isStreaming) {
      return;
    }
    // Intervalo (e não timeout): `isStreaming` não muda entre uma linha e outra,
    // então o efeito roda uma vez por execução e o intervalo entrega todas.
    const id = window.setInterval(() => setVisiveis((n) => n + 1), 700);
    return () => window.clearInterval(id);
  }, [isStreaming]);

  return (
    <div className="flex w-full max-w-2xl flex-col items-start gap-3">
      <Terminal
        className="w-full"
        isStreaming={isStreaming}
        output={linhas.slice(0, visiveis).join("\n")}
      >
        <TerminalHeader>
          <TerminalTitle>blips-agents-infra</TerminalTitle>
          <div className="flex items-center gap-2">
            <TerminalStatus>
              <Spinner aria-hidden className="size-3" />
              Executando
            </TerminalStatus>
            <TerminalActions>
              <TerminalCopyButton />
            </TerminalActions>
          </div>
        </TerminalHeader>
        <TerminalContent className="h-48" />
      </Terminal>
      <Button
        disabled={isStreaming}
        onClick={() => setVisiveis(0)}
        size="sm"
        variant="outline"
      >
        Rodar de novo
      </Button>
    </div>
  );
}
