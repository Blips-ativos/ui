---
name: installing
description: "Use quando um repositório React/Next.js for instalar, configurar ou adotar a @blips/ui pela primeira vez — pedidos como 'instala a lib da blips', 'configura o @blips/ui', 'adota o design system Blips', 'padroniza a UI desse projeto', setup de Tailwind/tema/fontes/ícones para a lib, ou preparação de CLAUDE.md/rules de UI num repo. Use também ao notar sintomas de adoção errada: import do barrel @blips/ui em React 18/19, tailwind.config.js sendo criado, tokens de tema copiados à mão, lucide-react instalado junto da lib, ou @source defensivo no CSS."
---

# Adotando a @blips/ui em um repositório

## Visão geral

Setup canônico e **verificado** da `@blips/ui` (builds reais em Vite e Next,
React 17/18/19, lib v2.0.0). O contrato do pacote já foi inspecionado e cada
decisão abaixo tem evidência — **siga o procedimento em vez de redescobrir**
(inspecionar tarball, testar imports, decidir convenções do zero custa ~5min e
50k tokens por repo, e produz convenções divergentes entre repos).

**Adoção completa = setup técnico + preparação do repo para agentes.** As duas
coisas, sempre — um repo "adotado" sem CLAUDE.md/rules de UI vai derivar das
convenções na primeira tarefa de UI feita sem contexto.

**Instalação é ADITIVA.** O que existe e funciona (outra lib de UI, design
system interno, lucide em código legado, styled-components) continua
funcionando — substituir ou migrar telas é escopo da skill
**blips-ui:migrating**, não desta. Se a tarefa pedir substituição, sinalize e
aponte a skill certa.

**Anuncie ao começar:** "Usando blips-ui:installing para configurar a lib neste repo."

## Checklist (crie um todo por item)

1. **Detectar a stack** — bundler, versão do React, App Router, monorepo
2. **Ler a reference da stack** — `references/nextjs.md` ou `references/vite.md`
3. **Instalar e configurar** — seguindo a reference à risca
4. **Aplicar num exemplo visível** — a tela/componente que o usuário pediu
5. **Validar** — build + inspeção do CSS/HTML gerado (seção Validação)
6. **Implantar padrões de agente** — `assets/` → CLAUDE.md + `.claude/rules/`
7. **Verificação final** — red flags zerados, relatório ao usuário

## Passo 1: Detectar a stack

| O que olhar | Onde | Decide |
| --- | --- | --- |
| `next` em dependencies | `package.json` | → `references/nextjs.md` |
| `vite` em devDependencies | `package.json` | → `references/vite.md` |
| Versão do `react` | `package.json` | Regra de imports (abaixo) |
| `app/` com layout.tsx | raiz | App Router → gotchas RSC da reference |
| `pnpm-workspace.yaml` com packages | raiz | Monorepo: instale no app que consome; configs (postcss/transpile/CSS) ficam no app; CLAUDE.md → templates `monorepo-*` (Passo 6) |
| `tailwind.config.{js,ts}` JÁ existe | raiz/app | Tailwind v3 em uso → **GATE**: seção "Tailwind v3 pré-existente" abaixo. Não siga a rota canônica antes de resolver o gate |
| `@blips/ui` JÁ em dependencies (versão antiga) | `package.json` | Meia-adoção: normalize — atualize para a versão atual e corrija imports para a regra do React do repo (valide os consumidores com typecheck) |

Outra stack (CRA, Remix, etc.): aplique a reference mais próxima (Vite para
SPA, Next para SSR) adaptando a integração do Tailwind v4 ao bundler — e
sinalize ao usuário que a rota não é canônica.

## Contrato do pacote (verificado — não redescubra)

- **`@blips/ui`** (npm público). Publica `dist/` (barrel compilado) **e
  `src/`** — os exports de componentes apontam para o **fonte `.tsx`**:
  `"./components/button" → "./src/components/button.tsx"`. Consequências:
  Next precisa de `transpilePackages: ["@blips/ui"]`; Vite compila TSX de
  node_modules nativamente.
- **`./globals.css`** = tema completo: `@import "tailwindcss"`,
  tw-animate-css, fontes Google (Inter, Quicksand, JetBrains Mono), tokens
  shadcn + amarelo Blips `#FCBA28` como `primary`, dark mode via `.dark`.
- **peerDependencies**: só `react`/`react-dom` `^17 || ^18 || ^19`.
- **Já vêm com a lib (não reinstale)**: Radix, CVA, clsx, tailwind-merge,
  cmdk, recharts, sonner, vaul, date-fns, embla, react-day-picker,
  next-themes, react-hook-form, zod, @hookform/resolvers, @phosphor-icons/react.
