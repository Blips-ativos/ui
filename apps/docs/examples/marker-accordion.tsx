"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@blips/ui/components/accordion";
import { Marker, MarkerContent, MarkerIcon } from "@blips/ui/components/marker";
import { ClockIcon } from "@phosphor-icons/react";

export default function MarkerAccordionDemo() {
  return (
    <Accordion className="w-full max-w-sm">
      <AccordionItem value="raciocinio">
        <AccordionTrigger>
          <Marker>
            <MarkerIcon>
              <ClockIcon />
            </MarkerIcon>
            <MarkerContent>Trabalhou por 42s</MarkerContent>
          </Marker>
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground">
            A pessoa pediu a lista de arquivos do diretório atual. O assistente
            listou os arquivos e resumiu o que cada um faz.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
