# Pagination

Implementação de paginação em data tables.

## Table of Contents

- [Decision Tree: Qual Estratégia Usar?](#decision-tree-qual-estratégia-usar)
- [Client-Side Pagination](#client-side-pagination)
- [Componente de Paginação Completo](#componente-de-paginação-completo)
- [Paginação Simples](#paginação-simples)
- [Server-Side Pagination](#server-side-pagination)
- [Table APIs](#table-apis)
- [Opções de Configuração](#opções-de-configuração)
- [Reset de Página ao Filtrar](#reset-de-página-ao-filtrar)
- [Paginação com URL Params](#paginação-com-url-params)
- [Paginação com Cursor (Datasets Grandes)](#paginação-com-cursor-datasets-grandes)

## Decision Tree: Qual Estratégia Usar?

```
Quantidade de registros esperada?
│
├── < 100 registros
│   └── ✅ Client-Side Pagination
│       - Dados carregam de uma vez
│       - Sorting/filtering instantâneo
│       - Menor complexidade
│
├── 100 - 10.000 registros
│   └── ✅ Server-Side Pagination (Offset/Limit)
│       - Carrega página por página
│       - Suporta deep linking (URL params)
│       - Boa performance para datasets moderados
│
└── > 10.000 registros ou dados que mudam frequentemente
    └── ✅ Cursor-Based Pagination
        - Evita problema de "skipping pages"
        - Performance O(1) vs O(n) do offset
        - Ideal para feeds, logs, timelines
```

### Comparação de Estratégias

| Critério | Client-Side | Server-Side (Offset) | Cursor-Based |
|----------|-------------|----------------------|--------------|
| **Performance inicial** | Mais lenta | Rápida | Rápida |
| **Navegação entre páginas** | Instantânea | Requer request | Requer request |
| **Deep linking** | Não necessário | Sim | Difícil |
| **Jump to page** | Sim | Sim | Não |
| **Consistência com mudanças** | N/A | Pode pular/duplicar | Consistente |
| **Complexidade** | Baixa | Média | Alta |

## Client-Side Pagination

### Setup Básico

```tsx
import {
  PaginationState,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const [pagination, setPagination] = useState<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
});

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onPaginationChange: setPagination,
  state: {
    pagination,
  },
});
```

### Pagination State

```typescript
type PaginationState = {
  pageIndex: number;  // Página atual (0-based)
  pageSize: number;   // Itens por página
};
```

## Componente de Paginação Completo

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
      {/* Contagem de selecionados */}
      {showSelectedCount && (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
      )}

      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Seletor de tamanho de página */}
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

        {/* Indicador de página */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>

        {/* Botões de navegação */}
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

## Paginação Simples

```tsx
// Paginação simples com botões de anterior/próximo
{pagination && pagination.totalPages > 1 && (
  <div className="flex items-center justify-between">
    <p className="text-sm text-muted-foreground">
      Mostrando {data.length} de {pagination.total} itens
    </p>
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Anterior
      </Button>
      <span className="text-sm text-muted-foreground">
        Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Próxima
      </Button>
    </div>
  </div>
)}
```

## Server-Side Pagination

### Setup

```tsx
const [pagination, setPagination] = useState<PaginationState>({
  pageIndex: 0,
  pageSize: 20,
});

// Query com paginação server-side
const { data, isLoading } = api.resource.list.useQuery({
  page: pagination.pageIndex + 1,  // API usa 1-based
  limit: pagination.pageSize,
});

const table = useReactTable({
  data: data?.data ?? [],
  columns,
  getCoreRowModel: getCoreRowModel(),
  manualPagination: true,            // IMPORTANTE
  pageCount: data?.pagination?.totalPages ?? -1,
  rowCount: data?.pagination?.total,
  onPaginationChange: setPagination,
  state: {
    pagination,
  },
});
```

### Schema API para Paginação

```typescript
// list.schema.ts
export const ZListInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

export type TListInputSchema = z.infer<typeof ZListInputSchema>;
```

### Handler com Paginação

```typescript
// list.handler.ts
export const listHandler = async ({ ctx, input }: ListOptions) => {
  const { page, limit } = input;
  const offset = (page - 1) * limit;

  // Query com count
  const [items, countResult] = await Promise.all([
    ctx.db
      .select()
      .from(resources)
      .limit(limit)
      .offset(offset),
    ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(resources),
  ]);

  const total = countResult[0]?.count ?? 0;
  const totalPages = Math.ceil(total / limit);

  return {
    data: items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};
```

### Tipo de Resposta

```typescript
// types.ts
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

## Table APIs

| API | Descrição |
|-----|-----------|
| `table.setPageIndex(index)` | Ir para página (0-based) |
| `table.setPageSize(size)` | Alterar tamanho da página |
| `table.previousPage()` | Página anterior |
| `table.nextPage()` | Próxima página |
| `table.firstPage()` | Primeira página |
| `table.lastPage()` | Última página |
| `table.getCanPreviousPage()` | Pode ir para anterior? |
| `table.getCanNextPage()` | Pode ir para próxima? |
| `table.getPageCount()` | Total de páginas |
| `table.getRowCount()` | Total de linhas |
| `table.resetPagination()` | Resetar paginação |

## Opções de Configuração

```tsx
const table = useReactTable({
  // ... outras opções

  // Client-side
  getPaginationRowModel: getPaginationRowModel(),

  // Server-side
  manualPagination: true,
  pageCount: totalPages,        // Ou -1 se desconhecido
  rowCount: totalRows,          // Total de linhas

  // Auto-reset
  autoResetPageIndex: true,     // Reset ao mudar dados (default: true)

  // Estado inicial
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: 20,
    },
  },
});
```

## Reset de Página ao Filtrar

```tsx
// Resetar página quando filtros mudam
useEffect(() => {
  table.setPageIndex(0);
}, [columnFilters, globalFilter]);

// Ou com state controlado
useEffect(() => {
  setPagination((prev) => ({ ...prev, pageIndex: 0 }));
}, [debouncedSearch, statusFilter]);
```

## Paginação com URL Params

```tsx
import { useQueryUrl } from "@/hooks/use-query-url";

type SearchParams = {
  page: number;
  pageSize: number;
};

export function ResourceTable() {
  const { params, push } = useQueryUrl<SearchParams>();

  const pagination: PaginationState = {
    pageIndex: (params.page ?? 1) - 1,
    pageSize: params.pageSize ?? 20,
  };

  const table = useReactTable({
    // ... outras opções
    manualPagination: true,
    state: { pagination },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater(pagination)
          : updater;

      push({
        page: newState.pageIndex + 1,
        pageSize: newState.pageSize,
      });
    },
  });
}
```

## Paginação com Cursor (Datasets Grandes)

Para datasets muito grandes (> 10.000 registros) ou dados que mudam frequentemente, cursor-based pagination evita o problema de "offset drift".

### Por que Cursor é Melhor para Grandes Datasets?

**Problema do Offset:**
```
Página 1: items 1-10
Página 2: items 11-20 (offset 10)

→ Item 5 é deletado enquanto usuário está na página 1

Página 2: items 10-19 (item 10 foi "pulado", item 11 aparece duas vezes se voltar)
```

**Solução com Cursor:**
```
Página 1: items 1-10, cursor = id do item 10
Página 2: WHERE id > cursor → sempre itens após o último visto
```

### Schema API

```typescript
// list.schema.ts
export const ZCursorListInputSchema = z.object({
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(), // ID do último item visto
  direction: z.enum(["forward", "backward"]).default("forward"),
});
```

### Handler com Cursor

```typescript
// list.handler.ts
import { asc, desc, gt, lt } from "drizzle-orm";

export const listHandler = async ({ ctx, input }: ListOptions) => {
  const { limit, cursor, direction } = input;

  const orderFn = direction === "forward" ? asc : desc;
  const compareFn = direction === "forward" ? gt : lt;

  const items = await ctx.db
    .select()
    .from(resources)
    .where(cursor ? compareFn(resources.id, cursor) : undefined)
    .orderBy(orderFn(resources.id))
    .limit(limit + 1); // +1 para detectar se há mais

  const hasMore = items.length > limit;
  const data = hasMore ? items.slice(0, -1) : items;

  return {
    data,
    nextCursor: hasMore ? data[data.length - 1]?.id : undefined,
    prevCursor: cursor, // Para navegação backward
    hasMore,
  };
};
```

### Componente com Infinite Scroll

```tsx
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { api } from "@/lib/api";

export function InfiniteResourceList() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.resource.infiniteList.useInfiniteQuery(
    { limit: 20 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  // Auto-fetch quando scroll chega no fim
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const items = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div>
      {items.map((item) => (
        <ResourceCard key={item.id} resource={item} />
      ))}

      {/* Sentinel element para intersection observer */}
      <div ref={ref} className="h-10">
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
}
```

### Cursor com TanStack Table (Load More)

```tsx
"use client";

export function CursorPaginatedTable() {
  const [allData, setAllData] = useState<Resource[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();

  const { data, isLoading } = api.resource.list.useQuery({
    limit: 20,
    cursor,
  });

  // Acumular dados de todas as páginas
  useEffect(() => {
    if (data?.data) {
      setAllData((prev) =>
        cursor ? [...prev, ...data.data] : data.data
      );
    }
  }, [data, cursor]);

  const table = useReactTable({
    data: allData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <Table>{/* ... render table ... */}</Table>

      {data?.hasMore && (
        <Button
          onClick={() => setCursor(data.nextCursor)}
          disabled={isLoading}
        >
          {isLoading ? "Carregando..." : "Carregar mais"}
        </Button>
      )}
    </div>
  );
}
```

### Quando NÃO Usar Cursor

- Quando usuário precisa "pular" para página específica
- Quando deep linking para página específica é necessário
- Datasets pequenos (< 1000 registros)
