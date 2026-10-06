# Command

Import: `@blips/ui/components/command`

Menu de comandos com busca, sobre `cmdk` (nas duas versões). Base do padrão
combobox Popover + Command (ver `components/combobox.md`) e da paleta de comandos
(⌘K).

Exports (iguais nas duas versões): `Command`, `CommandDialog`, `CommandInput`,
`CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`,
`CommandSeparator`.

## Notas comuns

A API do cmdk é a mesma nas duas versões:

| Componente | Props relevantes (cmdk) |
|---|---|
| `Command` | `value`/`onValueChange` (item destacado), `filter(value, search, keywords) => number`, `shouldFilter` (passe `false` quando a busca é no servidor), `loop` |
| `CommandInput` | `placeholder`, `value`, `onValueChange` |
| `CommandList` | Lista rolável |
| `CommandEmpty` | Estado vazio — **sempre inclua** |
| `CommandGroup` | `heading` |
| `CommandItem` | `value`, `onSelect(value)`, `disabled`, `keywords`. Estado: `data-selected` (destacado), `data-disabled` |
| `CommandShortcut` | Atalho à direita (`span`) |

- Dados da API: `shouldFilter={false}` + estado da busca no `CommandInput` (`value`/`onValueChange`) com debounce.
- `CommandDialog` passa título/descrição sr-only ao Dialog: **sempre passe `title` e `description` em pt-BR** (os padrões são "Command Palette" / "Search for a command to run...").
- Ícones Phosphor nos itens.

> A API difere entre as versões (estrutura do `CommandDialog`, check automático, Popover do combobox). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

- **`CommandDialog` não envolve os filhos em `<Command>`**: coloque `<Command>` dentro dele. `children` é obrigatório. Usa o Dialog do Base UI: `open`, `defaultOpen`, `onOpenChange(open, eventDetails)`; `showCloseButton` padrão `false`; prop `className` vai para o `DialogContent` (posicionado em `top-1/3`).
- `CommandInput` vem dentro de `InputGroup` + `InputGroupAddon` (`data-slot="command-input-wrapper"`), com `MagnifyingGlassIcon`.
- `CommandItem` renderiza um **`CheckIcon` automático** à direita, visível quando o item tem `data-checked="true"` (escondido se houver `CommandShortcut`). Para marcar o selecionado num combobox, passe `data-checked={selecionado}` — não renderize um check próprio, senão aparecem dois.
- Item destacado: `data-selected:bg-muted`. Densidade base-mira: `text-xs/relaxed`, `min-h-7`, lista `max-h-72`.

```tsx
"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@blips/ui/components/command";
import { Kbd } from "@blips/ui/components/kbd";
import { CalendarBlankIcon, GearIcon, UserIcon } from "@phosphor-icons/react";
import * as React from "react";

export function PaletaComandos() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((atual) => !atual);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p className="text-xs text-muted-foreground">
        Pressione <Kbd>⌘K</Kbd>
      </p>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Paleta de comandos"
        description="Pesquise um comando para executar."
      >
        <Command>
          <CommandInput placeholder="Digite um comando ou pesquise..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Sugestões">
              <CommandItem>
                <CalendarBlankIcon />
                <span>Agenda</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Configurações">
              <CommandItem>
                <UserIcon />
                <span>Perfil</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <GearIcon />
                <span>Preferências</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
```

Combobox Popover + Command (o check vem do `data-checked`):

```tsx
"use client";

import { Button } from "@blips/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@blips/ui/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@blips/ui/components/popover";
import { CaretUpDownIcon } from "@phosphor-icons/react";
import * as React from "react";

const planos = [
  { value: "basico", label: "Básico" },
  { value: "pro", label: "Pro" },
];

export function ComboboxPlano() {
  const [open, setOpen] = React.useState(false);
  const [valor, setValor] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" role="combobox" aria-expanded={open} className="w-52 justify-between" />}
      >
        {planos.find((p) => p.value === valor)?.label ?? "Selecione o plano"}
        <CaretUpDownIcon data-icon="inline-end" className="opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Buscar plano..." />
          <CommandList>
            <CommandEmpty>Nenhum plano encontrado.</CommandEmpty>
            <CommandGroup>
              {planos.map((p) => (
                <CommandItem
                  key={p.value}
                  value={p.value}
                  data-checked={valor === p.value}
                  onSelect={(atual) => {
                    setValor(atual === valor ? "" : atual);
                    setOpen(false);
                  }}
                >
                  {p.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
```

Na v3 também existe o primitivo `Combobox` da lib (`references/combobox.md`), com input, chips e multi-seleção nativos.

## v2.x — Radix

- `CommandDialog` **já envolve os filhos em `<Command>`** (com classes de tamanho maior para a paleta): passe `CommandInput`/`CommandList` direto. Usa o Dialog do Radix: `open`, `onOpenChange(open)`; `showCloseButton` padrão `true`.
- `CommandInput` num wrapper `h-9 border-b px-3` com `MagnifyingGlass`.
- `CommandItem` **não** tem check automático: renderize o `Check` você mesmo (com `opacity-0`/`opacity-100`).
- Item destacado: `data-[selected=true]:bg-accent`. Densidade new-york: `text-sm`, lista `max-h-[300px]`.

```tsx
"use client"

import * as React from "react"
import { CalendarBlank, Gear, User } from "@phosphor-icons/react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@blips/ui/components/command"

export function PaletaComandos() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((atual) => !atual)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Paleta de comandos"
      description="Pesquise um comando para executar."
    >
      <CommandInput placeholder="Digite um comando ou pesquise..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Sugestões">
          <CommandItem>
            <CalendarBlank />
            <span>Agenda</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Configurações">
          <CommandItem>
            <User />
            <span>Perfil</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Gear />
            <span>Preferências</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
```

Combobox Popover + Command (check manual):

```tsx
"use client"

import * as React from "react"
import { CaretUpDown, Check } from "@phosphor-icons/react"
import { cn } from "@blips/ui/lib/utils"
import { Button } from "@blips/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@blips/ui/components/command"
import { Popover, PopoverContent, PopoverTrigger } from "@blips/ui/components/popover"

const planos = [
  { value: "basico", label: "Básico" },
  { value: "pro", label: "Pro" },
]

export function ComboboxPlano() {
  const [open, setOpen] = React.useState(false)
  const [valor, setValor] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-52 justify-between">
          {planos.find((p) => p.value === valor)?.label ?? "Selecione o plano"}
          <CaretUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Buscar plano..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum plano encontrado.</CommandEmpty>
            <CommandGroup>
              {planos.map((p) => (
                <CommandItem
                  key={p.value}
                  value={p.value}
                  onSelect={(atual) => {
                    setValor(atual === valor ? "" : atual)
                    setOpen(false)
                  }}
                >
                  {p.label}
                  <Check className={cn("ml-auto", valor === p.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

Variações do combobox na v2 (dentro de DropdownMenu com `DropdownMenuSub`, responsivo com Drawer no mobile): ver `components/combobox.md`.

## Exemplos na docs

`command-demo`, `command-dialog`, `command-dialog-demo` (v3).
