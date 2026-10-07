# Transcription

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/transcription`

Texto de uma transcrição com tempo, segmento a segmento, sincronizado com a
reprodução: o trecho que está tocando fica em `text-primary`, os que já
passaram em `text-muted-foreground` e os que ainda vão tocar em
`text-muted-foreground/60`. Cada segmento é um `<button>`: com `onSeek`,
clicar pula o áudio para o início dele (estilo "karaokê" de ligação, áudio de
WhatsApp, reunião gravada).

Os segmentos têm o formato de `TranscriptionResult["segments"]` do AI SDK
(`experimental_transcribe`): `{ text, startSecond, endSecond }`.

## Quando usar (e quando não)

- **Use** para mostrar a transcrição de um áudio que o usuário pode ouvir
  junto (atendimento gravado, áudio recebido no WhatsApp, nota de voz),
  normalmente ao lado de um `AudioPlayer` (`audio-player.md`).
- **Não use** para texto transcrito sem tempo (só a string): isso é
  `MessageResponse` (`message.md`) ou um parágrafo comum. Quem usa o `MessageResponse` instala os peers do Streamdown e, no CSS
  global, importa `streamdown/styles.css` e `katex/dist/katex.min.css` e
  declara `@source` do `dist` do `streamdown` e dos plugins `@streamdown/*`
  (setup em `message.md`).
- **Não use** para captar a fala do usuário: isso é `SpeechInput`
  (`speech-input.md`).
- **Não use** para legenda de vídeo: use `<track kind="captions">` no
  `<video>`.

## Peers exigidos

Nenhum de runtime. O arquivo faz `import type { Experimental_TranscriptionResult }
from "ai"` para tipar os segmentos.

```bash
pnpm add @blips/ai
pnpm add -D ai
```

`ai` é peer opcional e só de tipos. Como a @blips/ai publica o fonte `.tsx`,
num projeto TypeScript o compilador do app precisa resolver esse tipo:
instale como **devDependency**. Sem ele, o `tsc` acusa `Cannot find module 'ai'`
dentro de `@blips/ai/src/components/transcription.tsx`.

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`.

## API

Exports: `Transcription`, `TranscriptionSegment` e os tipos
`TranscriptionProps` e `TranscriptionSegmentProps`.

| Export | Props | Notas |
|---|---|---|
| `Transcription` | `ComponentProps<"div">` sem `children` + `segments`, `currentTime?`, `onSeek?`, `children` | Contêiner `flex flex-wrap gap-1 text-sm leading-relaxed` (`data-slot="transcription"`). |
| ↳ `segments` | `TranscriptionResult["segments"]` (`{ text: string; startSecond: number; endSecond: number }[]`) | Segmentos com `text` vazio ou só espaços são **descartados** antes de renderizar. |
| ↳ `currentTime` | `number` (segundos) | Tempo atual da reprodução. Na prática, sempre controlado (ver Armadilhas). |
| ↳ `onSeek` | `(time: number) => void` | Chamado com `segment.startSecond` ao clicar num segmento. Sem ele, os segmentos ficam com `cursor-default` e o clique não faz nada. |
| ↳ `children` | `(segment, index) => ReactNode` | **Render function**, obrigatória. Normalmente devolve um `TranscriptionSegment`. |
| `TranscriptionSegment` | `ComponentProps<"button">` + `segment`, `index` | `<button type="button">` com o `segment.text`. `data-active` (tocando agora: `startSecond <= currentTime < endSecond`), `data-index`, `data-slot="transcription-segment"`. Seu `onClick` roda depois do `onSeek`. Só funciona dentro de `Transcription` (lança fora). |

## Composição com a @blips/ui

- Com o `AudioPlayer` da @blips/ai: o `<audio>` do `AudioPlayerElement` aceita
  `ref` e `onTimeUpdate`; o tempo vai para o estado do app, e o `onSeek`
  escreve em `audio.currentTime`. Exemplo abaixo.
- Moldura: `Card` da @blips/ui (`CardHeader` com o player, `CardContent` com a
  transcrição) ou dentro do `MessageContent` (`message.md`) quando o áudio é
  parte de uma conversa.
- Transcrição longa: envolva num `ScrollArea` da @blips/ui com altura fixa.

## Exemplo v3

```tsx
"use client";

import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerDurationDisplay,
  AudioPlayerElement,
  AudioPlayerPlayButton,
  AudioPlayerTimeDisplay,
  AudioPlayerTimeRange,
} from "@blips/ai/components/audio-player";
import {
  Transcription,
  TranscriptionSegment,
} from "@blips/ai/components/transcription";
import { Card, CardContent, CardHeader } from "@blips/ui/components/card";
import type { Experimental_TranscriptionResult as TranscriptionResult } from "ai";
import { useRef, useState } from "react";

export function AudioDoCliente({
  url,
  segmentos,
}: {
  url: string;
  segmentos: TranscriptionResult["segments"];
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tempo, setTempo] = useState(0);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <AudioPlayer>
          <AudioPlayerElement
            onTimeUpdate={(evento) =>
              setTempo(evento.currentTarget.currentTime)
            }
            ref={audioRef}
            src={url}
          />
          <AudioPlayerControlBar>
            <AudioPlayerPlayButton />
            <AudioPlayerTimeDisplay />
            <AudioPlayerTimeRange />
            <AudioPlayerDurationDisplay />
          </AudioPlayerControlBar>
        </AudioPlayer>
      </CardHeader>
      <CardContent>
        <Transcription
          currentTime={tempo}
          onSeek={(segundos) => {
            if (audioRef.current) {
              audioRef.current.currentTime = segundos;
            }
            setTempo(segundos);
          }}
          segments={segmentos}
        >
          {(segmento, indice) => (
            <TranscriptionSegment
              index={indice}
              key={`${segmento.startSecond}-${indice}`}
              segment={segmento}
            />
          )}
        </Transcription>
      </CardContent>
    </Card>
  );
}
```

O exemplo usa o `AudioPlayer`, que exige o peer `media-chrome`
(`audio-player.md`). Com um `<audio controls>` nativo funciona igual.

## Armadilhas

- **Controle o `currentTime`.** No modo não controlado o tempo interno começa
  em 0 e nada o avança: clicar num segmento chama `onSeek`, mas **não** move o
  destaque. Passe sempre `currentTime` vindo do áudio (`onTimeUpdate`).
- **`children` é função**, não JSX: `<Transcription>{(s, i) => …}</Transcription>`.
  Passar elementos direto não compila.
- **`key` é sua.** A render function não põe `key`; dê uma estável
  (`startSecond` + índice), senão o React avisa no console.
- **O `index` é da lista filtrada.** Segmentos vazios saem antes do `map`, então
  `index` pode não bater com a posição em `segments`. Não use `index` para
  acessar o array original; use o próprio `segment`.
- O `timeupdate` do `<audio>` dispara ~4 vezes por segundo: o destaque anda em
  saltos de até 250 ms. Para algo mais fino, atualize o tempo com
  `requestAnimationFrame` enquanto toca.
- Segmentos são `<button>`: não aninhe dentro de outro botão ou link (ex.:
  `AttachmentTrigger`, `CardAction` clicável).
- O pacote é apresentacional: quem chama `experimental_transcribe` (ou o
  serviço de transcrição via LiteLLM) é o servidor do app; o componente só
  recebe os segmentos.
