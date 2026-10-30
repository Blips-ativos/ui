# Speech Input

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/speech-input`

Botão de ditado redondo: transforma fala em texto e entrega cada trecho
reconhecido em `onTranscriptionChange`. Escolhe o modo sozinho, depois da
montagem:

1. **Web Speech API** (`SpeechRecognition`/`webkitSpeechRecognition`, Chrome e
   Edge): reconhecimento no próprio navegador, contínuo, idioma em `lang`
   (padrão `"pt-BR"`).
2. **MediaRecorder** (Firefox, Safari): grava um `Blob` `audio/webm`, chama
   `onAudioRecorded(blob)` e espera o texto que **você** devolve (transcrição
   no servidor, ex.: `experimental_transcribe` do AI SDK ou Whisper via
   LiteLLM).
3. **Nenhum**: o botão fica desabilitado.

Enquanto grava, três anéis pulsam em `border-destructive/30` e o botão fica
vermelho com `StopIcon`; enquanto `onAudioRecorded` não resolve, mostra um
`Spinner`.

## Quando usar (e quando não)

- **Use** como atalho de ditado dentro da caixa de mensagem (`PromptInput`,
  `prompt-input.md`), ou em qualquer campo onde falar é mais rápido que
  digitar.
- **Não use** para conversa por voz em tempo real (agente que ouve e responde
  falando): isso é um pipeline de áudio (WebRTC/Realtime) que o app monta; a
  @blips/ai só dá a parte visual (`Persona`, `persona.md`, e `AudioPlayer`,
  `audio-player.md`).
- **Não use** para mostrar uma transcrição com tempo: isso é `Transcription`
  (`transcription.md`).
- Para escolher o microfone antes de gravar, `MicSelector` (`mic-selector.md`).

## Peers exigidos

Nenhum. O componente não importa `ai` nem pacote de terceiros além da
@blips/ui e dos ícones Phosphor.

```bash
pnpm add @blips/ai
```

CSS como no resto da @blips/ai: `@import "@blips/ui/globals.css";` e depois
`@import "@blips/ai/styles.css";`. Se o seu código tipar a transcrição do
servidor com tipos do AI SDK, `ai` é peer opcional e só de tipos
(`import type`): num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

Exports: `SpeechInput` e os tipos `SpeechInputProps` e `SpeechInputLabels`.

`SpeechInputProps` = props do `Button` da @blips/ui (`size`, `disabled`,
`className`, `aria-label`…) mais:

| Prop | Tipo | Padrão | Notas |
|---|---|---|---|
| `onTranscriptionChange` | `(text: string) => void` | — | Recebe **cada trecho final**, não o texto acumulado. Quem concatena é você. |
| `onAudioRecorded` | `(audioBlob: Blob) => Promise<string>` | — | Só no modo MediaRecorder. Devolva o texto transcrito; ele vai para `onTranscriptionChange`. Sem essa prop, o botão fica desabilitado nesse modo. Erros lançados aqui são engolidos: trate-os dentro da função. |
| `lang` | `string` (BCP 47) | `"pt-BR"` | Idioma da Web Speech API. Não afeta o modo MediaRecorder. |
| `labels` | `SpeechInputLabels` | `{ start: "Iniciar ditado", stop: "Parar ditado", processing: "Transcrevendo áudio" }` | Rótulo acessível (`aria-label`) por estado. Um `aria-label` passado direto tem prioridade sobre os três. |

O botão **não** usa `aria-pressed`: o estado vai no rótulo, que muda entre
`start`/`stop`/`processing` (com `aria-pressed` e rótulo variável, o leitor de
tela anunciaria o estado em dobro). O `onClick` do componente
alterna a gravação: um `onClick` seu **substitui** esse comportamento (as
props são espalhadas depois).

## Composição com a @blips/ui

- É um `Button` da @blips/ui: use `size` (`"icon-sm"` dentro do
  `PromptInputTools`, `"icon-lg"` isolado). A cor (`bg-primary` parado,
  `bg-destructive` gravando) vem do componente; `variant` não muda o visual.
- Dentro do `PromptInput`, ponha no `PromptInputTools` e escreva no texto pelo
  `PromptInputProvider` (`usePromptInputController().textInput`), como no
  exemplo. O `PromptInputTextarea` sozinho não expõe `value`.
- Erro de transcrição no servidor: `toast` do Sonner da @blips/ui dentro do
  `onAudioRecorded`.

## Exemplo v3

```tsx
"use client";

import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputController,
} from "@blips/ai/components/prompt-input";
import { SpeechInput } from "@blips/ai/components/speech-input";
import { toast } from "sonner";

// Fallback para Firefox/Safari: o app envia o áudio para a própria API.
async function transcreverNoServidor(audio: Blob): Promise<string> {
  const corpo = new FormData();
  corpo.append("audio", audio, "ditado.webm");
  const resposta = await fetch("/api/transcrever", {
    body: corpo,
    method: "POST",
  });
  if (!resposta.ok) {
    toast.error("Não foi possível transcrever o áudio.");
    return "";
  }
  const { texto } = (await resposta.json()) as { texto: string };
  return texto;
}

function Ditado() {
  const { textInput } = usePromptInputController();
  return (
    <SpeechInput
      onAudioRecorded={transcreverNoServidor}
      onTranscriptionChange={(trecho) =>
        textInput.setInput(
          textInput.value ? `${textInput.value} ${trecho}` : trecho
        )
      }
      size="icon-sm"
    />
  );
}

export function CaixaComDitado({
  onEnviar,
}: {
  onEnviar: (texto: string) => void;
}) {
  return (
    <PromptInputProvider>
      <PromptInput onSubmit={(mensagem) => onEnviar(mensagem.text)}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Digite ou dite sua pergunta…" />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <Ditado />
          </PromptInputTools>
          <PromptInputSubmit status="ready" />
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  );
}
```

O `toast` vem do `sonner`, que o app já instala junto com o `Toaster` da
@blips/ui (`../sonner.md`).

## Armadilhas

- **Desabilitado no primeiro render, sempre.** O modo começa em `"none"` e só
  é detectado num efeito (para o HTML do SSR bater com a hidratação). Não
  trate o `disabled` inicial como bug, e não teste "o botão está habilitado"
  sem esperar a montagem.
- **Desabilitado no Firefox/Safari** quando falta `onAudioRecorded`. Se o app
  precisa funcionar fora do Chrome/Edge, implemente o fallback no servidor.
- **Trecho, não texto inteiro.** `onTranscriptionChange` chega uma vez por
  frase finalizada. `setTexto(trecho)` apaga o que já foi ditado: concatene.
- **HTTPS ou localhost.** Microfone (`getUserMedia`) e Web Speech só funcionam
  em contexto seguro. Em HTTP, Firefox/Safari não expõem `navigator.mediaDevices`
  (botão desabilitado) e no Chrome o reconhecimento falha ao clicar e o botão
  volta ao estado parado, sem mensagem.
- **Web Speech do Chrome manda o áudio para o Google.** Para conteúdo sensível
  (dados de cliente), prefira o modo MediaRecorder com transcrição no seu
  backend; dá para forçar isso só no app, não há prop para escolher o modo.
- O formato gravado é rotulado `audio/webm` mesmo no Safari, que grava em
  MP4/AAC. Se o serviço de transcrição recusar, detecte o tipo pelo conteúdo.
- O Spinner é decorativo: o estado vai no `aria-label` do botão. Não adicione
  outro rótulo "Carregando" por fora.
- O pacote é apresentacional: quem transcreve no servidor é o app. Nada de
  chamar provedor de IA direto do navegador com chave exposta.
