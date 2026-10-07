# Construção de componentes e páginas — critérios de review

Espelha o guia do time (`component-construction.md`, presente em
blips-flow/blips-frontend/blips-atlas, ref. Confluence) e a convenção de
páginas (`page-structure.md` do atlas). Aqui em forma de critérios
verificáveis.

> Marcação: cada regra é **auto-verificável (check.mjs)** — lintável por
> grep/script — ou **julgamento (revisor)** — exige leitura humana. Severidade
> é exatamente **bloqueante** ou **aviso**.

## Lógica de componente (guia do time)

1. **Estado derivado via `useEffect` + `setState` é violação** (§2): valor
   derivável de outro estado/props se computa na renderização (ou `useMemo`).
   Padrão do bug: `useEffect(() => setX(deriva(y)), [y])`. **PORQUÊ:** estado
   duplicado dessincroniza e gera render extra. (bloqueante · julgamento (revisor))
2. **Estados que sempre mudam juntos** devem ser um objeto/`useReducer` —
   dois `setState` no mesmo handler para dados acoplados é o sintoma (§3).
   Caso particular: um deles é derivável do outro → remova-o (vira o item 1).
   **PORQUÊ:** dois setState acoplados abrem janela de estado inconsistente.
   (aviso · julgamento (revisor))
3. **Ordem interna de hooks** (§4): utilitários/custom → estado → requisição
   (`useQuery`/`useMutation`) → constantes/derivados (`useMemo`/`useCallback`)
   → **effects por último**. `useEffect` no topo é violação. **PORQUÊ:** ordem
   canônica torna o fluxo de dados legível e o diff revisável.
   (aviso · julgamento (revisor))
4. **Atualização por evento, não por effect** (§2): se a mudança responde a
   onClick/onChange/onSubmit, ela acontece no handler. `useEffect` é só para
   sincronizar com sistemas externos. **PORQUÊ:** effect reativo a ação do
   usuário roda tarde e duplica a lógica do handler. (bloqueante · julgamento (revisor))
5. **Extração de componente** (§1): sinais — estado local exclusivo num
   trecho, cálculo caro isolável, JSX com muitos handlers/condicionais, reuso
   real. Componente de 200+ linhas com 3+ responsabilidades = apontar
   extração. **PORQUÊ:** unidade menor testa, reusa e revisa melhor.
   (aviso · julgamento (revisor))

## Composição sobre a lib

6. **Nunca reimplementar o que a lib/primitiva fornece** (Radix na v2.x, Base UI na v3.x): close custom em Dialog
   (existe `DialogClose` e o X embutido), checkbox/select/tooltip caseiros,
   gestão manual de foco/Escape sobre primitives. **PORQUÊ:** a primitive já
   resolve foco/ARIA/teclado — recriar regride acessibilidade. (bloqueante ·
   julgamento (revisor))
7. **Nunca sobrescrever variante com cor crua** (`className="bg-[#fcba28]"`
   num Button): quebra theming/estados — a variante CVA + tokens já cobrem;
   variantes novas locais via CVA/wrapper, nunca fork do componente da lib.
   **PORQUÊ:** cor crua ignora dark mode, hover e foreground pareado.
   (bloqueante · auto-verificável (check.mjs))
8. **Campos de edição vivem num `<form>`** com submit (Enter funciona) e
   ações no `DialogFooter` quando em dialog. **PORQUÊ:** sem `<form>` o Enter
   não submete e a semântica de teclado se perde. (aviso · julgamento (revisor))

## API da versão da lib (v2.x Radix × v3.x Base UI)

Detecte a trilha antes (ver "Detecção de versão" no `SKILL.md`). Cada regra vale **só** na
trilha indicada — aplicar regra de uma trilha no repo da outra é erro do próprio review.

V1. **v3.x: `asChild` é erro.** A prop não existe no Base UI: troca de elemento é
    `render={<El />}` (e `nativeButton={false}` quando o `Button` renderiza `<a>`/`Link`).
    **PORQUÊ:** `asChild` vira prop desconhecida e o componente renderiza o elemento padrão
    com o filho dentro (botão dentro de botão, link sem estilo). (bloqueante ·
    auto-verificável (check.mjs))
