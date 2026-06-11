# Design System Blips — atmosfera canônica

> Categoria: Fintech / Gestão de Ativos.
> Plataforma brasileira de gestão de ativos. Confiança + eficiência; craft
> contido sobre neutros frios oklch, com um único acento amarelo quente.

Esta é a **fonte canônica de atmosfera** da skill `blips-ui:designing`. Todos os
valores vêm do `packages/ui/src/globals.css` (tokens reais — não invente nenhum).
Os critérios *verificáveis* (números de tipografia, contraste, motion) moram nas
references de `reviewing/`; aqui fica a **direção visual** e o **porquê**. Tokens
são consumidos como utility Tailwind (`bg-primary`, `text-success`) ou
`var(--token)` — **nunca** `hsl(var(--token))` (são cores completas oklch/hex).

---

## 1. Visual Theme & Atmosphere

A Blips é uma plataforma de **gestão de ativos**: o produto move dinheiro, prazos
e decisões. A atmosfera tem que dizer, antes de qualquer texto, **confiança e
eficiência** — o oposto de um app de marketing efusivo. O tom é "intricate
minimalism": densidade de informação alta, mas calma; nada decorativo, cada pixel
trabalhando. O gestor passa horas aqui; a tela precisa cansar pouco e mentir
nada.

A paleta é uma base de **neutros frios oklch puros** (croma zero — `oklch(… 0 0)`)
sobre a qual pousa **um único acento de marca: o amarelo Blips `#fcba28`**. Esse
contraste é a tese inteira do sistema: um campo neutro silencioso onde o amarelo
quente é o único calor — então onde ele aparece, **significa algo** (uma ação, uma
seleção, um foco). Não é tema escuro disfarçado de claro nem o inverso: o branco
puro `oklch(1 0 0)` é o palco no modo claro, o quase-preto `oklch(0.145 0 0)` no
escuro, e o amarelo é idêntico (`#fcba28`) nos dois — a marca não muda de
temperatura quando a luz muda.

O craft é **contido**: tipografia em duas vozes (Inter para ler, Quicksand para
anunciar), profundidade por borda antes de sombra, raio único e generoso
(`--radius: 0.625rem` = 10px). A elegância vem de **restrição**, não de efeito.

**Key Characteristics:**
- Neutros frios oklch de croma zero (`oklch(… 0 0)`) — estrutura silenciosa, sem viés de cor.
- **Um único acento de marca**: amarelo Blips `#fcba28` (`--primary`), foreground preto `#000000`. ~5–10% dos pixels, nunca mais.
- Palco branco puro no claro (`oklch(1 0 0)`), quase-preto no escuro (`oklch(0.145 0 0)`); o amarelo é constante entre os dois.
- Duas vozes tipográficas: **Inter** (`--font-sans`, ler/UI — `--font-heading` é só um alias de Inter) + **Quicksand** (`--font-display`, a única voz de "anúncio"/display). **JetBrains Mono** (`--font-mono`) é função (dados/código), não leitura.
- Profundidade por **borda sutil** primeiro; sombra é exceção, e no escuro a borda vence a sombra.
- Raio único generoso (`--radius` 10px) com escala derivada — suavidade consistente, nunca cantos vivos.
- Semânticas (`success`/`warning`/`destructive`/`info`) são **só significado de estado**, jamais decoração.
- Densidade alta + calma ("intricate minimalism"): grid 4px, espaçamento disciplinado, dados monoespaçados alinhados.

---

## 2. Color Palette & Roles

Cada token abaixo é o valor **literal** do `globals.css`. Papel = o que ele pode
significar; usar um token fora do papel quebra o sistema (ex.: `success` para
"botão verde bonito" rouba o significado de "deu certo").

### Marca — o único acento
- **`primary` `#fcba28`** (foreground `#000000`) — amarelo Blips. **Único token de marca.** Reservado a: CTA primário, estado selecionado, foco-de-marca, o realce de maior sinal da tela. Alvo de cobertura: **~5–10% dos pixels** — se domina, deixou de significar. Idêntico no claro e no escuro (`--primary` / `--sidebar-primary`). Por quê: um só calor num campo frio é o que torna a marca legível e a ação inequívoca.

