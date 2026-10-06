"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item";
import { ArchiveIcon } from "@phosphor-icons/react";

const sizes = [
  { size: "default", label: "Tamanho default" },
  { size: "sm", label: "Tamanho sm" },
  { size: "xs", label: "Tamanho xs" },
] as const;

export default function ItemSizeDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {sizes.map((item) => (
        <Item key={item.size} variant="outline" size={item.size}>
          <ItemMedia variant="icon">
            <ArchiveIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{item.label}</ItemTitle>
            <ItemDescription>Mídia, título e descrição.</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
