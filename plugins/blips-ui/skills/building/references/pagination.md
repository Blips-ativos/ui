# Pagination

Import: `@blips/ui/components/pagination`

Navegação entre páginas de uma lista. Em Data Table, a paginação costuma ser só
"Anterior / Próxima" com contagem (veja `components/data-table/pagination.md`);
use este componente quando houver páginas numeradas.

Exports (iguais nas duas versões): `Pagination`, `PaginationContent`,
`PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`,
`PaginationEllipsis`.

## Notas comuns

- `Pagination` é um `<nav aria-label="pagination">`; `PaginationContent` um `<ul>`; `PaginationItem` um `<li>`.
- `PaginationLink` renderiza um `<a>` com visual de Button: `isActive` (variante `outline` + `aria-current="page"`; senão `ghost`) e `size` (padrão `"icon"`). Aceita as props de `<a>` (`href`, `onClick`).
- `PaginationPrevious`/`PaginationNext` usam `size="default"` e escondem o texto abaixo de `sm`.
- `PaginationEllipsis` mostra `…` com `sr-only` "More pages".
- Não há `asChild`/`render` no `PaginationLink`: para paginação controlada por estado, use `href="#"` + `onClick` com `preventDefault()`, ou `href` com a query (`?page=2`).
- Ícones Phosphor (carets e três pontos).

> A API difere entre as versões. Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente. Diferenças transversais em `v2-vs-v3.md`.

## v3.x — Base UI

- `PaginationLink` é `<Button nativeButton={false} render={<a … />}>` (Button Base UI). O elemento final continua `<a>`.
- **`PaginationPrevious` e `PaginationNext` têm a prop `text`** (padrão `"Previous"`/`"Next"`): traduza com `text="Anterior"` / `text="Próxima"`.
- Visual: `PaginationContent gap-0.5`; tamanhos do Button v3 (`icon` = `size-7`, `default` = `h-7`); ellipsis `size-7`. Os ícones de Anterior/Próxima não giram em RTL.

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@blips/ui/components/pagination";

export function Paginacao({
  pagina,
  totalPaginas,
  onMudar,
}: {
  pagina: number;
  totalPaginas: number;
  onMudar: (pagina: number) => void;
}) {
  const ir = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (p >= 1 && p <= totalPaginas) onMudar(p);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" text="Anterior" onClick={ir(pagina - 1)} />
        </PaginationItem>
        {[1, 2, 3].map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href="#" isActive={p === pagina} onClick={ir(p)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" text="Próxima" onClick={ir(pagina + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## v2.x — Radix

- `PaginationLink` é um `<a>` com `buttonVariants` aplicado.
- `PaginationPrevious`/`PaginationNext` **não têm `text`**: o rótulo é fixo em inglês ("Previous"/"Next"). Para pt-BR, monte com `PaginationLink` direto.
- Visual: `gap-1`; tamanhos do Button v2 (`icon` = `size-9`, `default` = `h-9`); ellipsis `size-9`.

```tsx
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@blips/ui/components/pagination"

export function Paginacao({ pagina, onMudar }: { pagina: number; onMudar: (p: number) => void }) {
  const ir = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    onMudar(p)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" size="default" className="gap-1 px-2.5" aria-label="Página anterior" onClick={ir(pagina - 1)}>
            <CaretLeft />
            <span className="hidden sm:block">Anterior</span>
          </PaginationLink>
        </PaginationItem>
        {[1, 2, 3].map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href="#" isActive={p === pagina} onClick={ir(p)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="default" className="gap-1 px-2.5" aria-label="Próxima página" onClick={ir(pagina + 1)}>
            <span className="hidden sm:block">Próxima</span>
            <CaretRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
```

## Exemplos na docs

`pagination-demo`, `pagination-simple`, `pagination-select` (em `apps/docs/examples/`, escritos para a v3).
