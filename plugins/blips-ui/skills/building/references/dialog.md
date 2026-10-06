# Dialog

Import: `@blips/ui/components/dialog`

Modal centralizado para ações rápidas e formulários curtos. Para confirmação
destrutiva use `AlertDialog`; para formulários longos ou detalhes, `Sheet`.

Exports (iguais nas duas versões): `Dialog`, `DialogTrigger`, `DialogPortal`,
`DialogOverlay`, `DialogClose`, `DialogContent`, `DialogHeader`, `DialogFooter`,
`DialogTitle`, `DialogDescription`.

## Notas comuns

- `DialogContent` já renderiza Portal + Overlay + botão de fechar (X Phosphor). `showCloseButton={false}` remove o X.
- `DialogFooter` aceita `showCloseButton` (padrão `false`): adiciona um botão "Close" `outline` — o texto é fixo em inglês; para pt-BR, escreva o seu `DialogClose`.
- O texto sr-only do X também é "Close".
- **Sempre** inclua `DialogTitle` (e de preferência `DialogDescription`). Se o título não deve aparecer, use `className="sr-only"`.
- Formulário em Dialog não precisa do wrapper `flex flex-1 flex-col overflow-hidden` (isso é do Sheet). Botão de submit fora do `<form>`: `form="id-do-form"` ou `formRef.current?.requestSubmit()`.
- Popover/Select/Combobox dentro do Dialog: Popover com `modal`.
- Não aninhe modais.
- Guia de composição: `components/dialog.md`.

> A API difere entre as versões (`render` vs `asChild`, props do Content, largura padrão). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Primitiva: `@base-ui/react/dialog`.

| Componente | Base | Props relevantes |
|---|---|---|
| `Dialog` | `Dialog.Root` | `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `modal` (`true \| false \| "trap-focus"`), `disablePointerDismissal`, `onOpenChangeComplete`, `actionsRef`, `handle` |
| `DialogTrigger` | `Dialog.Trigger` | `render`, `nativeButton`, `payload`. Estado: `data-popup-open` |
| `DialogClose` | `Dialog.Close` | `render`, `nativeButton` |
| `DialogPortal` | `Dialog.Portal` | `container`, `keepMounted` |
| `DialogOverlay` | `Dialog.Backdrop` | `bg-black/80 backdrop-blur-xs` |
| `DialogContent` | `Dialog.Popup` | `showCloseButton`, `initialFocus`, `finalFocus`. Sem `onEscapeKeyDown`/`onPointerDownOutside`/`onInteractOutside`/`onOpenAutoFocus`/`onCloseAutoFocus`/`forceMount` |
| `DialogHeader` | `div` | `flex flex-col gap-1` (alinhado à esquerda, sem `text-center`) |
| `DialogFooter` | `div` | `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end` |
| `DialogTitle` | `Dialog.Title` | `font-heading text-sm font-medium` |
| `DialogDescription` | `Dialog.Description` | `text-xs/relaxed text-muted-foreground` |

Visual base-mira: `p-4`, `gap-4`, `rounded-xl`, `ring-1 ring-foreground/10`, `bg-popover`, `text-xs/relaxed`, **largura padrão `sm:max-w-sm`** (era `sm:max-w-lg`). X em `top-2 right-2` (Button `ghost` `icon-sm`). Estado: `data-open`/`data-closed`.

Impedir fechar por clique fora: `<Dialog disablePointerDismissal>`. Impedir por Esc ou outro motivo: no `onOpenChange`, checar `eventDetails.reason` e chamar `eventDetails.cancel()`.

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog";
import { Field, FieldGroup, FieldLabel } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import * as React from "react";

export function EditarPerfil() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>Editar perfil</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          id="form-perfil"
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
          className="grid gap-4"
        >
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
            <DialogDescription>
              Altere os dados do seu perfil. Clique em salvar ao terminar.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="nome">Nome</FieldLabel>
              <Input id="nome" defaultValue="Ana Souza" />
            </Field>
            <Field>
              <FieldLabel htmlFor="usuario">Usuário</FieldLabel>
              <Input id="usuario" defaultValue="@anasouza" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

Sem X e sem fechar ao clicar fora:

```tsx
<Dialog disablePointerDismissal>
  <DialogTrigger render={<Button />}>Abrir</DialogTrigger>
  <DialogContent showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Importando planilha</DialogTitle>
      <DialogDescription>Aguarde o fim do processamento.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Fechar</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## v2.x — Radix

Primitiva: `@radix-ui/react-dialog`.

| Componente | Base | Props relevantes |
|---|---|---|
| `Dialog` | Radix `Root` | `open`, `defaultOpen`, `onOpenChange(open)`, `modal` |
| `DialogTrigger` / `DialogClose` | Radix `Trigger` / `Close` | `asChild` |
| `DialogPortal` | Radix `Portal` | `container`, `forceMount` |
| `DialogOverlay` | Radix `Overlay` | `bg-black/50` |
| `DialogContent` | Radix `Content` | `showCloseButton`, `onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside`, `onOpenAutoFocus`, `onCloseAutoFocus`, `forceMount` |
| `DialogHeader` | `div` | `flex flex-col gap-2 text-center sm:text-left` |
| `DialogFooter` | `div` | `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end` |
| `DialogTitle` | Radix `Title` | `text-lg leading-none font-semibold` |
| `DialogDescription` | Radix `Description` | `text-sm text-muted-foreground` |

Visual new-york: `p-6`, `gap-4`, `rounded-lg border shadow-lg`, `bg-background`, **largura padrão `sm:max-w-lg`**. X em `top-4 right-4`. Estado: `data-state="open" | "closed"`. Larguras comuns: `sm:max-w-[425px]` (formulários), `sm:max-w-md` (compartilhar/info).

Impedir fechar por clique fora: `<DialogContent onPointerDownOutside={(e) => e.preventDefault()}>`; por Esc: `onEscapeKeyDown={(e) => e.preventDefault()}`.

```tsx
"use client"

import * as React from "react"
import { Button } from "@blips/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export function EditarPerfil() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setOpen(false)
          }}
          className="grid gap-4"
        >
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
            <DialogDescription>
              Altere os dados do seu perfil. Clique em salvar ao terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" defaultValue="Ana Souza" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="usuario">Usuário</Label>
              <Input id="usuario" defaultValue="@anasouza" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

Compartilhar link (botão de fechar no footer):

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Compartilhar</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Compartilhar link</DialogTitle>
      <DialogDescription>Quem tiver o link poderá ver o documento.</DialogDescription>
    </DialogHeader>
    <div className="flex items-center gap-2">
      <Label htmlFor="link" className="sr-only">Link</Label>
      <Input id="link" defaultValue="https://app.blips.com.br/d/42" readOnly />
    </div>
    <DialogFooter className="sm:justify-start">
      <DialogClose asChild>
        <Button type="button" variant="secondary">Fechar</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Abrir Dialog a partir de um item de DropdownMenu (v2): controle `open` no estado e chame `setOpen(true)` no `onSelect` do item, com `modal={false}` no `DropdownMenu`.

## Exemplos na docs

`dialog-demo`, `dialog-close-button`, `dialog-no-close-button`, `dialog-scrollable-content`, `dialog-sticky-footer` (v3).
