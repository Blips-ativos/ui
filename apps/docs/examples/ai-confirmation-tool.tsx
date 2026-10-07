"use client";

import {
  Confirmation,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRequest,
  ConfirmationTitle,
} from "@blips/ai/components/confirmation";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
} from "@blips/ai/components/tool";

const input = { contrato: "CT-2026-0412", parcelas: [15, 16, 17] };

export default function AiConfirmationTool() {
  return (
    <div className="w-full max-w-lg">
      <Tool defaultOpen>
        <ToolHeader
          state="approval-requested"
          title="antecipar_parcelas"
          type="tool-antecipar_parcelas"
        />
        <ToolContent>
          <ToolInput input={input} />
          <Confirmation approval={{ id: "aprov-2" }} state="approval-requested">
            <ConfirmationTitle>
              <ConfirmationRequest>
                Antecipar 3 parcelas com desconto de 3% gera um boleto de R$
                3.608,40. Confirma?
              </ConfirmationRequest>
            </ConfirmationTitle>
            <ConfirmationActions>
              <ConfirmationAction variant="outline">Recusar</ConfirmationAction>
              <ConfirmationAction>Confirmar</ConfirmationAction>
            </ConfirmationActions>
          </Confirmation>
        </ToolContent>
      </Tool>
    </div>
  );
}
