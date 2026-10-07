"use client";

import { Button } from "@blips/ui/components/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@blips/ui/components/item";

const variants = [
  {
    variant: "default",
    label: "Padrão",
    text: "Fundo transparente, sem borda.",
  },
  {
    variant: "outline",
    label: "Contorno",
    text: "Borda visível ao redor do item.",
  },
  {
    variant: "muted",
    label: "Suave",
    text: "Fundo suave para destaque discreto.",
  },
] as const;

export default function ItemVariantsDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {variants.map((item) => (
        <Item key={item.variant} variant={item.variant}>
          <ItemContent>
            <ItemTitle>{item.label}</ItemTitle>
            <ItemDescription>{item.text}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Abrir
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}
