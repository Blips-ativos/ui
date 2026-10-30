"use client";

import { Button } from "@blips/ui/components/button";
import { createToastManager, Toaster } from "@blips/ui/components/toast";

// Cada demo usa o próprio gerenciador para não duplicar os toasts das outras
// demos da página. No seu app, use o `toast` exportado pela lib e um único
// <Toaster /> na raiz.
const toast = createToastManager();

export default function ToastDemo() {
  return (
    <Toaster toastManager={toast}>
      <Button
        variant="outline"
        className="w-fit"
        onClick={() =>
          toast.add({
            title: "Evento criado",
            description: "Domingo, 3 de dezembro às 9h",
          })
        }
      >
        Mostrar toast
      </Button>
    </Toaster>
  );
}
