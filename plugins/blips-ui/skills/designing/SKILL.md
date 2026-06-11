---
name: designing
description: "Use para decisões VISUAIS e direção estética em interfaces @blips/ui — antes de construir telas novas, quando pedirem 'deixa bonito', 'tá com cara de template/IA', escolhas de densidade/profundidade/layout/tom, ou páginas de marketing/showcase. NÃO é implementação (blips-ui:building) nem validação (blips-ui:reviewing). Sintomas: todo dashboard saindo igual, telas sem direção declarada, sombras/espaçamentos inconsistentes entre telas."
---

# Design de interfaces Blips

## Visão geral

Direção estética + craft visual para interfaces sobre a `@blips/ui`. Unifica
as antigas `design-principles` e `frontend-design`, resolvendo os conflitos:
**a doutrina default é a de produto** (contenção e precisão); ousadia criativa
é **opt-in** para superfícies de marketing. Em ambas, **o tema é lei**.

Divisão de papéis: esta skill decide o COMO DEVE FICAR; a **blips-ui:building**
implementa com os componentes; a **blips-ui:reviewing** valida antes do pronto.

**Anuncie ao começar:** "Usando blips-ui:designing para definir a direção visual."

## O que NÃO está na mesa (o tema decide — sem exceção)

- **Cor**: o amarelo Blips (`primary`) é o único acento de marca; cores
  semânticas (`success`/`warning`/`destructive`/`info`) só para significado.
  Nenhuma paleta nova, nenhum hex — nem no modo criativo.
- **Fonte**: Inter (`font-sans`), Quicksand (`font-display`), JetBrains Mono
  (`font-mono`) — via tokens. Escolher fonte não é grau de liberdade.
- **Escalas**: `--radius` do tema e as escalas default de sombra/espaçamento
  do Tailwind — nada de valores custom arbitrários.

A diferenciação visual vem do que SOBRA — e sobra muito: densidade,
profundidade, layout, composição, escala tipográfica, movimento, tom.

## Direção de design (OBRIGATÓRIO antes de codar)

Não comece a tela sem **declarar a direção** (1 parágrafo no plano/resposta).
Pense no contexto — o que o produto faz, quem usa (power user × ocasional),
qual o trabalho emocional (confiança? eficiência? foco?) — e decida:

| Decisão | Opções (escolha UMA por tela/produto) |
| --- | --- |
| **Densidade** | densa (scan/comparação, power users) × generosa (foco, tarefas pontuais) |
| **Profundidade** | bordas-only (técnico, denso) × sombra sutil única × surface shift (fundo `muted` eleva cards) — layered shadows só com motivo |
| **Layout** | sidebar (multi-seção) × top nav (simples) × split panel (lista-detalhe) |
| **Tom** | microcopy e empty states: sóbrio × acolhedor × direto |

O vocabulário completo de arquétipos (8 de produto + 8 criativos, cada um com
"quando evocar" e "o que NÃO tomar emprestado") está em
`references/archetypes.md` — arquétipo é vocabulário de direção, nunca troca de
marca. A atmosfera canônica da Blips (tese visual, papéis de cor, profundidade,
do's/don'ts) está em `references/design-system.md` — o DESIGN.md da marca.

### Do pedido à direção (quando o usuário não declara)

Traduza linguagem natural em decisões — e sinalize o que ficou implícito:

| O usuário diz… | Provável direção |
| --- | --- |
| "dashboard", "comparar", "o dia todo nessa tela" | densa · bordas-only/surface-shift · sidebar · sóbrio |
| "configurações", "perfil", "ajustar" | generosa · surface-shift · sidebar de settings · acolhedor |
| "landing", "lançamento", "memorável", "institucional" | **modo criativo** (ver abaixo) |
| "simples", "rápido", "MVP" | generosa · sombra sutil · top nav · direto |

Dimensão não declarada pelo usuário = você decide e **declara** assim mesmo;
nunca caia no default silencioso ("todo dashboard igual").

## Doutrina de produto (default — o piso de qualidade)

Vale para TODA tela de app: dashboard, admin, fluxo, formulário, tabela.

- **Grid de 4px**: todo espaçamento em múltiplos de 4 (4 micro · 8 interno ·
  12 relacionado · 16 seção · 24 entre seções · 32 separação maior).
- **Padding simétrico**: TLBR iguais (`p-4`); horizontal maior só com motivo
  (`px-4 py-3`). Nunca 4 valores diferentes.
- **Profundidade: a escolhida na direção, consistente na tela inteira.** Em
  dark mode, bordas > sombras (sombra some no escuro).
- **Hierarquia de contraste em 4 níveis**, com classes reais do tema:
  `text-foreground` → `text-foreground/80` → `text-muted-foreground` →
  `text-muted-foreground/60`. Use os quatro; não invente cinzas.
