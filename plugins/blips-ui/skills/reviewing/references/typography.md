# Tipografia — padrão Blips (verificável)

Base: open-design/craft (`typography.md`, `typography-hierarchy.md`,
`typography-hierarchy-editorial.md`), por sua vez destilado do refero_skill (MIT)
e de Bringhurst, *Elements of Typographic Style* §3.2.7 (piso de 5–10% do em
para caixa-alta). Reference canônica de tipografia — **fonte única**; `designing`
e `building` apontam para cá, não duplicam.

O tema já fecha duas das regras mais quebradas pela IA: **máximo 2 typefaces**
(Inter em `font-sans`/`font-heading` + Quicksand em `font-display`; JetBrains Mono
em `font-mono` é família de função, não de leitura) e o **fallback intencional**
(o `globals.css` declara a cadeia — `font-family: system-ui` puro num heading,
o default-slop da IA, não acontece aqui). O que resta lintar é o **como** em cada
tamanho. Severidades entre parênteses; cada regra marcada **auto-verificável
(check.mjs)** ou **julgamento (revisor)**. Hoje o check.mjs faz só **3** checks
de tipografia — todos **aviso** (uppercase sem tracking ≥0.06em, display
`text-4xl`+ sem tracking negativo, `text-justify`); todo o resto depende do olho
do revisor sobre a composição renderizada.

> Tokens são consumidos como utilities Tailwind (`font-display`, `tracking-tight`,
> `leading-relaxed`, `max-w-prose`) ou `var(--font-*)` — **nunca** `hsl(var(--…))`.

---

## 1. Sistema de 3 pesos (peso é vocabulário, não decoração)

A IA grada peso uniformemente (regular→medium→semibold→bold); UI com craft usa
**3 papéis** e faz o peso **saltar**, não subir degrau. Mapa ao tema:

| Papel | Peso canônico (open-design) | Peso no tema | Classe Tailwind |
|---|---|---|---|
| **Ler** | 400 / 450 | Inter 400 | `font-normal` |
| **Enfatizar** | 510 / 550 | Inter 500 · Quicksand 500 | `font-medium` |
| **Anunciar** | 590 / 600 | Inter 600 · Quicksand 600 | `font-semibold` |
| (raro) | 700+ | Inter 700 · Quicksand 700 | `font-bold` |

1. **`font-bold` (700+) é raro e justificado** — só destaque pontual dentro de
   corpo ("esta palavra importa além da frase") ou número-herói. Bold como peso
   default de heading/botão é falta de disciplina: o salto para 600 (`font-semibold`)
   já anuncia. (aviso — **julgamento (revisor)**)
2. **No máximo 3 pesos visíveis na mesma superfície** acima da dobra. Quatro pesos
   em jogo = sistema sem hierarquia de massa. (aviso — **julgamento (revisor)**)
3. **Sem "escada de pesos graduada"**: `font-normal → font-medium → font-semibold
   → font-bold` em níveis adjacentes sequenciais lê como escala default, não
   autoria — o peso deve pular um degrau, não percorrer todos. (aviso —
   **julgamento (revisor)**)

---

## 2. Medida, line-height e número de tamanhos (legibilidade)

4. **Corpo de texto limitado a 50–75ch, alvo ~65ch** — `max-w-prose` (≈65ch) ou
   `max-w-[65ch]`. Linha longa demais perde o olho no retorno; bloco de prosa
   (`<p>`/artigo/descrição longa) sem teto de medida é violação. (aviso —
   **julgamento (revisor)**)
5. **Line-height por faixa** — display/heading aperta, corpo respira:
   - Display/H1 (≥`text-3xl`/32px): 1.0–1.2 → `leading-none`/`leading-tight`.
   - Corpo (15–18px): 1.5–1.6 → `leading-relaxed` (1.625) ou `leading-normal`.
   - Texto pequeno (≤14px): 1.5 → `leading-normal`.

   Display com `leading-relaxed` fica frouxo e fraco; corpo com `leading-tight`
   sufoca a leitura. (aviso — **julgamento (revisor)**)
6. **No máximo 3 tamanhos acima da dobra** (cap geral de 6–8 por artefato). Mais
   que 3 tamanhos competindo no primeiro olhar = ruído de hierarquia. (aviso —
   **julgamento (revisor)**)
7. **Escala multiplicativa 1.2–1.25** (a escala default do Tailwind já é próxima
   disso) — não inventar tamanhos arbitrários (`text-[19px]`) entre os passos.
   (aviso — **julgamento (revisor)**)

---

## 3. Tracking — os dois tells mais confiáveis de slop

Os dois erros de tracking abaixo são, segundo a fonte, **"os tells de AI-slop
mais confiáveis"** — e ambos são mecanicamente lintáveis. Sem exceção.

