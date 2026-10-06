"use client";

import {
  Context,
  ContextContent,
  ContextContentBody,
  ContextContentFooter,
  ContextContentHeader,
  ContextInputUsage,
  ContextOutputUsage,
  ContextTrigger,
} from "@blips/ai/components/context";
import { Progress } from "@blips/ui/components/progress";

const usados = 96_000;
const limite = 128_000;
const numero = new Intl.NumberFormat("pt-BR");

// Os textos padrão do Context vêm em inglês; passe children para traduzir.
export default function AiContextCustom() {
  return (
    <Context maxTokens={limite} usedTokens={usados}>
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader>
          <div className="flex items-center justify-between text-xs">
            <span>Janela de contexto</span>
            <span className="font-mono text-muted-foreground">
              {numero.format(usados)} / {numero.format(limite)}
            </span>
          </div>
          <Progress value={(usados / limite) * 100} />
        </ContextContentHeader>
        <ContextContentBody className="space-y-1 text-xs">
          <ContextInputUsage>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Entrada</span>
              <span>{numero.format(81_000)}</span>
            </div>
          </ContextInputUsage>
          <ContextOutputUsage>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Saída</span>
              <span>{numero.format(15_000)}</span>
            </div>
          </ContextOutputUsage>
        </ContextContentBody>
        <ContextContentFooter>
          <span className="text-muted-foreground">
            Perto do limite: o histórico antigo será resumido.
          </span>
        </ContextContentFooter>
      </ContextContent>
    </Context>
  );
}
