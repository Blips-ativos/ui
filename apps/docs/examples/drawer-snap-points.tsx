"use client";

import { Button } from "@blips/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@blips/ui/components/drawer";

const SNAP_POINTS = ["31rem", 1];

const blocks = Array.from({ length: 16 }, (_, index) => `bloco-${index}`);

export default function DrawerSnapPoints() {
  return (
    <Drawer snapPoints={SNAP_POINTS} showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        Abrir com pontos de parada
      </DrawerTrigger>
      <DrawerContent className="max-h-[calc(100dvh-1rem)]">
        <DrawerHeader>
          <DrawerTitle>Pontos de parada</DrawerTitle>
          <DrawerDescription>
            Arraste o drawer para alternar entre uma prévia compacta e a altura
            quase total da tela.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid flex-1 gap-3 overflow-y-auto p-4">
          {blocks.map((key) => (
            <div key={key} className="h-12 bg-muted" />
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
