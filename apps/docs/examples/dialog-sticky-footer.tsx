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

const paragraphs = Array.from(
  { length: 10 },
  (_, index) => `paragrafo-${index}`
);

export default function DialogStickyFooter() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Rodapé fixo
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Termos de uso</DialogTitle>
          <DialogDescription>
            Um diálogo com conteúdo rolável.
          </DialogDescription>
        </DialogHeader>
        <div className="no-scrollbar -mx-4 max-h-[70vh] overflow-y-auto px-4">
          {paragraphs.map((key) => (
            <p key={key} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Fechar
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
