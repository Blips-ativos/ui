"use client";

import { Button } from "@blips/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";

export default function TooltipDisabled() {
  return (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-block w-fit" />}>
        <Button variant="outline" disabled>
          Desabilitado
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Este recurso está indisponível no momento</p>
      </TooltipContent>
    </Tooltip>
  );
}
