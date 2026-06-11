# Acessibilidade — critérios canônicos Blips

Fonte única dos critérios de a11y do gate `reviewing`. `building` e `designing`
apontam para cá; não duplicam. Alvo de trabalho: **WCAG 2.2 AA** (limpa o piso
legal de WCAG 2.1 AA e prepara o futuro). Severidades: **bloqueante** ou
**aviso**. Cada regra marca como é verificada:

- **auto-verificável (check.mjs)** — grep determinístico no código-fonte.
- **lint (Biome a11y)** — regras do grupo `a11y` (recommended) do Biome.
- **runtime (axe)** — só pega na árvore renderizada (`axe-core`/Playwright):
  `target-size`, `color-contrast`, `heading-order`, `aria-*`.
- **julgamento (revisor)** — exige inspeção humana / contexto.

## O que o Radix já garante (não re-verifique)

Componentes de `@blips/ui` envolvem primitivas Radix. O Radix entrega, de
graça, nos patterns que ele cobre: **roles/ARIA** corretos, **gestão de foco**
(trap + restore em Dialog/Popover), **Escape** para fechar, **navegação por
teclado** (setas em Menu/Tabs/Select, roving tabindex), e `aria-expanded`/
`aria-controls` nos triggers. **Por quê:** re-implementar isso em `div`/`span`
quase sempre erra teclado, foco ou estado — ver regra 4. O que sobra pro app
é tudo abaixo: **nome acessível**, **rótulo de input**, **estrutura de heading/
landmark**, **contraste**, **target size**, **erro de form** e **título de
Dialog** (o Radix exige, mas não preenche).

## Cores e contraste

Tokens são cor completa (oklch/hex) — consuma como utility (`text-foreground`,
`bg-primary`) ou `var(--x)`, **nunca** `hsl(var(--x))`. O tema é lei; contraste
é responsabilidade de quem **compõe** os tokens.

| Par | Mínimo AA |
|---|---|
| Texto normal (abaixo de 18 pt regular / 14 pt bold — cobre body e a maioria da UI) | **4.5:1** |
| Texto grande (≥18 pt regular ≈24 px, OU ≥14 pt bold ≈18.5 px) | **3:1** |
| Componentes não-textuais e objetos gráficos (borda de input, ícone informativo) | **3:1** |
| Indicador de foco vs. estado adjacente/não-focado | **3:1** |

- **Thresholds são INCLUSIVOS** — exatamente 4.5:1 ou 3:1 passa; **2.999:1
  FALHA** o critério 3:1 (arredondar não é mecanismo permitido). **Por quê:**
  checklist que "arredonda pra cima" reprova menos do que deveria. (runtime
  axe `color-contrast` / bloqueante)
- **"Texto grande" = 18 pt regular (~24 px) OU 14 pt bold (~18.5 px)** — **NÃO
  "18 px"**. 18 px regular ainda precisa de 4.5:1; 14 px bold não qualifica
  para 3:1. **Por quê:** o erro "18 px = texto grande" é o engano mais comum e
  reprova/aprova na faixa errada. (julgamento / bloqueante)
- **Cor não pode ser o único portador de significado** (estado, direção,
  obrigatoriedade): pareie com ícone, texto ou borda. Use `text-success`/
  `text-destructive`/`text-warning` **mais** um rótulo, nunca só a cor.
  **Por quê:** daltônicos e leitura monocromática perdem a informação. (WCAG
  1.4.1 / julgamento / bloqueante)
- **APCA é só design-review**, paralelo — pega efeitos de peso/espessura que o
  ratio de luminância WCAG ignora (body em Lc ≥60 é um pass razoável). **Não**
  é parte de WCAG/EN 301 549/Section 508. Mantenha WCAG 2.2 AA como piso de
  conformidade. (julgamento / aviso)

## Target size (alvo de toque/clique)

| Barra | SC | Tamanho |
|---|---|---|
| **AA (piso legal)** | 2.5.8 Target Size (Minimum) | **24×24 CSS px** |
| AAA (compromisso de craft) | 2.5.5 Target Size (Enhanced) | 44×44 CSS px |

- **AA é 24×24, AAA é 44×44 — não confunda.** Citar "44×44 como a barra AA" é o
  erro de checklist mais frequente. **Por quê:** reprova alvos válidos e
  esconde a barra real. (runtime axe `target-size` / bloqueante)
- **Exceção "Spacing"** (a que toolbars densas usam): vale se um círculo de
  exclusão de 24 CSS px ao redor do alvo **não intersecta** os adjacentes. As
  outras quatro exceções de 2.5.8 (Equivalent, Inline — links no meio de
  frase, User-agent, Essential) são mais estreitas do que parecem e **não**
  justificam ação primária subdimensionada. **Por quê:** ícone-botão de 20px
  encostado em outro falha; com folga de espaçamento, passa. (julgamento /
  bloqueante)
- **Ícone-botão**: garanta área clicável via `size` do `Button` (ex.: `icon`)
  ou padding — não confie só no tamanho do glyph Phosphor. (julgamento / aviso)

