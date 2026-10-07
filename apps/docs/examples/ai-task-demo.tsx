"use client";

import {
  Task,
  TaskContent,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
} from "@blips/ai/components/task";
import { FilePdfIcon } from "@phosphor-icons/react";

export default function AiTaskDemo() {
  return (
    <div className="w-full max-w-lg">
      <Task>
        <TaskTrigger title="Procurando a cláusula de garantia" />
        <TaskContent>
          <TaskItem>Lendo os contratos do cliente</TaskItem>
          <TaskItem>
            Encontrei a cláusula 7.2 em{" "}
            <TaskItemFile>
              <FilePdfIcon className="size-4" />
              contrato-locacao.pdf
            </TaskItemFile>
          </TaskItem>
          <TaskItem>Cobertura de 12 meses para peças e mão de obra</TaskItem>
        </TaskContent>
      </Task>
    </div>
  );
}
