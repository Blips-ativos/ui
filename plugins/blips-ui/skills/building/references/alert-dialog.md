# Alert Dialog

Import: `@blips/ui/components/alert-dialog`

Modal de confirmação que interrompe o usuário e exige resposta. Use para ações
destrutivas ou irreversíveis. Não fecha ao clicar fora.

Exports (iguais nas duas versões): `AlertDialog`, `AlertDialogTrigger`,
`AlertDialogPortal`, `AlertDialogOverlay`, `AlertDialogContent`,
`AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogMedia`, `AlertDialogTitle`,
`AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`.

## Notas comuns

- `AlertDialogContent` já renderiza Portal + Overlay.
- `AlertDialogContent` aceita `size?: "default" | "sm"` (`data-size`). Em `sm`, o footer vira grid de 2 colunas.
- `AlertDialogMedia` é um slot para ícone no header (o header se reorganiza com `has-data-[slot=alert-dialog-media]`).
- `AlertDialogAction` aceita `variant` e `size` do Button — use `variant="destructive"` na confirmação destrutiva. `AlertDialogCancel` usa `variant="outline"` por padrão.
- Sempre inclua `AlertDialogTitle` (acessibilidade).

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Primitiva: `@base-ui/react/alert-dialog`.

> **Mudança de comportamento:** `AlertDialogAction` é um `Button` comum e **não fecha o diálogo**. Controle `open`/`onOpenChange` e feche no `onClick` (inclusive depois de uma ação assíncrona). Não há erro de tipo se você esquecer — o botão simplesmente não fecha.

### Sub-componentes e props

| Componente | Base | Props relevantes |
|---|---|---|
| `AlertDialog` | `AlertDialog.Root` | `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `onOpenChangeComplete(open)`, `actionsRef`, `handle` |
| `AlertDialogTrigger` | `AlertDialog.Trigger` | `render`, `nativeButton`, `payload`, `handle`. Estado: `data-popup-open` |
| `AlertDialogPortal` | `AlertDialog.Portal` | `container`, `keepMounted` |
| `AlertDialogOverlay` | `AlertDialog.Backdrop` | `bg-black/80` + `backdrop-blur-xs` |
| `AlertDialogContent` | `AlertDialog.Popup` | `size`, `initialFocus`, `finalFocus`. `p-4 gap-3 rounded-xl ring-1 ring-foreground/10`; largura `max-w-xs sm:max-w-sm` (default) ou `max-w-64` (sm) |
| `AlertDialogMedia` | `div` | `size-8`, svg `size-4` |
| `AlertDialogTitle` | `AlertDialog.Title` | `font-heading text-sm font-medium` |
| `AlertDialogDescription` | `AlertDialog.Description` | `text-xs/relaxed text-balance` |
| `AlertDialogAction` | `Button` | todas as props do Button (`variant`, `size`, `render`, `onClick`…). **Não fecha.** |
| `AlertDialogCancel` | `AlertDialog.Close` com `render={<Button />}` | `variant` (default `"outline"`), `size`. Fecha o diálogo |

Não existem mais `onEscapeKeyDown`, `onOpenAutoFocus`, `onCloseAutoFocus` nem `forceMount`. Estado do Popup/Backdrop: `data-open`/`data-closed`.

### Exemplos

```tsx
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@blips/ui/components/alert-dialog";
import { Button } from "@blips/ui/components/button";
import * as React from "react";

export function ConfirmarExclusao() {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Excluir conta
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. A conta e os dados serão removidos
            dos nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => setOpen(false)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

Destrutivo, com mídia, tamanho `sm` e ação assíncrona:

```tsx
import { TrashIcon } from "@phosphor-icons/react";

const [open, setOpen] = React.useState(false);
const [excluindo, setExcluindo] = React.useState(false);

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger render={<Button variant="destructive" />}>
    Excluir conversa
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20">
        <TrashIcon />
      </AlertDialogMedia>
      <AlertDialogTitle>Excluir conversa?</AlertDialogTitle>
      <AlertDialogDescription>
        A conversa será excluída permanentemente.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel variant="ghost">Cancelar</AlertDialogCancel>
      <AlertDialogAction
        variant="destructive"
        disabled={excluindo}
        onClick={async () => {
          setExcluindo(true);
          await excluirConversa();
          setExcluindo(false);
          setOpen(false);
        }}
      >
        Excluir
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

Alternativa sem estado controlado: um botão que fecha, via a primitiva crua —
`<AlertDialogPrimitive.Close render={<Button variant="destructive" />}>` (importando
`AlertDialog as AlertDialogPrimitive` de `@base-ui/react/alert-dialog`).

## v2.x — Radix

Primitiva: `@radix-ui/react-alert-dialog`.

### Sub-componentes e props

| Componente | Base | Props relevantes |
|---|---|---|
| `AlertDialog` | Radix `Root` | `open`, `defaultOpen`, `onOpenChange(open)` |
| `AlertDialogTrigger` | Radix `Trigger` | `asChild` |
| `AlertDialogPortal` | Radix `Portal` | `container`, `forceMount` |
| `AlertDialogOverlay` | Radix `Overlay` | `bg-black/50` |
| `AlertDialogContent` | Radix `Content` | `size`, `onEscapeKeyDown`, `onOpenAutoFocus`, `onCloseAutoFocus`, `forceMount`. `p-6 gap-4 rounded-lg border shadow-lg`; largura `sm:max-w-lg` (default) ou `max-w-xs` (sm) |
| `AlertDialogMedia` | `div` | `size-16`, svg `size-8` |
| `AlertDialogTitle` | Radix `Title` | `text-lg font-semibold` |
| `AlertDialogDescription` | Radix `Description` | `text-sm text-muted-foreground` |
| `AlertDialogAction` | Radix `Action` dentro de `Button asChild` | `variant` (default `"default"`), `size`. **Fecha o diálogo** ao clicar |
| `AlertDialogCancel` | Radix `Cancel` dentro de `Button asChild` | `variant` (default `"outline"`), `size`. Fecha |

Estado: `data-state="open" | "closed"`.

### Exemplos

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@blips/ui/components/alert-dialog"
import { Button } from "@blips/ui/components/button"

export function ConfirmarExclusao() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Excluir conta</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. A conta e os dados serão removidos
            dos nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

Destrutivo:

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Excluir conta</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Excluir conta?</AlertDialogTitle>
      <AlertDialogDescription>
        A conta e todos os dados associados serão excluídos.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Excluir</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

Controlado (útil para ação assíncrona: `event.preventDefault()` no `onClick` do Action impede o fechamento automático):

```tsx
const [open, setOpen] = useState(false)

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirmar ação</AlertDialogTitle>
      <AlertDialogDescription>Tem certeza?</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Não</AlertDialogCancel>
      <AlertDialogAction onClick={handleConfirm}>Sim</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Exemplos na docs

`alert-dialog-demo`, `alert-dialog-destructive`, `alert-dialog-media`, `alert-dialog-small` (v3).
