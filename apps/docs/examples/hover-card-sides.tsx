"use client";

import { Button } from "@blips/ui/components/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@blips/ui/components/hover-card";

const SIDES = [
  { side: "top", label: "Em cima" },
  { side: "right", label: "Direita" },
  { side: "bottom", label: "Embaixo" },
  { side: "left", label: "Esquerda" },
] as const;

export default function HoverCardSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {SIDES.map(({ side, label }) => (
        <HoverCard key={side}>
          <HoverCardTrigger
            delay={100}
            closeDelay={100}
            render={<Button variant="outline" />}
          >
            {label}
          </HoverCardTrigger>
          <HoverCardContent side={side}>
            <div className="flex flex-col gap-1">
              <h4 className="font-medium">Hover Card</h4>
              <p>Este card aparece do lado "{side}" do gatilho.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
