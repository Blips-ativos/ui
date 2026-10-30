"use client";

import { Button } from "@blips/ui/components/button";
import { Field, FieldGroup, FieldLabel } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@blips/ui/components/popover";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Abrir popover
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <PopoverHeader>
          <PopoverTitle>Dimensões</PopoverTitle>
          <PopoverDescription>
            Defina as dimensões da camada.
          </PopoverDescription>
        </PopoverHeader>
        <FieldGroup className="gap-4">
          <Field orientation="horizontal">
            <FieldLabel htmlFor="popover-width" className="w-1/2">
              Largura
            </FieldLabel>
            <Input id="popover-width" defaultValue="100%" />
          </Field>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="popover-height" className="w-1/2">
              Altura
            </FieldLabel>
            <Input id="popover-height" defaultValue="25px" />
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  );
}
