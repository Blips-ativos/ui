"use client";

import { Button } from "@blips/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";
import { InfoIcon } from "@phosphor-icons/react";

export default function TooltipIcon() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
        <InfoIcon />
        <span className="sr-only">Informações</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Informações adicionais</p>
      </TooltipContent>
    </Tooltip>
  );
}
