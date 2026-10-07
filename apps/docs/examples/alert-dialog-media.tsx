"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@blips/ui/components/alert-dialog";
import { Button } from "@blips/ui/components/button";
import { BluetoothIcon } from "@phosphor-icons/react";
import * as React from "react";

export default function AlertDialogWithMedia() {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Com mídia
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <BluetoothIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Parear o dispositivo?</AlertDialogTitle>
          <AlertDialogDescription>
            O equipamento vai se conectar por Bluetooth e enviar a telemetria
            para a sua conta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => setOpen(false)}>
            Parear
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
