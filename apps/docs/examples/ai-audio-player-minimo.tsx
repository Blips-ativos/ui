"use client";

import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerElement,
  AudioPlayerPlayButton,
  AudioPlayerTimeDisplay,
  AudioPlayerTimeRange,
} from "@blips/ai/components/audio-player";

// Um tom de 3 s gerado no navegador, como data URL. Num app real, `src` é a URL
// do arquivo de áudio (por exemplo, um áudio de WhatsApp já armazenado).
function tomWav(segundos: number): string {
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
  for (let i = 0; i < amostras; i += 1) {
    bytes[44 + i] =
      128 + Math.round(30 * Math.sin((2 * Math.PI * 330 * i) / taxa));
  }
  let binario = "";
  for (let i = 0; i < bytes.length; i += 0x80_00) {
    binario += String.fromCharCode(...bytes.subarray(i, i + 0x80_00));
  }
  return `data:audio/wav;base64,${btoa(binario)}`;
}

const src = tomWav(3);

export default function AiAudioPlayerMinimo() {
  return (
    <AudioPlayer>
      <AudioPlayerElement src={src} />
      <AudioPlayerControlBar>
        <AudioPlayerPlayButton />
        <AudioPlayerTimeRange />
        <AudioPlayerTimeDisplay />
      </AudioPlayerControlBar>
    </AudioPlayer>
  );
}
