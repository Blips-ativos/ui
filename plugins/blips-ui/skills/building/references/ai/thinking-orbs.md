# Thinking Orbs

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Esfera de partículas animada em `<canvas>` que mostra que o agente está
pensando, com nove animações (trabalhando, buscando, redigindo…). Envolve o
pacote [`thinking-orbs`](https://libraries.dev/orbs) (Jakub Antalik /
libraries.dev, MIT); o `BlipsThinkingOrb` aplica os padrões da marca: tinta
no amarelo `--primary` (#FCBA28) no escuro e em âmbar (`--chart-4`) no
claro, tamanho 20 (escala de texto) e prop `tone` para os tokens.

## Quando usar (e quando não)

- **Use** como indicador "o agente está trabalhando" ao lado de um texto de
  status (`size` 20), ou no lugar do avatar do agente enquanto ele responde
  (`size` 64 ou 32).
- **Use** o `state` para dizer o que está acontecendo: `searching` numa
  busca/RAG, `composing` ao redigir, `working` genérico.
- **Não use** para carregamento de dados comuns: `Spinner`/`Skeleton` da
  @blips/ui.
- **Não use** para destacar um cartão ou campo inteiro: isso é
  `border-beam.md`.
- Para só o texto brilhando ("Pensando…"), basta o `Shimmer`
  (`@blips/ai/components/shimmer`).

## Import

```tsx
import {
  BLIPS_ORB_TONES,
  BLIPS_THINKING_ORB_DEFAULTS,
  BlipsThinkingOrb,
  ThinkingOrb, // original, sem os padrões Blips
  type BlipsOrbTone,
  type BlipsThinkingOrbProps,
} from "@blips/ai/fx/thinking-orbs";
```

Prefira `BlipsThinkingOrb`. O `ThinkingOrb` cru vem com tinta cinza e
tamanho 64.

## Peers exigidos

Nenhum: `thinking-orbs` é dependência da `@blips/ai`. Componente client
(renderiza em canvas; no servidor não pinta nada).

## API

`BlipsThinkingOrb` aceita todas as props do `ThinkingOrb` original mais
`tone`; prop explícita vence o padrão. Não encaminha `ref`.

| Prop | Tipo | Padrão Blips (upstream) | Notas |
|---|---|---|---|
| `tone` | `"primary" \| "chart-1" … "chart-5" \| "neutral"` | `"primary"` | Só no wrapper. `primary`: #FCBA28 no escuro, #a65f00 no claro. `neutral`: tinta cinza do upstream. Ignorado se `color` for passado. |
| `state` | `"working" \| "searching" \| "solving" \| "listening" \| "connecting" \| "weaving" \| "composing" \| "breathing" \| "shaping"` | `"working"` | Cada estado é uma animação própria. |
| `size` | `64 \| 32 \| 20` | `20` (`64`) | 20 = linha de texto; 32 = avatar compacto; 64 = avatar de chat. Não aceita outros valores. |
| `theme` | `"auto" \| "dark" \| "light"` | `"auto"` | `auto` lê `data-theme`/classe `dark` de um ancestral, depois `prefers-color-scheme`. Também escolhe o lado claro/escuro do `tone`. |
| `color` | `string` (`#rgb`, `#rrggbb`, `rgb()`) | — | Tinta livre; vence `tone`. **Não aceita `var()` nem `oklch()`.** |
| `speed` | `number` | `1` | Multiplicador de velocidade. |
| `paused` | `boolean` | `false` | Congela no quadro atual. |
| `dots`, `dotSize` | `number` | `1` | Densidade e tamanho dos pontos. |
| `aria-label` | `string` | rótulo do estado, **em inglês** ("Working…") | O canvas tem `role="img"`. |
| `opts`, `frame`, `gravity` | avançado | — | Ajustes do motor; evite em produto. |
| `style`, demais props de `<canvas>` | | | |

`BLIPS_ORB_TONES` dá os hex de cada tom (`{ dark, light }`) e
`BLIPS_THINKING_ORB_DEFAULTS` os padrões (`state`, `size`, `theme`).

## Composição com a @blips/ui

- Status em linha: dentro do `Marker` da @blips/ui, ao lado de
  `MarkerContent` com o texto (exemplo abaixo). Como o texto já diz o
  estado, passe `aria-hidden` ao orb.
- Avatar do agente respondendo: `size={64}` (ou 32) dentro do
  `MessageAvatar` do `Message` da @blips/ui, trocando pelo `Avatar` quando a
  resposta terminar.
- O `state` vem do app: tool de busca em andamento → `searching`; texto
  chegando → `composing`.

## Exemplo v3 que compila

```tsx
"use client";

import { BlipsThinkingOrb } from "@blips/ai/fx/thinking-orbs";
import { Marker, MarkerContent } from "@blips/ui/components/marker";

export function StatusDoAgente({ fase }: { fase: "buscando" | "redigindo" }) {
  return (
    <Marker>
      {/* O texto ao lado já diz o estado: o orb vira decoração. */}
      <BlipsThinkingOrb
        aria-hidden
        state={fase === "buscando" ? "searching" : "composing"}
      />
      <MarkerContent>
        {fase === "buscando" ? "Buscando na base…" : "Redigindo a resposta…"}
      </MarkerContent>
    </Marker>
  );
}

export function AvatarPensando() {
  return <BlipsThinkingOrb aria-label="Pensando" size={64} tone="chart-3" />;
}
```

## Armadilhas

- **`aria-label` padrão em inglês.** Passe `aria-label` pt-BR, ou
  `aria-hidden` quando houver texto visível ao lado.
- **`color="var(--primary)"` não funciona** (o canvas só entende hex/rgb).
  Use `tone`.
- **`size={24}` não compila**: só 20, 32 e 64.
- **Orb parado depois da resposta.** Desmonte o orb (ou troque pelo avatar)
  quando o processamento terminar; `paused` congela, não esconde.
- O upstream respeita `prefers-reduced-motion` e pausa fora da tela; não
  recrie a animação com CSS.
