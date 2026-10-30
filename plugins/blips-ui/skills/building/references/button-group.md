# Button Group

Import: `@blips/ui/components/button-group`

Agrupa botões (e inputs/selects) emendando as bordas e arredondando só as pontas.

Exports (iguais nas duas versões): `ButtonGroup`, `ButtonGroupText`,
`ButtonGroupSeparator`, `buttonGroupVariants`.

## Notas comuns

| Componente | Descrição |
|---|---|
| `ButtonGroup` | `div` `role="group"`, `data-slot="button-group"`, `data-orientation`. Prop `orientation?: "horizontal" \| "vertical"` (padrão `horizontal`). |
| `ButtonGroupText` | Texto estático com visual de grupo (prefixo de URL, rótulo). |
| `ButtonGroupSeparator` | `Separator` da lib, `orientation` padrão `"vertical"`, `bg-input`. Use entre botões `secondary`/sem borda (botão "split"). |

- `ButtonGroup` aninhado em outro cria `gap-2` entre os subgrupos, mantendo as bordas emendadas dentro de cada um (padrão toolbar).
- Trata `input` (ganha `flex-1`) e `SelectTrigger` (largura `w-fit` se não tiver `w-*`) como filhos.
- Ícones Phosphor; botão só de ícone precisa de `aria-label`.

> A API difere entre as versões (`render` vs `asChild` no `ButtonGroupText`; emenda por `data-slot`). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

- `ButtonGroupText`: `useRender` + `mergeProps` (`useRender.ComponentProps<"div">`), troca de elemento com `render`. Emite `data-slot="button-group-text"`. Visual `px-2.5 text-xs/relaxed`, sem sombra.
- Emenda e arredondamento miram filhos **com `data-slot`** (`*:data-slot:rounded-r-none`, `[data-slot]~[data-slot]`). Um filho próprio sem `data-slot` não entra na emenda — dê um `data-slot` a ele se precisar.
- `ButtonGroupSeparator`: o Separator do Base UI usa `data-horizontal:`/`data-vertical:` (não `data-[orientation=…]`).
- Dropdown dentro do grupo: `DropdownMenuTrigger render={<Button … />}`.

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@blips/ui/components/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import { Input } from "@blips/ui/components/input";
import { Label } from "@blips/ui/components/label";
import { ArrowLeftIcon, DotsThreeIcon, PlusIcon } from "@phosphor-icons/react";

export function Toolbar() {
  return (
    <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="outline" size="icon" aria-label="Voltar">
          <ArrowLeftIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Arquivar</Button>
        <Button variant="outline">Denunciar</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Adiar</Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" size="icon" aria-label="Mais opções" />}
          >
            <DotsThreeIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuItem>Marcar como lida</DropdownMenuItem>
              <DropdownMenuItem>Arquivar</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  );
}

export function Variacoes() {
  return (
    <div className="flex flex-col gap-4">
      {/* Split */}
      <ButtonGroup>
        <Button variant="secondary">Novo contrato</Button>
        <ButtonGroupSeparator />
        <Button size="icon" variant="secondary" aria-label="Adicionar">
          <PlusIcon />
        </Button>
      </ButtonGroup>

      {/* Texto + input */}
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <Input placeholder="blips.com.br" />
        <Button variant="outline">Abrir</Button>
      </ButtonGroup>

      {/* Texto renderizado como Label */}
      <ButtonGroup>
        <ButtonGroupText render={<Label htmlFor="usuario" />}>Usuário</ButtonGroupText>
        <Input id="usuario" placeholder="Digite o usuário" />
      </ButtonGroup>

      {/* Vertical */}
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Topo</Button>
        <Button variant="outline">Meio</Button>
        <Button variant="outline">Base</Button>
      </ButtonGroup>
    </div>
  );
}
```

## v2.x — Radix

- `ButtonGroupText`: `asChild` (`Slot` de `@radix-ui/react-slot`). Sem `data-slot`. Visual `px-4 text-sm shadow-xs`.
- Emenda por posição (`:first-child`/`:last-child`): todo filho entra na emenda.
- `ButtonGroupSeparator`: `!m-0 self-stretch`, `data-[orientation=vertical]:h-auto`.
- Dropdown dentro do grupo: `DropdownMenuTrigger asChild` + `Button`.

```tsx
"use client"

import { ArrowLeft, DotsThree, Plus } from "@phosphor-icons/react"
import { Button } from "@blips/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@blips/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"

export function Toolbar() {
  return (
    <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="outline" size="icon" aria-label="Voltar">
          <ArrowLeft />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Arquivar</Button>
        <Button variant="outline">Denunciar</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Adiar</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Mais opções">
              <DotsThree />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem>Marcar como lida</DropdownMenuItem>
            <DropdownMenuItem>Arquivar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}

export function Variacoes() {
  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <Button variant="secondary">Novo contrato</Button>
        <ButtonGroupSeparator />
        <Button size="icon" variant="secondary" aria-label="Adicionar">
          <Plus />
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <Input placeholder="blips.com.br" />
        <Button variant="outline">Abrir</Button>
      </ButtonGroup>

      <ButtonGroup>
        <ButtonGroupText asChild>
          <Label htmlFor="usuario">Usuário</Label>
        </ButtonGroupText>
        <Input id="usuario" placeholder="Digite o usuário" />
      </ButtonGroup>

      <ButtonGroup orientation="vertical">
        <Button variant="outline">Topo</Button>
        <Button variant="outline">Meio</Button>
        <Button variant="outline">Base</Button>
      </ButtonGroup>
    </div>
  )
}
```

## Exemplos na docs

`button-group-demo`, `button-group-nested`, `button-group-size`, `button-group-separator`, `button-group-split`, `button-group-input`, `button-group-input-group`, `button-group-dropdown`, `button-group-select`, `button-group-popover`, `button-group-orientation`, `button-group-pagination`, `button-group-text` (v3).
