# Setup

Instalação e configuração inicial do data-table.

## Table of Contents

- [Dependências](#dependências)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Tipagem do Meta](#tipagem-do-meta)
- [Helper para Criação de Colunas (Type-Safe)](#helper-para-criação-de-colunas-type-safe)
- [Hooks Reutilizáveis](#hooks-reutilizáveis)
- [Componentes Base Reutilizáveis](#componentes-base-reutilizáveis)
- [Configuração Inicial da Tabela](#configuração-inicial-da-tabela)
- [Checklist de Setup](#checklist-de-setup)

## Dependências

```bash
# TanStack Table
pnpm add @tanstack/react-table

# Componentes shadcn/ui necessários
pnpm dlx shadcn@latest add table
pnpm dlx shadcn@latest add checkbox
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add select
pnpm dlx shadcn@latest add badge
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
```

## Estrutura de Diretórios

```
seu-app/
├── src/app/(protected)/(manager)/{resource}/
│   ├── page.tsx                           # Server component
│   └── _components/
│       ├── {resource}-table.tsx           # Tabela principal
│       ├── {resource}-table-skeleton.tsx  # Loading skeleton
│       ├── columns.tsx                    # Definição de colunas
│       ├── {resource}-toolbar.tsx         # Filtros e ações
│       └── {resource}-actions-dropdown.tsx # Ações por linha
└── src/components/
    └── data-table/                        # Componentes reutilizáveis
        ├── data-table-column-header.tsx
        ├── data-table-faceted-filter.tsx
        ├── data-table-pagination.tsx
        └── data-table-view-options.tsx
```

## Tipagem do Meta

Adicione a tipagem para `meta.title` no projeto. Esse campo é a **fonte de verdade** para o título da coluna, usado tanto no header quanto no menu de visibilidade.

```tsx
// types/table.d.ts
import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    title: string; // Obrigatório - força definição em todas as colunas
  }
}
```

## Helper para Criação de Colunas (Type-Safe)

Para garantir type safety e evitar esquecimento do `meta.title`:

```tsx
// lib/table-utils.ts
import { ColumnDef } from "@tanstack/react-table";

/**
 * Helper para criar colunas com title obrigatório.
 * Garante que meta.title seja sempre definido.
 */
export function createColumn<TData, TValue = unknown>(
  config: Omit<ColumnDef<TData, TValue>, "meta"> & {
    title: string;
    meta?: Omit<ColumnDef<TData, TValue>["meta"], "title">;
  }
): ColumnDef<TData, TValue> {
  const { title, meta: additionalMeta, ...rest } = config;
  return {
    ...rest,
    meta: { title, ...additionalMeta },
  } as ColumnDef<TData, TValue>;
}

// Uso:
const columns: ColumnDef<Resource>[] = [
  createColumn({
    accessorKey: "name",
    title: "Nome", // TypeScript exige este campo
    header: ({ column }) => <DataTableColumnHeader column={column} />,
  }),
];
```

## Hooks Reutilizáveis

### useDebouncedValue

Hook para debounce de valores (busca, filtros):

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
```

### usePersistedVisibility

Hook para persistir preferências de visibilidade de colunas:

```tsx
// hooks/use-persisted-visibility.ts
import { useEffect, useState } from "react";
import { VisibilityState } from "@tanstack/react-table";

export function usePersistedVisibility(
  tableId: string,
  defaultState: VisibilityState = {}
): [VisibilityState, React.Dispatch<React.SetStateAction<VisibilityState>>] {
  const key = `table-visibility-${tableId}`;

  const [visibility, setVisibility] = useState<VisibilityState>(() => {
    if (typeof window === "undefined") return defaultState;
    try {
      const stored = localStorage.getItem(key);
      return stored ? { ...defaultState, ...JSON.parse(stored) } : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(visibility));
    } catch {
      // localStorage indisponível (SSR, private mode, etc)
    }
  }, [key, visibility]);

  return [visibility, setVisibility];
}

// Uso:
const [columnVisibility, setColumnVisibility] = usePersistedVisibility(
  "students-table",
  { createdAt: false } // Oculta por padrão
);
```

## Componentes Base Reutilizáveis

### DataTableColumnHeader

O componente extrai o título de `meta.title`, garantindo consistência com o menu de visibilidade de colunas.

```tsx
// components/data-table/data-table-column-header.tsx
"use client";

import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, CaretUpDown, EyeSlash } from "@phosphor-icons/react";

import { cn } from "@blips/ui/lib/utils";
import { Button } from "@blips/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  // Usa meta.title como fonte de verdade, fallback para column.id
  const title = column.columnDef.meta?.title ?? column.id;

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <CaretUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Crescente
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Decrescente
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeSlash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Ocultar
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
```

### DataTablePagination

```tsx
// components/data-table/data-table-pagination.tsx
"use client";

import { Table } from "@tanstack/react-table";
import {
  CaretLeft,
  ChevronRight,
  CaretDoubleLeft,
  CaretDoubleRight,
} from "@phosphor-icons/react";

import { Button } from "@blips/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  showSelectedCount?: boolean;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 50, 100],
  showSelectedCount = true,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      {showSelectedCount && (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
      )}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Linhas por página</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Primeira página</span>
            <CaretDoubleLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Página anterior</span>
            <CaretLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Próxima página</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Última página</span>
            <CaretDoubleRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### DataTableViewOptions

O componente usa `meta.title` para exibir o nome da coluna no menu, garantindo consistência com o header.

```tsx
// components/data-table/data-table-view-options.tsx
"use client";

import { Table } from "@tanstack/react-table";
import { GearSix } from "@phosphor-icons/react";

import { Button } from "@blips/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
          <GearSix className="mr-2 h-4 w-4" />
          Colunas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuLabel>Alternar colunas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            // Usa meta.title como fonte de verdade
            const title = column.columnDef.meta?.title ?? column.id;

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {title}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Configuração Inicial da Tabela

```tsx
// Configuração mínima
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
});

// Configuração completa (client-side)
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  state: {
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    pagination: {
      pageIndex,
      pageSize,
    },
  },
});
```

## Checklist de Setup

- [ ] Instalar `@tanstack/react-table`
- [ ] Adicionar componentes shadcn/ui necessários
- [ ] Criar estrutura de diretórios
- [ ] Criar componentes reutilizáveis (column-header, pagination, view-options)
- [ ] Definir tipos de dados
- [ ] Criar arquivo de colunas
- [ ] Criar componente da tabela
