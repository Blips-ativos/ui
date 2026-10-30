# Item

Import: `@blips/ui/components/item`

> **Só existe na v3.x.** Em repo v2 (`@blips/ui` 2.x) o Item não existe: monte a
> linha com `div` + flex (ou `Card` compacto) seguindo as convenções de
> layout, ou proponha a migração para a v3. Veja `v2-vs-v3.md`.

Linha de conteúdo flexível: mídia (ícone, avatar, imagem) + título/descrição +
ações. Use em listas de configurações, notificações, arquivos, resultados de
busca, itens dentro de dropdown. Para dados tabulares, Table; para blocos
maiores com header/footer próprios, Card.

Exports: `Item`, `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`,
`ItemActions`, `ItemHeader`, `ItemFooter`, `ItemGroup`, `ItemSeparator`.
(`itemVariants`/`itemMediaVariants` não são exportados.)

| Componente | Descrição |
|---|---|
| `Item` | Linha `flex flex-wrap items-center rounded-md border text-xs/relaxed`. Feito com `useRender`: troque o elemento com **`render`** (ex. `render={<a href="/x" />}`); como link, ganha `hover:bg-muted`. |
| `ItemMedia` | Mídia à esquerda. `variant`: `"default"`, `"icon"` (ícone `size-4`), `"image"` (`size-8 rounded-sm`, `size-6` no `xs`). Com descrição, alinha ao topo. |
| `ItemContent` | Coluna `flex-1` com título e descrição. |
| `ItemTitle` | `font-medium`, uma linha (`line-clamp-1`). |
| `ItemDescription` | `text-muted-foreground`, até duas linhas (`line-clamp-2`). |
| `ItemActions` | Botões/ícones à direita (`flex gap-2`). |
| `ItemHeader` / `ItemFooter` | Faixas de largura total (`basis-full`) acima/abaixo do conteúdo (ex. imagem de capa, metadados). |
| `ItemGroup` | Lista (`role="list"`, `flex-col gap-4`; gap menor com itens `sm`/`xs`). |
| `ItemSeparator` | `Separator` horizontal com `my-2` entre itens. |

**Item**

| Prop | Tipo | Padrão |
|---|---|---|
| `variant` | `"default"` (sem borda visível) \| `"outline"` (borda) \| `"muted"` (fundo `bg-muted/50`) | `"default"` |
| `size` | `"default"` \| `"sm"` \| `"xs"` | `"default"` |
| `render` | elemento ou função | `<div>` |

- Dentro de `DropdownMenuContent`, o `size="xs"` zera o padding.
- Ícone de navegação à direita: `CaretRightIcon` em `ItemActions`.

```tsx
import { CaretRightIcon, ShieldCheckIcon } from "@phosphor-icons/react";
import * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar";
import { Button } from "@blips/ui/components/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@blips/ui/components/item";

type Pessoa = {
  id: string;
  nome: string;
  email: string;
  foto: string;
  iniciais: string;
};

export function Itens({ pessoas }: { pessoas: Pessoa[] }) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Autenticação em dois fatores</ItemTitle>
          <ItemDescription>Proteja o acesso com um código extra.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Ativar
          </Button>
        </ItemActions>
      </Item>

      {/* Como link */}
      <Item variant="outline" size="sm" render={<a href="/perfil" />}>
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

      {/* Lista */}
      <ItemGroup>
        {pessoas.map((p, i) => (
          <React.Fragment key={p.id}>
            <Item>
              <ItemMedia>
                <Avatar>
                  <AvatarImage src={p.foto} />
                  <AvatarFallback>{p.iniciais}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{p.nome}</ItemTitle>
                <ItemDescription>{p.email}</ItemDescription>
              </ItemContent>
            </Item>
            {i < pessoas.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
  );
}
```

Com `Link` do Next: `render={<Link href="/perfil" />}`. Não existe `asChild`.

## Exemplos na docs

`item-demo`, `item-variants`, `item-size`, `item-link`, `item-image`, `item-group`, `item-header-footer` (em `apps/docs/examples/`).
