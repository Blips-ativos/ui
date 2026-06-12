# CREATION-LOG — reviewing

Origem da skill: decisão de NÃO implantar rules nos repos (lição do shadcn —
vendoring sem base registrada = drift insolúvel; pesquisa 2026-06-09/10 no
workspace `adopting-blips-ui-workspace/planejamento-consolidacao-2026-06-09.md`).
Os padrões passam a viver AQUI (references canônicas) e são aplicados por
review pós-construção; a `building` aponta para cá.

## 2026-06-10 — RED (2 baselines sem skill)

Fixtures: app Next 15/React 19 com **29 violações semeadas** (ground truth em
`reviewing-workspace/fixtures/violations-ground-truth.json`) e o MESMO app
100% conforme (mede falsos positivos).

- **eval-0 (sujo)**: recall ~85% (23/29) — detecção mecânica não é o problema.
  Falhas: INVERTEU a convenção de imports (mandou trocar subpath por barrel,
  severidade "Alta"); recomendou manter override de token "completando o par";
  sugeriu criar `text-success` (existe na lib); perdeu ordem de hooks e
  tabular-nums. Extras legítimos promovidos ao GT: dep fantasma do sonner,
  fetch sem `!res.ok`.
- **eval-1 (limpo)**: reportou **10 "violações" em código conforme** — 4
  invenções contra fatos da lib (subpaths "inválidos", text-success e
  font-display "inexistentes", @source "faltando"), 5 fora de escopo, 1
  defeito real de fixture (QueryClientProvider — corrigido no fixture).

**Tese do RED: sem os fatos verificados da lib, review é PIOR que nenhum
review — instrui a desfazer o que está certo.**

## GREEN

- `SKILL.md`: regra de ouro anti-inversão + tabela de racionalizações dos
  baselines, workflow em 5 passos (escopo → check mecânico → revisor de
  julgamento → relatório em formato fixo → gate), red flags do próprio review.
- `references/lib-facts.md`: fatos verificados (exports/imports por React,
  tokens existentes incl. success/font-display, @source auto-declarado,
  tokens cor-completa, deps embutidas vs diretas) — a peça anti-alucinação.
- `references/{component-standards,ui-states,accessibility,data-formatting}.md`:
  critérios canônicos com severidades, fundados na pesquisa (Polaris/Carbon/
  NN/g/TanStack; APG/Radix/Biome; MDN/Node-ICU/Next #418; guia do time).
- `scripts/check.mjs`: bateria mecânica — smoke test: 18 achados no fixture
  sujo (16 itens do GT + flags verify), **0 falsos positivos no limpo**.
- `agents/ui-reviewer.md`: prompt do revisor (olhos frescos; lê critérios
  ANTES do código; separa violação de observação; severidade do padrão).

## 2026-06-10 — Iteração 1 (benchmark formal, fixtures corrigidos)

| Métrica | Com skill | Sem skill |
| --- | --- | --- |
| eval-0 recall (29 GT) | **29/29 (100%)** | 24/29 (~83%) |
| eval-0 inversões | 0 (+ seção "Descartado") | barrel recomendado de novo (3ª vez na série) |
| eval-1 falsos positivos | 0 | 0 neste run; 10 no exploratório (variância alta) |
| Expectations | 9/9 | 4/9 |
| Custo | ~37k tok | ~24k tok (+50% = preço do determinismo) |

Com skill ainda pegou 2 violações verdadeiras no fixture "limpo" (form §8,
role=status) — mais rigoroso que o autor. Pendências para iteração 2:
corrigir fixture-clean, reescrever expectation do eval-1 para "zero FALSOS
positivos", considerar promover role=status no loading a regra plena.

## 2026-06-10 — Mineração open-design (P1 do catálogo)

Fonte: nexu-io/open-design (Apache 2.0) — atribuição em `plugins/blips-ui/NOTICE.md`.
Deep research (5 agentes) → catálogo em
`ui-skill-workspaces/open-design-catalogo-reuso-2026-06-10.md`. Orquestrado por
2 workflows (author→verify adversarial; depois fix-up de alinhamento).

References novas: `typography.md`, `forms.md`, `motion.md`, `anti-slop.md`.
Upgrades: `ui-states.md` (thresholds de loading, retry com backoff, matriz
ARIA/foco), `accessibility.md` (correções factuais: AA 24×24px, foco = falha
tripla, ordem ARIA, WebAIM), `component-standards.md` (completude de código,
proximidade/agrupamento das Leis de UX). `lib-facts.md` ganhou `surface`/`code`
e a nota `--font-heading` = alias de Inter.

`scripts/check.mjs` ganhou checks mecânicos: indigo/violet banidos (7 cardinais
+ estendidos), lorem, fonte hardcoded, elisão de código/prosa (bloqueante),
emoji-ícone, CDN placeholder, document.title, propriedade física, caixa-alta
sem tracking, display sem tracking negativo, text-justify, tabindex positivo,
foco removido. Smoke test: **0 FP no fixture limpo**, 19 no sujo, sem regressão.

LIÇÃO (verify adversarial pegou): autores marcavam regras como
"auto-verificável (check.mjs)" que o script não implementava — contradição que
mina o núcleo "verificável" da skill. Fix-up alinhou cada marcação ao contrato
real (princípio: literal alta-precisão = bloqueante; heurístico/verify = aviso;
o resto = julgamento). SKILL.md agora lista as 9 references.

## 2026-06-11 — modo CRÍTICA (qualidade), além da conformidade

Nova `references/critique.md`: crítica scored em 5 dimensões (Coerência/
Hierarquia/Execução/Funcionalidade/Restrição-ou-Distinção, 0-10 com evidência),
adaptada do open-design (design-templates/critique + discovery.ts). É o gate de
QUALIDADE ("é bem desenhado?"), distinto do gate de CONFORMIDADE ("segue as
regras?"). Inteiramente julgamento (não é check.mjs). Bandas mapeadas ao nosso
vocabulário: 0-4 bloqueante, 5-6 aviso, 7-10 ok. Invocado pelo loop da
blips-ui:designing após a building entregar (nunca auto-crítica no mesmo turno).
SKILL.md ganhou a seção "Dois modos de review" (conformidade default × crítica).
