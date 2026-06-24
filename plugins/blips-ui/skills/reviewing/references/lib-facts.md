# Fatos verificados da @blips/ui (v2.x) — consulte ANTES de classificar

Fonte da verdade contra alucinação de revisor. Verificado no fonte da lib e em
builds reais (ver CREATION-LOG das skills installing/reviewing). Em dúvida,
confira `node_modules/@blips/ui/src/` no próprio repo revisado.

## Imports (a regra nº 1 — revisores genéricos INVERTEM isto)

- O `exports` map do pacote PUBLICA subpaths: `"./components/<nome>" →
  "./src/components/<nome>.tsx"` (fonte TSX). Subpath é a CONVENÇÃO.
- **React 18/19 → subpath** (`@blips/ui/components/button`). O barrel
  compilado (`dist/index.js`) NÃO tem diretivas `"use client"` — importar
  client components por ele QUEBRA o Next App Router (verificado:
  `grep -c '"use client"' dist/index.js` → 0).
- **React 17 → barrel** (`@blips/ui`) — exceção oficial: subpath falha o
  `tsc` contra `@types/react@17` (TS2322 LegacyRef, verificado).
- `cn` vem de `@blips/ui/lib/utils`. Subpaths exigem `moduleResolution:
  "bundler"`/`node16`+ no consumidor.

## Tema (tokens que EXISTEM — não mande "criar" o que já existe)

`@blips/ui/globals.css` define em `@theme` (todos com par `-foreground` onde
aplicável): `background`, `foreground`, `card`, `popover`, `surface`,
`primary` (`#FCBA28`, o amarelo Blips), `secondary`, `muted`, `accent`,
`destructive`, **`warning`**, **`success`**, **`info`**, `code`
(`+ -highlight/-number`), `selection`, `border`, `input`, `ring`,
`chart-1..5`, tokens de `sidebar-*`, `--radius` (+ `sm/md/lg/xl/2xl`), e fontes
**`--font-sans` (Inter)**, **`--font-display` (Quicksand)**, **`--font-mono`
(JetBrains Mono)**. ⚠️ **`--font-heading` é um ALIAS de `--font-sans` (Inter),
NÃO Quicksand** — para "anunciar" use `font-display`. Logo: `text-success`,
`font-display`, `bg-warning`, `bg-surface` etc. são classes VÁLIDAS do tema.

- Tokens são **cor completa** (oklch/hex) — `hsl(var(--x))` é violação E
  produz CSS inválido; o consumo é `var(--x)` ou a utility (`ring-primary`).
- O globals já faz `@import "tailwindcss"` e declara o próprio `@source`
  (cobre a lib em node_modules). Consumidor NÃO precisa de `@source` (a
  auto-detecção v4 cobre o app — verificado em build) nem de tailwind.config.
- Dark mode: classe `.dark` (custom-variant da lib).

## Dependências

- Vêm com a lib (não são violação como transitivas DA LIB): Radix, CVA, clsx,
  tailwind-merge, cmdk, recharts, **sonner**, vaul, date-fns, embla,
  react-day-picker, next-themes, **react-hook-form**, **zod**,
  @hookform/resolvers, @phosphor-icons/react.
- MAS: o que o CÓDIGO DO APP importa deve ser dependência DIRETA do app
  (pnpm estrito) — `import { toast } from "sonner"` sem `sonner` no
  package.json é violação (dependência fantasma).
- `lucide-react`/`react-icons`/`@heroicons` no app = violação (Phosphor é o
  padrão; weight `regular` é o default — passar `weight` é violação aviso).
  Exceção: lucide PRÉ-EXISTENTE em base legada é tolerado (código novo não).

## Componentes

- A lib tem ~52 componentes (Button, Card, Dialog, Alert, Skeleton, Spinner,
  Sheet, Table, Form, Field, Empty, Sonner/Toaster...). O `Button` NÃO tem prop `loading`
  (spinner manual + disabled é o padrão atual).
- `DialogContent` da lib JÁ embute o botão X de fechar — close customizado
  duplica; `DialogClose` existe para custom triggers.
- Componentes client da lib precisam viver sob client components no App
  Router; ícones Phosphor em Server Component vêm de
  `@phosphor-icons/react/dist/ssr`.
