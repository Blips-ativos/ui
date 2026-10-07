---
name: installing
description: "Use quando um repositório React/Next.js for instalar, configurar ou adotar a @blips/ui (ou a @blips/ai, os componentes de IA sobre ela) pela primeira vez — pedidos como 'instala a lib da blips', 'configura o @blips/ui', 'adota o design system Blips', 'padroniza a UI desse projeto', 'instala o @blips/ai', 'quero os componentes de chat/agente', setup de Tailwind/tema/fontes/ícones/peers para a lib, ou preparação do CLAUDE.md de UI num repo. Use também ao notar sintomas de adoção errada: import do barrel @blips/ui em React 18/19, import de '@blips/ai' sem subpath, peers da @blips/ai faltando (streamdown, shiki, ai, @xyflow/react, media-chrome, @rive-app/react-webgl2, react-jsx-parser, ansi-to-react), canvas sem o CSS do React Flow, tailwind.config.js sendo criado, tokens de tema copiados à mão, lucide-react instalado junto da lib, ou @source defensivo no CSS."
---

# Adotando a @blips/ui em um repositório

## Visão geral

Setup canônico e **verificado** da `@blips/ui` (builds reais em Vite e Next,
React 17/18/19, lib v2.0.0; setup da v3.x conferido no pacote da v3). O contrato do pacote já foi inspecionado e cada
decisão abaixo tem evidência — **siga o procedimento em vez de redescobrir**
(inspecionar tarball, testar imports, decidir convenções do zero custa ~5min e
50k tokens por repo, e produz convenções divergentes entre repos).

**Adoção completa = setup técnico + preparação do repo para agentes.** As duas
coisas, sempre — um repo "adotado" sem a seção de UI no CLAUDE.md vai derivar das
convenções na primeira tarefa de UI feita sem contexto.

**Instalação é ADITIVA.** O que existe e funciona (outra lib de UI, design
system interno, lucide em código legado, styled-components) continua
funcionando — substituir ou migrar telas é escopo da skill
**blips-ui:migrating**, não desta. Se a tarefa pedir substituição, sinalize e
aponte a skill certa.

**Anuncie ao começar:** "Usando blips-ui:installing para configurar a lib neste repo."

## Detecção de versão (qual trilha instalar)

A lib tem duas linhas: **v2.x — Radix** e **v3.x — Base UI** (estilo shadcn base-mira).
O setup de Tailwind/tema/fontes/imports é o mesmo nas duas; mudam as primitivas embutidas,
o recharts e a API dos componentes (`asChild` × `render`).

| Situação do repo | Trilha | O que fazer |
| --- | --- | --- |
| Sem `@blips/ui` (instalação nova) | **v3.x — Base UI** | `pnpm add @blips/ui@^3` |
| `@blips/ui` `2.x` em `dependencies` (ou `node_modules/@blips/ui/package.json` → `version` 2.x / deps com `@radix-ui/*`) | **v2.x — Radix** | Mantenha a major: normalize dentro da 2.x. Subir para 3.x é **migração** (API muda) — só com pedido explícito do usuário |
| `@blips/ui` `3.x` (ou deps com `@base-ui/react`) | **v3.x — Base UI** | Normalize dentro da 3.x |

Com `workspace:*`/`latest`, leia `node_modules/@blips/ui/package.json`: `dependencies` com
`@base-ui/react` → v3.x; com `@radix-ui/*` → v2.x. Registre a trilha no relatório e no
CLAUDE.md do repo (templates do Passo 6) para as skills building/reviewing seguirem a
trilha certa. Diferenças de API: `../building/references/v2-vs-v3.md`.

## Checklist (crie um todo por item)

1. **Detectar a stack** — bundler, versão do React, App Router, monorepo e a **trilha da
   `@blips/ui`** (instalação nova → v3.x; repo já em 2.x → fica na v2.x)
