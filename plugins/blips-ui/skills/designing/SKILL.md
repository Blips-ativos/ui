---
name: designing
description: "Use para CONDUZIR o design de interfaces @blips/ui — antes de construir tela/página nova, ao redesenhar ou polir uma existente, quando pedirem 'deixa bonito', 'tá com cara de template/IA', 'que direção dar', ou páginas de marketing/showcase. É a diretora do arco: pedido → direção → plano → handoff p/ building → loop de crítica. NÃO implementa (blips-ui:building) nem é o gate de conformidade (blips-ui:reviewing). Sintomas: todo dashboard saindo igual, tela sem direção declarada, sombras/espaçamentos inconsistentes."
---

# Design de interfaces Blips

## Visão geral

`designing` é a **diretora do arco de design**: conduz do pedido até a tela
pronta — direção declarada → plano → handoff para a `building` → loop de
crítica até passar. A doutrina default é a de **produto** (contenção e
precisão); ousadia criativa é **opt-in** (marketing/landing). Em ambas, **o
tema é lei**.

Divisão de papéis no ciclo: **designing dirige** (decide o COMO DEVE FICAR e
conduz a iteração) · **building implementa** com os componentes · **reviewing
julga** — tanto a conformidade quanto a **crítica scored** que o loop desta
skill invoca (`reviewing/references/critique.md`).

**Anuncie ao começar:** "Usando blips-ui:designing para dirigir o design."

## Modos (porta de entrada — escolha pelo estado do trabalho)

| Modo | Quando | O que faz |
| --- | --- | --- |
| **Planejar** | tela/página NOVA | o fluxo completo abaixo (read → direção → plano → handoff → crítica) |
| **Redesenhar** | tela EXISTENTE, evoluir o visual | detecta Preservar × Reformular; aplica os *levers* em ordem de impacto; preserva o que não pode mudar |
| **Polir** | tela EXISTENTE, ajustes pontuais | poucas correções decisivas sobre o artefato; não reinicia do zero |

Animação e *hardening* (mobile/contraste/estados) não são modos próprios —
moram na `building`/`reviewing`. A **crítica** não é modo: é o gate (reviewing).

## O que NÃO está na mesa (o tema decide — sem exceção)

- **Cor**: o amarelo Blips (`primary`) é o único acento de marca; cores
  semânticas (`success`/`warning`/`destructive`/`info`) só para significado.
  Nenhuma paleta nova, nenhum hex — nem no modo criativo.
- **Fonte**: Inter (`font-sans`), Quicksand (`font-display`), JetBrains Mono
  (`font-mono`) — via tokens. `--font-heading` é alias de Inter (não Quicksand;
  para "anunciar" use `font-display`). Escolher fonte não é grau de liberdade.
- **Escalas**: `--radius` do tema e as escalas default de sombra/espaçamento
  do Tailwind — nada de valores custom arbitrários.

A diferenciação vem do que SOBRA — e sobra muito: densidade, profundidade,
layout, composição, escala tipográfica, movimento, tom.

## Fluxo de planejamento (modo Planejar)

Protocolo multi-turno. Não pule o Design Read; não caia no default silencioso.

### 1. Design Read (declare em 1 linha, antes de qualquer pixel)

> "Lendo isto como **\<tipo de tela\>** para **\<quem\>**, com linguagem
> **\<vibe\>**, tendendo ao arquétipo **\<nome\>**."

Disciplina de ambiguidade (ask-vs-infer): se a leitura **genuinamente diverge**
(dá pra ler de dois jeitos opostos), faça **no máximo UMA pergunta** — nunca um
questionário. Caso contrário, **infira e DECLARE** (o usuário corrige se
errar). Em ajuste a tela existente ("aumenta o título", "troca o ícone"), pule
o Read e vá direto ao Polir.

### 2. Direção (decida só o espaço REALMENTE aberto — cor/fonte são o tema)

**Produto (default)** — as 4 dimensões, escolha UMA opção de cada:

