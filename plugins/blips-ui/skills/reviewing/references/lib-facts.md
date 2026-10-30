# Fatos verificados da @blips/ui (v2.x e v3.x) — consulte ANTES de classificar

Fonte da verdade contra alucinação de revisor. Verificado no fonte da lib e em
builds reais (ver CREATION-LOG das skills installing/reviewing). Em dúvida,
confira `node_modules/@blips/ui/src/` no próprio repo revisado.

## Duas linhas da lib — detecte antes de tudo

| | v2.x — Radix | v3.x — Base UI |
|---|---|---|
| Primitivas | `@radix-ui/react-*` + `vaul` (Drawer) | `@base-ui/react` (estilo shadcn base-mira) |
| Troca de elemento | `asChild` | `render={<El />}` (+ `nativeButton={false}` em Button não-button) |
| Estados no DOM | `data-state="open\|closed\|checked…"` | `data-open`, `data-closed`, `data-checked`, `data-popup-open`, `data-panel-open`, `data-pressed` |
| Ícones Phosphor | sem sufixo (`CaretDown`) ou com (`CaretDownIcon`) | com sufixo `Icon` (sem sufixo é `@deprecated`) |
| recharts | 2.15.x | 3.10.x |
| Componentes | 52 | 63 (+ attachment, bubble, combobox, direction, item, marker, message, message-scroller, native-select, questionnaire, toast) |
| Densidade | new-york (`text-sm`, Button `h-9`, Card `py-6`) | base-mira (`text-xs`, Button `h-7`, Card 16px) |

Como detectar: `node_modules/@blips/ui/package.json` — `dependencies` com
`@base-ui/react` → v3.x; com `@radix-ui/*` → v2.x. Sem isso, a `version` instalada
(ou o range em `dependencies["@blips/ui"]` do app): `2.x` → v2.x, `3.x` → v3.x. O
`check.mjs` faz essa detecção e devolve `blipsUi.track`. A lista completa de
diferenças está em `../../building/references/v2-vs-v3.md`.

Data attributes **da própria lib** que valem nas duas versões (não são do Radix):
`data-slot`, `data-variant` (exceto no Button v3), `data-size`, `data-active`,
`data-state="selected"` no `TableRow`, `data-state="expanded|collapsed"` e
`data-collapsible` na `Sidebar`.

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
`chart-1..5` (escala âmbar `yellow-300…800`), tokens de `sidebar-*`, `--radius` (+ `sm/md/lg/xl/2xl/3xl/4xl`), e fontes
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

- Vêm com a lib (não são violação como transitivas DA LIB): CVA, clsx,
  tailwind-merge, cmdk, recharts, **sonner**, date-fns, embla,
  react-day-picker, next-themes, **react-hook-form**, **zod**,
  @hookform/resolvers, @phosphor-icons/react, input-otp, react-resizable-panels,
  tw-animate-css. **Primitivas por versão:** v2.x traz Radix (`@radix-ui/react-*`) e
  `vaul`; v3.x traz `@base-ui/react` e `@shadcn/react` (sem Radix nem vaul).
- recharts acompanha a major da lib: **2.15.x na v2.x**, **3.10.x na v3.x**. App que
  importa `recharts` direto declara a mesma major.
- MAS: o que o CÓDIGO DO APP importa deve ser dependência DIRETA do app
  (pnpm estrito) — `import { toast } from "sonner"` sem `sonner` no
  package.json é violação (dependência fantasma).
- `lucide-react`/`react-icons`/`@heroicons` no app = violação (Phosphor é o
  padrão; weight `regular` é o default — passar `weight` é violação aviso).
  Exceção: lucide PRÉ-EXISTENTE em base legada é tolerado (código novo não).

## Componentes

- A lib tem 52 componentes na v2.x e 63 na v3.x (Button, Card, Dialog, Alert,
  Skeleton, Spinner, Sheet, Table, Form, Field, Empty, Sonner/Toaster...). Os 11 que só
  existem na v3.x (attachment, bubble, combobox, direction, item, marker, message,
  message-scroller, native-select, questionnaire, toast) são import inválido em repo v2.x. O `Button` NÃO tem prop `loading`
  (spinner manual + disabled é o padrão atual).
- `DialogContent` da lib JÁ embute o botão X de fechar — close customizado
  duplica; `DialogClose` existe para custom triggers (`asChild` na v2.x, `render`
  na v3.x).
- Não existem `DialogBody`/`DialogSection` em nenhuma versão (`SheetBody`,
  `SheetSection` e `SheetSectionTitle` existem nas duas — extensão Blips do Sheet).
- `@blips/ui/hooks/*` exporta só `use-mobile` nas duas versões.
- v3.x: `AlertDialogAction` **não fecha** o diálogo (é um Button comum); na v2.x fecha.
- v3.x: `SidebarProvider` não traz mais `TooltipProvider` (na v2.x trazia, com
  `delayDuration={0}`).
- Componentes client da lib precisam viver sob client components no App
  Router; ícones Phosphor em Server Component vêm de
  `@phosphor-icons/react/dist/ssr`.