- **O consumidor instala**: `@blips/ui`; `tailwindcss` v4 + integração do
  bundler (`@tailwindcss/vite` ou `@tailwindcss/postcss`); e **como dep direta
  tudo que o código do app importar** (`@phosphor-icons/react`,
  `react-hook-form`, `zod`...) — com pnpm estrito, transitivas não são
  importáveis pelo app.
- ⚠️ **Bug conhecido (≤ 2.0.0)**: o export `@blips/ui/postcss.config` aponta
  para arquivo **fora do tarball**. Crie o postcss.config do app diretamente
  (conteúdo na reference do Next).

## Regra de imports (o erro nº 1 sem esta skill)

| React do repo | Como importar | Evidência |
| --- | --- | --- |
| **18 ou 19** | **Subpath**: `import { Button } from "@blips/ui/components/button"` | `tsc --noEmit` passa (verificado em 18 e 19); barrel quebra App Router |
| **17** | **Barrel**: `import { Button } from "@blips/ui"` | Subpath falha `tsc` contra `@types/react@17` (TS2322 `LegacyRef` em button.tsx — verificado) |

Por que subpath é a convenção (e não preferência estética): o barrel compilado
(`dist/index.js`) **não contém as diretivas `"use client"`** — importar
componentes client por ele **quebra o Next App Router** (verificado:
`grep -c '"use client"' dist/index.js` → 0). Em React 17 não existe App Router
(exige 18+), então o barrel é seguro — e é a única rota que typechecka.

| Racionalização | Realidade |
| --- | --- |
| "O barrel tem tipos compilados e tree-shaking, é mais seguro" | Em 18/19 o subpath compila e typechecka normalmente; o barrel quebra RSC. Tree-shaking funciona nos dois. |
| "Subpath é .tsx cru, vai quebrar o build" | Verificado: quebra **só** em React 17 — e nesse caso a exceção oficial é o barrel. Não invente uma terceira rota. |
| "Vou copiar os tokens para o meu CSS" | Tema é fonte única via `@import "@blips/ui/globals.css"`. Cópia = drift na primeira atualização da lib. |
| "Vou criar tailwind.config.js" | Tailwind v4 é CSS-first; o arquivo nem é lido sem `@config`. Toda a config já vem do globals da lib. |
| "Vou adicionar `@source './'` por garantia" | Verificado desnecessário: a auto-detecção do v4 cobre o app. `@source` só para conteúdo fora da detecção (pasta gitignorada, código fora da raiz). |

## Tailwind v3 pré-existente — PARE e alinhe com o usuário

Se o repo já usa Tailwind **v3** (`tailwind.config.*` em uso), a rota canônica
não se aplica direto: o globals da lib é v4-only e define os **mesmos nomes de
token** (`--primary`, `--background`...) que temas shadcn v3 — carregar os
dois temas quebra um dos lados (verificado em 2 repos reais). Existem **duas
rotas verificadas**, e a escolha **muda o visual ou as limitações do produto**
— é decisão do usuário, não sua:

| Rota | Quando tende a ganhar | Custo |
| --- | --- | --- |
| **A. Migrar o app para v4** (tema da lib vira fonte única; extensões locais portadas) | App pequeno/médio; tema atual já é shadcn-like com o amarelo Blips; sem `important: true` | Deltas visuais globais (renames de escala v4, paleta neutra, radius) em TODO o app |
| **B. Coexistir no pipeline v3** (lib estilizada via content scan do fonte; tokens resolvem para o tema do app) | Legado grande; `important: true`/AntD; migração de telas fora de questão | Utilities v4-only dos componentes não são geradas (degradação cosmética); setup não-canônico documentado |

**Apresente o trade-off e aguarde a escolha antes de tocar no Tailwind.** Os
dois procedimentos passo a passo estão em
`references/tailwind-v3-preexistente.md` — leia ANTES de propor, para
apresentar custos reais e não estimativas.

## Gotchas verificados

| Situação | Faça |
| --- | --- |
| Ícone Phosphor em **Server Component** | Importe de `@phosphor-icons/react/dist/ssr` (o entrypoint padrão usa Context e quebra em RSC) |
| React 17 | Sem `Command`, `Toaster` (sonner) e `Resizable` — deps transitivas pedem React 18+. Peer warnings dessas três no install são esperados e inofensivos |
| pnpm 10 avisa "Ignored build scripts: esbuild" | Inofensivo — o binário vem por optionalDependencies |
| Fontes | Já vêm por `@import url(...)` no globals da lib. Opcional: `<link rel="preconnect">` para fonts.googleapis.com/fonts.gstatic.com |
| CSS legado do app | Mantenha abaixo do `@import` do globals durante a migração — o cascade preserva telas antigas |
| Repo com design system interno (globals próprio) | Importe o globals da lib ANTES do globals interno — os tokens do app vencem o cascade (visual atual intacto) e os componentes da lib herdam o tema local. O duplo `@import "tailwindcss"` é dedupado pelo v4 (verificado) |
| App com tema próprio sem tokens de fonte | O globals da lib define `--font-sans: Inter` e carrega as fontes Google — telas existentes mudam de fonte. Sinalize o efeito ao usuário; NÃO "resolva" copiando/neutralizando tokens |
| `moduleResolution: "node"` no tsconfig | Não resolve subpath exports → migre para `"bundler"` (padrão Next 15+; mudança mínima, valide com tsc). Detalhe na reference do Next |
| `lucide-react` JÁ usado pelo legado | Mantenha (remover quebra o app). Ban do Biome `noRestrictedImports` SÓ em repo sem lucide legado — senão quebra o lint inteiro. Rule de ícones: Phosphor obrigatório em código novo |

