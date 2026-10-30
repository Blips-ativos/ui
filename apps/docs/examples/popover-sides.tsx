"use client";

import { Button } from "@blips/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover";

const SIDES = [
  { side: "top", label: "Em cima" },
  { side: "right", label: "Direita" },
  { side: "bottom", label: "Embaixo" },
  { side: "left", label: "Esquerda" },
] as const;

export default function PopoverSides() {
  return (
    <div className="flex flex-wrap gap-2">
      {SIDES.map(({ side, label }) => (
        <Popover key={side}>
          <PopoverTrigger
            render={<Button variant="outline" className="w-fit" />}
          >
            {label}
          </PopoverTrigger>
          <PopoverContent side={side} className="w-40">
            <p>Popover com side="{side}"</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
