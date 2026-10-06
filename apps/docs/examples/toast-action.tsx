"use client";

import { Button } from "@blips/ui/components/button";
import { createToastManager, Toaster } from "@blips/ui/components/toast";

const toast = createToastManager();

export default function ToastWithAction() {
  function showToast() {
    const id = toast.add({
      title: "Evento criado",
      description: "Você pode desfazer esta ação.",
      actionProps: {
        children: "Desfazer",
        onClick() {
          toast.close(id);
          toast.add({ description: "Criação do evento desfeita." });
        },
      },
    });
  }

  return (
    <Toaster toastManager={toast}>
      <Button variant="outline" className="w-fit" onClick={showToast}>
        Mostrar toast
      </Button>
    </Toaster>
  );
}