## Validação (obrigatória antes de reportar sucesso)

1. `pnpm build` — precisa passar de verdade (não pule typecheck se o script tiver).
2. CSS gerado contém o tema e as utilities do app:
   `grep -o '#fcba28' <css-do-build>` e uma utility usada pelo seu exemplo.
3. (Next) HTML prerenderizado contém o componente: `grep -o 'data-slot="button"' .next/server/app/index.html`.
   **Todas as rotas dinâmicas (ƒ)?** Não há HTML estático — valide em runtime:
   suba o server de produção e `curl` a rota procurando o `data-slot`
   (procedimento na reference do Next).
4. Em repo com falhas PRÉ-existentes: registre o estado ANTES de mexer
   (build/typecheck) e prove no final que a assinatura das falhas é idêntica —
   zero falhas novas. Falha pré-existente não é sua para consertar.

Os caminhos exatos por stack estão nas references.

## Passo 6: Padrões de agente (parte obrigatória da adoção)

1. **CLAUDE.md**: escolha o template em `assets/claude-md/` pelo arquétipo do
   repo (são templates fechados — não redija a seção do zero):

   | Arquétipo | Template | Destino |
   | --- | --- | --- |
   | App único Vite | `single-vite.md` | `CLAUDE.md` da raiz |
   | App único Next.js | `single-next.md` | `CLAUDE.md` da raiz |
   | Monorepo | `monorepo-app.md` **+** `monorepo-root.md` | seção completa no `apps/<app>/CLAUDE.md` (crie se não existir, no formato do time: "leia a raiz primeiro") + bullet de ponteiro na seção de stack do `CLAUDE.md` da raiz |

   Os templates são delimitados por `<!-- blips-ui:claude-md:start/end -->` —
   em re-execução, **atualize o conteúdo entre os marcadores** em vez de
   duplicar a seção. **Nunca apague nem reescreva conteúdo fora dos
   marcadores** — preserve todas as seções existentes. Sem CLAUDE.md? Crie um
   só com a seção do template.

   Duas exceções obrigatórias à regra dos marcadores:
   - **Reconciliação**: se uma linha EXISTENTE do CLAUDE.md contradiz
     frontalmente a adoção (ex.: manda subpath num repo React 17, ou padroniza
     lucide), edite SÓ essa linha para a versão correta — deixar a contradição
     instruiria agentes a quebrar o build.
   - **Verdade do repo**: o template não pode afirmar o que o repo não é. Na
     rota de coexistência Tailwind v3, substitua os bullets de "v4 CSS-first"
     pela realidade do repo (a reference de Tailwind v3 dá o texto).
2. **Rules**: copie `assets/rules/*.md` para `.claude/rules/` **na raiz do
   repo** (monorepo incluso — convenção do time), ajustando os blocos de
   adaptação à stack. Em monorepos, prefixe os globs de `paths` com o caminho
   do app (ex.: page-structure → `"apps/web/app/**/*"`).
   **`page-structure.md` só entra em repos Next.js App Router** (em SPA Vite,
   não copie). `component-construction.md` entra sempre, verbatim — é o guia
   consensual do time (idêntico em blips-flow, blips-frontend e blips-atlas).
3. Ajuste os exemplos das rules à regra de imports do repo (React 17 → barrel,
   variante já indicada no template single-vite).
4. Se o repo JÁ tem alguma dessas rules (ex.: `component-construction.md`),
   não a sobrescreva — só adicione as que faltam.

Depois da adoção, a construção de telas/componentes é guiada pela skill
**blips-ui:building** (referência completa de componentes) — aponte isso ao usuário.

## Red flags — PARE e corrija

- Import do barrel `@blips/ui` em repo React 18/19 (ou subpath em React 17)
- `tailwind.config.js`/`.ts` criado (pré-existente é outra coisa: ver o gate de Tailwind v3)
- Migração Tailwind v3→v4 executada sem o usuário escolher a rota (gate pulado)
- Tokens/tema copiados para o CSS do app
- `lucide-react` (ou react-icons/heroicons) instalado
- `@source` adicionado "por garantia"
- CLAUDE.md do repo reescrito/perdendo seções na mesclagem
- Sucesso reportado sem rodar o build
