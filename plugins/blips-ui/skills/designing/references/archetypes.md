# Arquétipos de direção visual

Vocabulário para a **blips-ui:designing** declarar uma direção em uma frase
("vamos de *Precision*", "landing em *neobrutalism*") em vez de descrever
densidade/profundidade/layout do zero a cada tela.

## Como ler esta reference

- **Arquétipo é VOCABULÁRIO de direção, NUNCA troca de marca.** Você empresta
  *composição, escala, profundidade, movimento e tom* — **nunca cor nem fonte**.
  Cor e fonte vêm SEMPRE do tema Blips (amarelo `primary` `#fcba28`; Inter
  `font-sans`, Quicksand `font-display`, JetBrains Mono `font-mono`). _Porquê:_
  a identidade Blips é o tema; arquétipo é como você arruma o espaço dentro dele.
- **Produto = default. Criativo = opt-in.** Os 8 de PRODUTO valem para qualquer
  tela de app (dashboard, admin, fluxo, form, tabela). Os 8 CRIATIVOS só entram
  em marketing/landing/showcase/erro lúdico, com a superfície marcada ou pedido
  explícito — **na dúvida, é produto**. _Porquê:_ ousadia em tela de trabalho
  vira ruído; em tela de marca, vira presença.
- Os hexes/fontes citados abaixo são **da fonte original** (o que torna o
  arquétipo reconhecível) — servem para você entender a atmosfera, **não para
  copiar**. O que você reproduz na Blips são as decisões neutras (números de
  espaçamento, estratégia de sombra, escala de peso). Traduza cada valor para
  as classes/tokens reais (`bg-card`, `border-border`, `rounded-lg`,
  `font-mono`, `tabular-nums`, `shadow-sm`…).
- Mapeie sempre ao stack real: shadcn/Radix via `@blips/ui`, Tailwind v4
  CSS-first, ícones `@phosphor-icons/react`, Recharts para gráficos.
- **Fronteira com `creative-presets.md`.** Arquétipo é vocabulário de direção; o
  COMO binário (bans/técnica/checklist) mora em `creative-presets.md` e na
  reviewing; em conflito, a reference canônica vence.

---

## PRODUTO (default — escolha 1 por produto/tela)

### Precision — *fonte: linear-app*
**Atmosfera.** Engenharia de precisão: densidade alta, hierarquia por luminância
e não por cor, estrutura por bordas-finíssimas (`rgba(255,255,255,0.05)`–`0.08`)
em vez de espaço. Dark-mode-native (`#08090a`); títulos comprimidos com tracking
agressivamente negativo (-1.584px @72px) — autoridade calada.
**Quando evocar.** Ferramentas internas densas, telas de power user, painéis de
gestão onde o usuário fica horas e precisa escanear muito numa tela.
**Tomar emprestado.** Profundidade **bordas-only** (`border-border`, sem sombra);
tracking apertado em títulos (`tracking-tight`); peso de UI sóbrio (500–600, não
700); contraste por opacidade do `foreground`, não por matizes.
**O NÃO.** O indigo `#5e6ad2` — acento é amarelo `primary`. O peso 510 / OpenType
`cv01,ss03` — Inter no tema só tem 400/500/600/700.

### Warmth — *fonte: notion*
**Atmosfera.** Minimalismo acolhedor, "papel de qualidade, não vidro estéril".
Generoso, calmo; estrutura por **bordas-sussurro** (`1px solid rgba(0,0,0,0.1)`)
e sombras em camadas com opacidade somada **< 0.05** — profundidade que se sente,
não se vê. Base de espaçamento 8px, escala orgânica.
**Quando evocar.** Onboarding, telas de tarefa pontual, configurações, qualquer
fluxo onde o trabalho emocional é *reduzir intimidação*.
**Tomar emprestado.** Densidade generosa (mais respiro entre seções); **uma**
sombra sutil (`shadow-sm`) como profundidade única; borda quase imperceptível;
pill badges (`rounded-full`) para status.
**O NÃO.** O Notion Blue `#0075de` (acento = amarelo); a "NotionInter" custom e
o tracking -2.125px (use Inter/Quicksand do tema).

