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

const DRAWER_SIDES = [
  { direction: "up", label: "Topo" },
  { direction: "right", label: "Direita" },
  { direction: "down", label: "Base" },
  { direction: "left", label: "Esquerda" },
] as const;

export default function DrawerSwipeHandleDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {DRAWER_SIDES.map(({ direction, label }) => (
        <Drawer key={direction} swipeDirection={direction} showSwipeHandle>
          <DrawerTrigger render={<Button variant="outline" />}>
            {label}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer</DrawerTitle>
              <DrawerDescription>
                Arraste pela alça para fechar.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <div className="bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
            </div>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}
