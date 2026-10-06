# Badge

Import: `@blips/ui/components/badge`

Rótulo curto em linha (status, contagem, categoria). Exports: `Badge`, `badgeVariants`.

## Notas comuns

- Variantes (nas duas versões): `default` (padrão), `secondary`, `destructive`, `outline`, `ghost`, `link`. **Não existem** `success`, `warning` nem `info`: para status coloridos use `className` com tokens do tema (ex.: `bg-primary/10 text-primary`), nunca cores hardcoded fora do tema.
- Formato pílula (`rounded-full`) por padrão.
- `badgeVariants({ variant })` aplica o visual em outro elemento.
- O `data-variant` continua no DOM nas duas versões.
- Contador numérico: `className="min-w-5 px-1 font-mono tabular-nums"`.

> A API difere entre as versões (`render` vs `asChild`). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

`Badge` usa `useRender` + `mergeProps` (`useRender.ComponentProps<"span"> & VariantProps`).

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` | Visual. |
| `render` | `ReactElement \| (props, state) => ReactElement` | — | Troca o elemento (ex.: `<a>`, `Link`). Substitui o `asChild`. |

Visual base-mira: altura fixa `h-5`, `text-[0.625rem]`, ícone forçado em `size-2.5!`. `destructive` é tonal (`bg-destructive/10 text-destructive`); `outline` tem `bg-input/20`. Hover de link vale quando o badge é `<a>` (`[a]:hover`).

Ícone com espaçamento certo: marque com `data-icon="inline-start"` ou `data-icon="inline-end"`.

```tsx
import { Badge } from "@blips/ui/components/badge";
import { ArrowUpRightIcon, CheckCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";

export function Badges() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Ativo</Badge>
      <Badge variant="secondary">
        <CheckCircleIcon data-icon="inline-start" />
        Verificado
      </Badge>
      <Badge variant="destructive">Inadimplente</Badge>
      <Badge variant="outline" className="min-w-5 px-1 font-mono tabular-nums">
        20+
      </Badge>
      <Badge variant="ghost" render={<Link href="/contratos" />}>
        Ver contratos <ArrowUpRightIcon data-icon="inline-end" />
      </Badge>
    </div>
  );
}
```

## v2.x — Radix

`Badge` usa `Slot` de `@radix-ui/react-slot` quando `asChild`.

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` | Visual. |
| `asChild` | `boolean` | `false` | Renderiza o filho (ex.: `<a>`) com o visual do badge. |

Visual new-york: `px-2 py-0.5 text-xs`, ícone `size-3`, padding automático. `destructive` é sólido (`bg-destructive text-white`). Hover só quando o badge é `<a>` (`[a&]:hover`).

```tsx
import { Badge } from "@blips/ui/components/badge"
import { ArrowUpRight, SealCheck } from "@phosphor-icons/react"
import Link from "next/link"

export function Badges() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Ativo</Badge>
      <Badge variant="secondary">
        <SealCheck />
        Verificado
      </Badge>
      <Badge variant="destructive">Inadimplente</Badge>
      <Badge variant="outline" className="h-5 min-w-5 px-1 font-mono tabular-nums">
        20+
      </Badge>
      <Badge variant="ghost" asChild>
        <Link href="/contratos">
          Ver contratos <ArrowUpRight />
        </Link>
      </Badge>
    </div>
  )
}
```

`badgeVariants` em outro elemento (igual nas duas versões):

```tsx
import { badgeVariants } from "@blips/ui/components/badge"

<a href="/status" className={badgeVariants({ variant: "outline" })}>
  Ver status
</a>
```

## Exemplos na docs

`badge-demo`, `badge-variants`, `badge-icon`, `badge-link`, `badge-spinner`, `badge-colors`, `badge-secondary`, `badge-destructive`, `badge-outline` (v3).
