# @blips/ui v2.x (Radix) vs v3.x (Base UI)

Arquivo central das diferenças **transversais** entre as duas linhas da lib. Cada
`references/<componente>.md` traz as diferenças específicas do componente em duas
seções irmãs: `## v3.x — Base UI` e `## v2.x — Radix`.

## Qual trilha seguir

Leia a versão da `@blips/ui` no repositório consumidor **antes** de escrever código:

1. `package.json` → `dependencies["@blips/ui"]` (ou `devDependencies`); ou
2. `node_modules/@blips/ui/package.json` → `version` (vale quando o `package.json`
   usa `workspace:*`, `latest` ou um range ambíguo).

| Versão instalada | Trilha | Primitivas |
|---|---|---|
| `2.x` | **v2.x — Radix** | `@radix-ui/react-*`, `vaul`, recharts 2 |
| `3.x` | **v3.x — Base UI** | `@base-ui/react`, estilo shadcn base-mira, recharts 3 |
| não instalada (instalação nova) | **v3.x — Base UI** | — |

Nunca misture: instrução v3 (ex.: `render`, `multiple`, `data-open`) num repo v2
não compila ou falha em silêncio, e o contrário também.

Nas duas versões os imports são por subpath (`@blips/ui/components/<x>`) e os
ícones são Phosphor (`@phosphor-icons/react`), nunca `lucide-react`.

## Tabela de diferenças transversais

| Tema | v2.x — Radix | v3.x — Base UI |
|---|---|---|
| Trocar o elemento renderizado | `asChild` + filho único (`Slot` do Radix) | prop `render` (`render={<Link href="/x" />}` ou `render={(props, state) => …}`) |
| Componente próprio com troca de elemento | `Slot` de `@radix-ui/react-slot` | `useRender` + `mergeProps` de `@base-ui/react` (ver abaixo) |
| Botão que renderiza outro elemento | `<Button asChild><Link …/></Button>` | `<Button nativeButton={false} render={<Link …/>}>` — sem `nativeButton={false}` o Base UI aplica semântica de `<button>` e avisa no console |
| Trigger com aparência de Button | `<DialogTrigger asChild><Button>…</Button></DialogTrigger>` | `<DialogTrigger render={<Button />}>…</DialogTrigger>` — o trigger já é o botão; não aninhe `<Button>` dentro dele |
| Atributos de estado | `data-state="open" \| "closed" \| "checked" \| "unchecked" \| "indeterminate" \| "active"` | atributos booleanos: `data-open`, `data-closed`, `data-checked`, `data-unchecked`, `data-indeterminate`, `data-popup-open` (trigger), `data-panel-open` (trigger de accordion/collapsible), `data-starting-style`/`data-ending-style` (animação) |
| Seletores Tailwind de estado | `data-[state=open]:…`, `group-data-[state=open]:…` | `data-open:…`, `group-data-open:…`, `data-checked:…`, `has-data-checked:…`. `data-[state=open]:` **não casa** com elementos Base UI |
| Orientação | `data-[orientation=vertical]:…` | `data-vertical:` / `data-horizontal:` (variantes customizadas da lib, que casam `data-orientation`) |
| Altura animada | `--radix-accordion-content-height`, `--radix-collapsible-content-height` | `--accordion-panel-height`, `--collapsible-panel-height` |
| `onOpenChange` / `onValueChange` / `onCheckedChange` | `(valor) => void` | `(valor, eventDetails) => void` — `setState` direto continua funcionando |
| Manter montado fechado | `forceMount` | `keepMounted` (em Panel/Portal) |
| Foco ao abrir/fechar | `onOpenAutoFocus`, `onCloseAutoFocus` | `initialFocus`, `finalFocus` no Popup |
| Dismiss | `onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside` | controle no Root: `disablePointerDismissal` (Dialog/Sheet) ou `onOpenChange(open, eventDetails)` checando `eventDetails.reason` (`"escape-key"`, `"outside-press"`…) e chamando `eventDetails.cancel()` |
| Itens de menu | `onSelect`; `event.preventDefault()` mantém aberto | `onClick`; `closeOnClick={false}` mantém aberto |
| Label de menu | `DropdownMenuLabel` solto | `DropdownMenuLabel` dentro de `DropdownMenuGroup` |
| Posicionamento de popups | props no Content (`align` default `"center"`, `avoidCollisions`, `collisionPadding`) | `align`/`alignOffset`/`side`/`sideOffset` no Content, repassadas ao Positioner (menus: `align` default `"start"`); sem `avoidCollisions`/`collisionPadding` |
| Tooltip | `TooltipProvider delayDuration={…}` | `TooltipProvider delay={…}` (também `closeDelay`, `timeout`) |
| Separator | `decorative` (default `true`, sem papel de acessibilidade) | não existe `decorative`: sempre `role="separator"` com `aria-orientation` |
| Checkbox misto | `checked="indeterminate"` | `checked` só boolean + prop `indeterminate` |
| Accordion | `type="single" \| "multiple"`, `collapsible`, `value` string | `multiple` (boolean), `value`/`defaultValue` **sempre array**; item sempre fecha ao clicar de novo |
| AlertDialogAction | fecha o diálogo sozinho | **não fecha**: é um `Button` comum — feche no `onClick` (estado controlado) |
| Drawer | `vaul` (`direction="bottom"`, alça sempre visível) | Drawer do Base UI (`swipeDirection="down"`, alça opt-in com `showSwipeHandle`) |
| Gráficos | recharts **2** (2.15.x) | recharts **3** (3.10.x) — tipos de Tooltip/Legend e APIs removidas mudam |
| Ícones Phosphor | nomes sem sufixo: `CaretDown`, `Check`, `X` | nomes com sufixo `Icon`: `CaretDownIcon`, `CheckIcon`, `XIcon` (os sem sufixo estão `@deprecated` no Phosphor 2.1.10) |
| Densidade | new-york: `text-sm`, Button `h-9`, Card `p-6`, Dialog `p-6` / `sm:max-w-lg` | base-mira compacto: `text-xs/relaxed`, Button `h-7`, Card `--card-spacing` 16px, Dialog `p-4` / `sm:max-w-sm` |
| Bordas/sombras | `border` + `shadow-*` | `ring-1 ring-foreground/10`, menos sombra |
| Padding de ícone em Button/Badge | Button: automático (`has-[>svg]:px-*`); Badge: padding fixo `px-2` | marque o ícone com `data-icon="inline-start"` ou `data-icon="inline-end"` |
| `data-variant`/`data-size` no Button | presentes | removidos (`data-slot="button"` continua) |
| `type` padrão do Button | o do HTML (`submit` dentro de `<form>`) | `type="button"` (definido pelo Base UI) — botão de envio precisa de `type="submit"` explícito |