- **Tipografia**: hierarquia por peso (600 títulos com tracking apertado, 400-500
  corpo) e pela escala do tema; **dados/números/IDs em `font-mono` +
  `tabular-nums`** — mono sinaliza "isto é dado".
- **Cor só para significado**: cinza constrói estrutura; cor aparece em
  status/ação/erro. Score bars e badges não precisam de arco-íris — olhe como
  o GitHub renderiza tabelas: quase monocromático.
- **Cards**: o layout interno varia com o conteúdo (sparkline, avatar stack,
  progress ring); o chrome é constante (mesma borda, sombra, radius, padding).
- **Controles são SEMPRE os componentes da lib** (Select, DatePicker via
  Calendar, Checkbox...). Nunca elementos nativos estilizados, nunca
  hand-rolled — a API está na blips-ui:building.
- **Ícones clarificam, não decoram**: se remover o ícone não perde sentido,
  remova. Ícone standalone ganha presença com container sutil.
- **Animação**: 150ms micro, 200-250ms transições; easing
  `cubic-bezier(0.25, 1, 0.5, 1)`; **sem spring/bounce em produto**.
- **Grounding**: tela sem navegação/contexto parece demo de componente —
  inclua sidebar/breadcrumb/título; sidebar com MESMO background do conteúdo
  + borda sutil (Linear/Vercel), não cor diferente.

### Nunca (mensurável — a reviewing pode flagrar)

Sombras dramáticas (`0 25px 50px...`) · radius ≥16px em elementos pequenos ·
bordas ≥2px decorativas · margens >48px entre seções · gradientes decorativos ·
spring/bounce · padding assimétrico sem motivo · qualquer cor/fonte fora do
tema.

## Modo criativo (opt-in explícito)

**Quando**: landing pages, marketing, showcase, páginas de erro lúdicas —
e somente com a superfície claramente identificada ou pedido explícito.
**Na dúvida, é produto.** Tela de app nunca entra aqui.

O que muda (a ousadia vem daqui):

- **Composição**: assimetria, sobreposição, fluxo diagonal, elementos que
  quebram o grid, negative space dramático OU densidade controlada.
- **Escala**: tipografia display (Quicksand) em tamanhos generosos, contrastes
  de peso agressivos.
- **Movimento**: um page-load orquestrado com reveals escalonados vale mais
  que dez micro-interações; scroll-trigger e hovers que surpreendem (Motion
  para React).
- **Atmosfera**: texturas, noise, padrões geométricos, transparências em
  camadas — construídos SOBRE os tokens do tema (o amarelo como acento
  dominante funciona; paleta nova, não).

O que NÃO muda: tokens, fontes e acento (ver "O que não está na mesa").
A identidade vem de composição/movimento/escala — não de trocar a marca.

Os presets prontos (Minimal editorial, Bold statement, Soft depth — cada um com
bans + técnica + checklist) estão em `references/creative-presets.md`; não
misture presets na mesma tela.

**Fórmula 80/20** (anti-genérico): 80% padrão comprovado (layout previsível,
hierarquia clara, componentes da lib) + 20% de uma escolha distintiva
concentrada em UM lugar (um momento tipográfico, uma transição de entrada, uma
textura de fundo). Espalhar "criatividade" por tudo vira ruído; concentrar
vira assinatura. **Intencionalidade > intensidade.** A lista completa de "AI
slop" a evitar (purple-gradient-on-white, layouts cookie-cutter, emoji-ícone,
métricas inventadas) é a `reviewing/references/anti-slop.md`.

## Auto-verificação (binária — antes do handoff)

- [ ] Direção declarada (densidade + profundidade + layout + tom)?
- [ ] Todo espaçamento divisível por 4? TLBR simétrico? (produto)
- [ ] UMA estratégia de profundidade na tela inteira? (produto)
- [ ] Zero classes de cor fora dos tokens semânticos/neutros do tema?
- [ ] Dados em mono + tabular-nums?
- [ ] Animações em 150-250ms, sem spring (produto)?
- [ ] Controles = componentes da lib?
- [ ] Superfície criativa? Só se explicitamente marketing/showcase.

## Referências desta skill

| Quando | Reference |
| --- | --- |
| Atmosfera/cor/profundidade canônica da marca | `references/design-system.md` (o DESIGN.md da Blips) |
| Escolher/declarar uma direção | `references/archetypes.md` (16 arquétipos) |
| Superfície criativa (landing/marketing) | `references/creative-presets.md` |

Os números duros de craft (tracking, durações de motion, cap de accent, ritmo
de proximidade) vivem nas references da **blips-ui:reviewing** (fonte única) —
esta skill aponta para lá, não duplica.

## Handoff

Implementação guiada pela **blips-ui:building**; antes de declarar pronto,
**blips-ui:reviewing** (gate). A direção declarada vai junto no handoff — o
revisor confere consistência contra ela.
