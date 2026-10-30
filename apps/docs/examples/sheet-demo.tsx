"use client";

import { Button } from "@blips/ui/components/button";
import { Field, FieldGroup, FieldLabel } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
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

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Abrir</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar perfil</SheetTitle>
          <SheetDescription>
            Altere os dados do seu perfil aqui. Clique em salvar quando
            terminar.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="sheet-demo-name">Nome</FieldLabel>
              <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <FieldLabel htmlFor="sheet-demo-username">Usuário</FieldLabel>
              <Input id="sheet-demo-username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
        </SheetBody>
        <SheetFooter>
          <Button type="submit">Salvar alterações</Button>
          <SheetClose render={<Button variant="outline" />}>Fechar</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
