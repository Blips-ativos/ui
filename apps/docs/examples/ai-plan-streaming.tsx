"use client";

import {
  Plan,
  PlanAction,
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
      </Plan>
    </div>
  );
}
