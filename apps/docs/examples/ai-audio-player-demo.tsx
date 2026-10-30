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
  AudioPlayerVolumeRange,
} from "@blips/ai/components/audio-player";
import type { Experimental_SpeechResult as SpeechResult } from "ai";

// Gera um WAV curto (três notas, 8 kHz, 8 bits) para o exemplo não depender de
// arquivo nem de rede. Num app real, `audio` vem do `generateSpeech` do AI SDK.
function gerarWav(segundos: number): Uint8Array {
  const taxa = 8000;
  const amostras = taxa * segundos;
  const bytes = new Uint8Array(44 + amostras);
  const view = new DataView(bytes.buffer);
  const texto = (offset: number, valor: string) => {
    for (let i = 0; i < valor.length; i += 1) {
      view.setUint8(offset + i, valor.charCodeAt(i));
    }
  };
  texto(0, "RIFF");
  view.setUint32(4, 36 + amostras, true);
  texto(8, "WAVE");
  texto(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, taxa, true);
  view.setUint32(28, taxa, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true);
  texto(36, "data");
  view.setUint32(40, amostras, true);
  const notas = [440, 554.37, 659.25];
  for (let i = 0; i < amostras; i += 1) {
    const t = i / taxa;
    const nota = notas[Math.floor(t) % notas.length] ?? 440;
    const envelope = 1 - (t % 1);
    bytes[44 + i] =
      128 + Math.round(40 * envelope * Math.sin(2 * Math.PI * nota * t));
  }
  return bytes;
}

function paraBase64(bytes: Uint8Array): string {
  let binario = "";
  for (let i = 0; i < bytes.length; i += 0x80_00) {
    binario += String.fromCharCode(...bytes.subarray(i, i + 0x80_00));
  }
  return btoa(binario);
}

const wav = gerarWav(6);

const audio: SpeechResult["audio"] = {
  base64: paraBase64(wav),
  format: "wav",
  mediaType: "audio/wav",
  uint8Array: wav,
};

export default function AiAudioPlayerDemo() {
  return (
    <AudioPlayer>
      <AudioPlayerElement data={audio} />
      <AudioPlayerControlBar>
        <AudioPlayerPlayButton />
        <AudioPlayerSeekBackwardButton seekOffset={2} />
        <AudioPlayerSeekForwardButton seekOffset={2} />
        <AudioPlayerTimeDisplay />
        <AudioPlayerTimeRange />
        <AudioPlayerDurationDisplay />
        <AudioPlayerMuteButton />
        <AudioPlayerVolumeRange />
      </AudioPlayerControlBar>
    </AudioPlayer>
  );
}
