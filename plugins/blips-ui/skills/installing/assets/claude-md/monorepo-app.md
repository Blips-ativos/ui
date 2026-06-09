<!--
Template: seção completa de UI para o CLAUDE.md do APP consumidor em um
MONOREPO (ex.: apps/web/CLAUDE.md — crie o arquivo se não existir, no formato
do time: "Leia o CLAUDE.md da raiz primeiro; este arquivo cobre só o que é
específico deste app"). Par com monorepo-root.md (ponteiro na raiz).
Premissa: app Next.js App Router (todos os web apps dos monorepos Blips hoje).
Para um app Vite em monorepo, use o bloco de infra do single-vite.md.
Adapte: `web` no --filter e os caminhos ao app real.
ATENÇÃO: as rules ficam em .claude/rules/ NA RAIZ do repo (convenção do time),
com os globs de `paths` prefixados pelo app (ex.: page-structure →
"apps/web/app/**/*").
Rota de coexistência Tailwind v3 (ver references/tailwind-v3-preexistente.md):
substitua os bullets de Tailwind v4 pela realidade do repo — o template não
pode afirmar o que o repo não é.
-->

<!-- blips-ui:claude-md:start -->
## UI — @blips/ui

A interface deste app usa a biblioteca de componentes da Blips (`@blips/ui` —
shadcn/ui + Radix + Tailwind v4). Regras detalhadas nas rules de UI em
`.claude/rules/` (raiz do repo, globs escopados a este app) — leia a rule do
tema antes de mexer em UI:

| Tema | Rule (na raiz do repo) |
| --- | --- |
| Construção de componentes (guia do time) | `.claude/rules/component-construction.md` |
| Imports de componentes | `.claude/rules/component-imports.md` |
| Ícones (Phosphor) | `.claude/rules/icon-usage.md` |
| Formulários (RHF + Zod) | `.claude/rules/form-construction.md` |
| Tailwind v4 / tema | `.claude/rules/tailwind-styling.md` |
| Estrutura de páginas (App Router) | `.claude/rules/page-structure.md` |

Essencial:

- Componentes: `import { Button } from "@blips/ui/components/button"`
  (subpath por componente; nunca o barrel `@blips/ui` — quebra o App Router).
- Ícones: `@phosphor-icons/react`, weight padrão (`regular`); em Server
  Components, importe de `@phosphor-icons/react/dist/ssr`. Nunca `lucide-react`.
- Tailwind v4 é CSS-first: tema único via `@import "@blips/ui/globals.css"`
  no CSS global deste app. Nunca crie `tailwind.config.js` nem copie tokens.
- Infra que não pode ser removida (neste app): `transpilePackages:
  ["@blips/ui"]` no `next.config.ts`, `postcss.config.mjs` com
  `@tailwindcss/postcss` e o import do globals no `app/layout.tsx`.
- Build/validação: `pnpm --filter web build` (rode da raiz do workspace).
- Docs e exemplos: https://blips-ui.web.app
<!-- blips-ui:claude-md:end -->
