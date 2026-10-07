# Voice Glow

> **Só existe na @blips/ai (v3.x da @blips/ui).** Em repo com `@blips/ui` 2.x
> não há `@blips/ai`: proponha a migração para a v3 (`../v2-vs-v3.md`).

Brilho colorido que nasce no centro da borda inferior de um elemento e sobe e
se abre com o volume de uma voz — o "estou ouvindo" de uma interface de voz.
Envolve o pacote `voice-glow` (Jakub Antalik / libraries.dev, MIT, v0.3.0),
que não está no npm: o código vem copiado sem modificação em
`packages/ai/src/vendor/voice-glow`. O `BlipsVoiceBeam` aplica os padrões da
marca: lóbulos e faixa de luz no amarelo `#FCBA28` e nos `--chart-*` (mais
escuros no tema claro), variação de matiz curta, halo mais curto (densidade
mira) e tema lido da @blips/ui.

## Quando usar (e quando não)

- **Use** no campo do chat ou numa pílula de gravação enquanto o microfone
  estiver aberto (`stream`), ou enquanto o agente fala, alimentando `level`
  com o nível do áudio de resposta.
- **Use** `type="mobile"` na base de uma tela cheia de conversa por voz.
- **Não use** como indicador de "pensando" ou de processamento sem áudio:
  use `thinking-orbs.md` (texto) ou `border-beam.md` (cartão/campo).
- **Não use** como decoração permanente nem em vários elementos ao mesmo
  tempo; amarre `active` ao estado de áudio.
- Para escolher o microfone, use `mic-selector.md`; para tocar áudio,
  `audio-player.md`. O Voice Glow só desenha.

## Import

```tsx
import {
  BLIPS_VOICE_GLOW_BAND_COLORS,
  BLIPS_VOICE_GLOW_COLORS,
  BLIPS_VOICE_GLOW_DEFAULTS,
  BlipsVoiceBeam,
  useBlipsMicrophone,
  VoiceBeam, // original, sem os padrões Blips
  useMicrophone, // original, NÃO seguro para SSR
  type BlipsVoiceBeamProps,
  type VoiceBeamType,
} from "@blips/ai/fx/voice-glow";
```

Prefira sempre `BlipsVoiceBeam` e `useBlipsMicrophone`. O `VoiceBeam` cru vem
com a paleta `colorful` (estilo Siri) e tema `dark` fixo, fora da marca.

## Peers exigidos

Nenhum: o código está dentro da `@blips/ai`. Componente client
(`"use client"` no arquivo da lib). Usa Web Audio e `getUserMedia` só em
efeitos, então renderiza no servidor (sai o contêiner com o filho; o brilho
liga no cliente).

O componente não importa `ai`: não é preciso instalá-lo.

## API

`BlipsVoiceBeam` aceita todas as props do `VoiceBeam` original; qualquer prop
explícita vence o padrão Blips. Encaminha `ref` para a `<div>` raiz.

| Prop | Tipo | Padrão Blips (upstream) | Notas |
|---|---|---|---|
| `children` | `ReactNode` | **obrigatório** | Um único elemento; o raio é lido do 1º filho. |
| `stream` | `MediaStream \| null` | `null` | Áudio a analisar (nível + graves/médios/agudos). Quando presente, `level` é ignorado. |
| `level` | `number \| (() => number)` 0–1 | `0` | Nível manual. Função é lida a cada quadro **sem re-render** — use-a para qualquer coisa que mude rápido. |
| `active` | `boolean` | `true` | Desligar faz fade-out e para a análise de áudio. |
| `paused` | `boolean` | `false` | Congela o quadro sem apagar. |
| `type` | `"default" \| "pill" \| "mobile"` | `"default"` | `default`: campo do chat (~350 px); `pill`: pílula ~150×44 (`scale` vira `0.45`); `mobile`: base de tela de celular. |
| `theme` | `"dark" \| "light" \| "auto"` | tema da @blips/ui (`dark`) | Sem a prop, lê `data-theme`/classe `.dark` no `<html>` ao vivo; no servidor, `light`. |
| `colors` | `string[]` (até 7; `#rgb`, `#rrggbb`, `rgb()`) | `BLIPS_VOICE_GLOW_COLORS[tema]` | Centro primeiro, depois os pares para fora. Não aceita `var()` nem `oklch()`. |
| `bandColors` | `{ core?, above?, mid?, below? }` | `BLIPS_VOICE_GLOW_BAND_COLORS[tema]` (núcleo branco + franjas RGB) | A faixa de luz sobre o brilho. |
| `colorVariant` | `"colorful" \| "mono" \| "ocean" \| "sunset" \| "forest" \| "candy" \| "ice" \| "gold"` | `"gold"` (`colorful`) | Base dos slots de `colors` que faltarem. Passar `colorVariant` desliga as cores Blips. |
| `hueRange` | `number` (graus) | `12` (`24` escuro / `40` claro) | Faixa da deriva de matiz. |
| `glowSize` | `number` | `0.85` (`1`) | Multiplica o raio do halo. |
| `staticColors` | `boolean` | `false` | Desliga a deriva de matiz. |
| `scale` | `number` | `1` (`0.45` em `pill`) | Tamanho do efeito inteiro. |
| `sensitivity` | `number` | `3.1` | Ganho de entrada; suba para fontes baixas. |
| `threshold` | `number` 0–1 | `0.015` | Portão de ruído. |
| `attack`, `release` | `number` (s) | `0.325`, `0.86` | Subida e queda do brilho. |
| `idle` | `number` 0–1 | `0.23` | Respiração em silêncio; `0` some entre falas. |
| `bands` | `boolean` | `true` | Graves/médios/agudos movem lóbulos diferentes. |
| `flow` | `number` (px/s) | `48` | Deslizamento lateral das cores com a voz; `0` fixa. |
| `strength` | `number` 0–1 | `1` escuro / `0.8` claro | Opacidade do efeito (não afeta o filho). |
| `borderRadius` | `number` (px) | detecta do 1º filho | Passe quando a detecção errar. |
| `css` | `string` | — | CSS extra; `{id}` vira o id da instância. |
| `onLevel` | `(level: number) => void` | — | Nível suavizado a cada quadro; não faça `setState` nele. |
| `onActivate`, `onDeactivate` | `() => void` | — | Fim do fade-in / fade-out. |
| `className`, `style`, demais props de `<div>` | | | Vão para o contêiner. |

