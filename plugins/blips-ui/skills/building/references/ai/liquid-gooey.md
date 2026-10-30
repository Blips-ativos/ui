# Liquid Gooey

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Superfície líquida por baixo de peças de interface: peças vizinhas se fundem
como gosma, mudam de forma como gelatina, deixam rastro de borracha ao se mover
ou escorrem uma imagem na outra. Envolve o pacote
[`liquid-gooey`](https://libraries.dev/gooey) (Jakub Antalik / libraries.dev,
MIT). São duas camadas: uma silhueta SVG embaixo (goo + sombra) e o seu DOM
por cima, sempre nítido e interativo. O `BlipsLiquid` aplica os padrões da
marca: líquido no `--primary` (#FCBA28) com texto no `--primary-foreground`,
goo mais curto e nítido para a densidade mira e sombra no nível do `shadow-xs`.

## Quando usar (e quando não)

- **Use** em microinterações de agente que ganham com continuidade física:
  menu "+" do prompt que se divide em gotas (Resumir, Traduzir, Anexar),
  sugestões que se juntam, indicador de abas Resposta/Raciocínio/Fontes que
  escorre de uma aba para outra.
- **Não use** como superfície de layout (cartões, painéis, listas longas): o
  filtro SVG roda sobre cada peça e o efeito vira ruído. Use `Card`, `Tabs`,
  `ToggleGroup` da @blips/ui.
- **Não use** quando um `Tabs` ou `DropdownMenu` comum resolve e não há
  motivo de marca para o efeito; ele não substitui a semântica desses
  componentes.
- Para sinalizar "o agente está trabalhando", use `border-beam.md` ou
  `thinking-orbs.md`.

## Import

```tsx
import {
  BLIPS_LIQUID_DEFAULTS,
  BLIPS_LIQUID_TONES,
  BlipsLiquid,
  Liquid, // original, sem os padrões Blips
  type BlipsLiquidProps,
  type BlipsLiquidTone,
} from "@blips/ai/fx/liquid-gooey";
```

Também reexporta `EVOLVE_DEFAULTS`, `MOVE_DEFAULTS`, `IMAGE_MELT_DEFAULTS`,
`presets`, `easingFunction` e os tipos `LiquidProps`, `LiquidItemProps`,
`LiquidEffect`, `MorphTuning`, `MoveTuning`, `BendTuning`, `ImageMeltOptions`,
`DissolveOptions`, `EvolveOptions`, `MoveOptions`, `Transition`,
`TransitionPreset`, `SpringConfig`, `CornerRadii`.

Prefira sempre `BlipsLiquid`. O `Liquid` cru pinta o líquido de branco
(`#fff`), que some no tema claro e destoa no escuro.

## Peers exigidos

Nenhum: `liquid-gooey` é dependência da `@blips/ai`. Componente client
(`"use client"` no arquivo da lib). No SSR sai o contêiner com o conteúdo; a
medição e a animação começam no cliente.

O componente não importa `ai`: não é preciso instalá-lo.

## API

### `BlipsLiquid` (o grupo)

Aceita todas as props do `Liquid` original (e de `<div>`) mais `tone`;
qualquer prop explícita vence o padrão Blips. Encaminha `ref` para a `<div>`
raiz, que sai com `position: relative` e `isolation: isolate`.

| Prop | Tipo | Padrão Blips (upstream) | Notas |
|---|---|---|---|
| `tone` | `"primary" \| "card" \| "muted" \| "secondary"` | `"primary"` | Token que pinta o líquido; o grupo recebe `color` do `-foreground` correspondente (`muted` usa `--foreground`). Ignorado com `fill`. |
| `fill` | `string` (cor CSS, `var()` ok) | do `tone` (`"#fff"`) | Vai para `style.fill` do SVG. Com `fill` próprio, o wrapper não define `color`. |
| `blur` | `number` (px) | `5` (`6`) | Alcance do goo. Vizinhos se fundem quando `blur` ≳ distância entre eles. |
| `contrast` | `number` | `20` (`18`) | Nitidez da borda do líquido. |
| `shadow` | `string` (sintaxe `box-shadow`, várias camadas, `inset`) | `"0 1px 2px rgba(0, 0, 0, 0.08)"` (—) | Desenhada na silhueta já fundida. Os números precisam ser px literais: `var()` na cor funciona, mas não em comprimentos. |
| `filterPadding` | `number` (px) | `24` | Folga do filtro para peças que saem da caixa do grupo. |
| `waviness` | `number` (px) | `0` | Ondulação da borda. |
| `wavinessFreq` | `number` | `0.018` | Frequência da ondulação. |
| `filter` | `string` | — | Primitivas SVG que **substituem** a cadeia do goo (aí `blur`, `contrast`, `waviness` e parte da `shadow` ficam por sua conta). |
| `className`, `style`, demais props de `<div>` | | | `style` vence o `color` do tom. |

### `BlipsLiquid.Item` (cada peça)

É o `Liquid.Item` do upstream, sem padrões extras.

| Prop | Tipo | Padrão | Notas |
|---|---|---|---|
| `effect` | `"morph" \| "move" \| "melt" \| "bend"` | `"morph"` | `morph`: funde e muda de forma. `move`: líquido persegue o elemento com rastro. `melt`: duas imagens escorrem uma na outra (as duas primeiras peças `melt` do grupo formam o par). `bend`: o corpo curva com a velocidade. |
| `morph` | `MorphTuning`: `shape?: boolean`, `speed?`, `bounce?` (0–1), `contentBlur?` (px), `advanced?` | `shape: false` | `shape` liga a física de mudança de forma (escreve `filter: blur()` no filho durante a transição). |
| `move` | `MoveTuning`: `springiness?`, `wobble?`, `stretch?`, `trail?` (0–1), `advanced?: MoveOptions` | do upstream | Só com `effect="move"`. |
| `melt` | `ImageMeltOptions & { src?: string }` | do upstream | `src` cai para o primeiro `<img>` filho. |
| `bend` | `BendTuning`: `vertical?`, `horizontal?` (0–1), `advanced?` | `0.6` / `0.35` | Publica `--lg-bend-x/-y` (px) e `--lg-bend-xn/-yn` no item. |
| `dissolve` | `boolean \| number \| DissolveOptions` | — | Derrete a imagem do item no vizinho ao encostar. Ignorado com `effect="move"`. |
| `x`, `y`, `scale` | `number` | — | Posição guiada pela lib: elemento e líquido animam juntos. |
| `transition` | `"snappy" \| "smooth" \| "bouncy" \| SpringConfig \| { duration: number; ease?: string }` | `"smooth"` | Para `x`/`y`/`scale`. |
| `delay` | `number` (ms) | — | Escalonamento. |
| `observe` | `boolean` | — | Para peças que **você** anima (CSS, Motion): o líquido segue o retângulo renderizado. Implícito em `morph.shape`, `dissolve` e `effect="move"`. |
| `radius` | `number \| [tl, tr, br, bl]` | medido do filho | Quando o raio medido não serve. |
| `className`, `style`, `children` | | | Em peça com `x`/`y` (sem `observe`), vão para um wrapper `inline-block` que dá para posicionar. Em peça observada (`move`, `bend`, `morph.shape`, `dissolve`, `observe`) vão para um `<span>` com `display: contents`, sem caixa: posicione o **filho**. `effect="melt"` ignora os dois. |

## Composição com a @blips/ui

- **Fundo transparente no conteúdo.** A superfície é o líquido: um `Button`
  da @blips/ui (que tem fundo próprio) cobre o goo e mata o efeito. Use
  `<button>` cru estilizado com Tailwind (`rounded-full`, `size-10`) e ícone
  Phosphor, ou `Button variant="ghost"` com `className="hover:bg-transparent"`.
- **Cor do texto vem do grupo.** Com `tone`, o texto herda o `-foreground`
  certo; não force `text-primary-foreground` à mão (só se passar `fill`).
- **Reserve o espaço.** O grupo deve conter todo o percurso das peças (o
  menu aberto, o chip afastado); peças fora da caixa precisam de
  `filterPadding`.
- **Onde posicionar.** Peça com `x`/`y`: classes no `BlipsLiquid.Item`
  (`className="absolute bottom-0 left-1/2 -ml-5"` empilha em repouso). Evite
  `-translate-x-1/2` aí: a lib escreve `transform` no wrapper ao animar.
  Peça observada (`effect="move"` etc.): o item não tem caixa, então as
  classes de posição vão no filho (`absolute top-0 left-0 …`).
- **Abas com rastro:** `tone="card"` dentro de um trilho `bg-muted`, um item
  `effect="move"` como indicador e os botões por cima. Mantenha `role="tab"`
  e `aria-selected` nos botões; o efeito é só visual.
- Em menus que se abrem, tire as ações fechadas da ordem de foco
  (`tabIndex={aberto ? 0 : -1}`) e dê `aria-label` a botões só com ícone.

## Exemplo v3 que compila

```tsx
"use client";

import { BlipsLiquid } from "@blips/ai/fx/liquid-gooey";
import { ArticleIcon, PlusIcon, TranslateIcon } from "@phosphor-icons/react";
import { useState } from "react";

const acoes = [
  { rotulo: "Resumir", Icone: ArticleIcon, x: -28, y: -44 },
  { rotulo: "Traduzir", Icone: TranslateIcon, x: 28, y: -44 },
];

export function MenuDeAcoesDoPrompt() {
  const [aberto, setAberto] = useState(false);

  return (
    <BlipsLiquid className="relative h-24 w-32">
      {acoes.map(({ rotulo, Icone, x, y }, i) => (
        <BlipsLiquid.Item
          className="absolute bottom-0 left-1/2 -ml-5"
          delay={aberto ? i * 40 : 0}
          key={rotulo}
          transition="bouncy"
          x={aberto ? x : 0}
          y={aberto ? y : 0}
        >
          <button
            aria-label={rotulo}
            className="flex size-10 items-center justify-center rounded-full"
            tabIndex={aberto ? 0 : -1}
            type="button"
          >
            <Icone className="size-4" />
          </button>
        </BlipsLiquid.Item>
      ))}
      <BlipsLiquid.Item className="absolute bottom-0 left-1/2 -ml-5">
        <button
          aria-expanded={aberto}
          aria-label={aberto ? "Fechar ações" : "Abrir ações"}
          className="flex size-10 items-center justify-center rounded-full"
          onClick={() => setAberto((v) => !v)}
          type="button"
        >
          <PlusIcon className="size-4" />
        </button>
      </BlipsLiquid.Item>
    </BlipsLiquid>
  );
}
```

## Armadilhas

- **Peças que deviam se fundir parecem separadas:** a fusão é razão entre
  `blur` e a distância. Com o padrão `5`, gaps de até ~4–6px fundem; aumente
  `blur` ou feche o gap antes de suspeitar de outra coisa.
- **Conteúdo com fundo opaco** cobre o próprio líquido (às vezes é o certo:
  avatar redondo com foto). Para o resto, fundo transparente.
- **Seus próprios `filter`/`mask-image`:** `morph.shape` escreve
  `filter: blur()` no filho durante a transição e `dissolve` escreve
  `mask-image` nos `<img>` em contato; não combine com os seus ali.
- **`dissolve` com `effect="move"`** é ignorado (aviso em dev).
- **`absolute` no item observado não faz nada:** o wrapper é
  `display: contents`. Posicione o filho.
- **Rotação não é espelhada** na silhueta; gire só o conteúdo.
- **`fill` sem cor de texto:** ao passar `fill`, o wrapper deixa de definir
  `color`; garanta contraste você mesmo.
- **Sombra com `var()` nos comprimentos** não é lida: o parser só aceita px
  literais nos números.
- O upstream colapsa as transições de `x`/`y` em saltos com
  `prefers-reduced-motion`; não force animação extra por cima.