### Semânticas — só significado de estado
Cada uma com par `-foreground`. Nunca decorativas.
- **`success`** — claro `oklch(0.62 0.13 155)` (fg `oklch(0.985 0 0)`), escuro `oklch(0.7 0.14 155)` (fg `oklch(0.205 0 0)`). Verde de "concluído / positivo / lucro".
- **`warning`** — `oklch(0.828 0.189 84.429)` (fg `oklch(0.205 0 0)`), igual nos dois temas. Âmbar de "atenção / pendente".
- **`destructive`** — claro `oklch(0.577 0.245 27.325)`, escuro `oklch(0.704 0.191 22.216)`. Vermelho de "erro / ação destrutiva / prejuízo".
- **`info`** — claro `oklch(0.546 0.215 262.881)`, escuro `oklch(0.707 0.165 254.624)`. Azul de "informação neutra". É o único croma frio significativo — use com parcimônia para não competir com o amarelo.
- Por quê: estado tem semântica fixa; reaproveitar a cor para enfeite faz o usuário ler estado onde não há.

### Neutros estruturais (croma zero — constroem tudo)
- **`background`** claro `oklch(1 0 0)` / escuro `oklch(0.145 0 0)` — o palco. **`foreground`** claro `oklch(0% 0 0)` / escuro `oklch(0.985 0 0)` — texto primário.
- **`muted`** `oklch(0.97 0 0)` claro / `oklch(0.269 0 0)` escuro; **`muted-foreground`** `oklch(0.556 0 0)` / `oklch(0.708 0 0)` — texto secundário/metadados, fundos discretos.
- **`secondary`** e **`accent`** — `oklch(0.97 0 0)` (claro) / `oklch(0.269 0 0)`–`oklch(0.371 0 0)` (escuro): superfícies/botões neutros, hover.
- **`border`** `oklch(0.922 0 0)` claro / `oklch(1 0 0 / 10%)` escuro; **`input`** idem (escuro `/15%`); **`ring`** `oklch(0.708 0 0)` / `oklch(0.556 0 0)` — anel de foco. Por quê: no escuro a borda é branco translúcido (não cinza sólido) → ela "acende" sutilmente em vez de pesar.

### Elevação — superfícies que se distinguem por luminância, não cor
- **`card`** / **`popover`** — claro `oklch(1 0 0)`, escuro `oklch(0.205 0 0)` (fg `oklch(0.985 0 0)`). Contêineres e overlays.
- **`surface`** — `oklch(0.98 0 0)` claro / `oklch(0.2 0 0)` escuro (fg escuro `oklch(0.708 0 0)`). Superfície de leve elevação / fundo de seção.
- **`code`** (= `var(--surface)`) + **`code-foreground`**, **`code-highlight`** (`oklch(0.96 0 0)` / `oklch(0.27 0 0)`), **`code-number`** (`oklch(0.56 0 0)` / `oklch(0.72 0 0)`) — blocos de código/dados monoespaçados.
- **`selection`** claro `oklch(0% 0 0)` (fg `oklch(1 0 0)`) / escuro invertido — seleção de texto. Por quê: a elevação anda por **degraus de luminância** (0.145 → 0.2 → 0.205), não por matiz; o campo permanece frio.

### Sidebar — mesmo idioma do conteúdo
- **`sidebar`** `oklch(0.985 0 0)` claro / `oklch(0.205 0 0)` escuro; **`sidebar-foreground`**, **`sidebar-accent`** (`oklch(0.97 0 0)`/`oklch(0.269 0 0)`), **`sidebar-border`**, **`sidebar-ring`** espelham os neutros do conteúdo. **`sidebar-primary` = `#fcba28`** (fg `#000000`). Por quê: a sidebar não é um "painel escuro" à parte — é o mesmo ambiente, separado por **uma borda sutil**, mantendo a tela coesa (ver §5).

### Charts — paleta categórica, fora da marca
- **`chart-1..5`** — claro: `oklch(0.646 0.222 41.116)`, `oklch(0.6 0.118 184.704)`, `oklch(0.398 0.07 227.392)`, `oklch(0.828 0.189 84.429)`, `oklch(0.769 0.188 70.08)`. Escuro: `oklch(0.488 0.243 264.376)`, `oklch(0.696 0.17 162.48)`, `oklch(0.769 0.188 70.08)`, `oklch(0.627 0.265 303.9)`, `oklch(0.645 0.246 16.439)`. Por quê: séries de dados precisam de **distinção categórica**; use os tokens `chart-*` no Recharts — nunca hexes ad-hoc nem o `primary` "porque combina".

---

## 3. Typography Rules

