"use client";

import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { Field, FieldGroup, FieldLabel } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import * as React from "react";

export default function CollapsibleSettings() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="mx-auto w-full max-w-xs" size="sm">
      <CardHeader>
        <CardTitle>Raio</CardTitle>
        <CardDescription>Defina o raio dos cantos do elemento.</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="flex items-start gap-2"
        >
          <FieldGroup className="grid w-full grid-cols-2 gap-2">
            <Field>
              <FieldLabel htmlFor="radius-top-left" className="sr-only">
                Superior esquerdo
              </FieldLabel>
              <Input id="radius-top-left" placeholder="0" defaultValue={0} />
            </Field>
            <Field>
              <FieldLabel htmlFor="radius-top-right" className="sr-only">
                Superior direito
              </FieldLabel>
              <Input id="radius-top-right" placeholder="0" defaultValue={0} />
            </Field>
            <CollapsibleContent className="col-span-full grid grid-cols-subgrid gap-2">
              <Field>
                <FieldLabel htmlFor="radius-bottom-left" className="sr-only">
                  Inferior esquerdo
                </FieldLabel>
                <Input
                  id="radius-bottom-left"
                  placeholder="0"
                  defaultValue={0}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="radius-bottom-right" className="sr-only">
                  Inferior direito
                </FieldLabel>
                <Input
                  id="radius-bottom-right"
                  placeholder="0"
                  defaultValue={0}
                />
              </Field>
            </CollapsibleContent>
          </FieldGroup>
          <CollapsibleTrigger
            render={<Button variant="outline" size="icon" />}
            aria-label={isOpen ? "Recolher" : "Expandir"}
          >
            {isOpen ? <MinusIcon /> : <PlusIcon />}
          </CollapsibleTrigger>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
