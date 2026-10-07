"use client";

import {
  Task,
  TaskContent,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
} from "@blips/ai/components/task";
import { Spinner } from "@blips/ui/components/spinner";
import { CheckCircleIcon, FileTextIcon } from "@phosphor-icons/react";

const etapas = [
  {
    titulo: "Buscar contratos do CNPJ",
    concluida: true,
    itens: ["2 contratos ativos encontrados"],
    arquivos: ["CT-2026-0412", "CT-2026-0587"],
  },
  {
    titulo: "Conferir parcelas em atraso",
    concluida: true,
    itens: ["3 parcelas vencidas, a mais antiga de 12/08/2026"],
    arquivos: [],
  },
  {
    titulo: "Calcular o valor do acordo",
    concluida: false,
    itens: ["Aplicando juros e multa de cada parcela"],
    arquivos: [],
  },
];

export default function AiTaskEtapas() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      {etapas.map((etapa) => (
        <Task defaultOpen={!etapa.concluida} key={etapa.titulo}>
          <TaskTrigger title={etapa.titulo}>
            <span className="flex w-full cursor-pointer items-center gap-2 text-muted-foreground text-sm hover:text-foreground">
              {etapa.concluida ? (
                <CheckCircleIcon className="size-4 text-primary" />
              ) : (
                <Spinner aria-label="Em andamento" className="size-4" />
              )}
              {etapa.titulo}
            </span>
          </TaskTrigger>
          <TaskContent>
            {etapa.itens.map((item) => (
              <TaskItem key={item}>{item}</TaskItem>
            ))}
            {etapa.arquivos.length > 0 && (
              <TaskItem className="flex flex-wrap gap-2">
                {etapa.arquivos.map((arquivo) => (
                  <TaskItemFile key={arquivo}>
                    <FileTextIcon className="size-4" />
                    {arquivo}
                  </TaskItemFile>
                ))}
              </TaskItem>
            )}
          </TaskContent>
        </Task>
      ))}
    </div>
  );
}