Duas vozes, uma função. **Inter** (`--font-sans`, pesos 400/500/600/700) lê e
opera toda a UI — e `--font-heading` é só um **alias de Inter** (`var(--font-sans)`),
não uma terceira família. **Quicksand** (`--font-display`, 500/600/700) é a única
voz de display e **anuncia** — títulos de página, números-herói, momentos de
marca; seu desenho arredondado ecoa a curva do amarelo. **JetBrains Mono** (`--font-mono`, 400/500)
é **família de função**: dados tabulares, valores monetários, IDs, código — onde
o alinhamento de dígito importa. Por quê duas e não três famílias de leitura: o
tema já trava o limite de 2 typefaces de leitura (mono é função), que é a regra
de tipografia mais quebrada pela IA.

| Elemento | Família (token) | Peso | Tracking | Aplicação à marca |
|---|---|---|---|---|
| Título de página / display | Quicksand (`font-display`) | 600–700 | `tracking-tight` | O "anúncio" — uma voz por tela; arredondado ecoa a marca. |
| Heading de seção | Quicksand (`font-display`) | 600 | `tracking-tight` | Âncora de seção; salta de massa, não sobe degrau. |
| Heading de card | Inter ou Quicksand (`font-display`) | 600 (`font-semibold`) | normal | 600 já anuncia — `font-bold` é raro. |
| Alias `font-heading` | Inter (`--font-heading` = `var(--font-sans)`) | 600 | normal | Apenas um alias semântico de Inter — **não** é Quicksand; use `font-display` para anunciar. |
| Corpo / UI | Inter (`font-sans`) | 400 | normal | `leading-relaxed` em texto corrido; eficiência silenciosa. |
| Ênfase em corpo | Inter | 500 (`font-medium`) | normal | Salto de peso = ênfase, não decoração. |
| Label / metadado | Inter | 400–500 | normal | `text-muted-foreground` para de-ênfase. |
| Dados / dinheiro / IDs / código | JetBrains Mono (`font-mono`) | 400–500 | normal | Dígitos alinham em colunas — ver §4 Table. |

> Para os **números exatos** (escala px/rem, line-heights, thresholds de
> tracking, regras de massa/peso) a fonte única é
> **`reviewing/references/typography.md`** — não duplique aqui. Esta seção é a
> *aplicação à marca*; aquela é o critério verificável.

---

## 4. Component Stylings

Receitas curtas de *chrome* (aparência). Para a **API/props** de cada componente,
a fonte é a skill **`blips-ui:building`** — não reimplemente aqui.

- **Button** — `primary` (fundo `bg-primary`, texto `text-primary-foreground` preto): só o CTA de maior sinal por tela. `secondary`/neutro (`bg-secondary`) para ações de igual peso; `ghost`/`outline` (só `border-border`) para terciárias; `destructive` apenas para ação que apaga/desfaz. Raio `rounded-md`. Por quê: um botão amarelo por tela mantém o "5–10%".
- **Card** — `bg-card` + `border border-border` + `rounded-xl`; padding interno generoso (≥ `p-6` em cards de conteúdo). Sombra **opcional e única** por tela (§6). Por quê: borda-primeiro mantém a tela calma e funciona idêntico no escuro.
- **Dialog/Sheet/Popover** — `bg-popover`/`bg-card`, `border-border`, `rounded-lg`; overlay escurece o fundo para isolar foco. **Sempre com título** (acessível). Por quê: overlay sem título é a violação clássica que `reviewing` pega.
- **Table** — cabeçalho `text-muted-foreground` (peso 500), linhas separadas por `border-border`, **colunas numéricas em `font-mono` e alinhadas à direita**. Por quê: dinheiro/quantidade só se compara visualmente se os dígitos alinham (ver `reviewing/references/data-formatting.md`).
- **Badge** — neutro (`bg-muted text-muted-foreground`) por padrão; variantes semânticas (`bg-success`/`bg-warning`/`bg-destructive`/`bg-info` com seu `-foreground`) **só para estado real**. `rounded-md` ou pill. Por quê: badge colorido sem semântica vira ruído — reserve cor para significado.

---

## 5. Layout Principles

- **Grid de 4px.** Todo espaçamento é múltiplo de 4 (escala Tailwind: `gap-1`=4 / `gap-2`=8 / `gap-3`=12 / `gap-4`=16 / `gap-6`=24 / `gap-8`=32…). Por quê: ritmo consistente é o que separa "denso e calmo" de "apertado e nervoso".
- **Escala de espaçamento disciplinada.** Salte degraus (4→8→16→24), não invente 13px ou 18px. Padding de seção generoso, padding interno de controle compacto — a densidade alta exige respiro entre blocos.
- **Max-width de conteúdo.** Texto corrido em `max-w-prose` (legibilidade); dashboards/tabelas usam a largura útil mas com contêiner centralizado em telas largas. Breakpoints extra do tema (`3xl` 1600px, `4xl` 2000px) servem monitores de mesa de gestão — não deixe a tabela esticar infinitamente.
- **Sidebar = mesmo ambiente.** `bg-sidebar` é praticamente o mesmo do conteúdo, separado por **`border-sidebar-border`** (sutil), não por um bloco escuro contrastante. Por quê: a coesão visual reforça "uma ferramenta", não "duas zonas".

