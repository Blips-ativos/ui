# Presets de direção criativa (opt-in) — tema Blips

Presets de direção **criativa** para superfícies de marketing — só landing,
showcase, hero, página de erro lúdica. **Na dúvida, é produto** (`designing` →
doutrina de produto). Tela de app **nunca** entra aqui.

Formato herdado do open-design (`minimalist`/`brutalist`/`soft`): **bans primeiro
→ técnica permitida**. A diferença: o open-design troca fonte/cor/sombra por
preset; **aqui o tema é lei e não se mexe**. A ousadia mora em **composição,
escala e movimento** — JAMAIS em trocar cor ou fonte. Cada preset é autocontido:
escolha UM por superfície e comprometa-se (não alterne nem misture dois).

## Dials (calibração numérica da direção criativa)

Antes de escolher o preset, calibre 3 dials (a ousadia é **graduável** no
criativo — em produto, ignore: a doutrina de produto já fixa a contenção).
Adaptado dos `DESIGN_VARIANCE/MOTION_INTENSITY/VISUAL_DENSITY` do open-design.

- **Expressividade** `1` (simetria perfeita) … `10` (composição ousada/quebra de grid)
- **Movimento** `1` (estático) … `10` (cinético/físico, page-load orquestrado)
- **Densidade** `1` (galeria/arejado) … `10` (denso/informacional)

**Tabela de inferência (sinal no pedido → valores):**

| Sinal | Expr. | Mov. | Dens. |
| --- | --- | --- | --- |
| "minimalista / clean / editorial / Linear-style" | 5-6 | 3-4 | 2-3 |
| "premium / institucional / lançamento de marca" | 7-8 | 5-7 | 3-4 |
| "ousado / Awwwards / showcase / agência" | 9-10 | 8-10 | 3-4 |
| "landing/marketing (default)" | 7-9 | 6-8 | 3-5 |
| "confiança / regulado / sóbrio" | 3-4 | 2-3 | 4-5 |

**Presets prontos** (Expr./Mov./Dens.): Minimal editorial `5/3/3` · Bold
statement `9/7/3` · Soft depth `7/6/4`. Declare os 3 valores no `<plano-de-design>`
e justifique a partir do sinal — nunca use o baseline em silêncio.

Limite: mesmo `Movimento 10`, valem as regras de `reviewing/references/motion.md`
(transform/opacity, `prefers-reduced-motion`, sem scroll-jank) — ousadia ≠
quebrar acessibilidade.

## Invariante de tema (vale para os QUATRO presets — leia uma vez)

> **Cor** = amarelo Blips `#fcba28` (`bg-primary`/`text-primary`, fg `#000000`)
> + neutros do tema (`background`, `foreground`, `muted`, `border`, `card`,
> `surface`) + semânticas só por significado (`success`/`warning`/`destructive`/
> `info`). **Zero hex novo, zero paleta nova — nem em modo criativo.**
> **Fonte** = Inter (`font-sans`), Quicksand (`font-display`), JetBrains Mono
> (`font-mono`). Escolher fonte não é grau de liberdade.
> Tokens são cor completa (oklch/hex): consuma como utility (`bg-primary`) ou
> `var(--primary)` — **nunca** `hsl(var(--primary))` (quebra: o token já é a cor).

Porquê: a identidade Blips vem da marca constante; se cada landing inventa
paleta/fonte, deixa de ser Blips. O open-design bane "Inter" e exige serifa
custom — **nós invertemos**: Inter/Quicksand são lei, e o que o open-design
chama de "premium font" nós obtemos via **escala** e **composição**.

Os números de motion/tracking abaixo são a aplicação criativa das references
canônicas — **não os redefina**: ver `reviewing/references/motion.md`
(durações, `transform`/`opacity`, `prefers-reduced-motion`) e
`reviewing/references/typography.md` (tracking de display/caixa-alta, leading).
Os presets **apontam** para elas; em conflito, a reference canônica vence.
Arquétipo (`archetypes.md`) é vocabulário de nomeação; o COMO binário
(bans/técnica) mora aqui e na `reviewing` — em conflito, a reference canônica vence.

---

## Preset 1 — Minimal editorial

**Quando usar:** landing/manifesto/changelog onde o conteúdo é o herói; quer
sensação "documento premium", calma e cara, sem decoração.

### Banned (binário — nunca aparece neste preset)

