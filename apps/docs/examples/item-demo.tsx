"use client";

import { Button } from "@blips/ui/components/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item";
import { CaretRightIcon, ShieldCheckIcon } from "@phosphor-icons/react";

const profileLink = (
  // biome-ignore lint/a11y/useAnchorContent: o conteúdo vem dos children, injetados pelo render
  <a href="#item-demo" />
);

export default function ItemDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Item simples</ItemTitle>
          <ItemDescription>
            Um item com título e descrição curta.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Ação
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" render={profileLink}>
        <ItemMedia variant="icon">
          <ShieldCheckIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Seu perfil foi verificado.</ItemTitle>
        </ItemContent>
        <ItemActions>
          <CaretRightIcon className="size-4" />
        </ItemActions>
      </Item>
    </div>
  );
}
