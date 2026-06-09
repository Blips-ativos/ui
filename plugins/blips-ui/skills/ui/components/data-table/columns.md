# Columns

Definição e configuração de colunas para TanStack Table.

## Table of Contents

- [Estrutura Base (Array Estático)](#estrutura-base-array-estático)
- [Colunas com Callbacks (getColumns Pattern)](#colunas-com-callbacks-getcolumns-pattern)
- [Tipos de Colunas](#tipos-de-colunas)
- [Opções de Coluna](#opções-de-coluna)
- [Filtering Functions Built-in](#filtering-functions-built-in)
- [Sorting Functions Built-in](#sorting-functions-built-in)
- [Padrões de Colunas por Tipo](#padrões-de-colunas-por-tipo)
- [Colunas Fixas (Column Pinning)](#colunas-fixas-column-pinning)

## Estrutura Base (Array Estático)

**IMPORTANTE**: Sempre defina `meta.title` em cada coluna. Esse campo é a **fonte de verdade** para o título da coluna, usado tanto no header (via `DataTableColumnHeader`) quanto no menu de visibilidade de colunas.

```tsx
// columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export type Resource = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
};

export const columns: ColumnDef<Resource>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { title: "Nome" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { title: "Email" },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { title: "Status" },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { title: "Criado em" },
  },
  // ... outras colunas
];
```

## Colunas com Callbacks (getColumns Pattern)

Quando colunas precisam de handlers ou callbacks externos, use o padrão `getColumns`:

```tsx
// columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DotsThree, Trash } from "@phosphor-icons/react";

import { Button } from "@blips/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

type GetColumnsParams = {
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  handleChangeStatus: (id: string, disabled: boolean) => void;
};

export const getColumns = ({
  handleEdit,
  handleDelete,
  handleChangeStatus,
}: GetColumnsParams): ColumnDef<Resource>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: { title: "Nome" },
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const resource = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <DotsThree className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEdit(resource.id)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleChangeStatus(resource.id, !resource.disabled)}
            >
              {resource.disabled ? "Ativar" : "Desativar"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => handleDelete(resource.id)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
```

### Uso do getColumns no Componente

```tsx
// {resource}-table.tsx
"use client";

import React from "react";
import { getColumns } from "./columns";

export function ResourceTable({ data }) {
  const handleEdit = React.useCallback((id: string) => {
    // lógica de edição
  }, []);

  const handleDelete = React.useCallback((id: string) => {
    // lógica de exclusão
  }, []);

  const handleChangeStatus = React.useCallback((id: string, disabled: boolean) => {
    // lógica de mudança de status
  }, []);

  const columns = React.useMemo(
    () => getColumns({ handleEdit, handleDelete, handleChangeStatus }),
    [handleEdit, handleDelete, handleChangeStatus]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // ... resto do componente
}
```

## Tipos de Colunas

### Accessor Column (Campo Simples)

```tsx
{
  accessorKey: "email",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: { title: "Email" },
}
```

### Com Cell Customizada

```tsx
{
  accessorKey: "status",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: { title: "Status" },
  cell: ({ row }) => {
    const status = row.getValue("status") as string;
    return (
      <Badge variant={status === "active" ? "default" : "secondary"}>
        {status === "active" ? "Ativo" : "Inativo"}
      </Badge>
    );
  },
}
```

### Coluna de Data

```tsx
import { format } from "date-fns";

{
  accessorKey: "createdAt",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: { title: "Criado em" },
  cell: ({ row }) => {
    const date = row.getValue("createdAt") as Date;
    return date ? format(new Date(date), "dd/MM/yyyy") : "-";
  },
}
```

### Coluna de Moeda

```tsx
{
  accessorKey: "priceInCents",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: { title: "Valor" },
  cell: ({ row }) => {
    const cents = row.getValue("priceInCents") as number | null;
    if (cents === null) return "-";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  },
}
```

### Coluna de Seleção (Checkbox)

```tsx
import { Checkbox } from "@blips/ui/components/checkbox";

{
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Selecionar todos"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Selecionar linha"
    />
  ),
  enableSorting: false,
  enableHiding: false,
}
```

### Coluna de Ações

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import { Button } from "@blips/ui/components/button";
import { DotsThree, Eye, Pencil, Trash } from "@phosphor-icons/react";

{
  id: "actions",
  cell: ({ row }) => {
    const resource = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <DotsThree className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(resource.id)}>
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  enableSorting: false,
  enableHiding: false,
}
```

### Coluna com Accessor Function

```tsx
{
  id: "fullName",
  accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: { title: "Nome Completo" },
}
```

### Coluna com Nested Data

```tsx
{
  accessorKey: "user.email",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: { title: "Email do Usuário" },
  cell: ({ row }) => row.original.user?.email ?? "-",
}
```

## Opções de Coluna

```tsx
{
  accessorKey: "field",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: { title: "Campo" },       // OBRIGATÓRIO: título usado no header e menu de visibilidade

  // Sorting
  enableSorting: true,           // Habilitar ordenação (default: true)
  sortingFn: "alphanumeric",     // Função de ordenação
  sortDescFirst: false,          // Começar em decrescente
  invertSorting: false,          // Inverter lógica de ordenação

  // Filtering
  enableColumnFilter: true,      // Habilitar filtro (default: true)
  filterFn: "includesString",    // Função de filtro

  // Visibility
  enableHiding: true,            // Permitir ocultar (default: true)

  // Sizing
  size: 150,                     // Largura da coluna
  minSize: 100,                  // Largura mínima
  maxSize: 300,                  // Largura máxima
}
```

## Filtering Functions Built-in

| Função | Descrição |
|--------|-----------|
| `includesString` | Contém string (case-insensitive) |
| `includesStringSensitive` | Contém string (case-sensitive) |
| `equalsString` | Igual a string (case-insensitive) |
| `arrIncludes` | Array contém valor |
| `arrIncludesAll` | Array contém todos valores |
| `arrIncludesSome` | Array contém alguns valores |
| `equals` | Igualdade estrita |
| `weakEquals` | Igualdade fraca |
| `inNumberRange` | Dentro de intervalo numérico |

### Filter Function Customizada

```tsx
{
  accessorKey: "status",
  filterFn: (row, id, value: string[]) => {
    return value.includes(row.getValue(id));
  },
}
```

## Sorting Functions Built-in

| Função | Descrição |
|--------|-----------|
| `alphanumeric` | Strings com números naturalmente |
| `alphanumericCaseSensitive` | Case-sensitive |
| `text` | Strings simples (mais rápido) |
| `textCaseSensitive` | Case-sensitive |
| `datetime` | Objetos Date |
| `basic` | Comparação básica (mais rápido) |

## Padrões de Colunas por Tipo

### Status com Ícone

```tsx
import { Check, X, Clock } from "@phosphor-icons/react";

const STATUS_CONFIG = {
  active: { label: "Ativo", icon: Check, variant: "default" },
  inactive: { label: "Inativo", icon: X, variant: "secondary" },
  pending: { label: "Pendente", icon: Clock, variant: "outline" },
} as const;

{
  accessorKey: "status",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: { title: "Status" },
  cell: ({ row }) => {
    const status = row.getValue("status") as keyof typeof STATUS_CONFIG;
    const config = STATUS_CONFIG[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  },
  filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
}
```

### Boolean

```tsx
{
  accessorKey: "isAdmin",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: { title: "Admin" },
  cell: ({ row }) => (
    row.getValue("isAdmin") ? (
      <Badge variant="default">Sim</Badge>
    ) : (
      <Badge variant="outline">Não</Badge>
    )
  ),
}
```

### Link Externo

```tsx
{
  accessorKey: "website",
  header: ({ column }) => <DataTableColumnHeader column={column} />,
  meta: { title: "Website" },
  cell: ({ row }) => {
    const url = row.getValue("website") as string | null;
    if (!url) return "-";
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {new URL(url).hostname}
      </a>
    );
  },
}
```

## Colunas Fixas (Column Pinning)

Para fixar colunas à direita (útil para coluna de ações):

### Configuração no useReactTable

```tsx
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  state: {
    columnPinning: {
      right: ["actions"],
    },
  },
});
```

### Aplicando Estilos no Header e Cell

```tsx
import { cn } from "@blips/ui/lib/utils";

// No TableHead (header)
{table.getHeaderGroups().map((headerGroup) => (
  <TableRow key={headerGroup.id}>
    {headerGroup.headers.map((header) => (
      <TableHead
        key={header.id}
        style={{ width: header.column.getSize() }}
        className={cn(
          header.column.getIsPinned() && "bg-background sticky right-0"
        )}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
      </TableHead>
    ))}
  </TableRow>
))}

// No TableCell (body)
{row.getVisibleCells().map((cell) => (
  <TableCell
    key={cell.id}
    style={{ width: cell.column.getSize() }}
    className={cn(
      cell.column.getIsPinned() && "bg-background sticky right-0"
    )}
  >
    {flexRender(cell.column.columnDef.cell, cell.getContext())}
  </TableCell>
))}
```

### Considerações

- **Background obrigatório**: Células sticky precisam de `bg-background` para não mostrar conteúdo abaixo
- **Shadow para separação**: Use shadow à esquerda para indicar visualmente que há conteúdo oculto
- **Linhas com background diferente**: Ajuste o background da célula sticky para corresponder (ex: linha inativa)
