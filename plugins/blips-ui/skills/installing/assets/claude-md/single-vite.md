<!--
Template: app ÚNICO com Vite (SPA React). Destino: CLAUDE.md da RAIZ do repo.
Mescle preservando todo o conteúdo existente. Em re-execução, atualize o
conteúdo ENTRE os marcadores blips-ui:claude-md em vez de duplicar a seção.
Adapte: o caminho do CSS de entrada se não for src/index.css; em repos React
17, troque a linha de imports pela variante indicada no comentário.
Rota de coexistência Tailwind v3 (ver references/tailwind-v3-preexistente.md):
substitua os bullets de Tailwind v4 pela realidade do repo — o template não
pode afirmar o que o repo não é.
-->

<!-- blips-ui:claude-md:start -->
## UI — @blips/ui

A interface usa a biblioteca de componentes da Blips (`@blips/ui` — shadcn/ui
+ Radix + Tailwind v4). Regras detalhadas em `.claude/rules/` — leia a rule do
tema antes de mexer em UI:

| Tema | Rule |
| --- | --- |
| Construção de componentes (guia do time) | `.claude/rules/component-construction.md` |
| Imports de componentes | `.claude/rules/component-imports.md` |
| Ícones (Phosphor) | `.claude/rules/icon-usage.md` |
| Formulários (RHF + Zod) | `.claude/rules/form-construction.md` |
| Tailwind v4 / tema | `.claude/rules/tailwind-styling.md` |

Essencial:

- Componentes: `import { Button } from "@blips/ui/components/button"`
  (subpath por componente; nunca o barrel `@blips/ui`).
  <!-- React 17: troque a linha acima por:
  - Componentes: `import { Button } from "@blips/ui"` (barrel — obrigatório
    em React 17; ver `.claude/rules/component-imports.md`). -->
- Ícones: `@phosphor-icons/react`, weight padrão (`regular`). Nunca
  `lucide-react`.
- Tailwind v4 é CSS-first: tema único via `@import "@blips/ui/globals.css"`.
  Nunca crie `tailwind.config.js` nem copie tokens.
- Infra que não pode ser removida: plugin `tailwindcss()` (de
  `@tailwindcss/vite`) no `vite.config.ts` e o import do globals em
  `src/index.css`.
- Docs e exemplos: https://blips-ui.web.app
<!-- blips-ui:claude-md:end -->