### Editorial-warmth — *fonte: claude*
**Atmosfera.** Salão literário: caloroso, sem pressa, intelectual. Ritmo de
revista — espaçamento generoso entre seções, hierarquia conduzida por título com
*gravitas*, line-heights tight-mas-confortáveis (1.10–1.30). Profundidade por
**ring** (`0px 0px 0px 1px`) que faz as vezes de borda sem borda visível.
**Quando evocar.** Páginas de conteúdo/leitura, relatórios, docs, resumos
gerados, telas que devem soar "companheiro pensante", não "ferramenta potente".
**Tomar emprestado.** Pacing de revista (seções espaçadas, leitura sem aperto);
hierarquia por **escala de título** (Quicksand `font-display`) + `leading-relaxed`
no corpo; ring-shadow como profundidade.
**O NÃO.** A serifa Anthropic e o terracota `#c96442` — título é Quicksand,
acento é amarelo. Os neutros olive (use os neutros do tema).

### Trust — *fonte: stripe*
**Atmosfera.** Padrão-ouro fintech: técnico **e** luxuoso. Headlines em peso
**leve** (300) — autoridade sussurrada, anti-"hero gritado". Profundidade por
**sombra multi-camada azulada** (`rgba(50,50,93,0.25)` + `rgba(0,0,0,0.1)`) —
elevação que parece flutuar num céu de fim de tarde. Radius conservador (4–8px),
nada pill. Numerais tabulares (`tnum`) para dados financeiros.
**Quando evocar.** Telas que carregam dinheiro/risco/compliance — extratos,
faturamento, contratos, dashboards de portfólio onde confiança é o produto.
**Tomar emprestado.** Profundidade em camadas com motivo (`shadow-md`/`shadow-lg`,
um nível, consistente); radius contido (`rounded-md`, nunca pill em superfície
séria); **`font-mono` + `tabular-nums`** em todo dado financeiro; gravitas por
contenção, não por tamanho.
**O NÃO.** O purple `#533afd` / ruby / magenta e a `sohne-var` peso 300 — Inter
no tema começa em 400; acento é amarelo. Sombra **azulada** vira sombra neutra.