## Foco visível

- **Remover o outline de foco via CSS é falha TRIPLA**: 1.4.11 Non-text
  Contrast + 2.4.7 Focus Visible + 2.4.13 Focus Appearance (AAA). **Por quê:**
  usuário de teclado fica cego à posição do cursor. Nunca use `outline: none`
  sem substituto. (auto-verificável check.mjs: grep `outline:\s*none` /
  `outline-none` / `outline-hidden` sem `focus-visible`/`focus:`/`ring-` na
  mesma linha — heurística / aviso; o revisor promove a bloqueante ao confirmar
  que não há substituto)
- **Use `:focus-visible`** (e a utility `focus-visible:`) — mostra o anel para
  teclado e suprime no clique de mouse, só quando há outra afordância
  não-cor. O tema já injeta `outline-ring/50` no `*` (globals.css); use
  `ring-ring`/`ring-2` para reforçar, não para remover. **Por quê:** mantém o
  anel onde ele importa sem ruído visual no mouse. (julgamento / aviso)
- Para AAA (2.4.13): área do indicador ≥ perímetro de 2 CSS px do componente e
  contraste ≥3:1 entre focado/não-focado — um outline de 1 px a 3:1 não
  qualifica. (julgamento / aviso)

## Inputs e rótulos

WebAIM Million 2026 (usa **WAVE**, não axe): **51% das home pages do top-1M têm
ao menos um input sem rótulo; 33,1% de todos os 6,9M inputs estão sem rótulo**
— a taxa por página subiu de 48,2% (2025) → 51% (2026), uma das poucas
categorias que a WebAIM aponta como **em alta** (média de 56,1 erros/página).
É o erro nº1; trate como bloqueante.

- **Input nunca solto.** Em formulário, use a anatomia
  `FormField > FormItem > FormLabel + FormControl (+ FormMessage)` — ela gera
  `htmlFor` / `aria-describedby` / `aria-invalid` automaticamente. Fora de
  form: `<Label htmlFor>` ou `aria-label`. **Por quê:** sem rótulo programático
  o leitor de tela anuncia "edit text" e nada mais. (lint Biome
  `noLabelWithoutControl` + julgamento / bloqueante)
- **Placeholder NUNCA é label** — some ao digitar; falha 1.3.1 e 3.3.2.
  **Por quê:** o usuário perde o contexto no meio do preenchimento. (julgamento
  / bloqueante)
- **Wiring de erro** (WCAG 2.2 + ARIA APG):

  ```html
  <label for="email">Email</label>
  <input id="email" type="email" required
         aria-describedby="email-hint email-error" aria-invalid="true">
  <span id="email-hint">Usado só para recibos.</span>
  <span id="email-error" role="alert">Email precisa conter @ e domínio.</span>
  ```

  `aria-describedby` é o **default de produção**; `aria-errormessage` tem
  suporte incompleto a leitor de tela em 2026-05 (completo no NVDA; parcial em
  JAWS/VoiceOver/TalkBack) — use como **progressive enhancement**, nunca como
  único portador. `FormMessage` do `@blips/ui` já faz o describedby. **Por
  quê:** errar o canal de erro = o usuário não ouve por que o envio falhou.
  (julgamento / bloqueante)
- **Obrigatório precisa de `required` + indicação visível** (texto ou marca),
  não só asterisco de cor. (julgamento / aviso)
- **Não re-pergunte dado já fornecido** no mesmo fluxo (WCAG 3.3.7 Redundant
  Entry, **Level A** — piso legal): auto-preencha ou ofereça atalho selecionável.
  Autofill do navegador **não** satisfaz. **Por quê:** é critério de nível A,
  cai no piso legal. (julgamento / aviso)

## Teclado e estrutura semântica

- **Alcançável por Tab** (2.1.1 Keyboard, A): todo elemento interativo
  navegável e operável por teclado. `tabindex="-1"` tira da ordem;
  **`tabindex` > 0 é proibido** — reordena contra o DOM e quase sempre piora.
  Conserte o DOM, não o tabindex. **Por quê:** ordem de foco quebrada
  desorienta quem não usa mouse. (auto-verificável check.mjs: grep
  `tabIndex={[1-9]` / bloqueante)
- **`<a>` sem `href` não é link** — não é focável, não é operável por teclado,
  não é link. Use `<a href>` para navegação e `<button>`/`Button` para ação;
  nunca âncora-placeholder com `onClick`. **Por quê:** vira um vazio invisível
  ao teclado e ao leitor de tela. (lint Biome `useValidAnchor` /
  auto-verificável / bloqueante)
- **Não recriar o que o Radix resolve.** `div`/`span` clicável fazendo papel de
  botão/link/close é proibido (sem role, foco ou teclado) — use `Button`,
  `DialogClose` ou a primitiva correspondente. `<div role="button">` exige
  re-implementar foco, `aria-pressed`, disabled e Space-no-keyup, e a maioria
  esquece algo. **Por quê:** o nativo já é nomeável, focável e anunciado por
  toda AT de graça. (lint Biome `useKeyWithClickEvents`/
  `noStaticElementInteractions` + julgamento / bloqueante)
