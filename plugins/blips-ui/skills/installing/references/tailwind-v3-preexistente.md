# Tailwind v3 pré-existente — as duas rotas verificadas

Procedimentos validados em dois repos reais da Blips (Next 15 + React 18 com
tema shadcn v3; Vite 5 + React 17 + AntD com `important: true`). Leia esta
reference INTEIRA antes de apresentar o trade-off ao usuário — e **só execute
depois que ele escolher a rota** (a escolha muda o visual ou as limitações do
produto).

## Por que a rota canônica não funciona aqui

- O `globals.css` da lib é **v4-only** (`@theme`, `@custom-variant`, utilities
  como `outline-hidden`) — um pipeline v3 não o processa.
- Temas shadcn v3 definem os **mesmos nomes de token** da lib (`--primary`,
  `--background`...) em formato HSL-fragmento (`41 97% 57%`, consumido como
  `hsl(var(--x))`), enquanto a lib define cor completa. Carregar os dois temas
  no mesmo documento: quem perde a ordem do cascade fica com valor inválido
  (IACVT) — verificado.
- Pipelines duais (v4 só para a lib) também falham: a colisão de nomes em
  `:root` é global ao documento.

## Rota A — Migrar o app para v4 (tema da lib vira fonte única)

Quando tende a ganhar: app pequeno/médio, tema atual já shadcn-like (idealmente
já com o amarelo Blips como `primary`), sem `important: true`, time disposto a
absorver deltas visuais.

1. Instale `tailwindcss@^4` + a integração do bundler; remova
   `tailwindcss-animate` (o globals já traz `tw-animate-css`) e `autoprefixer`
   (embutido no pipeline v4).
2. Reescreva o CSS global: `@import "@blips/ui/globals.css"` + **somente** as
   extensões locais do app, portadas para dentro de `@theme` (tokens próprios,
   animações/keyframes, shims — ex.: `@utility container { margin-inline:
   auto; padding-inline: 2rem }` se a config v3 tinha `center`/`padding`).
3. **Converta os consumidores de token incompatíveis**: todo `hsl(var(--x))`
   em JS/arbitrary values vira `var(--x)` (os tokens da lib são cor completa).
   Grep: `grep -rn "hsl(var(--" src/`.
4. Só depois de portar 100%: delete `tailwind.config.*`; em repos com shadcn
   CLI, ajuste `components.json` → `"tailwind": {"config": ""}`.
5. tsconfig: `moduleResolution` precisa ser `"bundler"` (ou `node16`+) para os
   subpath exports — `"node"` não os resolve.
6. Valide: typecheck, build, CSS gerado contém `#fcba28` + as extensões
   portadas, runtime com `data-slot` na rota tocada.

**Custos a apresentar ao usuário ANTES**: renames de escala do v4 (`shadow-sm`,
`rounded-sm`, `ring` mudam levemente em TODO o app), paleta neutra da lib
(backgrounds, `--radius` 0.5→0.625rem), `container` com max-width por
breakpoint. São deltas visuais globais, não bugs.

## Rota B — Coexistir no pipeline v3 (lib estilizada por content scan)

Quando tende a ganhar: legado grande, `important: true` (anti-AntD), migração
de telas fora de questão, tema do app já usa os mesmos nomes de token.

1. **Não toque** no pipeline v3 nem no tema do app. NÃO importe o globals da
   lib.
2. `tailwind.config.js` → `content` ganha
   `"./node_modules/@blips/ui/src/**/*.{ts,tsx}"` — a lib publica o fonte, e o
   scan v3 gera as utilities internas dos componentes.
3. Os tokens semânticos (`bg-primary`...) resolvem para o tema DO APP (mesmos
   nomes). Confirme que o tema define os tokens que a lib usa; o visual dos
   componentes herda o tema local.
4. **Limitação a aceitar e documentar**: utilities v4-only dos componentes
   (`shadow-xs`, `outline-hidden`, modificadores `/90`) não são geradas —
   degradação apenas cosmética. Verifique o render dos componentes usados.
5. Adapte os artefatos de agente para a VERDADE do repo (o template canônico
   afirmaria v4 CSS-first — falso aqui): na seção de UI do CLAUDE.md, troque
   os bullets de Tailwind por: pipeline v3
   mantido, lib estilizada via content scan, tokens resolvem para o tema do
   app, e **proibições** — não importar o globals da lib, não criar pipeline
   v4 paralelo, não "consertar" o setup de passagem. Registre o caminho de
   migração futura (Rota A) como decisão pendente do time.
6. Valide: build do repo (o gate real dele), CSS gerado contém utilities da
   lib (`data-slot`, `size-9`...), renderização real do componente.

## Sinais para a recomendação (apresente, não decida)

| Sinal no repo | Empurra para |
| --- | --- |
| Tema shadcn v3 com amarelo Blips como primary | A |
| `important: true` / AntD / styled-components em produção | B |
| Centenas de arquivos legados com lucide/UI antiga | B |
| App pequeno, poucas telas, design já próximo do DS | A |
| Time quer o tema canônico da Blips como fonte única | A |
