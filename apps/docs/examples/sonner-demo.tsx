"use client";

import { Button } from "@blips/ui/components/button";
import { Toaster } from "@blips/ui/components/sonner";
import { toast } from "sonner";

// Cada demo monta o próprio Toaster com um id para não duplicar os toasts
// das outras demos da página. No seu app, basta um <Toaster /> na raiz.
const TOASTER_ID = "sonner-demo";

export default function SonnerDemo() {
  return (
    <>
      <Button
        variant="outline"
        className="w-fit"
        onClick={() =>
          toast("O evento foi criado", {
            description: "Domingo, 3 de dezembro de 2023 às 9h",
            toasterId: TOASTER_ID,
          })
        }
      >
        Mostrar toast
      </Button>
      <Toaster id={TOASTER_ID} />
    </>
  );
}
