---
paths:
  - "app/**/*"
description: Estrutura de pastas e arquivos para páginas Next.js App Router. Aplicada ao criar ou modificar páginas, componentes de página, contextos ou layouts.
---

<!--
Implantar SOMENTE em repos Next.js App Router (em SPAs Vite, pular esta rule).
Adaptar ao repo: o glob de `paths` (ex.: "apps/web/app/**/*" em monorepos), a
referência gold-standard (apontar uma feature exemplar local quando existir) e
a menção à camada de dados (React Query, ts-rest, server actions — o que o
repo usar).
-->

# Estrutura de Páginas — Next.js App Router

## Decisão server/client por página

`page.tsx` pode ser **server OU client** dependendo da feature:

- **Server** quando há `searchParams` para parsear (Zod), pré-render ou
  metadados dinâmicos.
- **Client** quando a página é dominada por queries client-side e estado local.

## Estrutura padrão por feature

```
feature/
├── page.tsx              # Server OU client (ver acima). Entry point — mínimo possível.
├── layout.tsx            # (opcional) Metadata. Sem auth check (vem do layout pai).
├── loading.tsx           # (opcional) Skeleton da página.
├── content.tsx           # 'use client' — Provider + layout estático. NÃO consome contextos diretamente.
├── interface.ts          # Tipos compartilhados (DTOs derivados, props internas, enums locais).
├── schema.ts             # (opcional) Zod schemas — searchParams, form bodies, validações.
│
├── _context/             # (opcional) Contextos React isolados por responsabilidade.
│   ├── feature-context.tsx          # Barrel: re-exporta hooks + Provider
│   ├── _provider.tsx                # Provider composto que reúne os contextos
│   ├── data-filters-context.tsx     # Filtros que afetam os dados (search, status, etc.)
│   ├── table-filters-context.tsx    # Filtros de tabela (sort, paginação) — opcional
│   ├── set-filters-context.tsx      # Setter estável separado dos values
│   └── query-context.tsx            # Data e loading separados (evita re-render)
│
└── _components/          # Componentes da feature, prefixados com o nome da feature
    ├── feature-page-header.tsx     # Header da página (título + actions)
    ├── feature-toolbar.tsx         # Toolbar (search, filters, count)
    ├── feature-table.tsx           # Tabela principal
    ├── feature-table-row.tsx       # Linha (quando complexa)
    ├── feature-empty-state.tsx     # Estado vazio
    └── ...
```

## Regras

### Nomenclatura

- Componentes em `_components/` **DEVEM** ser prefixados com o nome da feature
  (ex: `workspaces-table.tsx`, `tickets-table-row.tsx`).
- O nome do componente exportado **DEVE** corresponder ao nome do arquivo em
  PascalCase: `workspaces-table.tsx` → `export function WorkspacesTable()`.

### page.tsx

- **Entry point mínimo.** Renderiza `content.tsx` (quando existe) ou
  diretamente o componente raiz. Não conter lógica de UI — só roteamento,
  parsing e delegação.
- **Quando server** (com `searchParams`):

  ```tsx
  import { searchParamsSchema } from "./schema";
  import { WorkspacesContent } from "./content";

  export default async function Page({
    searchParams,
  }: { searchParams: Promise<Record<string, string | undefined>> }) {
    const parsed = searchParamsSchema.parse(await searchParams);
    return <WorkspacesContent initialFilters={parsed} />;
  }
  ```

- **Quando client** (sem `searchParams`, dominado por queries client-side):

  ```tsx
  "use client";
  import { WorkspacesContent } from "./content";
  export default function Page() { return <WorkspacesContent />; }
  ```

### content.tsx

- **`'use client'`**. Monta o Provider (se houver) e o layout estático
  memoizado.
