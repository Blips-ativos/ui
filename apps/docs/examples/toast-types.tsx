"use client";

import { Button } from "@blips/ui/components/button";
import { createToastManager, Toaster } from "@blips/ui/components/toast";

const toast = createToastManager();

const TYPES = [
  { type: "success", label: "Sucesso", title: "Evento criado" },
  {
    type: "info",
    label: "Informação",
    title: "Chegue 10 minutos antes do evento",
  },
  {
    type: "warning",
    label: "Aviso",
    title: "O evento não pode começar antes das 8h",
  },
  { type: "error", label: "Erro", title: "O evento não foi criado" },
] as const;

export default function ToastTypes() {
  return (
    <Toaster toastManager={toast}>
      <div className="flex flex-wrap gap-2">
        {TYPES.map(({ type, label, title }) => (
          <Button
            key={type}
            variant="outline"
            onClick={() => toast.add({ type, title })}
          >
            {label}
          </Button>
        ))}
      </div>
    </Toaster>
  );
}
