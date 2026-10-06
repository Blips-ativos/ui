# Skeleton

Import: `@blips/ui/components/skeleton`

Placeholder animado (`animate-pulse rounded-md`) para estado de carregamento. É um
`<div>` sem props próprias: tamanho e forma vêm de `className`. Monte o skeleton
com a mesma silhueta do conteúdo final (avatar redondo, linhas de texto, células
de tabela) para não haver salto de layout.

Export (igual nas duas versões): `Skeleton`.

API igual na v2.x e na v3.x.

Detecção de versão: `SKILL.md`, Passo 0. Diferenças transversais entre as versões: `v2-vs-v3.md`.

Diferença só visual: fundo `bg-muted` na v3 (v2: `bg-accent`).

```tsx
import { Card, CardContent, CardHeader } from "@blips/ui/components/card";
import { Skeleton } from "@blips/ui/components/skeleton";

export function CartaoCarregando() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-square w-full" />
      </CardContent>
    </Card>
  );
}

export function LinhaCarregando() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
```

Condicional:

```tsx
{isLoading ? <Skeleton className="h-4 w-40" /> : <span>{cliente.nome}</span>}
```

## Notas

- Sem `"use client"`: pode ser usado em Server Components.
- Na sidebar, use `SidebarMenuSkeleton` (veja `sidebar.md`).

## Exemplos na docs

`skeleton-demo`, `skeleton-card`, `skeleton-text`, `skeleton-form`, `skeleton-table` (em `apps/docs/examples/`, escritos para a v3).