### Bold-fintech — *fonte: wise* ⭐ paralelo do amarelo Blips
**Atmosfera.** Fintech confiante e otimista: o **acento vivo é amigável, não
corporativo**. Tipografia em escala de outdoor (peso 900, line-height 0.85, "tão
denso que parece cartaz de protesto"); CTA com acento cheio + texto escuro;
hover que **cresce fisicamente** (`scale(1.05)`); cards bem arredondados (30–40px),
botões pill (9999px); sombra mínima (ring `0px 0px 0px 1px`).
**Quando evocar.** O arquétipo mais Blips: marketing/landing onde o **amarelo
`primary` é o protagonista alegre** — exatamente o papel do lime `#9fe870` na
Wise. Também headers de produto que querem energia sem perder confiança.
**Tomar emprestado.** Acento como herói (grandes blocos de `bg-primary` com
`text-primary-foreground` `#000`); títulos display agressivos (Quicksand 700,
`tracking-tight`); radius generoso (`rounded-2xl`); **hover de escala discreto**
(`scale(1.05)`) — note: só fora de produto; em app vale a regra 150–250ms sem
spring.
**O NÃO.** O lime `#9fe870` e o verde escuro `#163300` — o amarelo Blips já É
esse papel. A "Wise Sans" peso 900 e o line-height 0.85 literal (Quicksand vai
até 700; aperte com `tracking-tight`, não com line-height sub-1).

### Utility — *fonte: github*
**Atmosfera.** Superfície engenheirada, não decorada: "densidade É a marca".
Painéis retangulares densos separados por **bordas-fio** (`#d0d7de`), não por
espaço. Acentos **dessaturados** (Primer blue `#0969da`, verde `#1a7f37`) que
somem quando vários aparecem juntos. Sem fonte display — voz do sistema.
**Quando evocar.** Tabelas longas, listas de itens, telas de PR/diff/log, admin
funcional — onde o usuário escaneia 100 linhas sem rolar.
**Tomar emprestado.** Linhas de lista densas com padding mínimo; tudo separado
por `border-border` (bordas-only); **cor só para significado** (quase
monocromático — `text-success`/`text-destructive` pontuais); ícones Phosphor a
16/24px, traço único, consistente; pill badges com semântica forte.
**O NÃO.** O Primer blue/green como acento decorativo (acento = amarelo; status
= tokens semânticos). Não há fonte display aqui — mas no tema, título ainda é
Quicksand quando houver.

### Minimal — *fonte: vercel*
**Atmosfera.** Minimalismo como princípio de engenharia: "vazio de galeria onde
cada elemento merece seu pixel". Profundidade pela técnica **shadow-as-border**
(`box-shadow: 0 0 0 1px rgba(0,0,0,0.08)`) — borda na camada de sombra, cantos
arredondados sem clipping, peso mais sutil que borda tradicional. Stacks de
sombra multi-valor (borda + elevação + ambiente numa só declaração).
**Quando evocar.** Telas que querem sumir e deixar o conteúdo falar — settings,
telas de estado vazio, fluxos de uma coisa só, landings sóbrias de produto.
**Tomar emprestado.** Negative space como ferramenta (deixe respirar); **uma**
estratégia de profundidade consistente (sombra-borda OU `border-border`, não as
duas); contraste micro-suave (texto não-preto, `text-foreground` do tema já é
isso); pill badges para status.
**O NÃO.** A Geist Sans/Mono e o tracking -2.4/-2.88px; os acentos de workflow
(Ship Red/Preview Pink/Develop Blue) — acento é amarelo, fonte é o tema.

### Data — *fonte: sentry*
**Atmosfera.** Estética "dark IDE" sem ser fria: fundos escuros (aqui
roxo-preto `#1f1633`), dados em primeiro plano, **labels em maiúsculas com
letter-spacing**, mono (Monaco) para código. Botões com **inset shadow** —
qualidade tátil, "afundam" na superfície. Vibração pontual de acento
high-visibility.
**Quando evocar.** Dashboards densos de métricas/observabilidade, telas de
monitoramento, qualquer UI onde o **número é o herói** e a leitura é constante.
**Tomar emprestado.** Dados em `font-mono` + `tabular-nums` (regra de ouro
Blips); labels de métrica em `uppercase` + `tracking-wide` discreto; densidade
alta; profundidade contida (uma sombra/borda). Gráficos via Recharts com
`chart-1..5`.
**O NÃO.** O roxo-preto `#1f1633`, o lime `#c2ef4e`, a "Dammit Sans"/Rubik/Monaco
— fundo é `background`/`card` do tema (dark via `.dark`), mono é JetBrains,
acento é amarelo. Inset shadow tátil só se intencional, não em todo botão.

---

## CRIATIVO (opt-in — só marketing/landing/showcase; nunca tela de app)

> Aviso comum a todos: a "graça" do estilo vem de **composição, textura,
> movimento e escala** — **a cor continua amarela `primary` + neutros do tema,
> a fonte continua Inter/Quicksand/JetBrains**. Reproduzir o estilo trocando a
> paleta é justamente o que NÃO se faz.

### neobrutalism — *fonte: neobrutalism*
**Atmosfera.** Brutalismo moderno: bordas grossas, alto contraste, layouts crus
sobre superfície morna (`#FBFBF9`). Blocos óbvios, hierarquia gritada.
**Quando evocar.** Landing/showcase que quer parecer feita à mão, anti-template,
com energia. **Tomar emprestado.** Bordas espessas declaradas (até `border-2`,
exceção criativa à regra de produto), offset-shadow dura (sombra deslocada sólida
em vez de blur), blocos de cor chapados de `bg-primary`. **O NÃO.** O secondary
`#432DD7` e o surface morno literal — fundo/superfície são tokens do tema; o
amarelo já é o acento vibrante.

### glassmorphism — *fonte: glassmorphism*
**Atmosfera.** Vidro fosco: camadas translúcidas, blur sutil, bordas luminosas,
profundidade e elegância. **Quando evocar.** Hero/overlay de marketing sobre um
fundo rico (foto, gradiente do amarelo), cards flutuantes de destaque. **Tomar
emprestado.** `backdrop-blur` + superfície semitransparente (`bg-card/70`),
borda luminosa fina (`border-foreground/20` ou `border-border`), profundidade em
camadas. **O NÃO.** O
azul `#1856FF` e a Plus Jakarta Sans — translucidez é construída SOBRE os tokens
(o amarelo brilhando atrás do vidro funciona; paleta nova, não).

### claymorphism — *fonte: claymorphism*
**Atmosfera.** Argila maleável: formas 3D macias, arredondadas, "fofas",
brincalhonas. **Quando evocar.** Showcase/produto lúdico, ilustração de feature,
estados de erro amigáveis. **Tomar emprestado.** Radius máximo (`rounded-2xl`+),
sombra dupla **inset + drop** suave para o efeito puffy, superfícies cheias e
macias. **O NÃO.** O azul `#3B82F6` e Montserrat/Poppins — o "puffy" vem do
radius+sombra, não de cor pastel nova; cor é amarelo + neutros.

### kami — *fonte: kami* (editorial impresso)
**Atmosfera.** "Bom conteúdo em bom papel": canvas pergaminho (`#f5f4ed`, nunca
branco puro), **um único acento** que cobre ≤5% da superfície, hierarquia por
**serifa peso 500** (sem bold, sem itálico), ritmo de impressão apertado
(line-heights 1.10–1.55), profundidade por ring/whisper (`0 4px 24px
rgba(0,0,0,0.05)`), `tabular-nums` para colunas de métricas não tremerem.
**Quando evocar.** One-pagers, white papers, relatórios de marca, decks — algo
que deve soar **impresso**, não app. **Tomar emprestado.** Acento de raridade
extrema (amarelo ≤5%, o resto neutro); hierarquia por escala de título; ritmo
denso (`leading-tight`/`leading-snug`); ring/whisper-shadow; `tabular-nums`.
**O NÃO.** O ink-blue `#1B365D` e a serifa Charter — acento é amarelo, título é
Quicksand (não temos serifa no tema; a "voz de papel" vem do canvas neutro +
ritmo, não da serifa).

### hud — *fonte: hud*
**Atmosfera.** Cockpit de caça: legível num piscar sob qualquer luz. Translucidez
e **glow** substituem profundidade/sombra; dados em maiúsculas, geometria
angular, "cada elemento é funcional ou não existe". Mono para readouts, escala
mínima (8–32px), line-height 1.0. **Quando evocar.** Showcase de produto de
dados em tempo real, telas-conceito de monitoramento, hero técnico. **Tomar
emprestado.** Dados em `font-mono` + maiúsculas + `tracking-wide`; layout
angular/decluttered; hierarquia por **urgência** (warning/alert como tokens);
glow sutil (`drop-shadow`) só em destaque. **O NÃO.** O phosphor green `#00FF41`
literal — o "glow de dado vivo" vira amarelo `primary`; warning/alert = tokens
`warning`/`destructive`.

### trading-terminal — *fonte: trading-terminal*
**Atmosfera.** Terminal financeiro Bloomberg-style: dark-only, **denso ao
extremo**, mono em todos os dados, layouts tabulares **sem espaçamento
decorativo**, legível a dois metros. Buy/sell por cor (cyan `#00D4AA` / coral
`#FF4757`). **Quando evocar.** Showcase de produto de mercado/trading, hero de
densidade radical, demo "olha quanta informação cabe". **Tomar emprestado.**
Densidade máxima (padding mínimo, sem espaço decorativo); **tudo em `font-mono` +
`tabular-nums`**; tabelas justas; ganho/perda por `text-success`/`text-destructive`.
**O NÃO.** O cyan/coral literais (alta/baixa = tokens `success`/`destructive`);
fundo dark vem do `.dark` do tema, não de `#0D0D0D` custom.

### dithered — *fonte: dithered*
**Atmosfera.** Renderização por **padrão de pontos** que simula tons com paleta
limitada — nostálgico, retrô, alto contraste. **Quando evocar.** Textura de
fundo de landing, hero retrô, easter-egg de marca, página de erro lúdica.
**Tomar emprestado.** Textura de **dithering/halftone** sobre os tokens (pontos
do amarelo `primary` sobre `background`), paleta deliberadamente limitada
(amarelo + 1–2 neutros), alto contraste. **O NÃO.** O azul `#3B82F6` e
Space Grotesk/IBM Plex — o efeito é a **trama de pontos**, não cor nova; pontos
e tons saem dos tokens do tema.

### doodle — *fonte: doodle*
**Atmosfera.** Desenhado à mão: rabiscos, traços imperfeitos, ar informal e
brincalhão. **Quando evocar.** Empty states divertidos, 404 lúdico, ilustração
de marketing leve, microdetalhe de delight. **Tomar emprestado.** Sublinhados/
setas/marcações desenhados à mão como ornamento; rotações leves (`rotate-1`);
imperfeição proposital; ilustração orgânica em vez de ícone. **O NÃO.** O acento
`#49B6E5` e fonte manuscrita — ornamento é desenhado, mas texto continua Inter/
Quicksand e o acento continua amarelo (rabisco amarelo sobre neutro funciona).

---

<!-- Fonte: nexu-io/open-design (Apache 2.0) — design-systems/{linear-app,notion,claude,stripe,wise,github,vercel,sentry,neobrutalism,glassmorphism,claymorphism,kami,hud,trading-terminal,dithered,doodle}/DESIGN.md (§1 Visual Theme & Atmosphere). Tokens: packages/ui/src/globals.css -->
