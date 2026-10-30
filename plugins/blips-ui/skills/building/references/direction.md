# Direction

Import: `@blips/ui/components/direction`

> **Só existe na v3.x.** Num repo em `@blips/ui` 2.x este import não existe: na v2
> a direção vem só do atributo `dir` no HTML (os primitivos Radix leem o `dir` ou
> a prop `dir` de cada componente).

Provider de direção de leitura (LTR/RTL) para os componentes Base UI. Re-export
literal de `@base-ui/react/direction-provider`.

## v3.x — Base UI

Exports: `DirectionProvider`, `useDirection`.

| Export | Descrição |
|---|---|
| `DirectionProvider` | Prop `direction?: "ltr" \| "rtl"`. Componentes Base UI dentro dele (Slider, Menu, Tabs, navegação por teclado, posicionamento de popups) passam a se comportar na direção informada. |
| `useDirection()` | Retorna a direção atual (`"ltr" \| "rtl"`) do provider mais próximo. |

Regras:

- O provider **não** muda o layout CSS: ponha também `dir="rtl"` no elemento (ou no `<html>`) para o navegador inverter o fluxo e as utilidades `rtl:` do Tailwind funcionarem.
- A Blips é pt-BR (LTR): só use em telas que realmente precisam de RTL. Prefira utilitários lógicos (`ms-*`, `me-*`, `ps-*`, `start-*`) em vez de `ml-*`/`left-*` para o layout espelhar sozinho.
- Os ícones de seta/caret da lib **não** giram automaticamente em RTL (breadcrumb, paginação, carousel): gire por `className="rtl:rotate-180"` quando precisar.

```tsx
"use client";

import { DirectionProvider, useDirection } from "@blips/ui/components/direction";
import { Label } from "@blips/ui/components/label";
import { Slider } from "@blips/ui/components/slider";

function DirecaoAtual() {
  const direcao = useDirection();
  return <p className="text-xs text-muted-foreground">Direção: {direcao}</p>;
}

export function PainelRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex flex-col gap-3">
        <Label>Volume</Label>
        <Slider defaultValue={40} aria-label="Volume" />
        <DirecaoAtual />
      </div>
    </DirectionProvider>
  );
}
```

## Exemplos na docs

`direction-demo`.
