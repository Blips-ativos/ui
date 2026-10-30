# Avatar

Import: `@blips/ui/components/avatar`

Imagem de perfil com fallback (iniciais ou ícone) enquanto carrega ou quando falha.

Exports (iguais nas duas versões): `Avatar`, `AvatarImage`, `AvatarFallback`,
`AvatarBadge`, `AvatarGroup`, `AvatarGroupCount`.

## Notas comuns

- `Avatar` aceita `size?: "default" | "sm" | "lg"` (`data-size`): `size-8` (default), `size-6` (sm), `size-10` (lg). Prefira a prop a `className="size-…"`.
- `AvatarBadge`: indicador no canto inferior direito (status, ícone); o tamanho acompanha o `size` do Avatar e o svg some no `sm`.
- `AvatarGroup`: empilha com `-space-x-2` e anel `ring-background` em cada avatar. `AvatarGroupCount`: bolha "+N" no fim do grupo, acompanha o tamanho dos avatares.
- Quadrado arredondado: `className="rounded-lg"` no `Avatar` (e no `AvatarImage`/`AvatarFallback`, que também são `rounded-full`).
- `AvatarBadge`, `AvatarGroup` e `AvatarGroupCount` são HTML simples nas duas versões.

> A API difere entre as versões nas props das primitivas (`delay` vs `delayMs`). Detecte a versão no `package.json` (ver `SKILL.md`, Passo 0) e leia só a seção correspondente.

## v3.x — Base UI

Primitiva: `@base-ui/react/avatar`.

| Componente | Props relevantes |
|---|---|
| `Avatar` | `size`, `render`. Sem `overflow-hidden`; anel interno via `::after` (`after:border after:border-border`). |
| `AvatarImage` | `src`, `alt`, `onLoadingStatusChange(status)` (`"idle" \| "loading" \| "loaded" \| "error"`), `keepMounted`. Estilo `rounded-full object-cover`. |
| `AvatarFallback` | `delay` (ms antes de mostrar o fallback, evita piscar). |

`AvatarGroupCount` usa `text-xs/relaxed`.

```tsx
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@blips/ui/components/avatar";
import { CheckIcon } from "@phosphor-icons/react";

export function Responsaveis() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback delay={300}>CN</AvatarFallback>
        <AvatarBadge>
          <CheckIcon />
        </AvatarBadge>
      </Avatar>

      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
```

## v2.x — Radix

Primitiva: `@radix-ui/react-avatar`.

| Componente | Props relevantes |
|---|---|
| `Avatar` | `size`, `asChild`. `overflow-hidden rounded-full`. |
| `AvatarImage` | `src`, `alt`, `onLoadingStatusChange(status)`. Estilo `aspect-square size-full`. |
| `AvatarFallback` | `delayMs` (ms antes de mostrar o fallback). |

`AvatarGroupCount` usa `text-sm`.

```tsx
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@blips/ui/components/avatar"
import { Check } from "@phosphor-icons/react"

export function Responsaveis() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback delayMs={300}>CN</AvatarFallback>
        <AvatarBadge>
          <Check />
        </AvatarBadge>
      </Avatar>

      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
```

## Exemplos na docs

`avatar-demo`, `avatar-basic`, `avatar-size`, `avatar-badge`, `avatar-badge-icon`, `avatar-group`, `avatar-group-count`, `avatar-group-count-icon`, `avatar-dropdown`, `avatar-empty` (v3).
