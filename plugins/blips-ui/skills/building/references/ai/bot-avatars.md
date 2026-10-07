# Bot Avatars

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Avatar animado de agente: um corpinho (18 formatos) com olhos que piscam,
olham para o ponteiro e mudam de pose conforme o estado — disponível,
trabalhando ou inativo. Envolve o `bot-avatars` (Jakub Antalik /
libraries.dev, MIT), que não está no npm e por isso vem copiado sem
modificação em `src/vendor/bot-avatars` da @blips/ai. O `BlipsBotAvatar`
aplica os padrões da marca: corpo no `--primary` (#FCBA28) na cor exata ou
num tom `--chart-*`, tamanho 32, sombreamento `smooth` e sem pulos ociosos.

## Quando usar (e quando não)

- **Use** como identidade visual de um agente: ao lado das mensagens dele,
  no cabeçalho do chat, num seletor de agentes, num estado vazio
  ("Pergunte ao Salvador"). Amarre `state` ao status do agente.
- **Não use** como avatar de pessoa: para usuários, use `Avatar` da
  @blips/ui (foto/iniciais).
- **Não use** um avatar animado por mensagem numa lista longa: mostre o
  avatar só no início de cada bloco de mensagens do agente, ou no cabeçalho.
- Para um indicador pequeno de "pensando" ao lado de texto, use
  `thinking-orbs.md`; para destacar um cartão em processamento, use
  `border-beam.md`.

## Import

```tsx
import {
  BLIPS_BOT_AVATAR_DEFAULTS,
  BLIPS_BOT_TONES,
  BlipsBotAvatar,
  BotAvatar, // original, sem os padrões Blips
  botAvatarTypes,
  type BlipsBotAvatarProps,
  type BlipsBotTone,
  type BotAvatarState,
  type BotAvatarType,
} from "@blips/ai/fx/bot-avatars";
```

Prefira sempre `BlipsBotAvatar`. O `BotAvatar` cru sai em 64px, com a
pelúcia `fabric` (que assa o material e aparece com atraso de até 4s) e a
cor própria de cada tipo, fora da marca.

## Peers exigidos

Nenhum: o código vem copiado dentro da @blips/ai. Componente client
(`"use client"` no arquivo da lib); no SSR sai o `<canvas>` vazio já no
tamanho certo e o desenho começa no cliente.

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

`BlipsBotAvatar` aceita todas as props do `BotAvatar` original (e as do
`<canvas>`, exceto `color`) mais `tone`; qualquer prop explícita vence o
padrão Blips. Encaminha `ref` para o `<canvas>`.

| Prop | Tipo | Padrão Blips (upstream) | Notas |
|---|---|---|---|
| `tone` | `"primary" \| "chart-1" \| "chart-2" \| "chart-3" \| "chart-4" \| "chart-5" \| "neutral"` | `"primary"` | Só da Blips. `neutral` = cor própria do tipo. Ignorado se `color` vier. |
| `type` | `BotAvatarType` | `"clover"` | 18 corpos: `clover`, `flower`, `triangle`, `square`, `blob`, `ghost`, `circle`, `drop`, `star`, `droid`, `mech`, `alien`, `hexagon`, `cat`, `cloud`, `pill`, `pebble`, `puddle`. |
| `state` | `"default" \| "working" \| "sleeping"` | `"default"` | `working` pula e gira; `sleeping` cochila. |
| `face` | `"eyes" \| "mouth"` | a do tipo (`eyes`) | `mouth` acrescenta uma boca que muda com o estado. |
| `size` | `number \| string` | `32` (`64`) | px ou medida CSS. O canvas transborda a caixa (margens negativas) para ter espaço de pular; o layout ocupa `size`. |
| `color` | `string` (`#rgb`, `#rrggbb`, `rgb()`) | do `tone` | Não aceita `var()` nem `oklch()`. |
| `ink` | `string` | automática | Cor do rosto: escura, ou clara em corpo escuro. |
| `brightness` | `number` 0,5–1,5 | `1` com `tone` (`1` ou a do tipo) | |
| `saturation` | `number` 0,5–2,5 | `1` com `tone` (`1.5` ou a do tipo) | Com `tone`, fica em `1` para sair o hex exato do token. |
| `shading` | `"smooth" \| "crisp" \| "flat" \| "plastic" \| "fabric" \| boolean` | `"smooth"` (`"fabric"`) | `plastic`/`fabric` assam material: só em tamanho grande. `true`/`false` = `crisp`/`flat`. |
| `jumpEvery` | `number` (s) | `0` (`8`) | Pulo ocioso; `0` desliga. Não afeta o `working`. |
| `hat` | `"none" \| "beret" \| "beanie" \| "party" \| "crown"` | `"none"` | |
| `glasses` | `"none" \| "round" \| "square" \| "shades"` | `"none"` | |
| `headphones`, `bowTie` | `boolean` | `false` | |
| `accessoryColor` | `string` | `"#27272b"` | Chapéu, fone e gravata. |
| `interactive` | `boolean` | `true` | Olhos/cabeça seguem o ponteiro; clique faz pular. |
| `speed` | `number` | `1` | Multiplica todas as animações. |
| `paused` | `boolean` | `false` | Congela no quadro atual. |
| `seed` | `number` 0–1 | derivado do `useId` | Dessincroniza piscadas numa fileira. |
| `theme` | `"auto" \| "dark" \| "light"` | `"auto"` | `auto` lê `data-theme`/`.dark`/`.light` do ancestral (o `<html>` da @blips/ui) e cai para `prefers-color-scheme`. Só muda a cor do `whirl`. |
| `path` | `string` | contorno do tipo | SVG path na caixa 100×100, centrado em (50, 50). |
| `pose` | `{ yaw?: number; pitch?: number; roll?: number }` | — | Fixa a orientação (radianos), em geral com `paused`. |
| `turn`, `whirl`, `whirlSize`, `whirlWidth`, `whirlLength`, `whirlTilt` | `number` | upstream | Giro da cabeça e rastro do giro (`whirl` desligado). |
| `light`, `rim`, `spread`, `shadow`, `highlight`, `depth`, `roundness` | `number` | upstream | Ajuste fino de luz e volume; evite. |
| `furLength`, `furDensity`, `furFuzz`, `furClumps`, `furCurl`, `furGravity`, `shine`, `sheen`, `backLight`, `lightFront`, `backSoftness` | `number` | upstream | Só com `shading="fabric"`. |
| `jumpHeight`, `jumpTime`, `jumpStretch`, `jumpSpin`, `jumpLean`, `jumpLand`, `jumpSquash`, `jumpSquashTime`, `jumpSquashEase`, `jumpGroundTime`, `jumpGroundEase`, `jumpRiseTime`, `jumpRiseEase`, `jumpClickSquashTime` | `number` / `BotAvatarSquashEase` | upstream | Física do pulo. |
| `aria-label`, `className`, `style`, `onClick`, demais props de `<canvas>` | | | `role="img"` fixo. |

`BLIPS_BOT_AVATAR_DEFAULTS` exporta `size`, `shading` e `jumpEvery`;
`BLIPS_BOT_TONES` exporta o hex de cada tom. Também são exportados
`botAvatarTypes`, `botAvatarPresets`, `botAvatarPalette`, `botAvatarFaces`
e `botAvatarStates`.

## Composição com a @blips/ui

- Ao lado da mensagem do agente: avatar no tamanho padrão (32) à esquerda da
  `Message` da @blips/ui com `MessageResponse` da @blips/ai, alinhado ao
  topo (`items-start`). Mensagem do usuário usa `Avatar` da @blips/ui, não
  este.
- Estado vindo do chat: `state={status === "streaming" || status ===
  "submitted" ? "working" : "default"}` (AI SDK) ou enquanto o run do
  AgentOS estiver aberto; `sleeping` para agente desligado/fora do horário.
- Vários agentes: fixe `tone` e `type` por agente (num mapa no app) para
  cada um ter identidade estável; `primary` fica para o agente principal.
- Em `Card` de seletor de agente ou estado vazio, suba para `size={64}`.

## Exemplo v3 que compila

```tsx
"use client";

import type { BlipsBotTone, BotAvatarType } from "@blips/ai/fx/bot-avatars";
import { BlipsBotAvatar } from "@blips/ai/fx/bot-avatars";

const agentes: Record<string, { tone: BlipsBotTone; type: BotAvatarType }> = {
  salvador: { tone: "primary", type: "clover" },
  aurora: { tone: "chart-3", type: "star" },
};

export function CabecalhoDoAgente({
  agente,
  nome,
  respondendo,
}: {
  agente: keyof typeof agentes;
  nome: string;
  respondendo: boolean;
}) {
  const { tone, type } = agentes[agente] ?? agentes.salvador;
  return (
    <div className="flex items-center gap-3">
      <BlipsBotAvatar
        aria-label={nome}
        state={respondendo ? "working" : "default"}
        tone={tone}
        type={type}
      />
      <div>
        <p className="font-medium text-sm">{nome}</p>
        <p className="text-muted-foreground text-xs">
          {respondendo ? "Respondendo…" : "Disponível"}
        </p>
      </div>
    </div>
  );
}
```

## Armadilhas
- **Rótulo de acessibilidade:** o `BlipsBotAvatar` troca o rótulo em inglês do upstream ("Clover bot, idle") por `Avatar do assistente, <estado>` em pt-BR. Passe `aria-label` para trocar, ou `aria-hidden` quando o avatar for só decorativo.

- **Sem `aria-label`** o canvas recebe o rótulo do pacote, em inglês
  (`Clover bot, idle`). Passe o nome do agente.
- **`fabric`/`plastic` em lista**: cada avatar espera o material assar (até
  4s, com fade) antes de aparecer. Use em tamanho grande e poucos por tela.
- **`color` com token CSS** (`var(--primary)`, `oklch(...)`) não funciona:
  use `tone`, ou um hex.
- **`color` explícito** volta a passar pelo realce de saturação do upstream
  (`saturation` 1.5): passe `saturation={1}` se quiser o hex exato.
- **Não edite `src/vendor/bot-avatars`**: é cópia idêntica do upstream;
  ajustes Blips vão no wrapper (`src/fx/bot-avatars.tsx`).
- O componente respeita `prefers-reduced-motion` (fica parado na pose do
  estado) e só anima enquanto visível; não force animação por cima.