2. **Ler a reference da stack** — `references/nextjs.md` ou `references/vite.md`
3. **Instalar e configurar** — seguindo a reference à risca
4. **Aplicar num exemplo visível** — a tela/componente que o usuário pediu
5. **Validar** — build + inspeção do CSS/HTML gerado (seção Validação)
6. **Implantar padrões de agente** — seção de UI no CLAUDE.md (templates) + ponteiros para as skills
7. **Verificação final** — red flags zerados, relatório ao usuário
8. **(Se pedirem componentes de IA) @blips/ai** — depois dos passos 1–5, siga `references/blips-ai.md` (seção abaixo)

## Passo 1: Detectar a stack

| O que olhar | Onde | Decide |
| --- | --- | --- |
| `next` em dependencies | `package.json` | → `references/nextjs.md` |
| `vite` em devDependencies | `package.json` | → `references/vite.md` |
| Versão do `react` | `package.json` | Regra de imports (abaixo) |
| `app/` com layout.tsx | raiz | App Router → gotchas RSC da reference |
| `pnpm-workspace.yaml` com packages | raiz | Monorepo: instale no app que consome; configs (postcss/transpile/CSS) ficam no app; CLAUDE.md → templates `monorepo-*` (Passo 6) |
| `tailwind.config.{js,ts}` JÁ existe | raiz/app | Tailwind v3 em uso → **GATE**: seção "Tailwind v3 pré-existente" abaixo. Não siga a rota canônica antes de resolver o gate |
| `@blips/ui` JÁ em dependencies (versão antiga) | `package.json` | Meia-adoção: normalize — atualize para a versão mais recente **da mesma major** (2.x fica em 2.x; 3.x em 3.x) e corrija imports para a regra do React do repo (valide os consumidores com typecheck). Trocar de major é migração, não adoção |

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
- **peerDependencies**: só `react`/`react-dom` `^17 || ^18 || ^19` — **igual na v2.x e na
  v3.x** (o Base UI aceita a mesma faixa).
- **Já vêm com a lib (não reinstale)**: CVA, clsx, tailwind-merge, cmdk, recharts, sonner,
  date-fns, embla, react-day-picker, next-themes, react-hook-form, zod,
  @hookform/resolvers, @phosphor-icons/react, input-otp, react-resizable-panels,
  tw-animate-css. Primitivas por trilha:

  | | v2.x — Radix | v3.x — Base UI |
  | --- | --- | --- |
  | Primitivas | `@radix-ui/react-*`, `vaul` | `@base-ui/react`, `@shadcn/react` |
  | recharts | `2.15.4` | `3.10.1` |

- **recharts no app**: se o código do app importa `recharts` (gráficos com `Bar`, `XAxis`…),
  declare-o como dep direta **na mesma major da lib** — `recharts@^3` na v3.x,
  `recharts@2.15.4` na v2.x. Majors diferentes geram duas cópias e tipos incompatíveis com
  `ChartTooltipContent`/`ChartLegendContent`. O recharts 3 tem `react-is` como peer (o pnpm
  resolve com auto-install-peers; se avisar, instale `react-is` na major do React).
