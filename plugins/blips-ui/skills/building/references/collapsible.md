# Collapsible

Import: `@blips/ui/components/collapsible`

Painel que abre e fecha a partir de um gatilho. Re-export fino da primitiva, **sem
estilo próprio** — o estilo vai no uso.

Exports (iguais nas duas versões): `Collapsible`, `CollapsibleTrigger`,
`CollapsibleContent`.

## Notas comuns

- Root: `open`, `defaultOpen`, `onOpenChange`, `disabled`.
- Usado na sidebar para seções de navegação recolhíveis (ver `components/sidebar/menu.md`).
- A lib não define keyframes de collapsible (só os de accordion): anime pela variável de altura da versão (abaixo).

> A API difere entre as versões (`render` vs `asChild`, atributos de estado, variável de altura). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Primitiva: `@base-ui/react/collapsible`.

| Componente | Base | Props / estado |
|---|---|---|
| `Collapsible` | `Collapsible.Root` | `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`, `disabled` |
| `CollapsibleTrigger` | `Collapsible.Trigger` | `render`, `nativeButton`. Estado: `data-panel-open` |
| `CollapsibleContent` | `Collapsible.Panel` | `keepMounted` (substitui `forceMount`), `hiddenUntilFound`. Estado: `data-open`/`data-closed`, `data-starting-style`/`data-ending-style`. Variáveis: `--collapsible-panel-height`, `--collapsible-panel-width` |

Seletores de grupo: `group-data-panel-open:` (no trigger) ou `group-data-open:`; não `group-data-[state=open]:`.

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { CaretUpDownIcon } from "@phosphor-icons/react";
import * as React from "react";

export function Repositorios() {
  const [aberto, setAberto] = React.useState(false);

  return (
    <Collapsible open={aberto} onOpenChange={setAberto} className="flex w-[350px] flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">@anasouza favoritou 3 repositórios</h4>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon" />}>
          <CaretUpDownIcon />
          <span className="sr-only">Alternar</span>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-xs">@base-ui/react</div>
      <CollapsibleContent className="flex h-(--collapsible-panel-height) flex-col gap-2 overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0">
        <div className="rounded-md border px-4 py-2 font-mono text-xs">@phosphor-icons/react</div>
        <div className="rounded-md border px-4 py-2 font-mono text-xs">@blips/ui</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

## v2.x — Radix

Primitiva: `@radix-ui/react-collapsible`.

| Componente | Base | Props / estado |
|---|---|---|
| `Collapsible` | Radix `Root` | `open`, `defaultOpen`, `onOpenChange(open)`, `disabled` |
| `CollapsibleTrigger` | Radix `CollapsibleTrigger` | `asChild`. Estado: `data-state="open" \| "closed"` |
| `CollapsibleContent` | Radix `CollapsibleContent` | `forceMount`. Estado: `data-state`. Variáveis: `--radix-collapsible-content-height`, `--radix-collapsible-content-width` |

```tsx
"use client"

import * as React from "react"
import { CaretUpDown } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible"

export function Repositorios() {
  const [aberto, setAberto] = React.useState(false)

  return (
    <Collapsible open={aberto} onOpenChange={setAberto} className="flex w-[350px] flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">@anasouza favoritou 3 repositórios</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <CaretUpDown />
            <span className="sr-only">Alternar</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

Para animar, crie keyframes no app usando `var(--radix-collapsible-content-height)` e aplique com `data-[state=open]:` / `data-[state=closed]:`.

## Exemplos na docs

`collapsible-demo`, `collapsible-file-tree`, `collapsible-settings` (v3).
