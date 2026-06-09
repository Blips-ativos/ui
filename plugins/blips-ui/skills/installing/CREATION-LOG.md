# CREATION-LOG — installing (ex-adopting-blips-ui)

Processo: RED-GREEN-REFACTOR para skills (superpowers:writing-skills +
skill-creator). Workspace de evals: fora do repo, em
`../ui-skill-workspaces/adopting-blips-ui-workspace/` (o node_modules da raiz
tem `@blips/ui` linkado — fixtures dentro do repo contaminariam os testes).

## 2026-06-09 — Iteração 1

### RED (3 baselines sem skill, lib v2.0.0, installs e builds reais)

Cenários: Vite+React19 limpo, Next15+React19 com CLAUDE.md existente,
Vite+React17 legado. Todos os builds passaram; as falhas foram de **convenção
e custo**, não de competência:

1. **Deriva na convenção central**: 2/3 importaram pelo barrel `@blips/ui`
   (racionalizações: "tipos compilados e tree-shaking"; "subpath é .tsx cru e
   quebraria o tsc"), 1/3 por subpath (provou que o dist não tem
   `"use client"`). Sem skill, cada repo adotaria um padrão.
2. **Redescoberta cara**: 3/3 inspecionaram o tarball via `npm pack`;
   242–369s e 45–54k tokens por run.
3. **`@source` defensivo** desnecessário em 2/3.
4. Gotchas achados por só 1 run: Phosphor `/dist/ssr` em RSC; cmdk/sonner/
   resizable pedem React 18+; deps diretas sob pnpm.
5. Preparação de CLAUDE.md/rules só quando pedida explicitamente.

### Experimentos de verificação (decidiram o conteúdo)

- React 17 + subpath → `tsc --noEmit` **falha** (TS2322 LegacyRef em
  button.tsx). React 18 (runtime+types) → **passa**. React 19 → passa
  (baseline Next). ⇒ matriz: 18/19 subpath, 17 barrel.
- Build sem `@source "./"` → utilities do app presentes no CSS final ⇒
  auto-detecção cobre o app; `@source` defensivo proibido.

### Bugs reais da lib descobertos pelos baselines

- `./postcss.config` declarado nos exports mas fora do tarball
  (`files: ["dist","src"]`) — skill orienta config própria; fix planejado.
- Barrel `dist/` sem `"use client"` — vira a evidência da regra de subpath.

### GREEN

SKILL.md (workflow + contrato verificado + matriz de imports + tabela de
racionalizações + red flags), references/{nextjs,vite}.md (passo a passo
verificado por stack; React 17 dentro de vite.md), assets/ (seção de CLAUDE.md
+ 4 rules canônicas: imports, ícones, formulários, tailwind).

### Pós-iteração 1 — alinhamento com as rules existentes do time

Benchmark: 100%±0 com skill vs 95%±8 sem; −32% tempo; −12% tokens; única
assertion discriminante = convenção de imports (eval-0).

Rules renomeadas para a convenção real dos repos Blips (domínio-primeiro,
inglês, frontmatter com `paths`/`description`, como `component-construction.md`
presente idêntica em blips-flow/blips-frontend/blips-atlas):
`ui-imports`→`component-imports`, `ui-icones`→`icon-usage`,
`ui-formularios`→`form-construction`, `ui-tailwind`→`tailwind-styling`.
Incorporadas aos assets: `component-construction.md` (verbatim do time, entra
em todo repo) e `page-structure.md` (generalizada do blips-atlas — sem
ts-rest/@workspace/lucide; entra só em repos Next.js App Router).

### Templates de CLAUDE.md por arquétipo (substitui claude-md-section.md)

Survey dos repos reais: o time já usa CLAUDE.md hierárquico (raiz + app +
pacotes — blips-flow tem 8, blips-atlas 11, blips-frontend 8 por módulo;
blips-financial-frontend só raiz). O apps/web/CLAUDE.md do atlas abre com
"leia a raiz primeiro; este arquivo cobre só o específico do app" — esse é o
padrão adotado. Decisão monorepo: **seção completa no CLAUDE.md do app
consumidor + bullet de ponteiro na raiz** (a raiz é sempre carregada; o do app
carrega quando se trabalha na subárvore — sessões de API não pagam o custo das
convenções de UI). Rules continuam na raiz (.claude/rules/) com globs
prefixados pelo app. Templates fechados em `assets/claude-md/`:
`single-vite.md`, `single-next.md`, `monorepo-app.md`, `monorepo-root.md` —
todos com marcadores `<!-- blips-ui:claude-md:start/end -->` para
re-execuções idempotentes.

### Rename: adopting-blips-ui → installing

Com o namespace do plugin, a invocação fica `blips-ui:installing` — o sufixo
`-blips-ui` no nome era redundante. Estabelece a família das próximas skills:
`blips-ui:migrating`, `blips-ui:upgrading`. Workspace de evals mantém o nome
antigo (`ui-skill-workspaces/adopting-blips-ui-workspace/`) por ser histórico.

## 2026-06-09 — Iteração em repositórios reais (REFACTOR)

3 runs com skill em cópias de repos reais: atlas (monorepo, 7/7), financial
(Next+React18+TW v3, 5✓2⚠) e blips-frontend legado (Vite+React17+AntD+TW v3 +
@blips/ui@1.0.1 residual, 7/7). Zero falhas novas nos três; matriz de imports
correta nos 3 Reacts; templates de monorepo validados em CLAUDE.md hierárquico
real. Vereditos e relatórios em
`../ui-skill-workspaces/adopting-blips-ui-workspace/real-evals/`.

Lacuna exposta (as 2⚠): Tailwind v3 pré-existente — os dois runs afetados
escolheram rotas OPOSTAS (migrar v4 × coexistir no v3 via content scan), ambas
corretas para o contexto, decididas sem o usuário. REFACTOR aplicado:

- SKILL.md: gate "Tailwind v3 pré-existente — PARE e alinhe" + tabela de
  rotas; princípio "instalação é ADITIVA" (substituir DS = blips-ui:migrating);
  detecção de meia-adoção (versão antiga → normalizar); gotchas novos
  (coexistência com DS interno/ordem de cascade, efeito de fonte do tema,
  moduleResolution, lucide legado); validação pré/pós para repos com falhas
  pré-existentes; exceções à regra dos marcadores (reconciliação de
  contradições; verdade do repo); red flags novos.
- Nova `references/tailwind-v3-preexistente.md` com os DOIS procedimentos
  verificados + sinais para recomendação.
- `references/nextjs.md`: pré-check de moduleResolution/components.json +
  validação runtime quando todas as rotas são dinâmicas.
- `references/vite.md`: quirks React 17 (vitest ESM jsx-runtime; phosphor em
  require cru).
- `assets/rules/icon-usage.md`: ban Biome condicionado à ausência de lucide
  legado.
- Templates de CLAUDE.md: nota da variante de coexistência v3.
