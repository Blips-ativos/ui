# Audio Player

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/audio-player`

Player de áudio compacto montado com o **media-chrome** (custom elements de
mídia) e os botões da @blips/ui: play, voltar/avançar N segundos, tempo,
barra de progresso, duração, mudo e volume, numa `ButtonGroup`. Toca a fala
gerada pelo modelo (`experimental_generateSpeech` do AI SDK) ou qualquer URL
de áudio. As variáveis `--media-*` já apontam para os tokens da @blips/ui
(`primary`, `secondary`, `accent`, `foreground`, `background`, `radius`,
`font-sans`), então segue o tema claro/escuro sem CSS extra.

## Quando usar (e quando não)

- **Use** para tocar a resposta falada de um agente, um áudio recebido num
  canal (nota de voz do WhatsApp, gravação de atendimento) ou a prévia de uma
  síntese, dentro de uma mensagem ou card.
- **Não use** para vídeo: o `AudioPlayer` liga `audio` no `MediaController`;
  para vídeo use o `media-chrome` direto ou `<video controls>`.
- **Não use** para um efeito sonoro curto sem controle (notificação): `new
  Audio(url).play()` basta.
- Transcrição sincronizada com o áudio: some com `Transcription`
  (`transcription.md`).

## Peers exigidos

`media-chrome` (^4). O import é estático (`media-chrome/react` e
`media-chrome/lang/pt`): importar este subpath **sem** o pacote instalado
quebra o build.

```bash
pnpm add @blips/ai media-chrome
pnpm add -D ai
```

`ai` é peer opcional e só de tipos: o arquivo faz
`import type { Experimental_SpeechResult } from "ai"` para tipar a prop
`data`. Como a @blips/ai publica o fonte `.tsx`, num projeto TypeScript o
compilador do app precisa resolver esse tipo: instale como **devDependency**.
Sem ele, o `tsc` acusa `Cannot find module 'ai'` dentro de
`@blips/ai/src/components/audio-player.tsx`.

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. O media-chrome não tem folha própria.

## API

Exports: os componentes abaixo e um tipo `*Props` para cada um.

| Export | Props | Notas |
|---|---|---|
| `AudioPlayer` | Props do `MediaController` (media-chrome) sem `audio` | Raiz (`data-slot="audio-player"`). `lang` padrão `"pt-BR"`: rótulos e dicas dos controles em português. `style` é mesclado **depois** das variáveis `--media-*`, então dá para sobrescrever uma por uma. |
| `AudioPlayerElement` | `ComponentProps<"audio">` sem `src` + **ou** `data: SpeechResult["audio"]` **ou** `src: string` | O `<audio slot="media">`. Com `data`, monta `data:${mediaType};base64,${base64}`; se vierem os dois, `src` vence. Aceita `ref`, `onTimeUpdate`, `onEnded`, `preload` etc. |
| `AudioPlayerControlBar` | Props do `MediaControlBar` | Envolve os `children` numa `ButtonGroup orientation="horizontal"` da @blips/ui. |
| `AudioPlayerPlayButton` | Props do `MediaPlayButton` | O próprio `MediaPlayButton` com as classes de `buttonVariants({ variant: "outline", size: "icon-sm" })` da @blips/ui (visual de `Button`, sem o componente `Button`). |
| `AudioPlayerSeekBackwardButton` | Props do `MediaSeekBackwardButton` | `seekOffset` padrão `10` (segundos). Mesmas classes de `buttonVariants`. |
| `AudioPlayerSeekForwardButton` | Props do `MediaSeekForwardButton` | `seekOffset` padrão `10`. |
| `AudioPlayerTimeDisplay` | Props do `MediaTimeDisplay` | Tempo atual, `tabular-nums`, num `ButtonGroupText`. |
| `AudioPlayerTimeRange` | Props do `MediaTimeRange` | Barra de progresso clicável, num `ButtonGroupText`. |
| `AudioPlayerDurationDisplay` | Props do `MediaDurationDisplay` | Duração total, `tabular-nums`. |
| `AudioPlayerMuteButton` | Props do `MediaMuteButton` | Num `ButtonGroupText` (não é `Button`). |
| `AudioPlayerVolumeRange` | Props do `MediaVolumeRange` | Num `ButtonGroupText`. |

Escolha só os controles que fazem sentido: nenhum é obrigatório além do
`AudioPlayerElement`.

## Composição com a @blips/ui

- Resposta falada do agente: o player vai dentro do `MessageContent`
  (`message.md`), abaixo do `MessageResponse` com o texto. Quem usa o `MessageResponse` instala os peers do Streamdown e, no CSS
  global, importa `streamdown/styles.css` e `katex/dist/katex.min.css` e
  declara `@source` do `dist` do `streamdown` e dos plugins `@streamdown/*`
  (setup em `message.md`).
- Nota de voz do usuário: dentro de um `Bubble` da @blips/ui (`../bubble.md`),
  só com play, barra e duração.
- Os botões já têm o visual de `Button` (`buttonVariants`) dentro de um
  `ButtonGroup` da @blips/ui: não envolva o player
  em outro `ButtonGroup`, e não recrie os controles com `<button>` +
  `audio.play()`.

## Exemplo v3

```tsx
"use client";

import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerDurationDisplay,
  AudioPlayerElement,
  AudioPlayerMuteButton,
  AudioPlayerPlayButton,
  AudioPlayerSeekBackwardButton,
  AudioPlayerSeekForwardButton,
  AudioPlayerTimeDisplay,
  AudioPlayerTimeRange,
} from "@blips/ai/components/audio-player";
import {
  Message,
  MessageContent,
  MessageResponse,
  messageAlign,
} from "@blips/ai/components/message";

// O servidor devolve só o necessário do `generateSpeech`: base64 + mediaType.
interface FalaDoAgente {
  texto: string;
  audioBase64: string;
  mediaType: string;
}

export function RespostaFalada({ fala }: { fala: FalaDoAgente }) {
  return (
    <Message align={messageAlign("assistant")}>
      <MessageContent>
        <MessageResponse>{fala.texto}</MessageResponse>
        <AudioPlayer>
          <AudioPlayerElement
            preload="metadata"
            src={`data:${fala.mediaType};base64,${fala.audioBase64}`}
          />
          <AudioPlayerControlBar>
            <AudioPlayerPlayButton />
            <AudioPlayerSeekBackwardButton seekOffset={5} />
            <AudioPlayerSeekForwardButton seekOffset={5} />
            <AudioPlayerTimeDisplay />
            <AudioPlayerTimeRange />
            <AudioPlayerDurationDisplay />
            <AudioPlayerMuteButton />
          </AudioPlayerControlBar>
        </AudioPlayer>
      </MessageContent>
    </Message>
  );
}
```

O exemplo também usa `MessageResponse`, que exige os peers do Streamdown
(`streamdown`, `@streamdown/{code,math,mermaid,cjk}`) e o CSS dele no CSS
global: `@import "streamdown/styles.css";`, `@import "katex/dist/katex.min.css";`
e `@source` do `dist` do `streamdown` e de cada plugin (`message.md`). Quando o objeto inteiro do `generateSpeech` está no mesmo
processo (ex.: Server Component que renderiza um Client Component com o
objeto já montado), `data={resultado.audio}` funciona direto.

## Armadilhas

- **`data` exige o objeto completo do AI SDK** (`base64`, `uint8Array`,
  `mediaType`, `format`). Depois de passar por JSON o `uint8Array` não existe
  mais e o tipo não fecha: monte a data URL você mesmo e use `src`, como no
  exemplo. Não force com `as`.
- **Data URL pesa.** Base64 é ~33% maior que o binário e fica inteiro na
  memória e no HTML. Para áudio longo (gravação de atendimento), sirva por
  URL (S3/CloudFront com URL assinada) e passe em `src`.
- **Idioma é global.** O dicionário pt do media-chrome é registrado no import
  e o idioma vale para a página inteira: dois players com `lang` diferentes na
  mesma página não convivem.
- **Arquivo cliente.** O módulo tem `"use client"` e o media-chrome registra
  custom elements; não tente ler o estado do player num Server Component. Para
  reagir ao áudio (tempo, fim), use `onTimeUpdate`/`onEnded` no
  `AudioPlayerElement`.
- Os botões do media-chrome são custom elements que **já** fazem papel de
  botão (`role="button"`, `tabindex`, Enter/Espaço). Por isso o componente só
  aplica `buttonVariants(...)` neles, sem o `Button` da @blips/ui: com
  `Button nativeButton={false} render={<Media*Button />}` o Base UI também
  dispararia o clique pelo teclado e Enter/Espaço alternariam duas vezes (play
  e pause no mesmo toque). Num controle próprio com outro `Media*Button`, faça
  igual: `className={buttonVariants({ variant: "outline", size: "icon-sm" })}`
  (`import { buttonVariants } from "@blips/ui/components/button"`).
- `AudioPlayerMuteButton` e `AudioPlayerVolumeRange` ficam em
  `ButtonGroupText`, não em `Button`: `variant`/`size` não se aplicam a eles.
- Controle de volume em celular não tem efeito (o iOS ignora `volume`): em
  layout mobile, deixe só o `AudioPlayerMuteButton` e não renderize o
  `AudioPlayerVolumeRange`.
