"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@blips/ui/components/item";

export default function ItemHeaderFooterDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item variant="outline">
        <ItemHeader>
          <span className="text-xs font-medium">Projeto do time</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Redesenho do site</ItemTitle>
          <ItemDescription>
            Revisão completa do site com novos princípios de design e uma
            experiência melhor.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span className="text-xs text-muted-foreground">
            Atualizado há 5 minutos
          </span>
        </ItemFooter>
      </Item>
      <Item variant="muted">
        <ItemHeader>
          <span className="text-xs font-medium">Documentação</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Guia de integração da API</ItemTitle>
          <ItemDescription>
            Passo a passo para integrar APIs de terceiros com autenticação e
            tratamento de erros.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span className="text-xs text-muted-foreground">
            Técnico · 3 anexos
          </span>
        </ItemFooter>
      </Item>
    </div>
  );
}
