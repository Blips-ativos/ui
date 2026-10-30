"use client";

import { Button } from "@blips/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@blips/ui/components/tooltip";

const SIDES = [
  { side: "top", label: "Em cima" },
  { side: "right", label: "Direita" },
  { side: "bottom", label: "Embaixo" },
  { side: "left", label: "Esquerda" },
] as const;

export default function TooltipSides() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {SIDES.map(({ side, label }) => (
          <Tooltip key={side}>
            <TooltipTrigger
              render={<Button variant="outline" className="w-fit" />}
            >
              {label}
            </TooltipTrigger>
            <TooltipContent side={side}>
              <p>Adicionar à biblioteca</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
