# Drawer

Import: `@blips/ui/components/drawer`

Painel que desliza de uma borda, com gesto de arrastar para fechar. Bom para
mobile; no desktop prefira Dialog ou Sheet (padrão responsivo abaixo).

Exports comuns: `Drawer`, `DrawerTrigger`, `DrawerPortal`, `DrawerOverlay`,
`DrawerClose`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`,
`DrawerDescription`. Só na v3: `DrawerSwipeHandle`.

## Notas comuns

- `DrawerContent` já renderiza Portal + Overlay.
- Sempre inclua `DrawerTitle`.
- Padrão responsivo: `useMediaQuery("(min-width: 768px)")` → Dialog no desktop, Drawer no mobile, com o mesmo formulário dentro.
- Conteúdo longo: área rolável própria (`flex-1 overflow-y-auto`) entre header e footer.

> A API difere bastante entre as versões (vaul vs Base UI: direção, alça, estrutura do DOM). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Primitiva: `@base-ui/react/drawer`.

| Componente | Props relevantes |
|---|---|
| `Drawer` | `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `swipeDirection` (`"down" \| "up" \| "left" \| "right"`, padrão `"down"`), `modal` (`true \| false \| "trap-focus"`, padrão `true`), `showSwipeHandle` (prop da lib, padrão `false`), `snapPoints`, `snapPoint`/`defaultSnapPoint`/`onSnapPointChange`, `snapToSequentialPoints`, `disablePointerDismissal` |
| `DrawerTrigger` / `DrawerClose` | `render`, `nativeButton` |
| `DrawerContent` | `className` vai para o **Popup** (`data-slot="drawer-popup"`); os filhos ficam num wrapper interno `data-slot="drawer-content"` |
| `DrawerSwipeHandle` | Alça de arraste manual (quando não usar `showSwipeHandle`) |
| `DrawerHeader` | `flex flex-col gap-1 p-4 pb-0` |
| `DrawerFooter` | `mt-auto flex flex-col gap-2 p-4 pt-0` |
| `DrawerTitle` / `DrawerDescription` | `text-sm font-medium` / `text-xs/relaxed text-balance` |

- `DrawerContent` precisa estar dentro do `<Drawer>` da lib (usa contexto interno; fora dele lança "useDrawer precisa ser usado dentro de um <Drawer>.").
- A alça **não aparece por padrão**: `<Drawer showSwipeHandle>`.
- Sem overlay quando `modal` não é `true`.
- Seletores: `data-[swipe-direction=*]`, `data-[swipe-axis=x|y]`, grupo `group/drawer-popup` (ex.: `group-data-[swipe-axis=y]/drawer-popup:h-80`). Os seletores `data-[vaul-drawer-direction=*]` não existem mais.
- Aninhamento é automático (drawers empilham).
- Visual base-mira: painel flutuante com inset (`m-(--drawer-inset)`), `rounded-xl` em todos os cantos, `bg-popover`, `text-xs/relaxed`; altura máxima no eixo y `100dvh-6rem`.

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@blips/ui/components/drawer";

export function MetaDiaria() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>Definir meta</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Meta diária</DrawerTitle>
            <DrawerDescription>Defina a sua meta diária de atividade.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">{/* conteúdo */}</div>
          <DrawerFooter>
            <Button>Salvar</Button>
            <DrawerClose render={<Button variant="outline" />}>Cancelar</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Lateral, pela direita
<Drawer swipeDirection="right">
  <DrawerTrigger render={<Button variant="outline" />}>Filtros</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Filtros</DrawerTitle>
    </DrawerHeader>
    <div className="flex-1 overflow-y-auto p-4">{/* filtros */}</div>
    <DrawerFooter>
      <DrawerClose render={<Button />}>Aplicar</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

// Pontos de parada
<Drawer snapPoints={["31rem", 1]} showSwipeHandle>
  {/* … */}
</Drawer>
```

Responsivo (Dialog no desktop): mesmo padrão da v2 abaixo, trocando `asChild` por `render` nos triggers e o `DrawerClose` por `<DrawerClose render={<Button variant="outline" />}>Cancelar</DrawerClose>`.

## v2.x — Radix

Primitiva: **`vaul`** (`Drawer.Root` do vaul).

| Componente | Props relevantes |
|---|---|
| `Drawer` | `open`, `onOpenChange(open)`, `direction` (`"top" \| "bottom" \| "left" \| "right"`, padrão `"bottom"`), `shouldScaleBackground`, `setBackgroundColorOnScale`, `dismissible`, `handleOnly`, `snapPoints`, `activeSnapPoint`/`setActiveSnapPoint`, `fadeFromIndex`, `nested`, `modal` |
| `DrawerTrigger` / `DrawerClose` | `asChild` |
| `DrawerContent` | Painel; na direção `bottom` já mostra a alça (`h-2 w-[100px]`) automaticamente |
| `DrawerHeader` | `flex flex-col gap-0.5 p-4`; centralizado em `top`/`bottom` no mobile, à esquerda em `md:` |
| `DrawerFooter` | `mt-auto flex flex-col gap-2 p-4` |
| `DrawerTitle` / `DrawerDescription` | `font-semibold` / `text-sm text-muted-foreground` |

Seletores: `data-[vaul-drawer-direction=*]`, `group-data-[vaul-drawer-direction=*]/drawer-content`. Altura máxima em `top`/`bottom`: `80vh`.

```tsx
"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@blips/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@blips/ui/components/drawer"

export function EditarPerfilResponsivo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Editar perfil</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
            <DialogDescription>Altere os dados do seu perfil.</DialogDescription>
          </DialogHeader>
          <FormPerfil />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Editar perfil</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Editar perfil</DrawerTitle>
          <DrawerDescription>Altere os dados do seu perfil.</DrawerDescription>
        </DrawerHeader>
        <FormPerfil className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```

## Exemplos na docs

`drawer-demo`, `drawer-position`, `drawer-scrollable`, `drawer-snap-points`, `drawer-swipe-handle`, `drawer-non-modal` (v3).
