"use client";

import {
  MicSelector,
  MicSelectorContent,
  MicSelectorEmpty,
  MicSelectorInput,
  MicSelectorItem,
  MicSelectorLabel,
  MicSelectorList,
  MicSelectorTrigger,
  MicSelectorValue,
} from "@blips/ai/components/mic-selector";
import { useState } from "react";

// Lista os microfones reais do navegador. Ao abrir, o componente pede
// permissão de microfone para obter os nomes dos dispositivos.
export default function AiMicSelectorDemo() {
  const [microfone, setMicrofone] = useState<string | undefined>();

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <MicSelector onValueChange={setMicrofone} value={microfone}>
        <MicSelectorTrigger className="w-full">
          <MicSelectorValue />
        </MicSelectorTrigger>
        <MicSelectorContent>
          <MicSelectorInput />
          <MicSelectorEmpty />
          <MicSelectorList>
            {(dispositivos) =>
              dispositivos.map((dispositivo) => (
                <MicSelectorItem
                  key={dispositivo.deviceId}
                  value={dispositivo.deviceId}
                >
                  <MicSelectorLabel device={dispositivo} />
                </MicSelectorItem>
              ))
            }
          </MicSelectorList>
        </MicSelectorContent>
      </MicSelector>
      <p className="text-muted-foreground text-xs">
        {microfone
          ? `deviceId: ${microfone.slice(0, 16)}…`
          : "Nenhum selecionado."}
      </p>
    </div>
  );
}
