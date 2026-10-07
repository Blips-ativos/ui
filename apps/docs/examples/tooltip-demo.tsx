"use client";

import { Button } from "@blips/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" className="w-fit" />}>
          Passe o mouse
        </TooltipTrigger>
        <TooltipContent>
          <p>Adicionar à biblioteca</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
