# Row Selection

Implementação de seleção de linhas em data tables.

## Table of Contents

- [Setup Básico](#setup-básico)
- [Coluna de Seleção (Checkbox)](#coluna-de-seleção-checkbox)
- [Custom Row ID](#custom-row-id)
- [Seleção Condicional](#seleção-condicional)
- [Single Selection (Radio)](#single-selection-radio)
- [Row Click Selection](#row-click-selection)
- [Bulk Actions com Seleção](#bulk-actions-com-seleção)
- [Row APIs](#row-apis)
- [Table APIs](#table-apis)
- [Opções de Configuração](#opções-de-configuração)
- [Seleção Cross-Page (Server-Side Pagination)](#seleção-cross-page-server-side-pagination)
- [Exibir Contagem de Selecionados](#exibir-contagem-de-selecionados)
- [Estilo Visual para Linhas Selecionadas](#estilo-visual-para-linhas-selecionadas)

## Setup Básico

```tsx
import {
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";

const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  onRowSelectionChange: setRowSelection,
  state: {
    rowSelection,
  },
});
```

### Row Selection State

```typescript
type RowSelectionState = Record<string, boolean>;

// Exemplo:
{
  "row-id-1": true,
  "row-id-2": true,
}
```

## Coluna de Seleção (Checkbox)

```tsx
import { Checkbox } from "@blips/ui/components/checkbox";

// Na definição de colunas
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

## Custom Row ID

Por padrão, TanStack Table usa o índice da linha. Para usar um ID customizado:

```tsx
const table = useReactTable({
  data,
  columns,
  getRowId: (row) => row.id, // Usar o ID do registro
  // ... outras opções
});
```

## Seleção Condicional

### Desabilitar Seleção para Linhas Específicas

```tsx
const table = useReactTable({
  // ... outras opções
  enableRowSelection: (row) => {
    // Não permitir selecionar itens inativos
    return row.original.status !== "inactive";
  },
});
```

### Checkbox com Estado Disabled

```tsx
cell: ({ row }) => (
  <Checkbox
    checked={row.getIsSelected()}
    onCheckedChange={(value) => row.toggleSelected(!!value)}
    disabled={!row.getCanSelect()}
    aria-label="Selecionar linha"
  />
),
```

## Single Selection (Radio)

```tsx
const table = useReactTable({
  // ... outras opções
  enableMultiRowSelection: false, // Apenas uma linha por vez
});
```

### Com Radio Button

```tsx
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group";

// Na coluna
{
  id: "select",
  header: () => null, // Sem header para single selection
  cell: ({ row, table }) => (
    <RadioGroupItem
      value={row.id}
      checked={row.getIsSelected()}
      onClick={() => {
        table.resetRowSelection();
        row.toggleSelected();
      }}
    />
  ),
  enableSorting: false,
  enableHiding: false,
}
```

## Row Click Selection

```tsx
<TableRow
  key={row.id}
  data-state={row.getIsSelected() && "selected"}
  onClick={() => row.toggleSelected()}
  className="cursor-pointer"
>
  {/* cells */}
</TableRow>
```

## Bulk Actions com Seleção

```tsx
// Na toolbar
export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelection = selectedRows.length > 0;

  return (
    <div className="flex items-center justify-between">
      {hasSelection ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selectedRows.length} item(s) selecionado(s)
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Ação em lote
              const ids = selectedRows.map((row) => row.original.id);
              handleBulkAction(ids);
            }}
          >
            Ação em lote
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              const ids = selectedRows.map((row) => row.original.id);
              handleBulkDelete(ids);
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Excluir selecionados
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetRowSelection()}
          >
            Limpar seleção
          </Button>
        </div>
      ) : (
        // Filtros normais quando não há seleção
        <DataTableFilters table={table} />
      )}
    </div>
  );
}
```

## Row APIs

| API | Descrição |
|-----|-----------|
| `row.getIsSelected()` | Está selecionada? |
| `row.getCanSelect()` | Pode ser selecionada? |
| `row.toggleSelected(value?)` | Alternar seleção |
| `row.getToggleSelectedHandler()` | Handler para onChange |

## Table APIs

| API | Descrição |
|-----|-----------|
| `table.getSelectedRowModel()` | Linhas selecionadas |
| `table.getFilteredSelectedRowModel()` | Selecionadas após filtro |
| `table.getIsAllRowsSelected()` | Todas selecionadas? |
| `table.getIsAllPageRowsSelected()` | Todas da página? |
| `table.getIsSomeRowsSelected()` | Algumas selecionadas? |
| `table.getIsSomePageRowsSelected()` | Algumas da página? |
| `table.toggleAllRowsSelected(value?)` | Alternar todas |
| `table.toggleAllPageRowsSelected(value?)` | Alternar página |
| `table.resetRowSelection()` | Limpar seleção |

## Opções de Configuração

```tsx
const table = useReactTable({
  // ... outras opções

  // Habilitar seleção
  enableRowSelection: true,             // ou função (row) => boolean

  // Single ou multi selection
  enableMultiRowSelection: true,        // default: true

  // Selecionar sub-rows automaticamente
  enableSubRowSelection: true,          // default: true

  // Callback de mudança
  onRowSelectionChange: setRowSelection,

  // Estado
  state: {
    rowSelection,
  },
});
```

## Seleção Cross-Page (Server-Side Pagination)

Quando usando paginação server-side, o TanStack Table só conhece os dados da página atual. Para manter seleção entre páginas, é necessário gerenciar os IDs selecionados externamente.

### Hook para Seleção Cross-Page

```tsx
// hooks/use-cross-page-selection.ts
import { useState, useCallback, useMemo } from "react";
import { RowSelectionState } from "@tanstack/react-table";

interface UseCrossPageSelectionOptions<T> {
  data: T[];
  getRowId: (row: T) => string;
}

export function useCrossPageSelection<T>({
  data,
  getRowId,
}: UseCrossPageSelectionOptions<T>) {
  // Set de IDs selecionados (persiste entre páginas)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Converter Set para RowSelectionState (apenas itens da página atual)
  const rowSelection = useMemo<RowSelectionState>(() => {
    const selection: RowSelectionState = {};
    data.forEach((row) => {
      const id = getRowId(row);
      if (selectedIds.has(id)) {
        selection[id] = true;
      }
    });
    return selection;
  }, [data, selectedIds, getRowId]);

  // Handler para mudanças de seleção
  const onRowSelectionChange = useCallback(
    (updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;

      setSelectedIds((prev) => {
        const next = new Set(prev);

        // Processar mudanças apenas para itens da página atual
        data.forEach((row) => {
          const id = getRowId(row);
          if (newSelection[id]) {
            next.add(id);
          } else {
            next.delete(id);
          }
        });

        return next;
      });
    },
    [data, getRowId, rowSelection]
  );

  // Helpers
  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const selectAll = useCallback(
    (ids: string[]) => setSelectedIds(new Set(ids)),
    []
  );

  const getSelectedIds = useCallback(
    () => Array.from(selectedIds),
    [selectedIds]
  );

  return {
    rowSelection,
    onRowSelectionChange,
    selectedIds,
    selectedCount: selectedIds.size,
    clearSelection,
    selectAll,
    getSelectedIds,
  };
}
```

### Uso do Hook

```tsx
"use client";

import { useCrossPageSelection } from "@/hooks/use-cross-page-selection";

export function ResourceTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const { data, isLoading } = api.resource.list.useQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const resources = data?.data ?? [];

  const {
    rowSelection,
    onRowSelectionChange,
    selectedCount,
    clearSelection,
    getSelectedIds,
  } = useCrossPageSelection({
    data: resources,
    getRowId: (row) => row.id,
  });

  const table = useReactTable({
    data: resources,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    manualPagination: true,
    pageCount: data?.pagination?.totalPages ?? -1,
    onPaginationChange: setPagination,
    onRowSelectionChange,
    state: {
      pagination,
      rowSelection,
    },
  });

  // Bulk action usando IDs selecionados
  const handleBulkDelete = () => {
    const ids = getSelectedIds();
    deleteMutation.mutate({ ids });
  };

  return (
    <div>
      {selectedCount > 0 && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <span className="text-sm">
            {selectedCount} item(s) selecionado(s) em todas as páginas
          </span>
          <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
            Excluir selecionados
          </Button>
          <Button size="sm" variant="ghost" onClick={clearSelection}>
            Limpar
          </Button>
        </div>
      )}
      {/* ... tabela */}
    </div>
  );
}
```

### Selecionar Todos (Todas as Páginas)

Para selecionar todos os itens de todas as páginas, é necessário buscar todos os IDs:

```tsx
const { data: allIds } = api.resource.getAllIds.useQuery(
  { search, status }, // Mesmos filtros da listagem
  { enabled: false }  // Query manual
);

const handleSelectAll = async () => {
  const result = await utils.resource.getAllIds.fetch({ search, status });
  selectAll(result.ids);
};

// Na coluna de seleção
{
  id: "select",
  header: ({ table }) => (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar página"
      />
      {/* Opção de selecionar todos */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => table.toggleAllPageRowsSelected(true)}>
            Selecionar página
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSelectAll}>
            Selecionar todos ({totalCount})
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={clearSelection}>
            Limpar seleção
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  // ... cell
}
```

### Quando Usar Cada Abordagem

| Cenário | Abordagem |
|---------|-----------|
| Client-side pagination | State local (`useState`) |
| Server-side, seleção só na página atual | State local |
| Server-side, seleção cross-page | Hook `useCrossPageSelection` |
| Server-side, "selecionar todos" | Hook + endpoint getAllIds |

## Exibir Contagem de Selecionados

```tsx
<div className="flex-1 text-sm text-muted-foreground">
  {table.getFilteredSelectedRowModel().rows.length} de{" "}
  {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
</div>
```

## Estilo Visual para Linhas Selecionadas

```tsx
<TableRow
  key={row.id}
  data-state={row.getIsSelected() && "selected"}
  className={cn(
    row.getIsSelected() && "bg-muted"
  )}
>
```

O atributo `data-state="selected"` pode ser usado com CSS:

```css
/* No globals.css ou componente Table */
[data-state="selected"] {
  @apply bg-muted;
}
```
