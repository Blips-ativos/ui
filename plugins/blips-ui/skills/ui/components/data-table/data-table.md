# Data Table - Reference

Guide for building data tables using TanStack Table v8 with shadcn/ui components.

## Sub-References

| Resource | File | When to use |
|----------|------|-------------|
| Setup | [setup-reference.md](setup-reference.md) | Installation, initial structure, hooks and helpers |
| Columns | [columns-reference.md](columns-reference.md) | Column definition with `meta.title` |
| Sorting | [sorting-reference.md](sorting-reference.md) | Client/server-side and URL-driven sorting |
| Filtering | [filtering-reference.md](filtering-reference.md) | Filters, debounce and `useDeferredValue` |
| Pagination | [pagination-reference.md](pagination-reference.md) | Client/server/cursor-based pagination |
| Row Selection | [row-selection-reference.md](row-selection-reference.md) | Row selection and cross-page selection |
| Visibility | [visibility-reference.md](visibility-reference.md) | Column toggle and persistence |
| Toolbar | [toolbar-reference.md](toolbar-reference.md) | Toolbar components |

---

## Estrutura de Arquivos

```
app/(protected)/(manager)/{resource}/
├── page.tsx                           # Server component
└── _components/
    ├── {resource}-table.tsx           # Client component principal
    ├── {resource}-table-skeleton.tsx  # Loading skeleton (rows)
    ├── columns.tsx                    # Definição de colunas
    ├── {resource}-toolbar.tsx         # Filtros e ações
    └── {resource}-actions-dropdown.tsx # Ações por linha
```

---

## Exemplo Mínimo

```tsx
"use client";

import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@blips/ui/components/table";

export function DataTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
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
    </Table>
  );
}
```

---

## Imports Padrão

```tsx
// TanStack Table
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// shadcn/ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@blips/ui/components/table";

// API
import { api } from "@/lib/api";
```

---

## Memoização (CRÍTICO)

`useReactTable` re-renderiza o componente inteiro quando qualquer valor em `state` muda de referência. Todos os valores passados ao `useReactTable` DEVEM ser estáveis:

### Obrigatório memoizar

| Valor | Como memoizar |
|-------|---------------|
| `data` (array de itens) | `React.useMemo(() => data?.items ?? [], [data])` |
| `state.sorting` | `React.useMemo<SortingState>(() => [...], [sortBy, sortDirection])` |
| `state.columnPinning` | `React.useMemo(() => ({ right: ['actions'] }), [])` |
| `state` (objeto completo) | `React.useMemo(() => ({ sorting, rowSelection, ... }), [sorting, rowSelection, ...])` |
| `onSortingChange` | `React.useCallback(...)` com deps estáveis |
| `onPageIndexChange` / `onPageSizeChange` | `React.useCallback(...)` |
| `columns` | `React.useMemo(() => getColumns(...), [handlers])` |
| Column handlers (`handleEdit`, etc) | `React.useCallback` com refs para dados |

### Exemplo correto

```tsx
// Data estável — não recria [] a cada render
const items = React.useMemo(() => data?.items ?? [], [data])

// Sorting estável — não recria objeto a cada render
const sortingState = React.useMemo<SortingState>(
  () => [{ id: filters.sortBy, desc: filters.sortDirection === 'desc' }],
  [filters.sortBy, filters.sortDirection]
)

// Handler estável
const handleSortingChange = React.useCallback(
  (updater) => {
    const [{ id: sortBy, desc }] = functionalUpdate(updater, sortingState)
    setFilters({ sortBy, sortDirection: desc ? 'desc' : 'asc' })
  },
  [sortingState, setFilters]
)

// State estável
const columnPinning = React.useMemo(() => ({ right: ['actions'] }), [])
const tableState = React.useMemo(
  () => ({ sorting: sortingState, rowSelection, columnVisibility, columnPinning }),
  [sortingState, rowSelection, columnVisibility, columnPinning]
)

const table = useReactTable({
  data: items,
  columns,
  state: tableState,
  onSortingChange: handleSortingChange,
  // ...
})
```

### Anti-patterns que causam loop infinito

```tsx
// ERRADO — cria novo array a cada render
const items = data?.items ?? []

// ERRADO — cria novo objeto a cada render
const sortingState: SortingState = [{ id: sortBy, desc: direction === 'desc' }]

// ERRADO — state inline recria objeto a cada render
state: {
  sorting: [{ id: sortBy, desc: true }],
  columnPinning: { right: ['actions'] },
}

// ERRADO — callback inline no onSortingChange
onSortingChange: (updater) => { ... }
```

---

## Diretrizes

### FAÇA

- **Memoize TUDO que é passado ao `useReactTable`** - Evita loops infinitos de re-render
- **Defina `meta.title` em todas as colunas** - Fonte única de verdade para títulos
- **Use skeleton inline nas rows** - Mantém toolbar funcional durante loading
- **Use `useDeferredValue` para debounce** - React 18+ integrado
- **Use URL params para server-side state** - Habilita deep linking
- **Use `usePersistedVisibility`** - Persiste preferências do usuário
- **Defina `getRowId`** - Essencial para seleção funcionar corretamente
- **Use server-side para listas grandes** - `manualPagination: true`
- **Use `cn()` para classes condicionais** - Linhas inativas, selecionadas

### NÃO FAÇA

- **Não passe objetos inline ao `useReactTable`** - Causa loop infinito de re-renders
- **Não duplique títulos** - Use apenas `meta.title`, não prop separada
- **Não use client-side para > 100 itens** - Performance ruim
- **Não esqueça keys** - `key={row.id}`, `key={cell.id}`
- **Não misture paginação client/server** - Escolha uma
- **Não use optimistic updates para tudo** - Apenas para ações frequentes
- **Não ignore loading states** - Sempre mostre feedback visual

---

## Quando Usar

- Criar nova listagem de recursos
- Adicionar ordenação/filtros a tabela existente
- Padronizar tabelas legadas para novo padrão
- Implementar paginação server-side
- Adicionar seleção de linhas para bulk actions

---

## Arquivos de Referência

- `packages/ui/src/components/table.tsx` - Primitivas de tabela shadcn/ui (`@blips/ui`)