---

## 6. Depth & Elevation

Escolha **UMA** estratégia de profundidade por tela e seja consistente. Misturar
borda-only num card e drop-shadow pesado no vizinho é o sintoma nº 1 de tela
"sem direção".

- **Borda-only** (default): elevação por `border-border` + leve `surface`/`card` shift. Calma, funciona idêntico no escuro.
- **Surface-shift**: contêineres sobem por **degrau de luminância** (`bg-card` sobre `bg-background`, `bg-surface` sobre `bg-muted`) — sem sombra. Ecoa Linear.
- **Sombra sutil**: `shadow-sm`/`shadow-md` reservados a overlays reais (popover, dropdown, dialog) que flutuam acima do plano. Nunca sombra pesada decorativa.

**Dark = bordas > sombras.** No escuro, sombra preta sobre fundo escuro é
invisível; a borda é `oklch(1 0 0 / 10%)` (branco translúcido) e **acende** a
elevação. Por isso o sistema prioriza borda.

Raio real (derivado de `--radius` = 10px): `--radius-sm` 6px · `--radius-md` 8px
· `--radius-lg` 10px · `--radius-xl` 14px · `--radius-2xl` 18px. Cantos vivos
(`rounded-none`) são exceção justificada.

| Nível | Tratamento | Uso |
|---|---|---|
| 0 — plano | sem borda, sem sombra; `bg-background` | fundo da página, texto inline |
| 1 — contido | `border border-border`, `bg-card`/`bg-surface`, `rounded-xl` | cards, seções, painéis |
| 2 — superfície | degrau de luminância (`bg-card` sobre `bg-background`) | agrupamento sutil sem borda |
| 3 — flutuante | `shadow-sm`/`shadow-md` + `border-border`, `rounded-lg` | popover, dropdown, tooltip |
| 4 — overlay | `bg-popover` + sombra média + overlay de fundo | dialog, sheet, command palette |

---

## 7. Do's and Don'ts

