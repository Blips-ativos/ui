"use client";

import { Button } from "@blips/ui/components/button";
import { Kbd } from "@blips/ui/components/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";
import { FloppyDiskIcon } from "@phosphor-icons/react";

export default function TooltipKeyboard() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="icon-sm" />}>
        <FloppyDiskIcon />
        <span className="sr-only">Salvar</span>
      </TooltipTrigger>
      <TooltipContent>
        Salvar alterações <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  );
}
