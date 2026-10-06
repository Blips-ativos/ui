"use client";

import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blips/ui/components/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";
import { PlusIcon, WaveformIcon } from "@phosphor-icons/react";
import * as React from "react";

export default function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = React.useState(false);

  return (
    <ButtonGroup className="[--radius:9999rem]">
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Adicionar">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput
            placeholder={
              voiceEnabled
                ? "Grave e envie um áudio..."
                : "Envie uma mensagem..."
            }
            disabled={voiceEnabled}
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger
                render={
                  <InputGroupButton
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    size="icon-xs"
                    data-active={voiceEnabled}
                    className="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                    aria-pressed={voiceEnabled}
                    aria-label="Modo de voz"
                  />
                }
              >
                <WaveformIcon />
              </TooltipTrigger>
              <TooltipContent>Modo de voz</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  );
}
