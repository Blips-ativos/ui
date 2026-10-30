"use client";

import { Button } from "@blips/ui/components/button";
import { Toaster } from "@blips/ui/components/sonner";
import { toast } from "sonner";

const TOASTER_ID = "sonner-types";
const options = { toasterId: TOASTER_ID };

export default function SonnerTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast("O evento foi criado", options)}
      >
        Padrão
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("O evento foi criado", options)}
      >
        Sucesso
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Chegue ao local 10 minutos antes do evento", options)
        }
      >
        Informação
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("O evento não pode começar antes das 8h", options)
        }
      >
        Aviso
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("O evento não foi criado", options)}
      >
        Erro
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Evento" }), 2000)
              ),
            {
              loading: "Carregando...",
              success: (data) => `${data.name} criado`,
              error: "Erro",
              ...options,
            }
          );
        }}
      >
        Promise
      </Button>
      <Toaster id={TOASTER_ID} />
    </div>
  );
}