- **NÃO consome contextos diretamente.** Componentes filhos consomem via hooks
  do `_context/`.

  ```tsx
  "use client";
  import { memo } from "react";
  import { WorkspacesProvider } from "./_context/workspaces-context";
  import { WorkspacesPageHeader } from "./_components/workspaces-page-header";
  import { WorkspacesToolbar } from "./_components/workspaces-toolbar";
  import { WorkspacesTable } from "./_components/workspaces-table";

  const Layout = memo(function Layout() {
    return (
      <div className="mx-auto w-full max-w-[1320px] px-8 py-6">
        <WorkspacesPageHeader />
        <WorkspacesToolbar />
        <WorkspacesTable />
      </div>
    );
  });

  export function WorkspacesContent() {
    return (
      <WorkspacesProvider>
        <Layout />
      </WorkspacesProvider>
    );
  }
  ```

### Contextos (`_context/`)

Use contextos somente quando a feature tem **3+ pieces de estado**
compartilhados (filtros, query data, mutations). Para pages simples, pule essa
estrutura e mantenha state local.

Quando usar:

- Todos os arquivos **DEVEM** ter o postfix `-context.tsx`.
- Cada arquivo contém: `createContext`, o Context exportado e o hook
  correspondente.
- Separar contextos por responsabilidade para evitar re-renders:
  - **Setter** separado dos values (referência estável, nunca causa re-render)
  - **DataFilters** (filtros que afetam dados) separado de **TableFilters**
    (sort, paginação)
  - **Query data** e **loading** em contextos separados quando há múltiplas
    queries
- **`_provider.tsx`** reúne os contextos num provider composto.
- **`feature-context.tsx`** é o barrel: re-exporta hooks e provider.
- Consumidores SEMPRE importam de `feature-context.tsx`, nunca dos arquivos
  individuais.
- Valores de contexto **DEVEM** ser estabilizados com `useMemo`.

### interface.ts

Use quando há **2+ tipos compartilhados** entre `content.tsx` e
`_components/*`, ou entre `_context/*`:

```ts
// interface.ts — derive dos tipos da camada de dados do repo
export type WorkspaceRow = WorkspaceDto & { _status: "active" | "orphan" };
export type StatusFilter = "all" | "active" | "orphan" | "paused";
```

### schema.ts

Use **somente quando há `searchParams`** a parsear. Quando a página é dominada
por estado local client, pule.

```ts
import { z } from "zod";

export const searchParamsSchema = z.object({
  q: z.string().optional(),
  status: z.enum(["all", "active", "orphan"]).default("all"),
});
export type SearchParams = z.infer<typeof searchParamsSchema>;
```

### loading.tsx

Opcional mas recomendado quando a página tem skeleton dedicado. O Next.js o
renderiza automaticamente durante a navegação.

```tsx
import { Skeleton } from "@blips/ui/components/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-8 py-6">
      <Skeleton className="mb-5 h-8 w-64" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
```

### Componentes (`_components/`)

- Cada componente em arquivo próprio, fazendo **uma coisa** (header, toolbar,
  table, row, badge...).
- Quando consome contexto, **importa do barrel** `../_context/feature-context.tsx`.
- Tabelas usam `Table`/`TableHeader`/`TableBody`/`TableRow`/`TableCell` de
  `@blips/ui/components/table`.
- Quando as colunas crescem (>5), extrair para `feature-table-columns.tsx`.

## Quando NÃO seguir a estrutura completa

Pages **placeholder/"Em construção"** podem ficar em um único arquivo sem
`content.tsx`/`_components/` enquanto não tiverem comportamento real. Quando a
feature ganhar comportamento, refatorar para a estrutura completa.

## Outros diretórios aceitos

- `_tabs/` — interfaces com abas
- `_views/` — visualizações alternativas (ex: list vs kanban)
- `_sections/` — seções lógicas de páginas complexas
- `_hooks/` — hooks específicos da página (ex: `use-workspaces-filters.ts`)
- `_steps/` — fluxos multi-etapa (wizard)

## Ordem interna de hooks (resumo — ver `component-construction.md` §4)

1. Utility hooks (`useRouter`, `usePathname`, `useContext`, hooks customizados)
2. State hooks (`useState`, `useReducer`)
3. Request hooks (`useQuery`, `useMutation`)
4. Constantes/derivados (`useMemo`, `useCallback`)
5. Effects (`useEffect`, `useLayoutEffect`) — somente sync com sistemas externos
