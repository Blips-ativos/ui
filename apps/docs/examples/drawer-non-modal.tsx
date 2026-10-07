"use client";

import { Button } from "@blips/ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@blips/ui/components/drawer";

export default function DrawerNonModal() {
  return (
    <Drawer modal={false} disablePointerDismissal swipeDirection="right">
      <DrawerTrigger render={<Button variant="outline" />}>
        Não modal
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer não modal</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <div className="size-full bg-muted" />
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Fechar
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
