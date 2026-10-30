"use client";

import { BlipsVoiceBeam, useBlipsMicrophone } from "@blips/ai/fx/voice-glow";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@blips/ui/components/input-group";
import {
  ArrowUpIcon,
  MicrophoneIcon,
  MicrophoneSlashIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

// Fala simulada: o getter é lido a cada quadro pelo efeito, sem re-render.
function vozSimulada() {
  const t = performance.now() / 1000;
  const silaba = Math.max(0, Math.sin(t * 7.3) * Math.sin(t * 2.1));
  const frase = Math.sin(t * 0.45) > -0.35 ? 1 : 0;
  return Math.min(1, silaba * 0.75 * frase);
}

export default function AiVoiceGlowDemo() {
  const mic = useBlipsMicrophone();
  const [falando, setFalando] = useState(true);
  const gravando = mic.state === "live";

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <BlipsVoiceBeam
        active={falando || gravando}
        className="rounded-md"
        level={vozSimulada}
        stream={mic.stream}
      >
        <InputGroup>
          <InputGroupTextarea
            placeholder={gravando ? "Ouvindo…" : "Pergunte ao Salvador"}
          />
          <InputGroupAddon align="block-end" className="justify-between">
            <InputGroupButton
              aria-label={gravando ? "Parar microfone" : "Usar microfone"}
              disabled={!mic.supported}
              onClick={() => (gravando ? mic.stop() : mic.start())}
              size="icon-xs"
            >
              {gravando ? <MicrophoneSlashIcon /> : <MicrophoneIcon />}
            </InputGroupButton>
            <InputGroupButton
              aria-label="Enviar"
              size="icon-xs"
              variant="default"
            >
              <ArrowUpIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </BlipsVoiceBeam>
      <button
        className="self-start text-muted-foreground text-xs underline-offset-4 hover:underline"
        onClick={() => setFalando((v) => !v)}
        type="button"
      >
        {falando ? "Parar a voz simulada" : "Simular voz"}
      </button>
      {mic.state === "denied" ? (
        <p className="text-destructive text-xs">
          Permissão de microfone negada pelo navegador.
        </p>
      ) : null}
    </div>
  );
}
