"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@blips/ui/components/accordion";

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["item-1"]} className="max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>É acessível?</AccordionTrigger>
        <AccordionContent>
          Sim. Segue o padrão de design WAI-ARIA.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Já vem estilizado?</AccordionTrigger>
        <AccordionContent>
          Sim. Vem com estilos padrão que combinam com a estética dos outros
          componentes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>É animado?</AccordionTrigger>
        <AccordionContent>
          Sim. É animado por padrão, mas você pode desativar a animação se
          preferir.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
