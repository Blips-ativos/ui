"use client";

import {
  Plan,
  PlanAction,
  PlanContent,
  PlanDescription,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from "@blips/ai/components/plan";

export default function AiPlanStreaming() {
  return (
    <div className="w-full max-w-lg">
      <Plan isStreaming>
        <PlanHeader>
          <div>
            <PlanTitle>Montando o plano de atendimento</PlanTitle>
            <PlanDescription>
              Lendo o histórico do cliente e os contratos vinculados.
            </PlanDescription>
          </div>
          <PlanAction>
            <PlanTrigger />
          </PlanAction>
        </PlanHeader>
        <PlanContent>
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground text-sm">
            <li>Ler as últimas conversas do cliente</li>
            <li>Listar os contratos vinculados ao CNPJ</li>
          </ol>
        </PlanContent>
      </Plan>
    </div>
  );
}