V2. **v3.x: seletor `data-[state=…]` de primitiva é aviso.** Base UI emite `data-open`,
    `data-closed`, `data-checked`, `data-popup-open`, `data-panel-open`, `data-pressed`.
    Exceções que continuam válidas: `data-state="selected"` (`TableRow`) e
    `data-state="expanded|collapsed"` (`Sidebar`). **PORQUÊ:** o seletor para de casar em
    silêncio — o estilo some sem erro. (aviso · auto-verificável (check.mjs) + confirmar)
V3. **v3.x: ícone Phosphor sem sufixo `Icon` é aviso** (`CaretDown` → `CaretDownIcon`).
    **PORQUÊ:** os nomes sem sufixo estão `@deprecated` no Phosphor 2.1.10. (aviso ·
    auto-verificável (check.mjs))
V4. **v3.x: props removidas são erro** — `TooltipProvider delayDuration` (é `delay`),
    `Separator decorative`, `Checkbox checked="indeterminate"` (é a prop `indeterminate`),
    `Accordion type`/`ToggleGroup type` (é `multiple` + `value` array), `forceMount` (é
    `keepMounted`), `DropdownMenuItem onSelect` (é `onClick`). **PORQUÊ:** quebram o
    typecheck ou deixam de disparar. (bloqueante · check.mjs cobre os três primeiros;
    o resto é julgamento)
V5. **v3.x: armadilhas silenciosas** — `AlertDialogAction` não fecha sozinho (feche no
    `onClick`); `DropdownMenuLabel` fora de `DropdownMenuGroup`; `Select` com rótulo ≠ `value`
    sem `items` (o trigger mostra o valor cru). (aviso · julgamento (revisor))
V6. **v2.x: idioma da v3 é erro** — `render={<El />}` em componente da lib (use `asChild`),
    import de componente só-v3 (`attachment`, `bubble`, `combobox`, `direction`, `item`,
    `marker`, `message`, `message-scroller`, `native-select`, `questionnaire`, `toast`).
    Seletores `data-open:`/`data-checked:` num repo v2.x são aviso (Radix emite
    `data-[state=open]`). (bloqueante/aviso · auto-verificável (check.mjs) + confirmar)

## Estrutura de páginas (Next App Router — quando o repo segue page-structure)

9. `page.tsx` é entry mínimo (parse/delegação) — lógica de UI mora em
   `content.tsx`/`_components/`. **PORQUÊ:** entry fino mantém server/client
   boundary limpo e o arquivo navegável. (aviso · julgamento (revisor))
10. Componentes de feature em `_components/` prefixados com o nome da feature
    (`clientes-table.tsx` → `ClientesTable`); contextos em `_context/` com
    barrel. Componente de feature solto em `components/` global sem prefixo é
    desvio. **PORQUÊ:** prefixo + colocação tornam o dono óbvio e evitam
    colisão de nomes. (aviso · julgamento (revisor))
11. Título de rota via Metadata API (layout/page server), não
    `document.title` em effect. **PORQUÊ:** Metadata roda no server e acerta SEO/
    SSR; effect pisca e perde no first paint. (aviso · auto-verificável (check.mjs))

## Completude de código (entrega sem truncamento)

Toda entrega é production-critical: **saída parcial é saída quebrada.** Otimize
para completude, nunca para brevidade. Se pediram o arquivo inteiro, entregue o
arquivo inteiro; se pediram 5 componentes, entregue os 5.

12. **Placeholders/elisão em código são falha dura.** Proibidos em qualquer
    bloco entregue: `// ...`, `/* ... */`, `...` solto no lugar de código,
    `// resto do código`, `// implemente X aqui`, `// TODO`, `// similar ao
    acima`, `// continua o padrão`, `// adicione mais conforme necessário`.
    **PORQUÊ:** esqueleto no lugar de implementação não roda e empurra o
    trabalho de volta pra quem pediu. (bloqueante · auto-verificável (check.mjs))
13. **Atalhos em prosa que substituem conteúdo real são falha dura:** "o resto
    segue o mesmo padrão", "similarmente para os demais", "por brevidade",
    "e assim por diante", "deixo como exercício", "posso continuar se quiser".
    **PORQUÊ:** descrever o que o código faria não é entregar o código.
    (bloqueante · auto-verificável (check.mjs))
