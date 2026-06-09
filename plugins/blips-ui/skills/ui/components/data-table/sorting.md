# Sorting

Implementação de ordenação em data tables.

## Table of Contents

- [Client-Side Sorting](#client-side-sorting)
- [Column Header com Sorting](#column-header-com-sorting)
- [Multi-Column Sorting](#multi-column-sorting)
- [Server-Side Sorting](#server-side-sorting)
- [Column APIs](#column-apis)
- [Table APIs](#table-apis)
- [Opções de Coluna](#opções-de-coluna)
- [Sorting Functions Customizadas](#sorting-functions-customizadas)
- [Estado Inicial de Sorting](#estado-inicial-de-sorting)
- [Desabilitar Sorting em Colunas Específicas](#desabilitar-sorting-em-colunas-específicas)
- [Reset Sorting](#reset-sorting)

## Client-Side Sorting

### Setup Básico

```tsx
import {
  SortingState,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const [sorting, setSorting] = useState<SortingState>([]);

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: setSorting,
  state: {
    sorting,
  },
});
```

### Sorting State Structure

```typescript
type ColumnSort = {
  id: string;      // ID da coluna
  desc: boolean;   // true = decrescente, false = crescente
};

type SortingState = ColumnSort[];
```

## Column Header com Sorting

```tsx
// data-table-column-header.tsx
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, CaretUpDown } from "@phosphor-icons/react";
import { Button } from "@blips/ui/components/button";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div>{title}</div>;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      {column.getIsSorted() === "desc" ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <CaretUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
```

### Uso na Coluna

```tsx
{
  accessorKey: "name",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Nome" />
  ),
}
```

## Multi-Column Sorting

```tsx
const table = useReactTable({
  // ... outras opções
  enableMultiSort: true,        // Habilitar multi-sort
  maxMultiSortColCount: 3,      // Máximo de colunas (opcional)
});
```

### Comportamento Padrão

- **Click**: Ordena apenas pela coluna clicada
- **Shift + Click**: Adiciona coluna ao multi-sort

### Customizar Evento de Multi-Sort

```tsx
const table = useReactTable({
  // ... outras opções
  isMultiSortEvent: (e) => e.shiftKey || e.ctrlKey, // Shift ou Ctrl
});
```

## Server-Side Sorting

### Setup Básico (State Local)

```tsx
const [sorting, setSorting] = useState<SortingState>([]);

// Query com sorting
const { data, isLoading } = api.resource.list.useQuery({
  page,
  limit: 20,
  orderBy: sorting[0]?.id,
  orderDir: sorting[0]?.desc ? "desc" : "asc",
});

const table = useReactTable({
  data: data?.data ?? [],
  columns,
  getCoreRowModel: getCoreRowModel(),
  manualSorting: true,           // IMPORTANTE: Desabilita sorting client-side
  onSortingChange: setSorting,
  state: {
    sorting,
  },
});
```

### Setup com URL (Recomendado para Server-Side)

URL-driven state habilita deep linking, back/forward navigation e bookmarking.

```tsx
// Com nuqs (recomendado)
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

const sortableColumns = ["name", "email", "createdAt", "updatedAt"] as const;
type SortableColumn = (typeof sortableColumns)[number];

export function ResourceTable() {
  const [{ sortBy, sortDir }, setSort] = useQueryStates({
    sortBy: parseAsStringEnum(sortableColumns).withDefault("name"),
    sortDir: parseAsStringEnum(["asc", "desc"] as const).withDefault("asc"),
  });

  const sorting: SortingState = [{ id: sortBy, desc: sortDir === "desc" }];

  const { data, isLoading } = api.resource.list.useQuery({
    orderBy: sortBy,
    orderDir: sortDir,
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: (updater) => {
      const newState =
        typeof updater === "function" ? updater(sorting) : updater;

      if (newState.length > 0) {
        setSort({
          sortBy: newState[0].id as SortableColumn,
          sortDir: newState[0].desc ? "desc" : "asc",
        });
      }
    },
    state: { sorting },
  });

  // ... resto do componente
}
```

### Setup com useSearchParams (Alternativa sem lib)

```tsx
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function ResourceTable() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sortBy = searchParams.get("sortBy") ?? "name";
  const sortDir = searchParams.get("sortDir") ?? "asc";

  const sorting: SortingState = [{ id: sortBy, desc: sortDir === "desc" }];

  const updateSort = (newSorting: SortingState) => {
    const params = new URLSearchParams(searchParams);

    if (newSorting.length > 0) {
      params.set("sortBy", newSorting[0].id);
      params.set("sortDir", newSorting[0].desc ? "desc" : "asc");
    } else {
      params.delete("sortBy");
      params.delete("sortDir");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: (updater) => {
      const newState =
        typeof updater === "function" ? updater(sorting) : updater;
      updateSort(newState);
    },
    state: { sorting },
  });

  // ... resto do componente
}
```

### Vantagens do URL-Driven Sorting

| Benefício | Descrição |
|-----------|-----------|
| **Deep Linking** | Usuário compartilha URL com ordenação específica |
| **Back/Forward** | Navegação do browser funciona naturalmente |
| **Bookmarking** | Usuário salva views favoritas |
| **SSR** | Estado pode ser lido no servidor para SEO |
| **Refresh** | Página recarrega mantendo ordenação |

### Schema API para Sorting

```typescript
// list.schema.ts
import { z } from "zod";

export const ZListInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  orderBy: z.enum(["createdAt", "updatedAt", "name", "email"]).optional(),
  orderDir: z.enum(["asc", "desc"]).optional().default("desc"),
});
```

### Handler com Sorting

```typescript
// list.handler.ts
import { asc, desc } from "drizzle-orm";

export const listHandler = async ({ ctx, input }: ListOptions) => {
  const { orderBy, orderDir } = input;

  const orderColumn = orderBy
    ? resources[orderBy as keyof typeof resources]
    : resources.createdAt;

  const orderFn = orderDir === "asc" ? asc : desc;

  const items = await ctx.db
    .select()
    .from(resources)
    .orderBy(orderFn(orderColumn))
    .limit(input.limit)
    .offset((input.page - 1) * input.limit);

  return { data: items };
};
```

## Column APIs

| API | Descrição |
|-----|-----------|
| `column.getCanSort()` | Verifica se pode ordenar |
| `column.getIsSorted()` | Retorna `"asc"`, `"desc"` ou `false` |
| `column.toggleSorting(desc?)` | Alterna ordenação |
| `column.clearSorting()` | Remove ordenação |
| `column.getSortIndex()` | Índice no multi-sort |
| `column.getSortingFn()` | Função de sorting ativa |

## Table APIs

| API | Descrição |
|-----|-----------|
| `table.setSorting(state)` | Define estado de sorting |
| `table.resetSorting()` | Reseta para estado inicial |
| `table.getState().sorting` | Estado atual de sorting |

## Opções de Coluna

```tsx
{
  accessorKey: "field",

  // Habilitar/desabilitar
  enableSorting: true,              // default: true

  // Direção inicial
  sortDescFirst: false,             // Começar decrescente?

  // Inverter lógica
  invertSorting: false,             // Inverter asc/desc?

  // Posição de valores undefined
  sortUndefined: "last",            // "first" | "last" | false | -1 | 1

  // Função de sorting
  sortingFn: "alphanumeric",        // ou função customizada
}
```

## Sorting Functions Customizadas

```tsx
{
  accessorKey: "priority",
  sortingFn: (rowA, rowB, columnId) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const a = priorityOrder[rowA.getValue(columnId) as string] ?? 0;
    const b = priorityOrder[rowB.getValue(columnId) as string] ?? 0;
    return a - b;
  },
}
```

## Estado Inicial de Sorting

```tsx
const table = useReactTable({
  // ... outras opções
  initialState: {
    sorting: [
      { id: "createdAt", desc: true }, // Ordenar por createdAt desc por padrão
    ],
  },
});
```

## Desabilitar Sorting em Colunas Específicas

```tsx
{
  id: "select",
  enableSorting: false,
}

{
  id: "actions",
  enableSorting: false,
}
```

## Reset Sorting

```tsx
<Button
  variant="outline"
  onClick={() => table.resetSorting()}
>
  Limpar ordenação
</Button>
```