## Componentes que só existem na v3.x

Em repo v2 eles não existem: não importe, monte com as peças da v2 ou proponha a
migração.

| Componente | Reference |
|---|---|
| Attachment | `references/attachment.md` |
| Bubble | `references/bubble.md` |
| Combobox (primitivo, não o padrão Popover + Command) | `references/combobox.md` |
| Direction (`DirectionProvider`) | `references/direction.md` |
| Item | `references/item.md` |
| Marker | `references/marker.md` |
| Message | `references/message.md` |
| MessageScroller | `references/message-scroller.md` |
| NativeSelect | `references/native-select.md` |
| Questionnaire | `references/questionnaire.md` |
| Toast | `references/toast.md` |

Exports novos em componentes que já existiam: `AlertAction` (alert),
`DrawerSwipeHandle` (drawer), `useCarousel` (carousel), prop `size` no `Card`,
prop `initialDimension` no `ChartContainer`.

## `render` na v3: padrões

```tsx
import { Button } from "@blips/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@blips/ui/components/dialog";
import Link from "next/link";

// Trigger com aparência de Button: o próprio trigger vira o Button
<DialogTrigger render={<Button variant="outline" />}>Abrir</DialogTrigger>

// Botão que é link: nativeButton={false}
<Button nativeButton={false} render={<Link href="/clientes" />}>
  Clientes
</Button>

// Render como função, quando precisa do estado
<DialogClose render={(props) => <Button {...props} variant="ghost" />}>
  Fechar
</DialogClose>
```

Componente próprio que aceita `render` (substitui o `Slot` da v2). O `@base-ui/react` vem como dependência da `@blips/ui`, mas com pnpm (sem hoisting) o app precisa declará-lo nas próprias `dependencies` para importar `merge-props`/`use-render` direto:

```tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@blips/ui/lib/utils";

function Chip({ className, render, ...props }: useRender.ComponentProps<"span">) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      { className: cn("rounded-full bg-muted px-2 text-xs", className) },
      props
    ),
    state: { slot: "chip" }, // vira data-slot="chip"
  });
}
```

## Armadilhas que falham em silêncio na migração v2 → v3

1. `AlertDialogAction` deixou de fechar o diálogo (sem erro de tipo).
2. `data-[state=open]:` em `className` de consumidor para de casar.
3. `Accordion defaultValue="item-1"` (string) não abre nada: precisa ser `["item-1"]`.
4. `DropdownMenuItem onSelect` não dispara mais: use `onClick`.
5. `<Button asChild>` vira prop desconhecida; `<Button render={<a/>}>` sem
   `nativeButton={false}` gera aviso e semântica errada.
6. Telas desenhadas para a densidade da v2 ficam apertadas/menores (Dialog
   `sm:max-w-sm`, Card 16px): ajuste por `className` em vez de brigar com o tema.
