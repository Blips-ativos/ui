"use client";

import type { VoiceSelectorGenderProps } from "@blips/ai/components/voice-selector";
import {
  VoiceSelector,
  VoiceSelectorAccent,
  VoiceSelectorAge,
  VoiceSelectorAttributes,
  VoiceSelectorBullet,
  VoiceSelectorContent,
  VoiceSelectorDescription,
  VoiceSelectorEmpty,
  VoiceSelectorGender,
  VoiceSelectorGroup,
  VoiceSelectorInput,
  VoiceSelectorItem,
  VoiceSelectorList,
  VoiceSelectorName,
  VoiceSelectorPreview,
  VoiceSelectorSeparator,
  VoiceSelectorTrigger,
} from "@blips/ai/components/voice-selector";
import { Button } from "@blips/ui/components/button";
import { Fragment, useEffect, useState } from "react";

interface Voz {
  id: string;
  nome: string;
  descricao: string;
  genero: VoiceSelectorGenderProps["value"];
  sotaque: string;
  idade: string;
  grupo: "Português" | "Outros idiomas";
}

const vozes: Voz[] = [
  {
    descricao: "Calma e acolhedora, boa para suporte",
    genero: "female",
    grupo: "Português",
    id: "helena",
    idade: "30–40",
    nome: "Helena",
    sotaque: "brazilian",
  },
  {
    descricao: "Direta e firme, boa para cobrança",
    genero: "male",
    grupo: "Português",
    id: "rafael",
    idade: "40–50",
    nome: "Rafael",
    sotaque: "brazilian",
  },
  {
    descricao: "Neutra, ritmo pausado",
    genero: "non-binary",
    grupo: "Português",
    id: "alex",
    idade: "20–30",
    nome: "Alex",
    sotaque: "portuguese",
  },
  {
    descricao: "Animada, boa para onboarding",
    genero: "female",
    grupo: "Outros idiomas",
    id: "lucia",
    idade: "20–30",
    nome: "Lucía",
    sotaque: "argentinian",
  },
];

const grupos = ["Português", "Outros idiomas"] as const;

export default function AiVoiceSelectorDemo() {
  const [voz, setVoz] = useState<string | undefined>("helena");
  const [aberto, setAberto] = useState(false);
  const [carregando, setCarregando] = useState<string | null>(null);
  const [tocando, setTocando] = useState<string | null>(null);

  // Simula o carregamento e a reprodução da prévia, sem áudio de verdade.
  useEffect(() => {
    if (!carregando) {
      return;
    }
    const timer = setTimeout(() => {
      setTocando(carregando);
      setCarregando(null);
    }, 800);
    return () => clearTimeout(timer);
  }, [carregando]);

  useEffect(() => {
    if (!tocando) {
      return;
    }
    const timer = setTimeout(() => setTocando(null), 2500);
    return () => clearTimeout(timer);
  }, [tocando]);

  const selecionada = vozes.find((v) => v.id === voz);

  return (
    <VoiceSelector
      onOpenChange={setAberto}
      onValueChange={setVoz}
      open={aberto}
      value={voz}
    >
      <VoiceSelectorTrigger render={<Button variant="outline" />}>
        {selecionada ? `Voz: ${selecionada.nome}` : "Escolher voz"}
      </VoiceSelectorTrigger>
      <VoiceSelectorContent>
        <VoiceSelectorInput />
        <VoiceSelectorList>
          <VoiceSelectorEmpty />
          {grupos.map((grupo, i) => (
            <Fragment key={grupo}>
              {i > 0 && <VoiceSelectorSeparator />}
              <VoiceSelectorGroup heading={grupo}>
                {vozes
                  .filter((v) => v.grupo === grupo)
                  .map((v) => (
                    <VoiceSelectorItem
                      key={v.id}
                      onSelect={() => {
                        setVoz(v.id);
                        setAberto(false);
                      }}
                      value={`${v.nome} ${v.descricao}`}
                    >
                      <VoiceSelectorPreview
                        loading={carregando === v.id}
                        onPlay={() => {
                          if (tocando === v.id) {
                            setTocando(null);
                          } else {
                            setCarregando(v.id);
                          }
                        }}
                        playing={tocando === v.id}
                      />
                      <div className="flex flex-1 flex-col gap-0.5">
                        <VoiceSelectorName>
                          {v.nome}
                          {voz === v.id ? " (atual)" : ""}
                        </VoiceSelectorName>
                        <VoiceSelectorDescription>
                          {v.descricao}
                        </VoiceSelectorDescription>
                      </div>
                      <VoiceSelectorAttributes className="gap-1.5">
                        <VoiceSelectorGender value={v.genero} />
                        <VoiceSelectorBullet />
                        <VoiceSelectorAccent value={v.sotaque} />
                        <VoiceSelectorBullet />
                        <VoiceSelectorAge>{v.idade}</VoiceSelectorAge>
                      </VoiceSelectorAttributes>
                    </VoiceSelectorItem>
                  ))}
              </VoiceSelectorGroup>
            </Fragment>
          ))}
        </VoiceSelectorList>
      </VoiceSelectorContent>
    </VoiceSelector>
  );
}
