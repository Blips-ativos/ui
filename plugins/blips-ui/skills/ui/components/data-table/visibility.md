# Column Visibility

Implementação de visibilidade de colunas em data tables.

## Table of Contents

- [Setup Básico](#setup-básico)
- [Estado Inicial](#estado-inicial)
- [Componente View Options](#componente-view-options)
- [Coluna com Title para Display](#coluna-com-title-para-display)
- [Impedir Ocultação de Colunas Específicas](#impedir-ocultação-de-colunas-específicas)
- [Column APIs](#column-apis)
- [Table APIs](#table-apis)
- [Renderização com Visibilidade](#renderização-com-visibilidade)
- [Persistir Visibilidade](#persistir-visibilidade)
- [Toggle All Columns](#toggle-all-columns)
- [Responsive Visibility](#responsive-visibility)
- [Integração com Column Header](#integração-com-column-header)

## Setup Básico

```tsx
import {
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";

const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  onColumnVisibilityChange: setColumnVisibility,
  state: {
    columnVisibility,
  },
});
```

### Visibility State

```typescript
type VisibilityState = Record<string, boolean>;

// Exemplo:
{
  "email": true,      // visível
  "createdAt": false, // oculta
}
```

## Estado Inicial

```tsx
const table = useReactTable({
  // ... outras opções
  initialState: {
    columnVisibility: {
      id: false,        // Ocultar coluna ID por padrão
      createdAt: false, // Ocultar data de criação
    },
  },
});
```

## Componente View Options

```tsx
// data-table-view-options.tsx
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

import "@/types/table"; // Tipagem para meta.title

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8">
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
            // Usa meta.title como fonte de verdade para o nome da coluna
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

### Uso na Toolbar

```tsx
<div className="flex items-center gap-2">
  <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statusOptions} />
  <DataTableViewOptions table={table} />
</div>
```

## Coluna com Title para Display

```tsx
// Usar meta.title como fonte única de verdade para o nome da coluna
// Este título é usado tanto no header quanto no menu de visibilidade
{
  accessorKey: "createdAt",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: {
    title: "Data de Criação",
  },
}
```

## Impedir Ocultação de Colunas Específicas

```tsx
// Colunas que não podem ser ocultadas
{
  id: "select",
  enableHiding: false,
  enableSorting: false,
}

{
  id: "actions",
  enableHiding: false,
  enableSorting: false,
}

{
  accessorKey: "name",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: { title: "Nome" },
  enableHiding: false, // Sempre visível
}
```

## Column APIs

| API | Descrição |
|-----|-----------|
| `column.getCanHide()` | Pode ser ocultada? |
| `column.getIsVisible()` | Está visível? |
| `column.toggleVisibility(value?)` | Alternar visibilidade |
| `column.getToggleVisibilityHandler()` | Handler para onChange |

## Table APIs

| API | Descrição |
|-----|-----------|
| `table.getAllColumns()` | Todas as colunas |
| `table.getVisibleLeafColumns()` | Colunas visíveis |
| `table.setColumnVisibility(state)` | Definir estado |
| `table.resetColumnVisibility()` | Resetar visibilidade |
| `table.toggleAllColumnsVisible(value?)` | Alternar todas |

## Renderização com Visibilidade

### Headers

```tsx
<TableHeader>
  {table.getHeaderGroups().map((headerGroup) => (
    <TableRow key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <TableHead key={header.id}>
          {header.isPlaceholder
            ? null
            : flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
        </TableHead>
      ))}
    </TableRow>
  ))}
</TableHeader>
```

### Cells

```tsx
<TableBody>
  {table.getRowModel().rows.map((row) => (
    <TableRow key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ))}
</TableBody>
```

## Persistir Visibilidade

### Hook Reutilizável (Recomendado)

```tsx
// hooks/use-persisted-visibility.ts
import { useEffect, useState } from "react";
import { VisibilityState } from "@tanstack/react-table";

/**
 * Hook para persistir preferências de visibilidade de colunas no localStorage.
 *
 * @param tableId - Identificador único da tabela (namespace no localStorage)
 * @param defaultState - Estado padrão de visibilidade
 * @returns [visibilityState, setVisibilityState]
 *
 * @example
 * const [columnVisibility, setColumnVisibility] = usePersistedVisibility(
 *   "students-table",
 *   { createdAt: false, updatedAt: false }
 * );
 */
export function usePersistedVisibility(
  tableId: string,
  defaultState: VisibilityState = {}
): [VisibilityState, React.Dispatch<React.SetStateAction<VisibilityState>>] {
  const key = `table-visibility-${tableId}`;

  const [visibility, setVisibility] = useState<VisibilityState>(() => {
    if (typeof window === "undefined") return defaultState;
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return defaultState;

      // Merge stored com default para garantir novas colunas
      const parsed = JSON.parse(stored) as VisibilityState;
      return { ...defaultState, ...parsed };
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(visibility));
    } catch {
      // localStorage indisponível (SSR, private mode, quota exceeded)
    }
  }, [key, visibility]);

  return [visibility, setVisibility];
}
```

### Uso do Hook

```tsx
"use client";

import { usePersistedVisibility } from "@/hooks/use-persisted-visibility";

export function ResourceTable() {
  const [columnVisibility, setColumnVisibility] = usePersistedVisibility(
    "resource-table", // Namespace único para esta tabela
    {
      createdAt: false, // Oculta por padrão
      updatedAt: false,
      id: false,
    }
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  // ...
}
```

### Vantagens do Hook

| Benefício | Descrição |
|-----------|-----------|
| **Persistência** | Preferências sobrevivem refresh/fechamento |
| **Namespace** | Cada tabela tem seu próprio storage |
| **Merge inteligente** | Novas colunas usam defaultState |
| **Error handling** | Graceful degradation se localStorage falhar |
| **SSR safe** | Funciona com server-side rendering |

### Local Storage Manual (Alternativa)

```tsx
const VISIBILITY_KEY = "resource-table-visibility";

// Carregar do localStorage
const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
  if (typeof window === "undefined") return {};
  const saved = localStorage.getItem(VISIBILITY_KEY);
  return saved ? JSON.parse(saved) : {};
});

// Salvar no localStorage
useEffect(() => {
  localStorage.setItem(VISIBILITY_KEY, JSON.stringify(columnVisibility));
}, [columnVisibility]);
```

### URL Params (para compartilhamento)

Útil quando o usuário precisa compartilhar a view exata:

```tsx
import { useQueryState, parseAsJson } from "nuqs";

const [columnVisibility, setColumnVisibility] = useQueryState(
  "columns",
  parseAsJson<VisibilityState>().withDefault({})
);
```

### Comparação de Estratégias

| Estratégia | Persistência | Compartilhável | Complexidade |
|------------|--------------|----------------|--------------|
| `useState` (sem persistência) | Não | Não | Baixa |
| `usePersistedVisibility` (localStorage) | Sim | Não | Baixa |
| URL params (nuqs) | Sim | Sim | Média |
| Server-side (cookie/DB) | Sim | Cross-device | Alta |

## Toggle All Columns

```tsx
<Button
  variant="ghost"
  size="sm"
  onClick={() => table.toggleAllColumnsVisible(true)}
>
  Mostrar todas
</Button>
<Button
  variant="ghost"
  size="sm"
  onClick={() => table.resetColumnVisibility()}
>
  Restaurar padrão
</Button>
```

## Responsive Visibility

```tsx
// Ocultar colunas em mobile
const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
  email: true,
  createdAt: window.innerWidth > 768, // Ocultar em mobile
  updatedAt: window.innerWidth > 1024, // Ocultar em tablets
});

// Ou usar CSS
{
  accessorKey: "createdAt",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: {
    title: "Criado em",
    className: "hidden md:table-cell", // Ocultar em mobile via CSS
  },
}

// Aplicar className na cell
cell: ({ row, column }) => (
  <div className={column.columnDef.meta?.className}>
    {/* conteúdo */}
  </div>
)
```

## Integração com Column Header

```tsx
// No DataTableColumnHeader, adicionar opção de ocultar
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm">
      {title}
      {/* ícone de sorting */}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start">
    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
      <ArrowUp className="mr-2 h-3.5 w-3.5" />
      Crescente
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
      <ArrowDown className="mr-2 h-3.5 w-3.5" />
      Decrescente
    </DropdownMenuItem>
    {column.getCanHide() && (
      <>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
          <EyeSlash className="mr-2 h-3.5 w-3.5" />
          Ocultar coluna
        </DropdownMenuItem>
      </>
    )}
  </DropdownMenuContent>
</DropdownMenu>
```