| Decisão | Opções |
| --- | --- |
| **Densidade** | densa (scan/comparação, power users) × generosa (foco, tarefas pontuais) |
| **Profundidade** | bordas-only (técnico, denso) × sombra sutil única × surface shift (`bg-muted` eleva cards) — layered shadows só com motivo |
| **Layout** | sidebar (multi-seção) × top nav (simples) × split panel (lista-detalhe) |
| **Tom** | microcopy/empty states: sóbrio × acolhedor × direto |

**Criativo (opt-in)** — os **dials numéricos** (Expressividade / Movimento /
Densidade), com tabela de inferência sinal→valor e presets em
`references/creative-presets.md`. É onde a ousadia é graduável.

Tradução do pedido (quando o usuário não declara):

| O usuário diz… | Provável direção |
| --- | --- |
| "dashboard", "comparar", "o dia todo nessa tela" | densa · bordas-only/surface-shift · sidebar · sóbrio |
| "configurações", "perfil", "ajustar" | generosa · surface-shift · sidebar de settings · acolhedor |
| "landing", "lançamento", "memorável", "institucional" | **modo criativo** (dials) |
| "simples", "rápido", "MVP" | generosa · sombra sutil · top nav · direto |

Vocabulário de arquétipos (8 produto + 8 criativos, com "quando evocar" e "o
que NÃO tomar emprestado") em `references/archetypes.md`. Atmosfera canônica da
marca em `references/design-system.md` (o DESIGN.md da Blips).

### 3. Variações quando explorando (não "a resposta")

Se o usuário está **explorando** (não pediu algo específico), ofereça **2-3
direções diferenciadas** sobre a mesma base — densidade/profundidade/tom (ou
dials) distintos — e recomende uma. Para ajuste em tela existente, prefira UM
caminho, não multiplique arquivos.

### 4. Plano de design (declare antes de mandar pro building)

Um bloco curto `<plano-de-design>`: direção (4 dims ou dials) · lista de
seções/componentes · o **"20%" distintivo** (UM lugar só — ver fórmula abaixo) ·
quais **estados** a tela precisa (loading/empty/erro — ver `reviewing/references/ui-states.md`).

**Fórmula 80/20** (anti-genérico): 80% padrão comprovado (layout previsível,
hierarquia clara, componentes da lib) + 20% de UMA escolha distintiva
concentrada num lugar. Espalhar "criatividade" por tudo vira ruído; concentrar
vira assinatura. **Intencionalidade > intensidade.**

### 5. Handoff → building

Implementação guiada pela **blips-ui:building**, com a direção declarada e o
`<plano-de-design>` junto.

### 6. Loop de crítica (depois que a building construiu)

Invoque **blips-ui:reviewing** no **modo crítica** (`reviewing/references/critique.md`):
5 dimensões com nota e evidência. Regra do loop:

- Qualquer dimensão **quebrada (≤4/10)** = regressão → conserte a **mais fraca**
  e **re-pontue**. **Dois passes é normal.**
- **Pronto** = zero dimensões quebradas **e** o gate de conformidade da
  reviewing passou (bloqueantes = 0).
- **NUNCA** critique o artefato no mesmo turno em que o gerou (olhos viciados);
  rode o loop após a entrega da building.

## Doutrina de produto (default — o piso de qualidade)

Vale para TODA tela de app: dashboard, admin, fluxo, formulário, tabela.

- **Grid de 4px**: espaçamento em múltiplos de 4 (4 micro · 8 interno · 12
  relacionado · 16 seção · 24 entre seções · 32 separação maior). Ritmo de
  agrupamento (8-12 dentro / 32-48 entre) em `reviewing/references/component-standards.md`.
- **Padding simétrico**: TLBR iguais (`p-4`); horizontal maior só com motivo
  (`px-4 py-3`). Nunca 4 valores diferentes.
- **Profundidade: a escolhida na direção, consistente na tela inteira.** Em
  dark mode, bordas > sombras (sombra some no escuro).
- **Hierarquia de contraste em 4 níveis** com classes reais: `text-foreground`
  → `text-foreground/80` → `text-muted-foreground` → `text-muted-foreground/60`.
  Não invente cinzas.
- **Tipografia**: hierarquia por peso (600 títulos com tracking apertado,
  400-500 corpo); **dados/números/IDs em `font-mono` + `tabular-nums`**. Os
  números duros (tracking, medida, line-height) em `reviewing/references/typography.md`.
- **Cor só para significado**: cinza constrói estrutura; cor aparece em
  status/ação/erro. Score bars e badges não precisam de arco-íris.
- **Cards**: layout interno varia com o conteúdo; o chrome é constante (mesma
  borda, sombra, radius, padding).
- **Controles são SEMPRE os componentes da lib** (Select, Calendar, Checkbox…).
  Nunca nativo estilizado, nunca hand-rolled — a API está na building.
- **Ícones clarificam, não decoram**: se remover não perde sentido, remova.
- **Animação**: 150ms micro, 200-250ms transições; easing
  `cubic-bezier(0.25, 1, 0.5, 1)`; **sem spring/bounce em produto**. Detalhe em
  `reviewing/references/motion.md`.
- **Grounding**: tela sem navegação/contexto parece demo; sidebar com o MESMO
  background do conteúdo + borda sutil (Linear/Vercel), não cor diferente.

### Nunca (mensurável — a reviewing flagra)

Sombras dramáticas (`0 25px 50px…`) · radius ≥16px em elementos pequenos ·
bordas ≥2px decorativas · margens >48px entre seções · gradientes decorativos ·
spring/bounce · padding assimétrico sem motivo · qualquer cor/fonte fora do tema.

## Modo criativo (opt-in explícito)

**Quando**: landing, marketing, showcase, erro lúdico — e só com a superfície
claramente identificada ou pedido explícito. **Na dúvida, é produto.** Tela de
app nunca entra aqui.

A ousadia vem de **composição** (assimetria, sobreposição, grid-break, negative
space) · **escala** (display Quicksand generoso) · **movimento** (um page-load
orquestrado vale mais que dez micro-interações; Motion no React) · **atmosfera**
(texturas/noise/transparências SOBRE os tokens). O que NÃO muda: tokens, fontes
e acento. A identidade vem de composição/movimento/escala, não de trocar a
marca. Os presets (Minimal editorial / Bold statement / Soft depth) e os dials
estão em `references/creative-presets.md` — não misture presets na mesma tela.
Lista de "AI slop" a evitar: `reviewing/references/anti-slop.md`.

## Modo Redesenhar (tela existente)

1. **Detecte o modo** (pergunte UMA vez se ambíguo): *Preservar* (moderniza sem
   quebrar a marca) × *Reformular* (nova linguagem sobre o mesmo conteúdo).
2. **Audite antes de tocar**: leia a direção atual da tela e o que **nunca muda
   em silêncio** — rotas/slugs, labels de navegação, nomes de campos, conteúdo
   legal.
3. **Levers em ordem de impacto/risco**: tipografia → espaçamento/ritmo →
   recalibração de cor (dentro do tema) → camada de movimento → recomposição de
   hero/seção → troca de bloco (só se o bloco for irreparável).
4. Entre no loop de crítica como no Planejar.

## Auto-verificação (antes do handoff p/ building)

- [ ] Design Read declarado (1 linha)?
- [ ] Direção declarada — 4 dimensões (produto) ou dials (criativo)?
- [ ] `<plano-de-design>` com seções + o "20%" + estados?
- [ ] Cor/fonte 100% do tema? Profundidade única na tela?
- [ ] Dados em mono + tabular-nums? Controles = componentes da lib?
- [ ] Superfície criativa? Só se explicitamente marketing/showcase.

## Referências desta skill

| Quando | Reference |
| --- | --- |
| Atmosfera/cor/profundidade canônica da marca | `references/design-system.md` |
| Escolher/declarar direção | `references/archetypes.md` (16 arquétipos) |
| Superfície criativa: presets + dials | `references/creative-presets.md` |
| Loop de crítica (gate de qualidade) | `reviewing/references/critique.md` |

Os números duros de craft (tracking, durações, cap de accent, ritmo de
proximidade) vivem nas references da **blips-ui:reviewing** (fonte única) —
esta skill aponta, não duplica.
