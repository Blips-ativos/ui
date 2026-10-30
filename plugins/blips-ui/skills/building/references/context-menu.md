# Context Menu

Import: `@blips/ui/components/context-menu`

Menu aberto com clique direito (ou toque longo) sobre uma área.

Exports (iguais nas duas versões): `ContextMenu`, `ContextMenuTrigger`,
`ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`,
`ContextMenuRadioItem`, `ContextMenuRadioGroup`, `ContextMenuLabel`,
`ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`,
`ContextMenuPortal`, `ContextMenuSub`, `ContextMenuSubTrigger`,
`ContextMenuSubContent`.

## Notas comuns

- `ContextMenuContent` já inclui o Portal: não envolva em `ContextMenuPortal`.
- `inset` (em Item, Label, SubTrigger, CheckboxItem/RadioItem na v3) adiciona padding para alinhar com itens que têm ícone/indicador.
- `ContextMenuItem` aceita `variant?: "default" | "destructive"`.
- `ContextMenuShortcut`: atalho à direita (só visual; o atalho em si é com você).
- Ícones Phosphor.
- Mesma família do DropdownMenu: as regras de item/estado de `references/dropdown-menu.md` valem aqui.

> A API difere entre as versões (`render` vs `asChild`, `onClick` vs `onSelect`, posição do indicador, `Label` dentro de `Group`). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Primitiva: `@base-ui/react/context-menu` (itens do Menu do Base UI).

| Componente | Props relevantes |
|---|---|
| `ContextMenu` | `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `disabled` |
| `ContextMenuTrigger` | `render` (padrão: `div`). Ganha `select-none` |
| `ContextMenuContent` | `align` (`"start"`), `alignOffset` (`4`), `side` (`"right"`), `sideOffset` (`0`) — repassados ao Positioner. Sem `avoidCollisions`/`collisionPadding`/`onCloseAutoFocus`/`forceMount` |
| `ContextMenuItem` | `onClick` (substitui `onSelect`), `closeOnClick` (padrão `true`; `false` mantém aberto), `disabled`, `label`, `variant`, `inset`, `render` |
| `ContextMenuCheckboxItem` | `checked`, `defaultChecked`, `onCheckedChange(checked, eventDetails)`, `closeOnClick` (padrão `false`), `inset`. Sem estado `"indeterminate"` |
| `ContextMenuRadioGroup` | `value`, `defaultValue`, `onValueChange(value, eventDetails)` |
| `ContextMenuRadioItem` | `value` (obrigatório), `closeOnClick` (padrão `false`), `inset` |
| `ContextMenuLabel` | É `GroupLabel`: **coloque dentro de `ContextMenuGroup`** |
| `ContextMenuSub` / `ContextMenuSubTrigger` | `SubmenuRoot` / `SubmenuTrigger` (`openOnHover`, `delay`) |
| `ContextMenuSubContent` | `side="right"` fixo. Já vem com classes de menu translúcido; um `className` seu **substitui** essas classes (vem depois no spread) — repita as que precisar |

Indicador de checkbox/radio fica **à direita** (`CheckIcon`, inclusive no radio). Estado: `data-open`, `data-checked`, `data-highlighted`, `data-disabled`. Densidade `text-xs`, `min-h-7`.

```tsx
"use client";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@blips/ui/components/context-menu";
import * as React from "react";

export function MenuArquivo() {
  const [mostrarOcultos, setMostrarOcultos] = React.useState(false);
  const [ordem, setOrdem] = React.useState("nome");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-lg border border-dashed text-sm">
        Clique com o botão direito aqui
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuGroup>
          <ContextMenuItem onClick={() => abrir()}>
            Abrir
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Compartilhar</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Copiar link</ContextMenuItem>
              <ContextMenuItem>Enviar por e-mail</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuCheckboxItem checked={mostrarOcultos} onCheckedChange={setMostrarOcultos}>
            Mostrar arquivos ocultos
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Ordenar por</ContextMenuLabel>
          <ContextMenuRadioGroup value={ordem} onValueChange={setOrdem}>
            <ContextMenuRadioItem value="nome">Nome</ContextMenuRadioItem>
            <ContextMenuRadioItem value="data">Data</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">Excluir</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## v2.x — Radix

Primitiva: `@radix-ui/react-context-menu`.

| Componente | Props relevantes |
|---|---|
| `ContextMenu` | `onOpenChange(open)`, `modal` |
| `ContextMenuTrigger` | `asChild`, `disabled` |
| `ContextMenuContent` | `alignOffset`, `avoidCollisions`, `collisionPadding`, `loop`, `onCloseAutoFocus`, `onEscapeKeyDown`, `forceMount` |
| `ContextMenuItem` | `onSelect(event)` (`event.preventDefault()` mantém aberto), `disabled`, `textValue`, `variant`, `inset`, `asChild` |
| `ContextMenuCheckboxItem` | `checked` (`boolean \| "indeterminate"`), `onCheckedChange(checked)`, `onSelect` |
| `ContextMenuRadioGroup` | `value`, `onValueChange(value)` |
| `ContextMenuRadioItem` | `value` (obrigatório) |
| `ContextMenuLabel` | Pode ficar solto; `inset` |
| `ContextMenuSubTrigger` / `ContextMenuSubContent` | `inset` / props do Radix SubContent |

Indicador de checkbox (`Check`) e radio (`Circle` preenchido) fica **à esquerda** (`pl-8`). Estado: `data-state="open" | "checked"`, `data-highlighted`. Densidade `text-sm`.

```tsx
"use client"

import * as React from "react"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@blips/ui/components/context-menu"

export function MenuArquivo() {
  const [mostrarOcultos, setMostrarOcultos] = React.useState(false)
  const [ordem, setOrdem] = React.useState("nome")

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Clique com o botão direito aqui
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onSelect={() => abrir()}>
          Abrir
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Compartilhar</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Copiar link</ContextMenuItem>
            <ContextMenuItem>Enviar por e-mail</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={mostrarOcultos} onCheckedChange={(v) => setMostrarOcultos(v === true)}>
          Mostrar arquivos ocultos
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={ordem} onValueChange={setOrdem}>
          <ContextMenuLabel inset>Ordenar por</ContextMenuLabel>
          <ContextMenuRadioItem value="nome">Nome</ContextMenuRadioItem>
          <ContextMenuRadioItem value="data">Data</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuItem inset variant="destructive">Excluir</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

## Exemplos na docs

`context-menu-demo`, `context-menu-icons` (v3).
