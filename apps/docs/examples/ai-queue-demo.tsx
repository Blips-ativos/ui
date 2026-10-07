"use client";

import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemAttachment,
  QueueItemContent,
  QueueItemDescription,
  QueueItemFile,
  QueueItemImage,
  QueueItemIndicator,
  QueueList,
  type QueueMessage,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
  type QueueTodo,
} from "@blips/ai/components/queue";
import { CheckSquareIcon, TrashIcon, TrayIcon } from "@phosphor-icons/react";
import { useState } from "react";

const tarefasIniciais: QueueTodo[] = [
  {
    id: "t1",
    title: "Consultar contratos do cliente",
    description: "CNPJ 12.345.678/0001-90",
    status: "completed",
  },
  {
    id: "t2",
    title: "Conferir parcelas em atraso",
    status: "completed",
  },
  {
    id: "t3",
    title: "Calcular valor atualizado do acordo",
    description: "Juros de 1% ao mês e multa de 2%",
    status: "pending",
  },
  { id: "t4", title: "Enviar proposta pelo WhatsApp", status: "pending" },
];

// Miniatura em SVG embutido: o exemplo não busca nada na rede.
const fotoDaPlaca = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#cbd5e1"/><rect x="6" y="10" width="20" height="12" rx="2" fill="#475569"/></svg>'
)}`;

const mensagensIniciais: QueueMessage[] = [
  {
    id: "m1",
    parts: [
      { type: "text", text: "Pode incluir o contrato da filial também?" },
      {
        type: "file",
        filename: "contrato-filial.pdf",
        mediaType: "application/pdf",
        url: "#",
      },
    ],
  },
  {
    id: "m2",
    parts: [
      { type: "text", text: "Segue a foto da placa do equipamento" },
      {
        type: "file",
        filename: "placa.jpg",
        mediaType: "image/jpeg",
        url: fotoDaPlaca,
      },
    ],
  },
];

export default function AiQueueDemo() {
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const [mensagens, setMensagens] = useState(mensagensIniciais);

  return (
    <div className="w-full max-w-md">
      <Queue>
        <QueueSection>
          <QueueSectionTrigger>
            <QueueSectionLabel
              count={mensagens.length}
              icon={<TrayIcon className="size-4" />}
              label="mensagens na fila"
            />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              {mensagens.map((mensagem) => {
                const texto = mensagem.parts.find((p) => p.type === "text");
                const arquivos = mensagem.parts.filter(
                  (p) => p.type === "file"
                );
                return (
                  <QueueItem key={mensagem.id}>
                    <div className="flex items-center gap-2">
                      <QueueItemIndicator />
                      <QueueItemContent>{texto?.text}</QueueItemContent>
                      <QueueItemActions>
                        <QueueItemAction
                          aria-label="Remover da fila"
                          onClick={() =>
                            setMensagens((atual) =>
                              atual.filter((m) => m.id !== mensagem.id)
                            )
                          }
                        >
                          <TrashIcon className="size-3" />
                        </QueueItemAction>
                      </QueueItemActions>
                    </div>
                    {arquivos.length > 0 && (
                      <QueueItemAttachment>
                        {arquivos.map((arquivo) =>
                          arquivo.mediaType?.startsWith("image/") &&
                          arquivo.url ? (
                            <QueueItemImage
                              alt={arquivo.filename}
                              key={arquivo.url}
                              src={arquivo.url}
                            />
                          ) : (
                            <QueueItemFile key={arquivo.filename}>
                              {arquivo.filename}
                            </QueueItemFile>
                          )
                        )}
                      </QueueItemAttachment>
                    )}
                  </QueueItem>
                );
              })}
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
        <QueueSection>
          <QueueSectionTrigger>
            <QueueSectionLabel
              count={tarefas.filter((t) => t.status !== "completed").length}
              icon={<CheckSquareIcon className="size-4" />}
              label="tarefas pendentes"
            />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              {tarefas.map((tarefa) => {
                const concluida = tarefa.status === "completed";
                return (
                  <QueueItem key={tarefa.id}>
                    <div className="flex items-center gap-2">
                      <QueueItemIndicator completed={concluida} />
                      <QueueItemContent completed={concluida}>
                        {tarefa.title}
                      </QueueItemContent>
                      <QueueItemActions>
                        <QueueItemAction
                          aria-label="Remover tarefa"
                          onClick={() =>
                            setTarefas((atual) =>
                              atual.filter((t) => t.id !== tarefa.id)
                            )
                          }
                        >
                          <TrashIcon className="size-3" />
                        </QueueItemAction>
                      </QueueItemActions>
                    </div>
                    {tarefa.description && (
                      <QueueItemDescription completed={concluida}>
                        {tarefa.description}
                      </QueueItemDescription>
                    )}
                  </QueueItem>
                );
              })}
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
      </Queue>
    </div>
  );
}