8. **CAIXA-ALTA exige tracking ≥ 0.06em** (`tracking-wide` = 0.025em **não basta**;
   use `tracking-wider` = 0.05em só como piso visual e prefira `tracking-widest`
   = 0.1em, ou `tracking-[0.06em]`). O piso 0.06em é o limite empírico de
   tipógrafos (Bringhurst §3.2.7: 5–10% do em); abaixo disso os contornos colidem
   na tela e o texto parece amador. Vale para `uppercase` e para texto literal
   em maiúsculas (labels, eyebrows, badges). (aviso —
   **auto-verificável (check.mjs)**: `uppercase` sem `tracking-widest`/`tracking-[≥0.06em]`)
9. **Texto grande exige tracking negativo — duas faixas distintas, não um único
   valor:**
   - **Headings 32–48px (`text-3xl`/`text-4xl`): −0.01 a −0.02em → `tracking-tight`
     (−0.025em).** Aperto leve; não puxe o piso de 32px ao valor de display.
   - **Display 48px+ (`text-5xl`+): −0.02 a −0.03em → `tracking-tighter`
     (−0.05em, no limite).** Só aqui o aperto mais forte se justifica.

   Texto grande sem tracking negativo fica "solto e fraco". O check mecânico cobre
   só a faixa de display (`text-4xl`+) como aviso; o aperto correto por faixa é
   julgamento. (aviso — **auto-verificável (check.mjs)**: `text-4xl`/`5xl`/`6xl`/
   `7xl`/`8xl`/`9xl` sem `tracking-tight`/`tighter`/`-tracking`)
10. **Tracking positivo leve no texto pequeno** (11–13px → `tracking-wide`) e em
    labels/botões (0.02em) melhora a leitura em corpo reduzido. (aviso —
    **julgamento (revisor)**)

---

## 4. Hierarchy lint — 5 vetores, ≥2 ativos no dominante

Escala é **um** vetor entre cinco. O elemento dominante deve liderar por **pelo
menos dois** vetores na mesma direção; hierarquia só por tamanho é frágil (qualquer
constraint de layout que achate o tamanho mata a hierarquia).

| Vetor | Controla | Direção (primário) |
|---|---|---|
| Escala | contraste de tamanho | maior = primário |
| Peso | contraste de massa | mais pesado = primário (inversão é permitida) |
| Espaço | respiro ao redor | mais espaço = mais importante |
| Tracking | tensão/velocidade | apertado = rápido; largo = cerimonial |
| Alinhamento | relação com a grade | quebrar alinhamento = importância |

11. **Um único ponto de entrada dominante** por região visual (long-form pode
    re-estabelecer um primário em "pacing resets" intencionais — nova seção com
    headline e respiro próprios). Dois co-primários com peso visual igual
    (emphasis simétrica) = escolher um. (aviso — **julgamento (revisor)**)
12. **≥2 vetores ativos no elemento dominante.** Heading grande+bold com todo o
    resto achatado ("heading como único vetor") é sinal de que espaço e tracking
    não estão sendo usados. (aviso — **julgamento (revisor)**)
13. **Nenhum par de níveis adjacentes idêntico em escala + peso + espaço** — três
    iguais entre vizinhos produz superfície chapada (flat hierarchy). Pelo menos
    um vetor precisa contrastar entre níveis vizinhos. (aviso —
    **julgamento (revisor)**)
14. **Gaps de escala variam ≥1.5×** (ou ≥1.25× compensado por salto de peso/espaço).
    Passos colados (18/20/22px para três níveis) = parede de texto. (aviso —
    **julgamento (revisor)**)
15. **Espaço é vetor pleno** — um nível pode ser elevado só por whitespace ao redor,
    sem mudar tamanho/peso. Espaçamento **uniforme** entre todos os elementos
    destrói a hierarquia espacial; varie deliberadamente (um gap ≥1.5× os outros).
    (aviso — **julgamento (revisor)**)
16. **Inversão semântica ≠ erro**: um `<h1>` pode render mais quieto que um `<p>`
    vizinho **se** o fluxo de leitura continua reconstruível (ordem do DOM bate com
    o sentido, proximidade agrupa o elemento invertido com seu contexto, um scan
    rápido identifica entrada/suporte/incidental). Caso contrário é caos, não
    tensão. (aviso — **julgamento (revisor)**)

---

## 5. Tabela elemento → peso · escala · tracking · leading (produto/SaaS)

Padrão **produto** (default Inter; `font-display`/Quicksand só onde a `designing`
declarar). Classes reais do tema:

