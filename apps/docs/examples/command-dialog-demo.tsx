"use client";

import { Button } from "@blips/ui/components/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@blips/ui/components/command";
import * as React from "react";

export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Abrir menu
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Paleta de comandos"
        description="Pesquise um comando para executar."
      >
        <Command>
          <CommandInput placeholder="Digite um comando ou pesquise..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Sugestões">
              <CommandItem>Calendário</CommandItem>
              <CommandItem>Buscar emoji</CommandItem>
              <CommandItem>Calculadora</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
