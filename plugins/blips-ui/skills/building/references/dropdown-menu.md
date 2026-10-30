# Dropdown Menu

Import: `@blips/ui/components/dropdown-menu`

Menu de ações aberto por um botão.

Exports (iguais nas duas versões): `DropdownMenu`, `DropdownMenuPortal`,
`DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuGroup`,
`DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`,
`DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`,
`DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubTrigger`,
`DropdownMenuSubContent`.

## Notas comuns

- `DropdownMenuContent` já inclui o Portal: não envolva em `DropdownMenuPortal`.
- `DropdownMenuItem`: `variant?: "default" | "destructive"` e `inset` (padding para alinhar com itens que têm ícone). `inset` também em Label, SubTrigger, CheckboxItem e RadioItem.
- `DropdownMenuShortcut`: dica de atalho à direita (só visual).
- Ícones Phosphor nos itens; trigger só de ícone precisa de `aria-label`.
- Agrupe com `DropdownMenuGroup` + `DropdownMenuSeparator`; ação destrutiva por último, em grupo próprio.
- Abrir um Dialog a partir de um item: controle o `open` do Dialog no estado e abra no handler do item (não aninhe o Dialog dentro do menu).

> A API difere entre as versões (`render` vs `asChild`, `onClick` vs `onSelect`, `Label` dentro de `Group`, alinhamento e largura padrão). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Primitiva: `@base-ui/react/menu`.

| Componente | Props relevantes |
|---|---|
| `DropdownMenu` | `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `modal` (padrão `true`), `disabled`, `loopFocus`, `highlightItemOnHover` |
| `DropdownMenuTrigger` | `render` (ex.: `render={<Button variant="ghost" />}` — **não** coloque um `<Button>` dentro do trigger), `nativeButton`, `openOnHover`, `delay` |
| `DropdownMenuContent` | `align` (padrão **`"start"`**), `alignOffset` (`0`), `side` (`"bottom"`), `sideOffset` (`4`) → Positioner. Largura padrão **`w-(--anchor-width)`** (a do trigger) com `min-w-32`: passe `className="w-52"` ou `"w-auto"` quando precisar. Sem `avoidCollisions`, `collisionPadding`, `onCloseAutoFocus`, `onEscapeKeyDown`, `forceMount` |
| `DropdownMenuItem` | `onClick` (substitui `onSelect`), `closeOnClick` (padrão `true`; `false` mantém o menu aberto — substitui `event.preventDefault()`), `disabled`, `label`, `render` (ex.: `render={<Link href="/x" />}`), `variant`, `inset` |
| `DropdownMenuCheckboxItem` | `checked`, `defaultChecked`, `onCheckedChange(checked, eventDetails)`, `closeOnClick` (padrão `false`). Sem `"indeterminate"` |
| `DropdownMenuRadioGroup` | `value`, `defaultValue`, `onValueChange(value, eventDetails)` (valor `any`: tipe explicitamente) |
| `DropdownMenuRadioItem` | `value` (obrigatório), `closeOnClick` (padrão `false`) |
| `DropdownMenuLabel` | É `Menu.GroupLabel`: **precisa estar dentro de `DropdownMenuGroup`** |
| `DropdownMenuSub` | `Menu.SubmenuRoot` (`open`, `onOpenChange`…) |
| `DropdownMenuSubTrigger` | `openOnHover` (padrão `true`), `delay`; ícone `CaretRightIcon` |
| `DropdownMenuSubContent` | `side` `"right"`, `alignOffset` `-3` por padrão |

- Indicador de checkbox/radio **à direita** (`pr-8`, `CheckIcon`).
- Estado: `data-open`/`data-popup-open` (trigger), `data-checked`, `data-highlighted`, `data-disabled`. `data-[state=open]:` não casa mais.
- Visual base-mira: `text-xs`, `min-h-7`, `rounded-lg`, `ring-1` no lugar de borda, menu translúcido (`bg-popover/70` + blur), separador `bg-border/50`.

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import { DotsThreeIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import Link from "next/link";
import * as React from "react";

export function AcoesContrato() {
  const [mostrarArquivados, setMostrarArquivados] = React.useState(false);
  const [ordem, setOrdem] = React.useState<string>("recentes");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Ações" />}>
        <DotsThreeIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Contrato</DropdownMenuLabel>
          <DropdownMenuItem render={<Link href="/contratos/42/editar" />}>
            <PencilSimpleIcon />
            Editar
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => duplicar()}>Duplicar</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Exportar</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>PDF</DropdownMenuItem>
              <DropdownMenuItem>Planilha</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem
            checked={mostrarArquivados}
            onCheckedChange={setMostrarArquivados}
          >
            Mostrar arquivados
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Ordenar</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={ordem} onValueChange={(v: string) => setOrdem(v)}>
            <DropdownMenuRadioItem value="recentes">Mais recentes</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="valor">Maior valor</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={() => setConfirmarExclusao(true)}>
            <TrashIcon />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## v2.x — Radix

Primitiva: `@radix-ui/react-dropdown-menu`.

| Componente | Props relevantes |
|---|---|
| `DropdownMenu` | `open`, `defaultOpen`, `onOpenChange(open)`, `modal` (padrão `true`; use `false` ao abrir Dialog a partir de um item) |
| `DropdownMenuTrigger` | `asChild` (com `Button` dentro) |
| `DropdownMenuContent` | `sideOffset` (padrão `4`), `align` (padrão do Radix `"center"`), `side`, `alignOffset`, `avoidCollisions`, `collisionPadding`, `loop`, `onCloseAutoFocus`, `forceMount`. Largura pelo conteúdo (`min-w-[8rem]`) |
| `DropdownMenuItem` | `onSelect(event)` (`event.preventDefault()` mantém aberto), `disabled`, `textValue`, `asChild`, `variant`, `inset` |
| `DropdownMenuCheckboxItem` | `checked` (`boolean \| "indeterminate"`), `onCheckedChange(checked)` |
| `DropdownMenuRadioGroup` | `value`, `onValueChange(value: string)` |
| `DropdownMenuRadioItem` | `value` (obrigatório) |
| `DropdownMenuLabel` | Pode ficar solto; `inset` |
| `DropdownMenuSubTrigger` / `DropdownMenuSubContent` | `inset` / props do Radix SubContent |

- Indicador de checkbox (`Check`) e radio (`Circle` preenchido) **à esquerda** (`pl-8`).
- Estado: `data-state="open" | "checked"`, `data-highlighted`. Densidade `text-sm`.

```tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { DotsThree, PencilSimple, Trash } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"

export function AcoesContrato() {
  const [mostrarArquivados, setMostrarArquivados] = React.useState(false)
  const [ordem, setOrdem] = React.useState("recentes")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Ações">
          <DotsThree />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Contrato</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/contratos/42/editar">
              <PencilSimple />
              Editar
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => duplicar()}>Duplicar</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Exportar</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>PDF</DropdownMenuItem>
              <DropdownMenuItem>Planilha</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={mostrarArquivados}
          onCheckedChange={(v) => setMostrarArquivados(v === true)}
        >
          Mostrar arquivados
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Ordenar</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={ordem} onValueChange={setOrdem}>
          <DropdownMenuRadioItem value="recentes">Mais recentes</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="valor">Maior valor</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={() => setConfirmarExclusao(true)}>
          <Trash />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Exemplos na docs

`dropdown-menu-demo`, `dropdown-menu-checkboxes`, `dropdown-menu-radio-group`, `dropdown-menu-icons`, `dropdown-menu-destructive` (v3).
