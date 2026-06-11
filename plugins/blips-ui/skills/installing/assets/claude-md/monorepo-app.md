<!--
Template: seção completa de UI para o CLAUDE.md do APP consumidor em um
MONOREPO (ex.: apps/web/CLAUDE.md — crie o arquivo se não existir, no formato
do time: "Leia o CLAUDE.md da raiz primeiro; este arquivo cobre só o que é
específico deste app"). Par com monorepo-root.md (ponteiro na raiz).
Premissa: app Next.js App Router (todos os web apps dos monorepos Blips hoje).
Para um app Vite em monorepo, use o bloco de infra do single-vite.md.
Adapte: `web` no --filter e os caminhos ao app real.
Rota de coexistência Tailwind v3 (ver references/tailwind-v3-preexistente.md):
substitua os bullets de Tailwind v4 pela realidade do repo — o template não
pode afirmar o que o repo não é.
Preencha vX.Y.Z no marcador com a versão do plugin blips-ui.
-->

<!-- blips-ui:claude-md:start vX.Y.Z -->
## UI — @blips/ui

A interface usa a biblioteca de componentes da Blips (`@blips/ui` — shadcn/ui
+ Radix + Tailwind v4).

Com o plugin **blips-ui** instalado, o ciclo de UI é guiado por skills (os
padrões canônicos vivem nelas — este repo NÃO usa rules de UI):

- Construção de telas/componentes: skill `blips-ui:building`.
- Validação antes de declarar pronto: skill `blips-ui:reviewing` (critérios
  de construção, estados, acessibilidade e formatação).

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
