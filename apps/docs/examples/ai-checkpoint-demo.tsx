"use client";

import {
  Checkpoint,
  CheckpointIcon,
  CheckpointTrigger,
} from "@blips/ai/components/checkpoint";
import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import { Button } from "@blips/ui/components/button";
import { Message, MessageContent } from "@blips/ui/components/message";
import { useState } from "react";

interface Mensagem {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const conversa: Mensagem[] = [
  {
    id: "1",
    role: "user",
    text: "Quero renegociar as parcelas atrasadas do contrato CT-2026-0412.",
  },
  {
    id: "2",
    role: "assistant",
    text: "Encontrei 3 parcelas vencidas, somando R$ 4.870,00 com juros e multa. Posso propor um acordo em 4 vezes?",
  },
  { id: "3", role: "user", text: "Prefiro em 6 vezes, sem entrada." },
  {
    id: "4",
    role: "assistant",
    text: "Certo. A proposta fica em 6 parcelas de R$ 835,40, a primeira em 10/11/2026.",
  },
];

// Ponto de restauração salvo depois da mensagem "2".
const CHECKPOINT_APOS = "2";

function Item({ mensagem }: { mensagem: Mensagem }) {
  const doUsuario = mensagem.role === "user";
  return (
    <Message align={doUsuario ? "end" : "start"}>
      <MessageContent>
        {doUsuario ? (
          <Bubble>
            <BubbleContent>{mensagem.text}</BubbleContent>
          </Bubble>
        ) : (
          <p className="text-sm">{mensagem.text}</p>
        )}
      </MessageContent>
    </Message>
  );
}

export default function AiCheckpointDemo() {
  const [mensagens, setMensagens] = useState(conversa);
  const indice = mensagens.findIndex((m) => m.id === CHECKPOINT_APOS);

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      {mensagens.map((mensagem, i) => (
        <div className="flex flex-col gap-4" key={mensagem.id}>
          <Item mensagem={mensagem} />
          {i === indice && (
            <Checkpoint>
              <CheckpointIcon />
              <CheckpointTrigger
                onClick={() => setMensagens(conversa.slice(0, indice + 1))}
                tooltip="Descarta as mensagens depois deste ponto"
              >
                Restaurar até aqui
              </CheckpointTrigger>
            </Checkpoint>
          )}
        </div>
      ))}
      {mensagens.length < conversa.length && (
        <Button
          className="self-start"
          onClick={() => setMensagens(conversa)}
          size="sm"
          variant="link"
        >
          Recarregar a conversa de exemplo
        </Button>
      )}
    </div>
  );
}
