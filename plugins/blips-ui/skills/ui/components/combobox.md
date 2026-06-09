# Combobox (Popover + Command)

Padrão para criar selects com busca/filtro usando Popover + Command.

## Table of Contents

- [Quando Usar](#quando-usar)
- [Convenções de Placeholder](#convenções-de-placeholder)
- [Estrutura Base](#estrutura-base)
- [Anatomia do Componente](#anatomia-do-componente)
- [Variações](#variações)
- [Diretrizes](#diretrizes)
- [Troubleshooting](#troubleshooting)
- [Arquivos de Referência](#arquivos-de-referência)

## Quando Usar

- Select com muitas opções (10+)
- Necessidade de busca/filtro
- Dados carregados de API
- Seleção única com feedback visual

## Convenções de Placeholder

- **Formulários (seleção)**: `"Selecionar X..."` (ex: "Selecionar professor...")
- **Filtros (tabelas/listas)**: `"Todos os X"` (ex: "Todos os professores")

## Estrutura Base

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

  const { data } = api.entity.list.useQuery(
    {},
    { enabled: open },
  )

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
                      if (isSelected) {
                        setSelectedValue(undefined)
                        onValueChange?.(undefined)
                      } else {
                        setSelectedValue(item.id)
                        onValueChange?.(item.id)
                      }
                      setOpen(false)
                    }}
                  >
                    <span className="truncate">{item.label}</span>

                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        isSelected ? 'opacity-100' : 'opacity-0',
                      )}
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

### 2. Estado e Refs

```tsx
const triggerRef = React.useRef<HTMLDivElement>(null)  // Ref para medir largura
const [width, setWidth] = React.useState(240)          // Largura do popover
const [open, setOpen] = React.useState(false)          // Controle de abertura
const [selectedValue, setSelectedValue] = React.useState<string | undefined>(defaultValue)

const value = valueProp ?? selectedValue  // Controlled/uncontrolled pattern
```

### 3. Popover Root

```tsx
<Popover open={open} onOpenChange={setOpen} modal>
```

- `open` e `onOpenChange` para controle de estado
- **`modal` é OBRIGATÓRIO** - garante scroll funcional dentro de Sheet/Dialog

### 4. Trigger com ButtonGroup

```tsx
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
```

- `ref` vai no `ButtonGroup`, não no `Button`
- `className` aplicado no `ButtonGroup` com `cn('w-auto', className)`
- Button com `flex-1` para ocupar espaço disponível
- Ícone dentro do Button com `mr-1` para espaçamento
- Valor selecionado com `font-semibold` para destaque
- Use `items-center` para alinhamento vertical do ícone

### 5. PopoverContent

```tsx
<PopoverContent className="min-w-40 p-0" align="start" style={{ width }}>
```

- `min-w-40` garante largura mínima
- `p-0` remove padding (Command tem seu próprio)
- `style={{ width }}` sincroniza com trigger
- `align="start"` alinha à esquerda

### 6. Command Structure

```tsx
<Command>
  {/* Header com título */}
  <div className="text-muted-foreground flex h-8 items-center border-b px-2 text-xs">
    {title}
  </div>

  {/* Input de busca */}
  <CommandInput placeholder="Filtrar por nome..." className="h-9" />

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

  <Check
    className={cn(
      'ml-auto h-4 w-4',
      isSelected ? 'opacity-100' : 'opacity-0',
    )}
  />
</CommandItem>
```

- Toggle: clicar no item selecionado desmarca
- `setOpen(false)` fecha o popover após seleção
- Check icon com opacity para indicar seleção

## Variações

### Com Avatar no Item

```tsx
import { Avatar, AvatarFallback } from '@blips/ui/components/avatar'

<CommandItem value={item.name} key={item.id} onSelect={...}>
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

  <Check
    className={cn(
      'ml-auto h-4 w-4',
      isSelected ? 'opacity-100' : 'opacity-0'
    )}
  />
</CommandItem>
```

### Com Ícone no Item

```tsx
<CommandItem value={item.label} key={item.id} onSelect={...}>
  <Avatar className={cn('border-border h-5 w-5 border', isSelected && 'ring-primary ring-1 ring-offset-2 ring-offset-background')}>
    <AvatarFallback>
      <item.icon className={cn('h-3 w-3 text-muted-foreground', isSelected && 'text-primary')} />
    </AvatarFallback>
  </Avatar>

  <span className="truncate">{item.label}</span>
  <Check ... />
</CommandItem>
```

### Com Descrição

```tsx
<CommandItem value={item.label} key={item.id} onSelect={...}>
  <div className="flex flex-col">
    <span>{item.label}</span>
    <span className="text-xs text-muted-foreground">{item.description}</span>
  </div>
  <Check ... />
</CommandItem>
```

### Com Badge

```tsx
<CommandItem value={item.label} key={item.id} onSelect={...}>
  <div className="flex items-center gap-1.5">
    {item.label}
    <Badge variant="secondary" className="ml-1">{item.count}</Badge>
  </div>
  <Check ... />
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
    className="h-9"
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
- Use `useLayoutEffect` para medir o trigger
- Use `setOpen(false)` no `onSelect` para fechar ao selecionar
- Forneça `initialData` na query para evitar loading flash
- Use `truncate` no texto do trigger e items
- Mostre feedback visual de seleção com Check
- Use `value={item.label}` no CommandItem para busca
- Aplique `className` no `ButtonGroup`, não no `Button`
- Use ícone dentro do Button com `mr-1` para espaçamento
- Use `font-semibold` no valor selecionado para destaque
- Use `items-center` no Button para alinhamento vertical
- Use `ring-1 ring-offset-2 ring-offset-background` para ring do avatar selecionado
- Use placeholder "Selecionar X..." para formulários
- Use placeholder "Todos os X" para filtros

### NÃO FAÇA

- Não esqueça o `modal` prop no Popover
- Não use `useEffect` para medições de layout
- Não esqueça o estado empty (`CommandEmpty`)
- Não use IDs como valor de busca (use label)
- Não remova o `min-w-40` do PopoverContent
- Não use `ButtonGroupText` - coloque o ícone dentro do Button
- Não use `ring-2` para avatar selecionado - use `ring-1`

## Troubleshooting

### Scroll não funciona dentro de Sheet/Dialog

**Problema**: O scroll do `CommandList` não funciona quando o combobox está dentro de um Sheet ou Dialog.

**Causa**: O Radix UI usa `RemoveScroll` para bloquear scroll do background, mas não detecta elementos em Portals separados.

**Solução**: Adicione `modal` no componente Popover:

```tsx
<Popover open={open} onOpenChange={setOpen} modal>
```

Referências:
- [Radix UI Issue #1159](https://github.com/radix-ui/primitives/issues/1159)
- [Radix UI Issue #2028](https://github.com/radix-ui/primitives/issues/2028)

## Variantes Comuns

- Com Avatar e Skeleton (carregamento de lista assíncrona)
- Com ícone no Avatar
- Padrão simples (apenas label)
- Com Avatar e prefixo no label (ex.: "Prof. ")
- Com display de nível/metadado secundário
- Sem Avatar
- Com Tabs e Grupos