### Do
- Use `bg-primary` (#fcba28) **só** para o CTA/seleção/foco de maior sinal — um momento amarelo por tela.
- Construa estrutura com neutros oklch (`background`/`card`/`muted`/`border`); deixe a tela ~90% neutra.
- Use semânticas (`success`/`warning`/`destructive`/`info`) **apenas** para estado real.
- Prefira **borda** (`border-border`) à sombra; escolha uma estratégia de profundidade por tela.
- Dinheiro, quantidades e IDs em `font-mono`, alinhados à direita em tabelas.
- Use Quicksand (`font-display`) só para anunciar; Inter para ler/operar (`font-heading` é alias de Inter, não Quicksand).
- Use a escala de raio do tema (`rounded-md`/`-lg`/`-xl`) — suavidade consistente.
- No escuro, deixe a borda translúcida carregar a elevação.

### Don't
- Não use `#fcba28` como cor decorativa de fundo grande, gradiente ou "porque é a marca" — ele significa ação.
- Não introduza cor/hex fora dos tokens — **nem no modo criativo**; o tema é lei.
- Não escreva `hsl(var(--primary))` — os tokens já são cores completas (oklch/hex); consuma `var(--primary)` ou `bg-primary`.
- Não use `success`/`info` para enfeitar (verde/azul "bonito") — rouba o significado de estado.
- Não empilhe sombras pesadas, nem misture borda-only com drop-shadow na mesma tela.
- Não use Quicksand (display) em corpo de texto nem JetBrains Mono em prosa de leitura.
- Não invente espaçamentos fora do grid 4px (nada de 13/18/25px).
- Não trate a sidebar como bloco escuro contrastante — é o mesmo ambiente + borda sutil.

---

## 8. Responsive Behavior

**Mobile-first**: parta do layout empilhado de coluna única e adicione colunas
para cima. A gestão de ativos é primariamente desktop, mas consultas pontuais
acontecem no celular — nenhuma tela pode quebrar embaixo.

| Breakpoint | Largura | Mudança-chave |
|---|---|---|
| base | <640px | Coluna única, sidebar vira drawer, tabela rola horizontal ou vira cards. |
| `sm` | ≥640px | Primeiros pares de colunas em formulários/cards. |
| `md` | ≥768px | Grids 2 colunas; sidebar pode fixar. |
| `lg` | ≥1024px | Layout completo multi-coluna, sidebar expandida. |
| `xl` | ≥1280px | Dashboards densos, mais colunas de dados. |
| `3xl` (tema) | ≥1600px | Monitores de mesa — mais densidade útil, contêiner centralizado. |
| `4xl` (tema) | ≥2000px | Telas grandes — **limite a largura de conteúdo**, não estique tabela ao infinito. |

- **Touch targets** ≥ 44×44px em controles tocáveis; padding generoso em mobile.
- **Sidebar**: drawer no mobile → fixa do `md`/`lg` para cima.
- **Tabela densa**: scroll horizontal ou colapso para cards no mobile; mantém `font-mono` alinhado em qualquer tamanho.

---

## 9. Agent Prompt Guide

### Quick reference
- CTA / seleção / foco de marca: **`bg-primary` (#fcba28)**, texto `text-primary-foreground` (#000000).
- Fundo de página: `bg-background` (branco no claro / quase-preto no escuro).
- Superfície de card/overlay: `bg-card` · elevação leve `bg-surface` · fundo discreto `bg-muted`.
- Texto primário `text-foreground` · secundário/metadado `text-muted-foreground`.
- Borda: `border-border` · foco: `ring-ring`.
- Estado: `text-success` / `bg-warning` / `text-destructive` / `text-info` (+ `-foreground`).
- Títulos/anúncio: `font-display` (Quicksand) `tracking-tight`. Corpo/UI: `font-sans` (Inter) `leading-relaxed` (`font-heading` é alias de Inter, não Quicksand). Dados: `font-mono` (JetBrains Mono).
- Raio: `rounded-md`/`-lg`/`-xl`. Charts: tokens `chart-1..5`.

### Exemplos de direção declarada (prontos)
- **Dashboard de carteira:** "Tela densa-mas-calma em `bg-background`. Cards `bg-card` + `border-border` + `rounded-xl`, padding `p-6`, **profundidade só por borda** (sem sombra). KPIs com rótulo em `text-muted-foreground` (Inter 500) e o número-herói em `font-display` (Quicksand 600). Um único CTA `bg-primary` no topo ('Novo aporte'). Variação de valor em `text-success`/`text-destructive` conforme sinal. Tabela de posições com colunas de valor em `font-mono`, alinhadas à direita."
- **Formulário de cadastro de ativo:** "Coluna única em `max-w-prose` sobre `bg-background`. Campos (react-hook-form + zod) com `border-input`, foco `ring-ring`, label `font-sans` 500. Botão de envio `bg-primary` (único amarelo da tela); 'Cancelar' em `ghost` (só `border-border`). Erros em `text-destructive` com a mensagem do zod; estado de salvo em `text-success`. Raio `rounded-md`, espaçamento múltiplo de 4 (`gap-4`)."
- **Página de marketing / showcase (criativo, mas tema é lei):** "Hero em `bg-background` com headline `font-display` (Quicksand 700) `tracking-tight`, subtítulo `font-sans` em `text-muted-foreground`, e **um** CTA `bg-primary`. Profundidade por degrau de luminância (`bg-surface` em seções alternadas) — sem gradiente, sem cor fora dos tokens. O amarelo aparece uma vez por dobra; o resto é neutro oklch."

### Guia de iteração
1. Foque **uma tela/componente** por vez e declare a direção antes de construir.
2. Cite o token pelo nome (`text-muted-foreground`, não "cinza"); nunca hex fora do tema.
3. **Um momento `bg-primary` por tela** — se há dois amarelos, um está errado.
4. Escolha **uma** estratégia de profundidade (§6) e mantenha na tela inteira.
5. Cor semântica só com significado de estado; o resto é neutro.
6. Quicksand anuncia, Inter lê, JetBrains Mono alinha dados — nunca troque os papéis.
7. Para números de tipografia/contraste/motion, consulte as references de `reviewing/`; para API de componente, a skill `blips-ui:building`.

<!-- Fonte: nexu-io/open-design (Apache 2.0) — design-systems/_schema/AGENTS.md, design-systems/claude/DESIGN.md, design-systems/linear-app/DESIGN.md. Tokens: packages/ui/src/globals.css (Blips, fonte da verdade). -->