| Elemento | Escala | Peso | Tracking | Leading |
|---|---|---|---|---|
| Display | `text-5xl`–`text-7xl` | `font-semibold` (display) | `tracking-tight` | `leading-none`/`tight` |
| H1 | `text-3xl`–`text-4xl` | `font-semibold` | `tracking-tight` | `leading-tight` |
| H2 | `text-2xl`–`text-3xl` | `font-semibold` | `tracking-tight` | `leading-tight` |
| H3 | `text-xl`–`text-2xl` | `font-medium` | `tracking-normal` | `leading-snug` |
| Corpo | `text-base`–`text-lg` | `font-normal` | `tracking-normal` | `leading-relaxed` |
| Label/UI | `text-sm` | `font-medium` | `tracking-normal` | `leading-normal` |
| Pequeno | `text-sm`/`text-xs` | `font-normal` | `tracking-wide` | `leading-normal` |
| Caption | `text-xs` | `font-normal` | `tracking-wide` | `leading-normal` |
| Eyebrow/CAIXA-ALTA | `text-xs` | `font-medium` `uppercase` | `tracking-widest` (≥0.06em) | `leading-normal` |
| Código/mono | `text-sm` | `font-mono` `font-normal` | `tracking-normal` | `leading-normal` |

Cor segue `color.md`: heading/corpo em `text-foreground`, secundário em
`text-muted-foreground`; cor de marca (`bg-primary`/amarelo) **não** pinta texto
de leitura.

---

## 6. Editorial / modo criativo (opt-in)

**Só** quando a `designing` ativa o **modo criativo** (landing, showcase, artigo
long-form) — aqui o display usa **Quicksand** (`font-display`) com salto de escala
dramático. Em produto/SaaS estas regras **não** se aplicam. Extende as seções 1–5,
não as substitui.

17. **Display editorial 56–96px em peso light/regular** (`font-display
    font-normal`, `text-6xl`–`text-8xl`). **Bold display = outdoor/billboard** —
    a hierarquia editorial é carregada por escala e espaço, não por massa. (aviso —
    **julgamento (revisor)**)
18. **Salto display→deck é a assinatura editorial**: deck/standfirst 18–24px
    (`text-lg`–`text-2xl`, `font-normal`); razão display/deck ≥1.5× ou delta
    absoluto ≥24px. Deck no tamanho do corpo lê como SaaS, não editorial. (aviso —
    **julgamento (revisor)**)
19. **Display tracking −0.02 a −0.05em** nesse tamanho (`tracking-tight`/`tighter`
    ou `tracking-[-0.04em]`); pesos light podem ir ao limite mais apertado. O check
    de display da regra 9 (`text-4xl`+ sem tracking negativo) já pega a ausência;
    o valor exato dentro da faixa editorial é julgamento. (aviso —
    **julgamento (revisor)**)
20. **Pull quote 28–40px, NUNCA bold** (`text-3xl`–`text-4xl`,
    `font-normal`/`light`, `tracking-tight`, leading 1.2–1.3 → `leading-snug`).
    É interrupção visual, **não blockquote**: quebra a coluna (full-width ou offset),
    sem caixa/borda/fundo. Pode usar `text-accent` como **único** acento da página.
    Máx 1 por artigo (2 no limite). (aviso — **julgamento (revisor)**)
21. **Corpo editorial 60–70ch, leading 1.6–1.7** (`max-w-[68ch]`, `leading-loose`
    ≈ 2.0 é demais — prefira `leading-[1.65]`). Mais apertado que o teto de
    produto porque a leitura é sustentada, não scan. (aviso —
    **julgamento (revisor)**)
22. **Nunca justificar** (`text-justify`) — cria "rios" de espaço; use
    `text-left`/`text-start` com borda direita irregular. Vale também fora do
    editorial. (aviso — **auto-verificável (check.mjs)**: `text-justify`)
23. **Bold ≤2× por 400 palavras** de corpo, e bold editorial nunca em label de
    seção/chrome/navegação. Espaçamento de seções **alterna** (denso → espaçoso →
    médio); padding uniforme lê como template. (aviso — **julgamento (revisor)**)

---

## Resumo dos checks mecânicos (check.mjs)

São **3** checks de tipografia hoje — todos **aviso** (heurísticos; o revisor
promove a bloqueante se confirmar):

| # | Padrão lintável | Severidade |
|---|---|---|
| 8 | `uppercase` (ou texto literal CAIXA-ALTA) sem `tracking-widest`/`tracking-[≥0.06em]` | aviso |
| 9 | display `text-4xl`+ sem `tracking-tight`/`tighter`/`-tracking-[…]` | aviso |
| 22 | `text-justify` em qualquer lugar | aviso |

Tudo que não está nesta tabela é **julgamento (revisor)** — exige o olho humano
sobre a composição renderizada, não grep.

<!-- Fonte: nexu-io/open-design (Apache 2.0) — craft/typography.md, craft/typography-hierarchy.md, craft/typography-hierarchy-editorial.md -->
