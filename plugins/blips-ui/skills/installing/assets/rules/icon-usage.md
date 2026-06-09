---
paths:
  - "**/*.tsx"
description: Padrão de ícones — @phosphor-icons/react (weight regular), nunca lucide-react; entrypoint /dist/ssr em Server Components.
---

# Ícones — Phosphor

- Único pacote de ícones do repo: **`@phosphor-icons/react`** (dep direta).
- Weight: `regular` é o default — **não passe a prop `weight`**.
- **Server Components (Next App Router)**: importe de
  `@phosphor-icons/react/dist/ssr` — o entrypoint padrão usa Context e quebra
  em RSC. Em client components (`"use client"`), use `@phosphor-icons/react`.
- **Nunca** `lucide-react`, `react-icons` ou `@heroicons/*` em código novo.
  - Repo SEM lucide legado + Biome: bloqueie com `noRestrictedImports` (como
    no repo da própria lib).
  - Repo COM lucide em código legado: NÃO adicione o bloqueio (quebraria o
    lint do código existente) e não remova o pacote — a regra vale para código
    novo; a migração do legado é gradual.
- Os nomes são os do Phosphor — não traduza de Lucide:

| Phosphor (use) | Lucide (não existe aqui) |
| --- | --- |
| `CaretDown` | ChevronDown |
| `MagnifyingGlass` | Search |
| `DotsThree` / `DotsThreeVertical` | MoreHorizontal / MoreVertical |
| `X`, `Check`, `Circle`, `Plus` | (mesmos nomes) |
| `ArrowSquareOut` | ExternalLink |
| `WarningCircle` | AlertCircle |

- Tamanho: dentro de componentes da lib o svg já é dimensionado
  (`[&_svg]`); fora deles, use classe (`size-4`) ou a prop `size`.
