"use client";

import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from "@blips/ai/components/message";
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";

const versions = [
  {
    id: "v1",
    text: "O distrato encerra o contrato antes do prazo. O equipamento é devolvido e passa por inspeção antes do acerto final.",
  },
  {
    id: "v2",
    text: "Distrato é o fim antecipado do contrato. Você devolve o equipamento, a Blips faz a inspeção e calcula o valor de encerramento.",
  },
  {
    id: "v3",
    text: "Em resumo: **distrato = encerrar antes do prazo**. Envolve devolução, inspeção do equipamento e o acerto financeiro.",
  },
];

export default function AiMessageBranch() {
  return (
    <div className="flex w-full max-w-lg min-w-0 flex-col gap-8">
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>O que é distrato?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <MessageBranch defaultBranch={versions.length - 1}>
        <MessageBranchContent>
          {versions.map((version) => (
            <Message key={version.id}>
              <MessageContent>
                <MessageResponse>{version.text}</MessageResponse>
              </MessageContent>
            </Message>
          ))}
        </MessageBranchContent>
        <MessageToolbar className="mt-0">
          <MessageBranchSelector>
            <MessageBranchPrevious />
            <MessageBranchPage />
            <MessageBranchNext />
          </MessageBranchSelector>
        </MessageToolbar>
      </MessageBranch>
    </div>
  );
}
