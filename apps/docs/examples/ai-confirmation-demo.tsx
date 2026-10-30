"use client";

import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from "@blips/ai/components/confirmation";
import { Button } from "@blips/ui/components/button";
import { CheckIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";

type Estado = "approval-requested" | "approval-responded";

export default function AiConfirmationDemo() {
  const [state, setState] = useState<Estado>("approval-requested");
  const [approved, setApproved] = useState<boolean | null>(null);

  // No app, a resposta volta para o agente (ex.: addToolApprovalResponse do AI SDK).
  // Aqui o estado é local, só para mostrar as transições.
  const responder = (aprovado: boolean) => {
    setApproved(aprovado);
    setState("approval-responded");
  };

  const approval =
    approved === null ? { id: "aprov-1" } : { approved, id: "aprov-1" };

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Confirmation approval={approval} state={state}>
        <ConfirmationTitle>
          <ConfirmationRequest>
            O agente quer abrir um chamado técnico para o equipamento BLP-88213.
            Autoriza?
          </ConfirmationRequest>
          <ConfirmationAccepted>
            <CheckIcon className="mr-1 inline size-4" />
            Você autorizou a abertura do chamado.
          </ConfirmationAccepted>
          <ConfirmationRejected>
            <XIcon className="mr-1 inline size-4" />
            Você recusou a abertura do chamado.
          </ConfirmationRejected>
        </ConfirmationTitle>
        <ConfirmationActions>
          <ConfirmationAction
            onClick={() => responder(false)}
            variant="outline"
          >
            Recusar
          </ConfirmationAction>
          <ConfirmationAction onClick={() => responder(true)}>
            Autorizar
          </ConfirmationAction>
        </ConfirmationActions>
      </Confirmation>
      {state === "approval-responded" && (
        <Button
          className="self-start"
          onClick={() => {
            setApproved(null);
            setState("approval-requested");
          }}
          variant="ghost"
        >
          Recomeçar
        </Button>
      )}
    </div>
  );
}
