"use client";

import {
  Plan,
  PlanAction,
  PlanContent,
  PlanDescription,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from "@blips/ai/components/plan";
import { Button } from "@blips/ui/components/button";

const passos = [
  "Buscar os contratos ativos do CNPJ informado",
  "Conferir as parcelas em atraso de cada contrato",
  "Calcular o valor atualizado com juros e multa",
  "Gerar o boleto de renegociação e enviar ao cliente",
];

export default function AiPlanDemo() {
  return (
    <div className="w-full max-w-lg">
      <Plan defaultOpen>
        <PlanHeader>
          <div>
            <PlanTitle>Renegociar parcelas em atraso</PlanTitle>
            <PlanDescription>
              Quatro passos para propor um acordo ao cliente.
            </PlanDescription>
          </div>
          <PlanAction>
            <PlanTrigger />
          </PlanAction>
        </PlanHeader>
        <PlanContent>
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground text-sm">
            {passos.map((passo) => (
              <li key={passo}>{passo}</li>
            ))}
          </ol>
        </PlanContent>
        <PlanFooter className="justify-end gap-2">
          <Button size="sm" variant="outline">
            Ajustar
          </Button>
          <Button size="sm">Executar plano</Button>
        </PlanFooter>
      </Plan>
    </div>
  );
}
