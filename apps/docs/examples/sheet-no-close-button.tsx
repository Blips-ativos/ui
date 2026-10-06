"use client";

import { Button } from "@blips/ui/components/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@blips/ui/components/sheet";

export default function SheetNoCloseButton() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Sem botão de fechar
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Sem botão de fechar</SheetTitle>
          <SheetDescription>
            Este sheet não tem o botão de fechar no canto superior direito. Ele
            só fecha pelo botão abaixo, por Esc ou clicando fora.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Fechar</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