Há ainda dezenas de props de ajuste fino da forma (`reach`, `spread`, `bend`,
`band*`, `distortion*`, `glow*`, `range*`, `core*`, `*Opacity`, `*Scale`,
`motion`) — ver `VoiceBeamProps`. As de superfície (`look="dots"`/`"lines"`,
`dot*`, `line*`, `surface*`, `texture`, `gravity`) **não foram lançadas**:
nesta build `look` é sempre `glow` (`VOICE_SURFACE_LOOKS === false`).

`useBlipsMicrophone(options?)` tem o mesmo contrato do `useMicrophone`:
opções `constraints` (`MediaTrackConstraints`; o padrão desliga eco, ruído e
ganho automático) e `autoStart`; retorno `{ stream, state, error, supported,
start, stop }`, com `state` em `"idle" | "requesting" | "live" | "denied" |
"unsupported" | "error"`. Até montar no cliente devolve `supported: false` e
`state: "idle"`, igual no servidor e na hidratação.

## Composição com a @blips/ui

- Envolva o `InputGroup` do prompt (ou o `PromptInput` da @blips/ai); dê ao
  wrapper o mesmo arredondamento (`className="rounded-md"`).
- O botão de microfone vai num `InputGroupAddon align="block-end"` com
  `InputGroupButton size="icon-xs"` e ícones Phosphor `MicrophoneIcon` /
  `MicrophoneSlashIcon`; desabilite com `!mic.supported`.
- Para a voz do agente, ligue `level` a um getter que lê o analisador do
  `<audio>` de resposta; `active` enquanto toca.
- Mostre `mic.state === "denied"` com texto `text-destructive`, não com toast.

## Exemplo v3 que compila

```tsx
"use client";

import { BlipsVoiceBeam, useBlipsMicrophone } from "@blips/ai/fx/voice-glow";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@blips/ui/components/input-group";
import { MicrophoneIcon, MicrophoneSlashIcon } from "@phosphor-icons/react";

export function PromptComVoz() {
  const mic = useBlipsMicrophone();
  const gravando = mic.state === "live";

  return (
    <BlipsVoiceBeam active={gravando} className="rounded-md" stream={mic.stream}>
      <InputGroup>
        <InputGroupTextarea placeholder={gravando ? "Ouvindo…" : "Pergunte ao agente"} />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            aria-label={gravando ? "Parar microfone" : "Usar microfone"}
            disabled={!mic.supported}
            onClick={() => (gravando ? mic.stop() : mic.start())}
            size="icon-xs"
          >
            {gravando ? <MicrophoneSlashIcon /> : <MicrophoneIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </BlipsVoiceBeam>
  );
}
```

## Armadilhas

- **`useMicrophone` original em app com SSR** lê `navigator` no primeiro
  render: servidor e cliente divergem na hidratação. Use `useBlipsMicrophone`.
- **`start()` fora de um clique**: o Safari bloqueia o áudio. Sempre a partir
  de um gesto do usuário (ou `autoStart` só onde já houve gesto).
- **`level` como estado React a 60 fps** re-renderiza a árvore a cada quadro.
  Passe um getter (`level={() => medidor.current}`).
- **`colorVariant` "só para testar"** desliga as cores Blips (elas só entram
  sem `colors` e sem `colorVariant`). Fique nos padrões.
- **`theme="auto"` explícito** volta ao comportamento do upstream (só
  `prefers-color-scheme`) e o primeiro render no cliente pode divergir do
  servidor. Omita a prop.
- **Cores em `var()`/`oklch()`** em `colors`/`bandColors` são ignoradas em
  silêncio (o slot volta à paleta). Use hex.
- **Sempre ligado.** Sem `active`, o brilho respira para sempre (`idle`).
  Amarre ao microfone aberto ou ao áudio tocando.
- **Safari**: o original desliga a distorção em hospedeiros grandes e troca o
  desfoque do canvas por CSS; a aparência difere um pouco do Chrome. Não
  compense com props.
- **Não edite `src/vendor/voice-glow`**: para atualizar, troque a pasta
  inteira pelo upstream. O wrapper define a constante de build
  `__VOICE_SURFACE__` (`false`) antes de carregar a cópia.
