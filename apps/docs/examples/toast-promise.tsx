"use client";

import { Button } from "@blips/ui/components/button";
import { createToastManager, Toaster } from "@blips/ui/components/toast";

const toast = createToastManager();

export default function ToastPromise() {
  function showToast() {
    toast.promise(
      new Promise<{ name: string }>((resolve) => {
        window.setTimeout(() => resolve({ name: "Evento" }), 2000);
      }),
      {
        loading: "Criando evento…",
        success: (data) => `${data.name} criado.`,
        error: "Não foi possível criar o evento.",
      }
    );
  }

  return (
    <Toaster toastManager={toast}>
      <Button variant="outline" className="w-fit" onClick={showToast}>
        Criar evento
      </Button>
    </Toaster>
  );
}
