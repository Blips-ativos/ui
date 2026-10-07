"use client";

import { Button } from "@blips/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog";
import { Field, FieldGroup, FieldLabel } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";

export default function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger render={<Button variant="outline" />}>
          Editar perfil
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
            <DialogDescription>
              Altere os dados do seu perfil aqui. Clique em salvar quando
              terminar.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name-1">Nome</FieldLabel>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <FieldLabel htmlFor="username-1">Usuário</FieldLabel>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancelar
            </DialogClose>
            <Button type="submit">Salvar alterações</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