14. **Sem atalhos estruturais:** não mostre a primeira e a última seção pulando
    o meio, nem um exemplo + descrição no lugar da lógica repetida. Componente
    entregue pela metade é violação. **PORQUÊ:** o trecho elidido é justamente
    onde o bug se esconde. (bloqueante · julgamento (revisor))
15. **Output grande → divida em partes anunciadas, nunca comprima nem elida.**
    Escreva em qualidade plena até um ponto de corte limpo (fim de função/
    arquivo/seção) e marque explicitamente a continuação:
    `[PAUSADO — X de Y completo. Envie "continuar" para retomar de: <próxima
    seção>]`. **PORQUÊ:** corte anunciado preserva a parte entregue íntegra; a
    retomada continua exatamente de onde parou. (aviso · julgamento (revisor))

## Proximidade e agrupamento (Leis de UX)

Complementa o grid de 4px da `designing` com **semântica**: o grid diz os
valores permitidos, estas regras dizem quando usar cada um. Espaçamento
uniforme = nada agrupado.

16. **Ritmo vertical variável** (Lei da Proximidade, Wertheimer 1923):
    **8–12px DENTRO** de um grupo, **32–48px ENTRE** grupos. Espaçamento
    igual entre tudo (ex.: `space-y-4` chapado numa coluna com 3 grupos
    distintos) é violação — não há agrupamento perceptível. **PORQUÊ:**
    proximidade é o sinal de grupo mais barato, mais que borda ou cor.
    (aviso · julgamento (revisor))
17. **Common Region é caro — reserve** (Palmer 1992): só use enclausuramento
    (card/borda) quando a proximidade não basta. Região válida exige **padding
    ≥16px** dentro + superfície distinta (`border` + fundo `bg-muted`/`bg-card`,
    ou chrome de card com **hairline ≥1px**, ex. `border` = `1px`). Página onde
    **TODA seção tem borda** destrói o sinal de agrupamento. **PORQUÊ:** se
    tudo é uma região, nada se distingue como região. (aviso · julgamento (revisor))
18. **Similaridade: afordâncias equivalentes compartilham tratamento**
    (Wertheimer 1923): toda linha de lista com o mesmo conjunto de classes,
    todo botão secundário idêntico, toda ação destrutiva idêntica. Desvio
    visível reserva-se ao único item que deve chamar atenção. **PORQUÊ:**
    tratamento divergente sem intenção lê como grupos diferentes e confunde.
    (aviso · julgamento (revisor))
19. **Hick/Escolha — teto de opções primárias** (Hick 1952; Iyengar & Lepper
    2000): **3–5 ações primárias** por tela de decisão; colapse o resto atrás de
    "Mais"/disclosure progressivo. Settings: **≤5 grupos nomeados**. Grids de
    produto: 6–9 cards-herói acima da dobra; preços: 3–4 tiers, exatamente 1
    marcado como recomendado. Nunca emita um muro plano de equivalentes.
    **PORQUÊ:** tempo de decisão cresce ~log(n+1) com o número de opções
    equivalentes. (aviso · julgamento (revisor))
20. **Von Restorff — um destaque por superfície, com sinal NÃO-cromático**
    (von Restorff 1933): **1 item distinto** por superfície (tier recomendado,
    item de nav ativo, estado de aviso) e o destaque **sempre** pareado com
    sinal além da cor — ícone (`@phosphor-icons/react`), rótulo de texto, peso
    (`font-medium`/`font-semibold`) ou posição. Marcar só por cor é violação.
    **PORQUÊ:** o item que difere do campo uniforme é o lembrado — e cor
    sozinha falha em daltonismo e em modo escuro. (bloqueante · julgamento
    (revisor))

## Higiene (i18n-ready)

21. **Prefira logical properties no Tailwind v4** (`ps-`/`pe-`/`ms-`/`me-`/
    `start-`/`end-` em vez de `pl-`/`pr-`/`ml-`/`mr-`/`left-`/`right-`) sempre
    que o valor for direção-relativo (recuo de início, ícone à esquerda do
    texto, etc.). **PORQUÊ:** é barato, correto e à prova de i18n futuro (RTL)
    — o motor inverte automaticamente em `dir="rtl"`. (aviso · auto-verificável
    (check.mjs))

<!-- Fonte: nexu-io/open-design (Apache 2.0) — skills/output-skill/SKILL.md, craft/laws-of-ux.md -->
