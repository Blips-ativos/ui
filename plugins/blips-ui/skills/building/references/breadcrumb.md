# Breadcrumb

Import: `@blips/ui/components/breadcrumb`

Trilha de navegação hierárquica no topo da página.

Exports (iguais nas duas versões): `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`,
`BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`.

## Notas comuns

| Componente | Descrição |
|---|---|
| `Breadcrumb` | `nav` com `aria-label="breadcrumb"`. Não tem prop `separator`: cada `BreadcrumbSeparator` cuida do seu. |
| `BreadcrumbList` | `ol` flex com quebra de linha, `text-muted-foreground`. |
| `BreadcrumbItem` | `li` inline-flex. |
| `BreadcrumbLink` | Link de um nível. Use o `Link` do framework para navegação client-side (ver seção da versão). |
| `BreadcrumbPage` | Página atual: `span` com `aria-current="page"`, `text-foreground`, não interativo. |
| `BreadcrumbSeparator` | `li` `role="presentation"`. Padrão: caret Phosphor para a direita; passe `children` para trocar (ex.: barra vertical). |
| `BreadcrumbEllipsis` | Indicador de níveis recolhidos (ícone de três pontos + texto sr-only "More"). Combine com DropdownMenu (desktop) ou Drawer (mobile). |

- Para trilhas longas: mostre o primeiro nível, um `BreadcrumbEllipsis` com os intermediários num DropdownMenu, e os dois últimos. Itens longos: `className="max-w-20 truncate md:max-w-none"`.

> A API difere entre as versões (`render` vs `asChild` no `BreadcrumbLink`). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

`BreadcrumbLink` usa `useRender` + `mergeProps` (`useRender.ComponentProps<"a">`): passe `href` direto ou troque o elemento com `render`. O `data-slot="breadcrumb-link"` vem do `state`.

Visual base-mira: `BreadcrumbList` `text-xs/relaxed gap-1.5` (sem `sm:gap-2.5`), `BreadcrumbItem` `gap-1`, `BreadcrumbEllipsis` `size-4` (ícone `size-3.5`). Ícones: `CaretRightIcon` e `DotsThreeIcon`; o separador não gira em RTL.

```tsx
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@blips/ui/components/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import Link from "next/link";

export function TrilhaContrato() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" />}>Início</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1" aria-label="Mais níveis">
              <BreadcrumbEllipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem render={<Link href="/clientes" />}>Clientes</DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/clientes/42" />}>Padaria Pão Quente</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/clientes/42/contratos" />}>
            Contratos
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Contrato 2026-0042</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

Separador customizado: `<BreadcrumbSeparator><LineVerticalIcon /></BreadcrumbSeparator>`.

## v2.x — Radix

`BreadcrumbLink` aceita `asChild` (`Slot` de `@radix-ui/react-slot`). Com o `Link` do Next, **sempre** `asChild`.

Visual new-york: `BreadcrumbList` `text-sm gap-1.5 sm:gap-2.5`, `BreadcrumbItem` `gap-1.5`, `BreadcrumbEllipsis` `size-9` (ícone `size-4`). Ícones: `CaretRight` e `DotsThree`.

```tsx
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@blips/ui/components/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"

export function TrilhaContrato() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Início</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="size-4" />
              <span className="sr-only">Mais níveis</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/clientes">Clientes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/clientes/42">Padaria Pão Quente</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/clientes/42/contratos">Contratos</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Contrato 2026-0042</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

Responsivo: DropdownMenu no desktop e Drawer no mobile (via `useMediaQuery("(min-width: 768px)")`), com `<DrawerClose asChild><Button variant="outline">Fechar</Button></DrawerClose>` no footer do Drawer.

## Exemplos na docs

`breadcrumb-demo`, `breadcrumb-link`, `breadcrumb-separator`, `breadcrumb-dropdown`, `breadcrumb-ellipsis` (v3).
