"use client";

import { Button } from "@blips/ui/components/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@blips/ui/components/sheet";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

const paragraphs = Array.from(
  { length: 10 },
  (_, index) => `paragrafo-${index}`
);

export default function SheetSide() {
  return (
    <div className="flex flex-wrap gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger
            render={<Button variant="outline" className="capitalize" />}
          >
            {side}
          </SheetTrigger>
          <SheetContent
            side={side}
            className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
          >
            <SheetHeader>
              <SheetTitle>Editar perfil</SheetTitle>
              <SheetDescription>
                Altere os dados do seu perfil aqui. Clique em salvar quando
                terminar.
              </SheetDescription>
            </SheetHeader>
            <SheetBody className="no-scrollbar">
              {paragraphs.map((key) => (
                <p key={key} className="mb-4 leading-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              ))}
            </SheetBody>
            <SheetFooter>
              <Button type="submit">Salvar alterações</Button>
              <SheetClose render={<Button variant="outline" />}>
                Cancelar
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
