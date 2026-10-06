# Combobox (Popover + Command)

Padrão para criar selects com busca/filtro usando Popover + Command. Funciona nas duas
linhas da lib.

> **Versão da lib:** confira a versão da `@blips/ui` do repo (ver o "Passo 0" do
> `SKILL.md` do building e `references/v2-vs-v3.md`). `Command` (cmdk) tem a mesma API nas
> duas versões; o **trigger**, a **largura do popover** e o **check de seleção** mudam e
> estão em [v3.x — Base UI](#v3x--base-ui) e [v2.x — Radix](#v2x--radix).
>
> Na v3.x existe também o componente primitivo `Combobox` (`@blips/ui/components/combobox`,
> Base UI, com chips para multisseleção) — ver `references/combobox.md` (só existe na v3.x).
> Este guia continua válido nas duas versões para o padrão Popover + Command.

## Table of Contents

- [Quando Usar](#quando-usar)
- [Convenções de Placeholder](#convenções-de-placeholder)
- [Anatomia do Componente](#anatomia-do-componente)
- [Variações](#variações)
- [Diretrizes](#diretrizes)
- [Troubleshooting](#troubleshooting)
- [v3.x — Base UI](#v3x--base-ui)
- [v2.x — Radix](#v2x--radix)
- [Arquivos de Referência](#arquivos-de-referência)

## Quando Usar

- Select com muitas opções (10+)
- Necessidade de busca/filtro
- Dados carregados de API
- Seleção única com feedback visual

## Convenções de Placeholder

- **Formulários (seleção)**: `"Selecionar X..."` (ex: "Selecionar professor...")
- **Filtros (tabelas/listas)**: `"Todos os X"` (ex: "Todos os professores")

## Anatomia do Componente

### 1. Props Interface

```tsx
interface EntitySelectProps {
  value?: string                                    // Controlled value
  defaultValue?: string                             // Initial value (uncontrolled)
  onValueChange?: (value: string | undefined) => void  // Change handler
  placeholder?: string                              // Texto quando vazio
  title?: string                                    // Título do dropdown
  className?: string                                // Classes customizadas
}
```

### 2. Estado

```tsx
const [open, setOpen] = React.useState(false)
const [selectedValue, setSelectedValue] = React.useState<string | undefined>(defaultValue)

const value = valueProp ?? selectedValue  // Controlled/uncontrolled pattern
```

### 3. Popover Root

```tsx
<Popover open={open} onOpenChange={setOpen} modal>
```

- `open` e `onOpenChange` para controle de estado (`setOpen` direto funciona nas duas versões)
- Use `modal` (ver [Troubleshooting](#troubleshooting))

### 4. Trigger com ButtonGroup

- Trigger com aparência de `Button variant="outline"`, `font-normal`, `justify-start`, `truncate`
- `className` do consumidor aplicado no `ButtonGroup` com `cn('w-auto', className)`
- Button com `flex-1` para ocupar espaço disponível
- Valor selecionado com `font-semibold` para destaque
- O jeito de ligar o `Button` ao `PopoverTrigger` muda por versão (`render` na v3.x, `asChild`
  na v2.x)

### 5. PopoverContent

- `min-w-40` garante largura mínima
- `p-0` remove padding (Command tem seu próprio)
- `align="start"` alinha à esquerda
- Largura igual à do trigger: na v3.x use a CSS var `--anchor-width` (`w-(--anchor-width)`);
  na v2.x meça o trigger com `useLayoutEffect` e passe `style={{ width }}`

### 6. Command Structure

```tsx
<Command>
  {/* Header com título */}
  <div className="text-muted-foreground flex h-8 items-center border-b px-2 text-xs">
    {title}
  </div>

  {/* Input de busca */}
  <CommandInput placeholder="Filtrar por nome..." />

  {/* Lista de itens */}
  <CommandList className="max-h-50 overflow-y-auto">
    <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
    <CommandGroup>
      {/* Items */}
    </CommandGroup>
  </CommandList>
</Command>
```

### 7. CommandItem com Toggle

```tsx
<CommandItem
  value={item.label}
  key={item.id}
  onSelect={() => {
    if (isSelected) {
      setSelectedValue(undefined)
      onValueChange?.(undefined)
    } else {
      setSelectedValue(item.id)
      onValueChange?.(item.id)
    }
    setOpen(false)  // Fecha ao selecionar
  }}
>
  <span className="truncate">{item.label}</span>
  {/* indicador de seleção: muda por versão */}
</CommandItem>
```

- `onSelect` do `CommandItem` é do cmdk e é igual nas duas versões (não confundir com o
  `onSelect` do `DropdownMenuItem`, que virou `onClick` na v3.x)
- Toggle: clicar no item selecionado desmarca
- `setOpen(false)` fecha o popover após seleção
- Indicador de seleção: na v3.x o `CommandItem` já traz um `CheckIcon` que aparece com
  `data-checked={isSelected}`; na v2.x renderize o `<Check>` com `opacity` você mesmo

## Variações

### Com Avatar no Item

```tsx
import { Avatar, AvatarFallback } from '@blips/ui/components/avatar'

<CommandItem value={item.name} key={item.id} onSelect={...} data-checked={isSelected /* v3.x */}>
  <Avatar
    className={cn(
      'border-border h-5 w-5 border',
      isSelected && 'ring-primary ring-1 ring-offset-2 ring-offset-background'
    )}
  >
    <AvatarFallback>
      <span className="text-[10px]">{getShortName(item.name)}</span>
    </AvatarFallback>
  </Avatar>

  <span className="truncate" title={item.name}>
    {item.name}
  </span>

  {/* indicador de seleção conforme a versão */}
</CommandItem>
```

### Com Ícone no Item

```tsx
<CommandItem value={item.label} key={item.id} onSelect={...}>
  <Avatar className={cn('border-border h-5 w-5 border', isSelected && 'ring-primary ring-1 ring-offset-2 ring-offset-background')}>
    <AvatarFallback>
      <item.icon className={cn('size-3 text-muted-foreground', isSelected && 'text-primary')} />
    </AvatarFallback>
  </Avatar>

  <span className="truncate">{item.label}</span>
  {/* indicador de seleção */}
</CommandItem>
```

### Com Descrição

```tsx
<CommandItem value={item.label} key={item.id} onSelect={...}>
  <div className="flex flex-col">
    <span>{item.label}</span>
    <span className="text-xs text-muted-foreground">{item.description}</span>
  </div>
  {/* indicador de seleção */}
</CommandItem>
```

### Com Badge

```tsx
<CommandItem value={item.label} key={item.id} onSelect={...}>
  <div className="flex items-center gap-1.5">
    {item.label}
    <Badge variant="secondary" className="ml-1">{item.count}</Badge>
  </div>
  {/* indicador de seleção */}
</CommandItem>
```

### Com Grupos

```tsx
<CommandList>
  <CommandEmpty>Nenhum item encontrado.</CommandEmpty>

  <CommandGroup heading="Recentes">
    {recentItems.map((item) => (
      <CommandItem key={item.id} ...>{item.label}</CommandItem>
    ))}
  </CommandGroup>

  <CommandSeparator />

  <CommandGroup heading="Todos">
    {allItems.map((item) => (
      <CommandItem key={item.id} ...>{item.label}</CommandItem>
    ))}
  </CommandGroup>
</CommandList>
```

### Com Skeleton Loading (Server-side MagnifyingGlass)

Para busca server-side com debounce, mostre skeleton enquanto carrega:

```tsx
import { Skeleton } from '@blips/ui/components/skeleton'
import { useDebounce } from '@/hooks/use-debounce'

// No componente:
const [search, setSearch] = React.useState('')
const debouncedSearch = useDebounce(search)

const { data, isLoading } = api.entity.list.useQuery({
  q: debouncedSearch || undefined,
})

// No Command:
<Command shouldFilter={false}>  {/* Desabilita filtro client-side */}
  <CommandInput
    placeholder="Filtrar por nome..."
    value={search}
    onValueChange={setSearch}
  />
  <CommandList className="max-h-50 overflow-y-auto">
    {isLoading ? (
      <div className="p-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2 rounded-sm px-2 py-1.5">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
    ) : (
      <>
        <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
        <CommandGroup>
          {data?.items.map((item) => (
            <CommandItem key={item.id} ...>...</CommandItem>
          ))}
        </CommandGroup>
      </>
    )}
  </CommandList>
</Command>
```

- Use `shouldFilter={false}` no `Command` para busca server-side
- Skeleton circular para avatares, retangular para texto
- Mantenha mesmos espaçamentos dos `CommandItem` reais

## Diretrizes

### FAÇA

- Use `modal` no Popover (obrigatório para funcionar em Sheet/Dialog)
- Use `open/setOpen` para controle de estado
- Iguale a largura do popover ao trigger (`--anchor-width` na v3.x, `useLayoutEffect` na v2.x)
- Use `setOpen(false)` no `onSelect` para fechar ao selecionar
- Forneça `initialData` na query para evitar loading flash
- Use `truncate` no texto do trigger e items
- Mostre feedback visual de seleção (`data-checked` na v3.x, `<Check>` na v2.x)
- Use `value={item.label}` no CommandItem para busca
- Aplique `className` no `ButtonGroup`, não no `Button`
- Ícone dentro do Button: `data-icon="inline-start"` na v3.x, sem classe extra na v2.x
- Use `font-semibold` no valor selecionado para destaque
- Use `ring-1 ring-offset-2 ring-offset-background` para ring do avatar selecionado
- Use placeholder "Selecionar X..." para formulários
- Use placeholder "Todos os X" para filtros

### NÃO FAÇA

- Não esqueça o `modal` prop no Popover
- Não use `useEffect` para medições de layout (na v2.x; na v3.x nem meça)
- Não renderize `<Check>` próprio **e** `data-checked` na v3.x (aparecem dois)
- Não aninhe `<Button>` dentro do `PopoverTrigger` na v3.x: o trigger vira o Button via `render`
- Não esqueça o estado empty (`CommandEmpty`)
- Não use IDs como valor de busca (use label)
- Não remova o `min-w-40` do PopoverContent
- Não use `ButtonGroupText` - coloque o ícone dentro do Button
- Não use `ring-2` para avatar selecionado - use `ring-1`

## Troubleshooting

### Scroll não funciona dentro de Sheet/Dialog

**Problema**: O scroll do `CommandList` não funciona quando o combobox está dentro de um
Sheet ou Dialog.

**v2.x — Radix**: o Radix usa `RemoveScroll` para bloquear o scroll do fundo e não detecta
elementos em Portals separados. **Solução**: `modal` no `Popover` (obrigatório).

```tsx
<Popover open={open} onOpenChange={setOpen} modal>
```

Referências: [Radix #1159](https://github.com/radix-ui/primitives/issues/1159),
[Radix #2028](https://github.com/radix-ui/primitives/issues/2028).

**v3.x — Base UI**: o `RemoveScroll` não existe; o `modal` continua aceito
(`boolean | 'trap-focus'`, default `false`). Mantenha `modal` para o comportamento ficar
igual ao da v2.x (bloqueia interação fora enquanto aberto).

## Variantes Comuns

- Com Avatar e Skeleton (carregamento de lista assíncrona)
- Com ícone no Avatar
- Padrão simples (apenas label)
- Com Avatar e prefixo no label (ex.: "Prof. ")
- Com display de nível/metadado secundário
- Sem Avatar
- Com Tabs e Grupos

## v3.x — Base UI

- `PopoverTrigger render={<Button … />}`: o trigger **é** o Button (sem `asChild`, sem
  `<Button>` aninhado). O `ButtonGroup` fica por fora.
- Largura: `w-(--anchor-width)` no `PopoverContent` (CSS var do Positioner do Base UI); sem
  `ref` nem `useLayoutEffect`.
- `CommandItem` desenha o próprio `CheckIcon` quando recebe `data-checked`.
- `CommandInput` já vem dentro de um `InputGroup` com ícone; densidade base-mira (`min-h-7`,
  `text-xs`): não force `h-9`.
- `onOpenChange(open, eventDetails)`: `setOpen` direto continua funcionando.

```tsx
'use client'

import { Button } from '@blips/ui/components/button'
import { ButtonGroup } from '@blips/ui/components/button-group'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@blips/ui/components/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@blips/ui/components/popover'
import { cn } from '@blips/ui/lib/utils'
import { CubeIcon } from '@phosphor-icons/react'
import React from 'react'

import { api } from '@/lib/api'

interface EntitySelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | undefined) => void
  placeholder?: string
  title?: string
  className?: string
}

export function EntitySelect({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = 'Selecionar item...',
  title = 'Itens',
  className,
}: EntitySelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(defaultValue)

  const value = valueProp ?? selectedValue

  const { data } = api.entity.list.useQuery({}, { enabled: open })

  const selectedItem = data?.items.find((item) => item.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <ButtonGroup className={cn('w-auto', className)}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              className="relative flex-1 justify-start truncate font-normal"
            />
          }
        >
          <CubeIcon data-icon="inline-start" />
          {selectedItem ? (
            <span className="truncate font-semibold">{selectedItem.label}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </PopoverTrigger>
      </ButtonGroup>

      <PopoverContent className="w-(--anchor-width) min-w-40 p-0" align="start">
        <Command>
          <div className="text-muted-foreground flex h-7 items-center border-b px-2 text-xs">
            {title}
          </div>
          <CommandInput placeholder="Filtrar por nome..." />
          <CommandList className="max-h-50 overflow-y-auto">
            <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
            <CommandGroup>
              {data?.items.map((item) => {
                const isSelected = item.id === value

                return (
                  <CommandItem
                    value={item.label}
                    key={item.id}
                    data-checked={isSelected}
                    onSelect={() => {
                      const next = isSelected ? undefined : item.id
                      setSelectedValue(next)
                      onValueChange?.(next)
                      setOpen(false)
                    }}
                  >
                    <span className="truncate">{item.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

## v2.x — Radix

- `PopoverTrigger asChild` envolvendo o `ButtonGroup` (com `ref` para medir).
- Largura: `useLayoutEffect` mede o `ButtonGroup` e passa `style={{ width }}`.
- `CommandItem` **não** tem check automático: renderize `<Check>` com `opacity`.
- `modal` é obrigatório dentro de Sheet/Dialog.

```tsx
'use client'

import { Button } from '@blips/ui/components/button'
import { ButtonGroup } from '@blips/ui/components/button-group'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@blips/ui/components/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@blips/ui/components/popover'
import { cn } from '@blips/ui/lib/utils'
import { Check, Cube } from '@phosphor-icons/react'
import React from 'react'

import { api } from '@/lib/api'

// EntitySelectProps: mesma interface do exemplo da v3.x
export function EntitySelect({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = 'Selecionar item...',
  title = 'Itens',
  className,
}: EntitySelectProps) {
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(240)
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(defaultValue)

  const value = valueProp ?? selectedValue

  React.useLayoutEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth)
    }
  }, [])

  const { data } = api.entity.list.useQuery({}, { enabled: open })

  const selectedItem = data?.items.find((item) => item.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <ButtonGroup ref={triggerRef} className={cn('w-auto', className)}>
          <Button
            type="button"
            variant="outline"
            className="relative flex-1 justify-start items-center truncate font-normal"
          >
            <Cube className="size-3 mr-1" />
            {selectedItem ? (
              <span className="truncate font-semibold">{selectedItem.label}</span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </Button>
        </ButtonGroup>
      </PopoverTrigger>

      <PopoverContent className="min-w-40 p-0" align="start" style={{ width }}>
        <Command>
          <div className="text-muted-foreground flex h-8 items-center border-b px-2 text-xs">
            {title}
          </div>
          <CommandInput placeholder="Filtrar por nome..." className="h-9" />
          <CommandList className="max-h-50 overflow-y-auto">
            <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
            <CommandGroup>
              {data?.items.map((item) => {
                const isSelected = item.id === value

                return (
                  <CommandItem
                    value={item.label}
                    key={item.id}
                    onSelect={() => {
                      const next = isSelected ? undefined : item.id
                      setSelectedValue(next)
                      onValueChange?.(next)
                      setOpen(false)
                    }}
                  >
                    <span className="truncate">{item.label}</span>
                    <Check
                      className={cn('ml-auto h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```
