# Toggle

Import: `@blips/ui/components/toggle`

Botão de dois estados (ligado/desligado), ex.: negrito, favoritar, mostrar
filtros. Para várias opções relacionadas, use Toggle Group. Para preferência
persistente, Switch.

Exports (iguais nas duas versões): `Toggle`, `toggleVariants` (cva, reutilizável).

## Notas comuns

- `variant`: `"default"` (transparente) ou `"outline"` (borda).
- `size`: `"default"`, `"sm"`, `"lg"`.
- Estado: `pressed`, `defaultPressed`, `onPressedChange`, `disabled`.
- Toggle só com ícone precisa de `aria-label`.

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

Primitiva: `@base-ui/react/toggle`. Props: `TogglePrimitive.Props` + variantes.

| Prop | Tipo | Notas |
|---|---|---|
| `pressed` / `defaultPressed` | `boolean` | |
| `onPressedChange` | `(pressed: boolean, eventDetails) => void` | Ganhou o 2º argumento. |
| `value` | `string` | Identifica o item dentro de um `ToggleGroup`. |
| `render` | | Troca o elemento. Sem `asChild`. |

Tamanhos: default `h-7 min-w-7`, sm `h-6 text-[0.625rem]`, lg `h-8`; texto `text-xs`.
Ícone com texto: marque com `data-icon="inline-start"`/`"inline-end"`.

Estado ligado: `aria-pressed` / `data-pressed` (estilo `aria-pressed:bg-muted`).

```tsx
import { TextBIcon, BookmarkSimpleIcon } from "@phosphor-icons/react";
import * as React from "react";
import { Toggle } from "@blips/ui/components/toggle";

export function Toggles() {
  const [negrito, setNegrito] = React.useState(false);

  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Negrito" pressed={negrito} onPressedChange={setNegrito}>
        <TextBIcon />
      </Toggle>
      <Toggle variant="outline" size="sm">
        <BookmarkSimpleIcon data-icon="inline-start" />
        Favoritar
      </Toggle>
    </div>
  );
}
```

### Armadilhas

- `data-[state=on]:` em CSS ou testes: troque por `aria-pressed:` / `data-pressed:` (a lib ainda inclui `data-[state=on]:bg-muted` por compatibilidade, mas o Base UI não emite `data-state`).

## v2.x — Radix

Primitiva: `@radix-ui/react-toggle`. `pressed`, `defaultPressed`,
`onPressedChange(pressed)`, `asChild`. Tamanhos: default `h-9 min-w-9`, sm `h-8`,
lg `h-10`; texto `text-sm`; `outline` com `shadow-xs`.

Estado ligado: `data-state="on" | "off"` (estilo `data-[state=on]:bg-accent`).

```tsx
import { TextB, BookmarkSimple } from "@phosphor-icons/react"
import { Toggle } from "@blips/ui/components/toggle"

export function Toggles() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Negrito">
        <TextB />
      </Toggle>
      <Toggle variant="outline" size="sm">
        <BookmarkSimple />
        Favoritar
      </Toggle>
    </div>
  )
}
```

## Exemplos na docs

`toggle-demo`, `toggle-outline`, `toggle-with-text`, `toggle-icon`, `toggle-size`, `toggle-disabled` (em `apps/docs/examples/`, escritos para a v3).