- **Ordem ARIA (APG):** 1) elemento HTML nativo com a semântica certa → 2)
  nativo re-estilizado sob visual custom → 3) pattern APG **verbatim** → 4)
  pattern APG mais próximo + **desvio documentado** (último recurso). Nunca
  invente ARIA. **Por quê:** WebAIM Million 2026 — páginas com ARIA têm **59,1
  erros** de média vs **42** sem ARIA (~17 a mais); uso de ARIA (82,7% das
  homes) supera a corretude. ARIA mal usado é pior que ausente. (julgamento /
  bloqueante)
- **Headings**: um único `h1` por página renderizada (layout + page contam
  juntos) e níveis sem salto (`h1` → `h3` sem `h2` é proibido). Tamanho visual
  e nível de heading são **independentes** — estilize o nível que você quer
  dizer; número/valor não é heading. **Por quê:** AT navega pela árvore de
  headings; salto vira buraco no índice. (runtime axe `heading-order` +
  julgamento / aviso)
- **Landmarks**: use `<header>`/`<nav>`/`<main>`/`<aside>`/`<footer>`, não
  `<div role="banner">`. **Por quê:** AT navega por landmark; página só de
  `div` é um muro. (julgamento / aviso)
- **`lang` no documento** (3.1.1, A): `<html lang="pt-BR">`; trocas de idioma
  em sub-árvore usam `lang` no elemento interno. **Por quê:** define
  pronúncia/voz do leitor de tela. (julgamento / aviso)

## Nome acessível, ícones e Dialog

- **Botão/trigger só-ícone tem nome acessível**: `aria-label` ou
  `<span className="sr-only">`. **NUNCA** apenas `title`/tooltip (APG — fallback
  do browser proibido). **Por quê:** sem nome, a AT anuncia só "button".
  (lint Biome a11y + auto-verificável check.mjs: ícone-botão sem
  `aria-label`/`sr-only` / bloqueante)
- **Imagem/ícone informativo tem nome; decorativo fica `aria-hidden`**
  (Phosphor já omite por default quando não recebe props de a11y). Gráfico/SVG
  de dados precisa de alternativa textual (1.1.1, A) — `aria-label`/tabela
  resumo; gráfico sem alternativa é ilegível ao leitor de tela. **Por quê:**
  conteúdo só-visual = dado perdido para quem não vê. (julgamento / aviso)
- **`DialogContent` (e `Sheet`/`AlertDialog`) sempre com `DialogTitle`** — se o
  título for visualmente oculto, use `sr-only`/`VisuallyHidden`; inclua
  `DialogDescription` ou `aria-describedby={undefined}` explícito. **Por quê:**
  o Radix **exige** o título para nome acessível e dispara warning em runtime
  se faltar — sem ele o diálogo abre "sem nome". (auto-verificável check.mjs:
  grep `DialogContent` sem `DialogTitle` na mesma composição / bloqueante)

## Movimento e flash

- **`prefers-reduced-motion`**: respeite a preferência do SO em animações não
  essenciais (ver `tw-animate-css` / utilities `motion-reduce:`). (julgamento
  / aviso)
- **Flash** (2.3.1, A): nada pisca mais de **3 vezes por segundo**, salvo se a
  área de flash ficar abaixo dos limiares geral e de vermelho. **Por quê:**
  proteção contra epilepsia fotossensível — é nível A. (julgamento /
  bloqueante)

## Erros comuns (lint disto — todos da fonte)

- "Target Size 44×44 é a barra AA" — **errado**, 44×44 é AAA (2.5.5); AA é
  24×24 (2.5.8).
- "18 px = texto grande" — **errado**, é 18 pt regular (~24 px) ou 14 pt bold
  (~18.5 px).
- "2.999:1 arredonda e passa o 3:1" — **errado**, threshold é inclusivo, falha.
- "`tabindex` conserta ordem de foco" — `tabindex` > 0 reordena contra o DOM e
  quase sempre piora; conserte o DOM.
- "Modal que prende foco = keyboard trap" — **não**; prender até Escape/fechar é
  comportamento correto (2.1.2), não violação.
- "Tamanho da fonte = nível do heading" — independentes; estilize o nível que
  você quer.
- "WebAIM Million usa axe-core" — usa **WAVE**.
- "Adicionar ARIA melhora a11y" — empiricamente o oposto (59,1 vs 42 erros).
- "`<a>` com onClick é link" — **não**; sem `href` não é focável nem link.
- "Remover outline com `outline: none`" sem substituto — falha tripla (1.4.11 +
  2.4.7 + 2.4.13).
- "Placeholder como único rótulo" — falha 1.3.1 e 3.3.2; some ao digitar.

<!-- Fonte: nexu-io/open-design (Apache 2.0) — research/open-design/craft/accessibility-baseline.md -->