- **O consumidor instala**: `@blips/ui`; `tailwindcss` v4 + integração do
  bundler (`@tailwindcss/vite` ou `@tailwindcss/postcss`); e **como dep direta
  tudo que o código do app importar** (`@phosphor-icons/react`,
  `react-hook-form`, `zod`, `recharts`...) — com pnpm estrito, transitivas não são
  importáveis pelo app. Nunca instale `@radix-ui/*` ou `vaul` num app v3.x nem
  `@base-ui/react` num app v2.x para "completar" a lib.
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
| React 17 | Sem `Command`, `Toaster` (sonner) e `Resizable` — deps transitivas pedem React 18+. Peer warnings dessas três no install são esperados e inofensivos (vale nas duas trilhas) |
| v3.x em React 17/18 | `Questionnaire` e `MessageScroller` vêm de `@shadcn/react`, que declara peer `react >=19` (opcional: o install não falha). Em React 17 eles quebram em runtime (`React.useId` não existe); em React 18 a faixa do peer não é atendida e `ref` não chega como prop. Use-os só em React 19 |
| Ícones na v3.x | Use os nomes com sufixo `Icon` (`CaretDownIcon`); os sem sufixo estão `@deprecated` no Phosphor 2.1.10. Na v2.x os dois funcionam — prefira o sufixo em código novo |
| pnpm 10 avisa "Ignored build scripts: esbuild" | Inofensivo — o binário vem por optionalDependencies |
| Fontes | Já vêm por `@import url(...)` no globals da lib. Opcional: `<link rel="preconnect">` para fonts.googleapis.com/fonts.gstatic.com |
| CSS legado do app | Mantenha abaixo do `@import` do globals durante a migração — o cascade preserva telas antigas |
| Repo com design system interno (globals próprio) | Importe o globals da lib ANTES do globals interno — os tokens do app vencem o cascade (visual atual intacto) e os componentes da lib herdam o tema local. O duplo `@import "tailwindcss"` é dedupado pelo v4 (verificado) |
| App com tema próprio sem tokens de fonte | O globals da lib define `--font-sans: Inter` e carrega as fontes Google — telas existentes mudam de fonte. Sinalize o efeito ao usuário; NÃO "resolva" copiando/neutralizando tokens |
| `moduleResolution: "node"` no tsconfig | Não resolve subpath exports → migre para `"bundler"` (padrão Next 15+; mudança mínima, valide com tsc). Detalhe na reference do Next |
| `lucide-react` JÁ usado pelo legado | Mantenha (remover quebra o app). Ban do Biome `noRestrictedImports` SÓ em repo sem lucide legado — senão quebra o lint inteiro. Na seção do CLAUDE.md: Phosphor obrigatório em código novo |

## @blips/ai (componentes de IA) — instalação aditiva

Pacote irmão com conversa, resposta em streaming, raciocínio, ferramentas,
fontes, prompt e efeitos (AI Elements + libraries.dev sobre a v3.x).
Procedimento completo e verificado em **`references/blips-ai.md`** — leia
antes de instalar. Resumo do contrato:

| Item | Regra |
| --- | --- |
| Gate | `@blips/ui` **^3** e React **19**. Repo 2.x ou React < 19: pare e alinhe com o usuário (não migre por conta própria) |
| Instalação | `pnpm add @blips/ai` + os **peers do componente** que o app importar (tabela na reference: `message`/`reasoning` → `streamdown` + `@streamdown/{code,math,mermaid,cjk}`; `code-block`/`tool`/`agent`/`sandbox` → `shiki`; canvas (`canvas`, `node`, `edge`, `connection`, `controls`, `panel`, `toolbar`) → `@xyflow/react`; `audio-player` → `media-chrome`; `persona` → `@rive-app/react-webgl2`; `jsx-preview` → `react-jsx-parser`; `terminal` → `ansi-to-react`; `ai` para os tipos de `conversation`, `message`, `tool`, `confirmation`, `context`, `prompt-input`, `agent`, `sandbox`, `attachments`, `image`, `audio-player`, `transcription`) |
| `ai` | Peer opcional **só de tipos** (o pacote não usa runtime dele). Como o pacote publica `.tsx`, o `tsc` do app precisa dele (sem `ai`, TS2307 dentro de `node_modules/@blips/ai/src`, verificado): em projeto TypeScript, `pnpm add -D ai`. `dependencies` só se o código do app usar runtime do `ai` |
| CSS | `@import "@blips/ui/globals.css";` **depois** `@import "@blips/ai/styles.css";` (só `@source` do pacote). Com `message` (`MessageResponse`) ou `reasoning`: `@import "streamdown/styles.css";` e `@source` do `streamdown/dist` e de cada plugin `@streamdown/*` instalado (legítimos: conteúdo fora da auto-detecção). Com componentes de canvas: `import "@xyflow/react/dist/style.css"` uma vez no app (a @blips/ai não importa CSS de peer) |
| Next | `transpilePackages: ["@blips/ui", "@blips/ai"]` |
| Imports | Só subpath: `@blips/ai/components/<x>` e `@blips/ai/fx/<x>`. Não existe barrel `@blips/ai` |

