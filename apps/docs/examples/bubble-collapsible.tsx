"use client";

import { Bubble, BubbleContent } from "@blips/ui/components/bubble";
import { Button } from "@blips/ui/components/button";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { CaretDownIcon } from "@phosphor-icons/react";
import * as React from "react";

const text = `A revisão de acessibilidade encontrou dois estados de foco discretos demais no tema escuro.

Conferi o dialog, o menu e o drawer, porque cada um renderiza controles focáveis dentro de uma camada sobreposta.

O dialog e o drawer estão bons. O menu precisa separar os tokens de hover e de foco para o foco do teclado continuar visível sem o mouse.`;

const previewLength = 160;

export default function BubbleCollapsibleDemo() {
  const [open, setOpen] = React.useState(false);
  const preview = `${text.slice(0, previewLength)}…`;

  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Collapsible open={open} onOpenChange={setOpen}>
        <Bubble variant="muted" align="end">
          <BubbleContent className="whitespace-pre-line">
            <div>{open ? text : preview}</div>
            <CollapsibleTrigger
              render={
                <Button
                  variant="link"
                  className="gap-1 p-0 text-muted-foreground"
                />
              }
            >
              {open ? "Mostrar menos" : "Mostrar mais"}
              <CaretDownIcon
                data-icon="inline-end"
                className="group-data-panel-open/button:rotate-180"
              />
            </CollapsibleTrigger>
          </BubbleContent>
        </Bubble>
      </Collapsible>
    </div>
  );
}
