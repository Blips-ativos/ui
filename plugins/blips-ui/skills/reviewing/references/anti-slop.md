# Anti-slop: padrões de "cara de IA" banidos (verificável)

Reference canônica ANTI-GENÉRICO. Distingue UI desenhada por quem entende de
produto da saída-padrão de LLM ("AI slop"). É apontada por **duas** skills:
`reviewing` (gate) usa para reprovar; `designing` (geração) usa para não
produzir slop em primeiro lugar.

**Escopo (não duplicar com outras references):** o hardcode de cor cru
(`bg-[#hex]`, `hsl(var(--…))`, override de token) já é coberto pelo `check.mjs`
e por `lib-facts.md`. AQUI o foco são os PADRÕES de slop: hexes de IA
**nomeados** (indigo/violet), gradiente roxo no hero, **emoji como ícone**,
**card + borda-esquerda colorida**, **métricas inventadas**, **lorem ipsum**,
CDNs de placeholder, em-dash decorativo. Severidade: **bloqueante** ou
**aviso** (nunca outra). Cada regra é marcada **auto-verificável (check.mjs)**
ou **julgamento (revisor)**.

> Tema é lei: a cura para QUALQUER tell de cor aqui é o token Blips, não outro
> hex. Accent da Blips = `primary` (#fcba28). Banir indigo NÃO significa
> "escolher outro roxo" — significa usar `bg-primary`, `text-success`,
> `bg-info`, etc. Nem no modo criativo se sai do tema.

---

## P0: bloqueantes (a maioria lintável)

Os sete pecados que o linter da fonte bloqueia a P0, mapeados ao stack Blips.

### P0.1 · Indigo/violet do Tailwind como accent · **auto-verificável (check.mjs)**

Hexes exatos da família indigo/violet são o tell-livro-texto de IA. Banidos
como cor sólida (fill de botão, badge, fundo, texto de destaque). PORQUÊ: é a
cor que todo LLM "alcança" por padrão; vê-la = template. A cura é `primary`
(#fcba28) ou um token semântico (`info`, `success`...), nunca outro roxo.

Lista canônica a grepar (hex cru, qualquer caixa, em `bg-[...]`/`text-[...]`/
`style`/CSS):

| Hex | Família | Hex | Família |
| --- | --- | --- | --- |
| `#6366f1` | indigo-500 | `#a855f7` | purple-500 |
| `#4f46e5` | indigo-600 | `#7c3aed` | violet-600 |
| `#4338ca` | indigo-700 | `#8b5cf6` | violet-500 |
| `#3730a3` | indigo-800 | `#6d28d9` | violet-700 |
| `#818cf8` | indigo-400 | `#a78bfa` | violet-400 |

> Cobertura atual do `check.mjs` (constante `AI_DEFAULT_INDIGO`): os 10 hexes
> já estão no script — os 7 cardinais (`#6366f1`, `#4f46e5`, `#4338ca`,
> `#3730a3`, `#8b5cf6`, `#7c3aed`, `#a855f7`) E os 3 estendidos (`#818cf8`,
> `#6d28d9`, `#a78bfa`). Não falta nenhum a portar. Nomes de utility Tailwind
> (`indigo-500`, `violet-600`, `purple-500`) também são grepáveis e indicam
> tema não-Blips importado.

### P0.2 · Gradiente "trust" de 2 stops no hero · **julgamento (revisor)** (heurística grepável)

Roxo→azul, azul→ciano, indigo→rosa atrás do headline. PORQUÊ: é o fundo de IA
por excelência; uma superfície chapada (`bg-background`/`bg-surface`) + tipo
intencional (`font-display tracking-tight`) ganha sempre. Heurística:
`linear-gradient`/`bg-gradient-to-*` com 2 stops cujas cores caem na família
P0.1 dentro de um `<header>`/`<section>` de topo. Confirmação do revisor (um
gradiente sutil dentro do tema pode ser legítimo).

### P0.3 · Emoji como ÍCONE · **aviso (check heurístico); revisor promove a bloqueante se for ícone decorativo**

`✨ 🚀 🎯 ⚡ 🔥 💡 ✅ 📈 🔒 🎉 💎 ⭐` (e família) dentro de `<h1>`-`<h6>`,
`<button>`, `<li>`, `<Badge>`, ou `class*="icon"`. PORQUÊ: emoji-ícone é
inconsistente entre OS, não herda `currentColor` nem peso, e grita IA — o
padrão Blips é `@phosphor-icons/react` (weight `regular`, `size`/`className`
controlam tudo). Grep: codepoints emoji (faixas U+1F300–U+1FAFF, U+2600–U+27BF,
U+2190–U+21FF setas decorativas) nesses contextos.

```tsx
// slop
<h2>🚀 Resultados rápidos</h2>
<Button>✨ Gerar relatório</Button>
// Blips
<h2><Rocket /> Resultados rápidos</h2>
<Button><Sparkle /> Gerar relatório</Button>
```

### P0.4 · Fonte sans hardcoded em display quando o tema liga display · **auto-verificável (check.mjs)**

H1/H2 com `font-['Inter']`, `font-[Roboto]`, `system-ui` cravado, ou
`font-family: Inter` inline em vez de `font-display` (Quicksand). PORQUÊ: o
tema Blips reserva Quicksand para display/heading; cravar Inter no título
ignora a hierarquia tipográfica da marca. Grep: `font-\[` com nome de fonte, ou
`font-family:` literal em arquivo de app. Cura: `font-display` (títulos),
`font-sans` (corpo), `font-mono` (números/código).

### P0.5 · Card arredondado + borda-esquerda colorida (o "alert card" genérico) · **julgamento (revisor)**

`rounded-* ` + `border-l-4`/`border-l-[Npx]` colorido na MESMA caixa — a forma
canônica do "tile de dashboard de IA". PORQUÊ: é o clichê nº 1 de card gerado;
quebra a consistência de raio/elevação do tema. Cura: largue OU o raio OU a
borda-esquerda — para avisos use o componente `Alert` da lib (não recrie). Grep:
nó com `rounded-` E `border-l-` (≥2px ou com cor) coexistindo nas classes.

```tsx
// slop
<div className="rounded-lg border-l-4 border-l-info bg-card p-4">…</div>
// Blips — usar o componente, não o clichê
<Alert variant="info">…</Alert>
```

### P0.6 · Métricas inventadas sem fonte · **julgamento (revisor)** (heurística grepável)

"10× faster", "99.9% uptime", "3× more productive", "50% menos cliques" sem
origem real. PORQUÊ: a Blips é gestora de ativos — número fake em produto é
defeito de credibilidade e risco regulatório. Aceitável só se: (a) vem de fonte
real (brief, dado público, métrica do produto) OU (b) está marcado como mock
(`{/* mock */}`, prop `placeholder`, "exemplo"). Heurística grepável:
`\d+(\.\d+)?\s*[×x]\b`, `\b\d{2,3}(\.\d+)?\s*%`, `99\.9+%`, `\d+x\s+(faster|more)`.

### P0.7 · Lorem ipsum / copy-filler em entrega · **auto-verificável (check.mjs)**

`lorem ipsum`, `dolor sit amet`, `feature one/two/three`, `placeholder text`,
`sample content`, `Lorem`, `Card Title` repetido, `Your text here`. PORQUÊ:
seção vazia é problema de composição a resolver com layout (empty state real),
não inventando palavras. Cura: copy funcional em pt-BR ou um empty state do
padrão (ver `ui-states.md`). Grep: as strings acima (case-insensitive).

---

## P1: avisos (lintáveis em sua maioria)

### P1.1 · >12 hex crus fora de `:root`/`globals` · **auto-verificável (check.mjs)**

Mais de ~12 valores hex literais espalhados fora do CSS de tema. PORQUÊ:
tokens não foram honrados; cor deve viver em `globals.css`, não pulverizada nas
telas. (O `check.mjs` já flagra `bg-[#hex]` individualmente como bloqueante;
ESTE é o agregado por arquivo/tela como aviso de "tema ignorado em escala".)

### P1.2 · CDNs de placeholder · **auto-verificável (check.mjs)**

`unsplash.com`, `placehold.co`, `via.placeholder.com`, `dummyimage.com`,
`placekitten.com`, `picsum.photos`, `loremflickr.com`. PORQUÊ: link frágil e
óbvio de IA; some em build/offline e denuncia a origem. Cura: asset real, ou
`Skeleton`/empty state da lib, ou slot marcado `{/* TODO: imagem real WxH */}`.
Grep: os domínios acima em `src=`/`url(`/string.

### P1.3 · `accent`/primary usado 6+ vezes na tela · **julgamento (revisor)** (contável)

Mais de ~5 usos VISÍVEIS do amarelo de marca (`bg-primary`, `text-primary`,
`ring-primary`) numa mesma tela. PORQUÊ: accent que aparece em tudo deixa de
acentuar — o amarelo Blips pesa quando é raro (1–2 usos por tela: a ação
primária e talvez 1 destaque). Heurística: contar ocorrências de `-primary`
por arquivo de tela; >5 → revisor confirma se há hierarquia ou é "tudo amarelo".

### P1.4 · Em-dash decorativo onde cabia vírgula · **julgamento (revisor)**

`—` (U+2014) ou `–` (U+2013) como separador estiloso em headline, eyebrow,
pill, botão, caption ou atribuição de citação. PORQUÊ: o em-dash é a muleta
estilística nº 1 de LLM e o tell visual mais frequente; quase sempre uma
vírgula, dois-pontos ou ponto resolve melhor. Cura: hífen normal `-` com
espaços, vírgula, dois-pontos, ponto-medial `·`, ou duas frases. NÃO é
auto-verificável: um grep do caractere não distingue o travessão decorativo
(o tell de IA) do travessão tipograficamente legítimo, então o revisor
decide caso a caso.

> **Decisão DA SKILL (não da fonte):** a fonte (`taste-skill` §9.G) bane o
> em-dash de forma TOTAL, sem exceção. Esta skill suaviza para "uso
> DECORATIVO em rótulos curtos", tolerando o travessão em prosa longa pt-BR
> quando ele estiver tipograficamente correto. Essa tolerância é uma escolha
> editorial desta reference, não um aval da fonte — na dúvida, prefira a
> regra estrita da fonte.

---

## P2: polish (julgamento do revisor)

Tells sutis; não reprovam sozinhos, mas somados deixam "cara de template".

- **Sequência "Hero → Features → Pricing → FAQ → CTA" sem variação** — o
  esqueleto-template de IA. Introduza ≥1 seção fora do molde. PORQUÊ: ritmo
  idêntico ao de todo site gerado.
- **Três feature-cards iguais lado a lado** — o "3 colunas idênticas". PORQUÊ:
  layout-default; prefira grid assimétrico, 2 colunas em zigue-zague ou tile de
  tamanhos mistos.
- **Fundo decorativo de blob/wave/mesh SVG** — geometria sem significado.
- **Layout perfeitamente simétrico sem tensão visual** — alternar densidade
  (uma seção compacta, outra que respira) lê como intencional.
- **Glow/neon e sombra preta pura** sobre fundo claro — tinja a sombra na cor
  do fundo; use `shadow-sm`/borda do tema.
- **Nomes/dados genéricos** ("John Doe", "Acme", "99,99%", avatar-ovo) — use
  dados realistas e desordenados (`47,2%`) ou um avatar real do padrão.
- **Bolinha de status colorida decorativa** antes de todo item de nav/lista —
  só quando comunica estado semântico real, máx. 1 por seção.

---

## A fórmula: 80% padrão comprovado + 20% escolha distintiva

Mire **~80% padrões comprovados + ~20% escolha distintiva**. Os 80% são o
shadcn/Radix da `@blips/ui` no tema (não brigue com o sistema). Os 20% — a
"alma" — devem viver em UM destes quatro lugares (não espalhe por todos):

1. **Um movimento visual ousado** — uma decisão de tipografia (`font-display`
   num tamanho inesperado), uma única decisão de cor (o amarelo `primary` num
   lugar surpreendente), uma proporção fora do óbvio.
2. **Voz e microcopy** — um botão "Começar acompanhamento" vale mais que
   "Começar"; rótulos específicos do produto Blips, não genéricos.
3. **Uma microinteração memorável** — o press de um botão que afunda 2px
   (`active:translate-y-px`), um número que conta até o valor.
4. **Um detalhe que só quem usou o produto poria** — dica de atalho de teclado
   (`kbd`), um badge de status com frase específica do domínio (gestão de
   ativos).

> **Teste final:** se alguém de fora do projeto, olhando um screenshot,
> consegue dizer de QUE produto é — tem alma. Se não — você entregou um
> template.

---

## O que vira `check.mjs` (resumo para implementação)

Auto-verificável (grep determinístico) → entra no script:

| Regra | Grep / heurística | Severidade | Status no script |
| --- | --- | --- | --- |
| P0.1 indigo/violet | 10 hexes da constante `AI_DEFAULT_INDIGO` (7 cardinais + 3 estendidos) + utilities `indigo-/violet-/purple-` | bloqueante | no script |
| P0.3 emoji-ícone | codepoints emoji dentro de `<h*>`/`<button>`/`<li>` | aviso (verify) | no script |
| P0.7 lorem/filler | `lorem ipsum`, `feature one/two/three`, `placeholder text`, etc. | bloqueante | no script |
| P1.1 >12 hex fora do tema | contagem de `#[0-9a-f]{3,8}` por arquivo, exceto `globals.css`/`:root` | aviso | no script |
| P1.2 CDN de placeholder | 7 domínios: `unsplash.com`, `placehold.co`, `via.placeholder`, `dummyimage.com`, `placekitten.com`, `picsum.photos`, `loremflickr.com` | aviso | no script |
| P0.4 font hardcoded em display | `font-\[` com nome de fonte / `font-family:` literal | bloqueante | ainda NÃO no script (porta futura) |
| P0.5 card + border-l colorida | `rounded-` E `border-l-` (cor/≥2px) no mesmo nó | bloqueante | ainda NÃO no script (porta futura) |

> Nota sobre o emoji (P0.3): no script ele entra como `verify:true`, ou seja,
> AVISO heurístico — o revisor promove a bloqueante quando confirma que é
> emoji usado como ícone decorativo. Não é bloqueante automático.

Julgamento (revisor, não automatizável de forma confiável): P0.2 (gradiente no
hero), P0.6 (métrica inventada vs. mock; grep só sinaliza, revisor decide),
P1.3 (contagem de accent + hierarquia), **P1.4 (em-dash: um grep do caractere
não distingue travessão decorativo de legítimo)**, e todo o P2.

<!-- Fonte: nexu-io/open-design (Apache 2.0) — craft/anti-ai-slop.md; skills/taste-skill/SKILL.md (seções 4.2, 9.A–9.G) -->