Depois de instalar, a tela de chat é guiada por `components/ai-chat.md` da
skill **blips-ui:building**.

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

**Este repo NÃO recebe rules de UI.** Decisão de arquitetura: os critérios
canônicos vivem nas references da skill **blips-ui:reviewing** (fonte única,
versionada com o plugin — sem cópias para driftar; a lição do vendoring do
shadcn). Se o usuário pedir "crie as rules", explique o modelo e aplique o
abaixo. Rules pré-existentes do time (`component-construction.md`,
`page-structure.md`) não são suas: não crie, não edite, não remova.

1. **CLAUDE.md**: escolha o template em `assets/claude-md/` pelo arquétipo do
   repo (são templates fechados — não redija a seção do zero):

   | Arquétipo | Template | Destino |
   | --- | --- | --- |
   | App único Vite | `single-vite.md` | `CLAUDE.md` da raiz |
   | App único Next.js | `single-next.md` | `CLAUDE.md` da raiz |
   | Monorepo | `monorepo-app.md` **+** `monorepo-root.md` | seção completa no `apps/<app>/CLAUDE.md` (crie se não existir, no formato do time: "leia a raiz primeiro") + bullet de ponteiro na seção de stack do `CLAUDE.md` da raiz |

2. **Marcadores versionados**: o marcador de abertura leva a versão do plugin
   — `<!-- blips-ui:claude-md:start vX.Y.Z -->` (leia a versão no
   `.claude-plugin/plugin.json` que acompanha o plugin instalado; sem acesso,
   use a data ISO). Em **re-execução**: localize os marcadores; miolo intacto
   → substitua pelo template novo; miolo editado à mão → apresente o diff e
   reconcilie com o usuário — **nunca sobrescreva calado**.
3. **Fora dos marcadores, não toque** — com duas exceções obrigatórias:
   - **Reconciliação**: linha existente que contradiz frontalmente a adoção
     (ex.: manda subpath num repo React 17, padroniza lucide) — edite SÓ essa
     linha; deixá-la instruiria agentes a quebrar o build.
   - **Verdade do repo**: o template não pode afirmar o que o repo não é (ex.:
     rota de coexistência Tailwind v3 → substitua os bullets de Tailwind pela
     realidade, ver `references/tailwind-v3-preexistente.md`).
4. Ajuste os exemplos da seção à regra de imports do repo (React 17 → barrel,
   variante indicada no template single-vite).

Depois da adoção, a construção de telas/componentes é guiada pela skill
**blips-ui:building** (referência completa de componentes) — aponte isso ao usuário.

## Red flags — PARE e corrija

- Import do barrel `@blips/ui` em repo React 18/19 (ou subpath em React 17)
- `tailwind.config.js`/`.ts` criado (pré-existente é outra coisa: ver o gate de Tailwind v3)
- Migração Tailwind v3→v4 executada sem o usuário escolher a rota (gate pulado)
- Tokens/tema copiados para o CSS do app
- `lucide-react` (ou react-icons/heroicons) instalado
- Major da `@blips/ui` trocada (2.x → 3.x) durante uma adoção, sem pedido de migração
- `recharts` do app em major diferente da lib (2 com lib v3.x, ou 3 com lib v2.x)
- `@source` adicionado "por garantia"
- CLAUDE.md do repo reescrito/perdendo seções na mesclagem
- `import … from "@blips/ai"` (barrel não existe) ou @blips/ai num repo `@blips/ui` 2.x / React < 19
- Componente da @blips/ai importado sem os peers dele declarados no `package.json` do app
- `@blips/ai/styles.css` ausente ou importado antes do globals da @blips/ui; `transpilePackages` sem `"@blips/ai"`
- Componente de canvas da @blips/ai sem `import "@xyflow/react/dist/style.css"` no app; `Persona` em produção sem `src` próprio (os `.riv` padrão vêm do blob da Vercel)
- Sucesso reportado sem rodar o build
