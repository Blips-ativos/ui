# NOTICE — atribuições de terceiros

O plugin `blips-ui` é da Blips. Partes do conteúdo das skills foram **derivadas
e adaptadas** de projetos open source, conforme suas licenças.

## nexu-io/open-design (Apache License 2.0)

Repositório: https://github.com/nexu-io/open-design

Regras de craft, valores quantificados (thresholds de loading, durações de
animação, tracking tipográfico, leis de UX, hexes de "AI slop", baseline de
acessibilidade) e o formato de documento de design system foram minerados de
`craft/*`, `skills/*` e `design-systems/*` desse repositório e **reescritos em
pt-BR e adaptados ao stack Blips** (Tailwind v4, shadcn/Radix via `@blips/ui`,
tokens fixos da marca). Arquivos derivados levam uma linha de atribuição
apontando o(s) arquivo(s) de origem.

Skills/references com conteúdo derivado:
- `skills/reviewing/references/{typography,forms,motion,anti-slop,ui-states,accessibility,component-standards}.md`
- `skills/reviewing/scripts/check.mjs` (checks de anti-slop, tipografia, motion, completude)
- `skills/designing/references/{design-system,archetypes,creative-presets}.md`

A licença Apache 2.0 completa do projeto de origem está em
https://github.com/nexu-io/open-design/blob/main/LICENSE. Conforme a seção 4
da Apache 2.0, esta atribuição acompanha a obra derivada.

## superpowers / skill-creator (referência metodológica)

A metodologia de criação das skills (RED-GREEN-REFACTOR, evals com ground
truth, references com progressive disclosure) seguiu os plugins `superpowers` e
`skill-creator`. Nenhum conteúdo foi copiado — apenas a estrutura/processo.