| Banido | Porquê |
|---|---|
| Sombras pesadas (`shadow-md`/`lg`/`xl`) | Quebra a planura editorial; sombra aqui é < 0.05 de opacidade ou inexistente |
| `rounded-full` em containers/cards/botões grandes | Pílula em bloco grande lê como SaaS genérico; cantos retos 8–12px |
| Fundo `bg-primary` cobrindo seção/hero inteiro | Amarelo é acento pontual, não tela de fundo — vira aviso, não editorial |
| Gradiente decorativo, neon, glassmorphism (além de blur sutil de navbar) | São os tells de "template IA" que a `anti-slop` flagra |
| Emoji em texto/heading/alt | Substitua por ícone Phosphor ou primitiva SVG limpa |
| Mais de 3 tamanhos de tipo acima da dobra | `typography.md` §2 #6 — ruído de hierarquia |

### Técnica permitida

- **Composição:** CSS Grid **assimétrico** (bento). Card = `border border-border`
  (hairline), `rounded-lg` (8–12px), padding generoso `p-6`–`p-10`. Coluna de
  conteúdo travada em `max-w-4xl`/`max-w-5xl`. Porquê: estrutura plana + medida
  controlada é o que produz o "document-style".
- **Escala:** display em `font-display` (Quicksand) `text-5xl`–`text-7xl`,
  `tracking-tight`, `leading-tight` — contraste por **escala e espaço**, não por
  massa (`font-bold` é raro; ver `typography.md` §6 #17). Eyebrow `text-xs
  uppercase tracking-widest` (≥0.06em — `typography.md` #8, **bloqueante**).
- **Movimento (orquestrado no load/scroll):** entrada `translateY(12px)` +
  `opacity:0` → `0` over **600ms** `cubic-bezier(0.16, 1, 0.3, 1)`, via
  `IntersectionObserver` (nunca `scroll` listener). Stagger em grupo pequeno:
  `animation-delay: calc(var(--index) * 80ms)`. Hover de card: shadow de `0 0 0`
  → `0 2px 8px rgba(0,0,0,0.04)` over 200ms; botão `:active` `scale(0.98)`.
  Porquê: "movimento invisível" — presente, nunca espetáculo.
- **Atmosfera (sobre os tokens):** profundidade sem fundo chapado — radial
  ambiente quente `opacity 0.02–0.04` em camada `position: fixed;
  pointer-events: none`, drift `≥20s`; OU grão/noise SVG `opacity ~0.04` fixo.
  Acento de cor só em tag/`<kbd>`/ícone (use `bg-muted`/`text-muted-foreground`;
  o amarelo `bg-primary` no CTA único). Porquê: seção plana sem textura parece
  vazia; a textura nunca vira a marca.

### Guardrails de perf

- Anime **só** `transform`/`opacity` — nunca `top`/`left`/`width`/`height`
  (`motion.md` #8, **bloqueante**: reflow trava o frame).
- `backdrop-blur` **só** em fixed/sticky (navbar) — nunca em container que rola
  (`motion.md`/`soft-skill`: blur em scroll = repaint contínuo, frame drop).
- Grão/noise **só** em pseudo-elemento `fixed; inset:0; pointer-events:none`.
- `will-change: transform` parcimonioso, só no elemento que anima agora.

### Checklist de saída (binário)

- [ ] Zero cor/fonte fora do tema (amarelo + neutros + semânticas; Inter/Quicksand/mono)?
- [ ] Nenhuma sombra > 0.05 de opacidade; nenhum `rounded-full` em container grande?
- [ ] Display em `font-display` com `tracking-tight`; eyebrow caixa-alta com tracking ≥0.06em?
- [ ] ≤3 tamanhos de tipo acima da dobra; conteúdo em `max-w-4xl`/`5xl`?
- [ ] Entradas via `IntersectionObserver`, `transform`/`opacity`, ≤600ms?
- [ ] Textura/ambiente só em camada `fixed pointer-events-none`?
- [ ] `prefers-reduced-motion`: eixo removido, crossfade de opacity mantido (`motion.md` #11)?

---

## Preset 2 — Bold statement (Swiss/estrutural)

**Quando usar:** hero de impacto, página de lançamento, manifesto de marca,
404 com atitude — quando a tipografia **é** o design e o objetivo é parar o scroll.

### Banned (binário)

| Banido | Porquê |
|---|---|
| `border-radius` em qualquer elemento estrutural (`rounded-*`) | Rigidez mecânica exige 90° — squircle quebra o registro Swiss |
| Gradiente, sombra difusa, translucidez "moderna" | Simula mídia física/emissiva; gradiente é o oposto da planura estrutural |
| Display em peso fino/regular | Aqui a hierarquia é **massa** — display abaixo de `font-semibold` some |
| Caixa-alta sem tracking ≥0.06em | `typography.md` #8 (**bloqueante**): contornos colidem, vira amador |
| Amarelo `bg-primary` como cor de texto de leitura | Amarelo é o **acento/strike/divisor** vital, não corpo (`design-system.md`/`anti-slop`) |
| Cor semântica fora de significado | `destructive`/`success` só comunicam estado, nunca decoram |

### Técnica permitida

- **Composição:** grade modular **rígida** com compartimentação visível —
  `display: grid; gap: 1px` com `bg-border` no pai e `bg-background` nos filhos
  gera divisores hairline perfeitos sem declarar border em cada célula (truque
  determinístico do brutalist-skill). `<hr class="border-border">` atravessa o
  container inteiro para segregar zonas. Negative space assimétrico punctuado
  por numeral/letra que sangra a viewport.
- **Escala (a assinatura):** macro-tipo fluido `clamp(4rem, 10vw, 15rem)` em
  `font-display` (Quicksand) ou `font-sans` (Inter 700), **uppercase**,
  `tracking-tighter` (−0.03 a −0.06em — casa com `typography.md` #9
  **bloqueante**), `leading-none` comprimido (0.85–0.95). Micro-tipo de telemetria
  em `font-mono` 10–14px, `tracking-wide`, uppercase, para metadados/IDs/labels.
- **Movimento:** entrada decisiva e seca — `opacity:0` + `translateY` curto,
  duração de **produto** (≤300ms na entrada de UI; `motion.md` tabela). Sem
  spring/bounce mesmo no criativo aqui: a personalidade é mecânica, não lúdica.
  Reveal de macro-tipo por máscara (`clip-path`/overflow + translate) lê como
  "carimbo". Stagger só em grupo pequeno (`motion.md` #18).
- **Atmosfera:** degradação analógica **sobre os tokens** — scanlines via
  `repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,.06) 2px 4px)`;
  noise SVG global `opacity` baixa; framing ASCII (`[ … ]`, `>>>`, `///`) e
  marcadores `®`/`™` como elementos geométricos. **Tudo em foreground/border do
  tema + amarelo como único acento** — nada de "hazard red" do brutalist-skill
  (isso seria cor nova; use `text-destructive` só se o sentido for erro/alerta).

