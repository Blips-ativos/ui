"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@blips/ui/components/alert-dialog";
import { Button } from "@blips/ui/components/button";
import * as React from "react";

export default function AlertDialogSmall() {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Pequeno
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Permitir a conexão do acessório?</AlertDialogTitle>
          <AlertDialogDescription>
            Deseja permitir que o acessório USB se conecte a este dispositivo?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Não permitir</AlertDialogCancel>
          <AlertDialogAction onClick={() => setOpen(false)}>
            Permitir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
