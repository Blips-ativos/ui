# Filtering

Implementação de filtros em data tables.

## Table of Contents

- [Client-Side Filtering](#client-side-filtering)
- [Filtro de Texto](#filtro-de-texto)
- [Filtro Toggle (Boolean/Presença)](#filtro-toggle-booleanpresença)
- [Filtro Select (Enum/Status)](#filtro-select-enumstatus)
- [Server-Side Filtering](#server-side-filtering)
- [Filtro com Select do shadcn/ui](#filtro-com-select-do-shadcnui)
- [Column APIs](#column-apis)
- [Table APIs](#table-apis)
- [Filter Functions Built-in](#filter-functions-built-in)
- [Reset Filters](#reset-filters)

## Client-Side Filtering

### Setup Básico

```tsx
import {
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onColumnFiltersChange: setColumnFilters,
  state: {
    columnFilters,
  },
});
```

### Column Filters State

```typescript
interface ColumnFilter {
  id: string;      // ID da coluna
  value: unknown;  // Valor do filtro
}

type ColumnFiltersState = ColumnFilter[];
```

## Filtro de Texto

### Input de Busca

```tsx
<Input
  placeholder="Filtrar por email..."
  value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
  onChange={(event) =>
    table.getColumn("email")?.setFilterValue(event.target.value)
  }
  className="max-w-sm"
/>
```

### Busca Global (Debounced)

#### Opção 1: useDeferredValue (React 18+ - Recomendado)

```tsx
import { useDeferredValue, useState } from "react";

export function ResourceTable() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  // A UI responde imediatamente ao input
  // A query usa o valor diferido (atrasado automaticamente pelo React)
  const { data, isLoading } = api.resource.list.useQuery({
    search: deferredSearch || undefined,
  });

  // Indicador visual de "processando"
  const isStale = search !== deferredSearch;

  return (
    <div>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={isStale ? "opacity-70" : ""}
      />
      {isStale && <span className="text-xs text-muted-foreground">Buscando...</span>}
      {/* ... tabela */}
    </div>
  );
}
```

**Vantagens do useDeferredValue:**
- Integrado ao Concurrent Mode do React
- React prioriza automaticamente updates urgentes vs não-urgentes
- Não precisa de cleanup manual ou dependências externas
- Melhor responsividade da UI

#### Opção 2: Hook Customizado (Controle do Delay)

Quando precisa de controle fino sobre o tempo de debounce:

```tsx
// hooks/use-debounced-value.ts
import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Uso
const [search, setSearch] = useState("");
const debouncedSearch = useDebouncedValue(search, 300);

const { data } = api.resource.list.useQuery({
  search: debouncedSearch || undefined,
});
```

#### Opção 3: Debounce Manual (Legacy)

```tsx
import { useState, useEffect } from "react";

const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

// Debounce
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 300);

  return () => clearTimeout(timer);
}, [search]);

// Aplicar filtro global (client-side)
useEffect(() => {
  table.setGlobalFilter(debouncedSearch);
}, [debouncedSearch, table]);
```

### Comparação de Abordagens de Debounce

| Abordagem | React 18+ | Controle de Delay | Bundle Size | Cleanup |
|-----------|-----------|-------------------|-------------|---------|
| `useDeferredValue` | Obrigatório | Automático | 0kb | N/A |
| Hook customizado | Opcional | Manual | ~0.5kb | Automático |
| Manual | Opcional | Manual | 0kb | Manual |

## Filtro Toggle (Boolean/Presença)

Filtro tri-state com `ButtonGroup`: ícone isolado à esquerda (`ButtonGroupText`) e botão de texto à direita que cicla entre neutro → positivo → negativo.

### Componente DataTableToggleFilter

**Arquivo:** `components/data-table/data-table-toggle-filter.tsx`

```tsx
import { DataTableToggleFilter } from "@/components/data-table/data-table-toggle-filter";
```

### Props

```typescript
interface DataTableToggleFilterProps<T extends string> {
  icon: React.ComponentType<{ className?: string }>;  // Ícone à esquerda
  title: string;                                       // Label no estado neutro
  options: [                                           // [positivo, negativo]
    { label: string; value: T },
    { label: string; value: T },
  ];
  value?: T;                                           // Valor controlado
  onValueChange?: (value: T | undefined) => void;      // undefined = neutro
}
```

### Estados Visuais

| Estado | Variant | Cor | Label exibido |
|--------|---------|-----|---------------|
| **Neutro** | `outline` | Padrão (bg transparent) | `title` |
| **Positivo** | `outline` + classes primary | `bg-primary/10 text-primary border-primary/20` | `options[0].label` |
| **Negativo** | `secondary` | `bg-secondary text-secondary-foreground` | `options[1].label` |

Clique cicla: neutro → positivo → negativo → neutro.

### Uso

```tsx
const [slaFilter, setSlaFilter] = useState<"with_sla" | "without_sla">();

<DataTableToggleFilter
  icon={TimerIcon}
  title="SLA"
  options={[
    { label: "Com SLA", value: "with_sla" },
    { label: "Sem SLA", value: "without_sla" },
  ]}
  value={slaFilter}
  onValueChange={setSlaFilter}
/>
```

### Quando Usar

- Filtros binários de presença/ausência (ex: "Com SLA" / "Sem SLA")
- Filtros boolean onde o estado neutro (sem filtro) é relevante
- Alternativa compacta ao `DataTableFacetedFilter` quando há apenas 2 opções opostas

### Quando NÃO Usar

- Filtros com mais de 2 opções → usar `DataTableFacetedFilter`
- Filtros multi-select → usar `DataTableFacetedFilter` ou `TableDropdownFilter`

---

## Filtro Select (Enum/Status)

### Componente Faceted Filter

```tsx
// data-table-faceted-filter.tsx
"use client";

import { Column } from "@tanstack/react-table";
import { Check, PlusCircle } from "@phosphor-icons/react";

import { cn } from "@blips/ui/lib/utils";
import { Badge } from "@blips/ui/components/badge";
import { Button } from "@blips/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@blips/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover";
import { Separator } from "@blips/ui/components/separator";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selecionados
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Nenhum resultado.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Limpar filtros
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
```

### Uso do Faceted Filter

```tsx
// Na toolbar
<DataTableFacetedFilter
  column={table.getColumn("status")}
  title="Status"
  options={[
    { label: "Ativo", value: "active" },
    { label: "Inativo", value: "inactive" },
    { label: "Pendente", value: "pending" },
  ]}
/>
```

### Coluna com Filter Function

```tsx
{
  accessorKey: "status",
  header: "Status",
  filterFn: (row, id, value: string[]) => {
    return value.includes(row.getValue(id));
  },
  // Habilitar faceted values para contagem
  enableFacetedFiltering: true,
}
```

## Server-Side Filtering

### Setup

```tsx
const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");
const [statusFilter, setStatusFilter] = useState<string | undefined>();

// Debounce
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 300);
  return () => clearTimeout(timer);
}, [search]);

// Query com filtros
const { data, isLoading } = api.resource.list.useQuery({
  page,
  limit: 20,
  search: debouncedSearch || undefined,
  status: statusFilter,
});

const table = useReactTable({
  data: data?.data ?? [],
  columns,
  getCoreRowModel: getCoreRowModel(),
  manualFiltering: true,         // IMPORTANTE: Desabilita filtering client-side
});
```

### Schema API para Filtering

```typescript
// list.schema.ts
export const ZListInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  search: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
  category: z.string().optional(),
  hasUser: z.boolean().optional(),
});
```

### Handler com Filtering

```typescript
// list.handler.ts
import { and, eq, ilike, isNotNull, isNull, or } from "drizzle-orm";

export const listHandler = async ({ ctx, input }: ListOptions) => {
  const conditions = [];

  // Filtro de busca
  if (input.search) {
    conditions.push(
      or(
        ilike(resources.name, `%${input.search}%`),
        ilike(resources.email, `%${input.search}%`)
      )
    );
  }

  // Filtro de status
  if (input.status) {
    conditions.push(eq(resources.status, input.status));
  }

  // Filtro boolean
  if (input.hasUser !== undefined) {
    conditions.push(
      input.hasUser
        ? isNotNull(resources.userId)
        : isNull(resources.userId)
    );
  }

  const items = await ctx.db
    .select()
    .from(resources)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(input.limit)
    .offset((input.page - 1) * input.limit);

  return { data: items };
};
```

## Filtro com Select do shadcn/ui

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select";

<Select
  value={statusFilter ?? "all"}
  onValueChange={(v) => {
    setStatusFilter(v === "all" ? undefined : v);
    setPage(1); // Reset página ao filtrar
  }}
>
  <SelectTrigger className="w-[140px]">
    <SelectValue placeholder="Status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">Todos status</SelectItem>
    <SelectItem value="active">Ativo</SelectItem>
    <SelectItem value="inactive">Inativo</SelectItem>
    <SelectItem value="pending">Pendente</SelectItem>
  </SelectContent>
</Select>
```

## Column APIs

| API | Descrição |
|-----|-----------|
| `column.getCanFilter()` | Verifica se pode filtrar |
| `column.getIsFiltered()` | Está sendo filtrada? |
| `column.getFilterValue()` | Valor atual do filtro |
| `column.setFilterValue(value)` | Define valor do filtro |
| `column.getFacetedUniqueValues()` | Valores únicos com contagem |
| `column.getFacetedMinMaxValues()` | Min/max para números |

## Table APIs

| API | Descrição |
|-----|-----------|
| `table.setColumnFilters(filters)` | Define todos os filtros |
| `table.resetColumnFilters()` | Reseta filtros |
| `table.setGlobalFilter(value)` | Filtro global |
| `table.getState().columnFilters` | Estado atual dos filtros |

## Filter Functions Built-in

| Função | Descrição |
|--------|-----------|
| `includesString` | Contém string (case-insensitive) |
| `includesStringSensitive` | Contém string (case-sensitive) |
| `equalsString` | Igual a string |
| `arrIncludes` | Array contém valor |
| `arrIncludesAll` | Array contém todos |
| `arrIncludesSome` | Array contém alguns |
| `equals` | Igualdade estrita |
| `inNumberRange` | Range numérico |

## Reset Filters

```tsx
{/* Botão para limpar filtros */}
{(table.getState().columnFilters.length > 0 || search) && (
  <Button
    variant="ghost"
    onClick={() => {
      table.resetColumnFilters();
      setSearch("");
    }}
    className="h-8 px-2 lg:px-3"
  >
    Limpar
    <X className="ml-2 h-4 w-4" />
  </Button>
)}
```