### Guardrails de perf

- `clamp()` só na macro-tipografia (escala agressiva sem quebrar viewport).
- Scanline/noise são camadas `fixed pointer-events-none` — nunca no container que rola.
- Anime só `transform`/`opacity` (`motion.md` #8). Reveal por `clip-path` é GPU-ok; evitar animar `width`/`height` de divisor.
- `prefers-reduced-motion`: corta os reveals de máscara, mantém o estado final estático.

### Checklist de saída (binário)

- [ ] Zero `rounded-*` em elemento estrutural (cantos 90°)?
- [ ] Macro-tipo `clamp()`, uppercase, `tracking-tighter`, `leading-none`?
- [ ] Caixa-alta com tracking ≥0.06em (todos os labels/eyebrows)?
- [ ] Divisores via `grid gap-1px` + `bg-border`/`bg-background`, ou `<hr>` full-width?
- [ ] Amarelo só como acento/strike; corpo em `text-foreground`?
- [ ] Zero gradiente, zero sombra difusa, zero cor fora do tema?
- [ ] Sem spring; entrada ≤300ms; scanline/noise em camada fixed?

---

## Preset 3 — Soft depth (high-end calmo)

**Quando usar:** landing de produto premium, página "sobre", pricing elegante —
quando o objetivo é profundidade háptica, espaço cinematográfico e calma cara
("$150k agency", não "template com fonte bonita").

### Banned (binário)

| Banido | Porquê |
|---|---|
| Borda genérica 1px cinza + sombra dura (`shadow-md`, `rgba(0,0,0,.3)`) | Profundidade aqui é **difusa e baixa**, não recorte duro |
| Navbar sticky colada edge-to-edge no topo | Quebra a flutuação; navbar é pílula flutuante destacada (`mt-6 mx-auto w-max`) |
| Grid Bootstrap simétrico de 3 colunas sem respiro | Layout boring; use bento assimétrico ou cascade Z |
| Transição `linear`/`ease-in-out`; mudança de estado instantânea | Sem física = barato; toda transição usa cubic-bezier com massa |
| Gradiente colorido/mesh com cor nova (purple/emerald orbs) | É o tell #1 de IA — o "orb" aqui, se houver, é amarelo do tema em opacity baixa |
| Seção com `py` < 24 | Layout precisa respirar pesado (macro-whitespace) |

### Técnica permitida

- **Composição (double-bezel):** card premium = casca externa (`bg-muted`/
  `bg-card`, hairline `ring-1 ring-border`, `p-1.5`/`p-2`, `rounded-2xl`) +
  núcleo interno com fundo próprio e radius concêntrico menor
  (`rounded-[calc(1rem-0.375rem)]`). CTA pílula (`rounded-full px-6 py-3`) com
  ícone Phosphor em wrapper circular próprio (`w-8 h-8 rounded-full bg-muted`),
  flush à direita. Bento assimétrico OU cascade Z (cards levemente sobrepostos,
  rotação `-2deg`/`3deg`). Eyebrow `rounded-full px-3 py-1 text-[10px] uppercase
  tracking-[0.2em]` (≥0.06em ok).
- **Escala:** display `font-display` (Quicksand) grande e arejado,
  `tracking-tight`; macro-whitespace `py-24`–`py-40`; dobre o padding default.
- **Movimento (orquestrado, com física):** este é o único preset que admite
  **spring/Motion (React)** — é modo criativo (`motion.md`: spring/physics é
  ferramenta do criativo). Scroll-entry: `translate-y-16 blur-md opacity-0` →
  `translate-y-0 blur-0 opacity-100` over **800ms+**, `whileInView` (não
  `scroll` listener). Hover magnético: `group` + `active:scale-[0.98]`, ícone
  interno `group-hover:translate-x-1 group-hover:-translate-y-px scale-105`.
  Transições com `cubic-bezier(0.32, 0.72, 0, 1)`. Nav: hamburger faz morph
  fluido em 'X'; menu abre overlay `backdrop-blur-3xl bg-background/80` com
  reveal em máscara escalonado.
- **Atmosfera:** sombras **ultra-difusas** e baixas (ambiente, não recorte);
  highlight interno `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`; grão de
  filme `opacity-[0.03]` para tato físico. Se houver "orb" ambiente, é **amarelo
  do tema** (`bg-primary`) em opacity 0.03–0.04, camada fixa. Porquê: a
  profundidade é o produto; a cor continua sendo a marca.

### Guardrails de perf (do soft-skill — críticos)

- **`backdrop-blur` só em fixed/sticky** (navbar, overlay) — **nunca** em
  container que rola nem em área grande de conteúdo (repaint GPU contínuo,
  frame drop severo no mobile).
- Anime **exclusivamente** `transform`/`opacity` — nunca `top`/`left`/`width`/
  `height` (`motion.md` #8, **bloqueante**).
- Grão/noise **só** em pseudo-elemento `fixed; inset:0; pointer-events:none; z-50`.
- Z-index disciplinado: só camadas sistêmicas (nav/modal/overlay/tooltip), nunca `z-[9999]` arbitrário.
- Abaixo de `768px`: assimetria → `w-full px-4 py-8`; remova rotações/overlaps
  (conflito de touch-target); `min-h-[100dvh]` em vez de `h-screen` (iOS Safari).
- `prefers-reduced-motion`: remove translate/scale/blur, mantém crossfade (`motion.md` #11).

### Checklist de saída (binário)

- [ ] Cards major usam double-bezel (casca + núcleo, radius concêntrico)?
- [ ] CTA com ícone em wrapper circular próprio; eyebrow pílula tracking ≥0.06em?
- [ ] Seções com `py-24`+ (respiro pesado)?
- [ ] Toda transição com cubic-bezier de massa — zero `linear`/`ease-in-out`?
- [ ] Scroll-entry presente (`whileInView`); nada aparece estático no load?
- [ ] `backdrop-blur` só em fixed/sticky; só `transform`/`opacity` animados?
- [ ] Único "orb"/gradiente, se houver, é amarelo do tema em opacity baixa — zero cor nova?
- [ ] Colapsa para 1 coluna `w-full px-4` abaixo de 768px, sem rotações?

---

## Como escolher (1 linha cada)

| Preset | Personalidade | Motion | Profundidade |
|---|---|---|---|
| **Minimal editorial** | documento calmo, plano | invisível, ≤600ms, sem spring | quase nenhuma (hairline + ambiente 0.04) |
| **Bold statement** | mecânico, tipo-herói, 90° | seco, ≤300ms, sem spring | nenhuma (planura + scanline/noise) |
| **Soft depth** | háptico, premium, flutuante | físico, spring/Motion, 800ms+ | difusa em camadas (double-bezel) |

**Regra de ouro:** escolha UM e comprometa-se. Misturar planura editorial com
double-bezel háptico no mesmo hero lê como indecisão, não autoria. E em qualquer
um: **a ousadia é composição/escala/movimento — a cor é sempre o amarelo + neutros
do tema, a fonte é sempre Inter/Quicksand.** Antes do handoff, a `designing`
exige declarar a direção; a `reviewing` valida contra ela (gate).

<!-- Fonte: nexu-io/open-design (Apache 2.0) — skills/minimalist-skill/SKILL.md, skills/brutalist-skill/SKILL.md, skills/soft-skill/SKILL.md (high-end-visual-design); thresholds ancorados em reviewing/references/motion.md e typography.md -->
