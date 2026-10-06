"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@blips/ui/components/item";
import { ArrowSquareOutIcon, CaretRightIcon } from "@phosphor-icons/react";

const docsLink = (
  // biome-ignore lint/a11y/useAnchorContent: o conteúdo vem dos children, injetados pelo render
  <a href="#item-link" />
);

const externalLink = (
  // biome-ignore lint/a11y/useAnchorContent: o conteúdo vem dos children, injetados pelo render
  <a href="https://base-ui.com" target="_blank" rel="noopener noreferrer" />
);

export default function ItemLinkDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item render={docsLink}>
        <ItemContent>
          <ItemTitle>Visitar a documentação</ItemTitle>
          <ItemDescription>
            Aprenda a começar a usar os componentes.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <CaretRightIcon className="size-4" />
        </ItemActions>
      </Item>
      <Item variant="outline" render={externalLink}>
        <ItemContent>
          <ItemTitle>Link externo</ItemTitle>
          <ItemDescription>Abre em uma nova aba.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ArrowSquareOutIcon className="size-4" />
        </ItemActions>
      </Item>
    </div>
  );
}
