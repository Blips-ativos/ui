"use client";

import { Button } from "@blips/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@blips/ui/components/popover";

const ALIGNMENTS = [
  { align: "start", label: "Início" },
  { align: "center", label: "Centro" },
  { align: "end", label: "Fim" },
] as const;

export default function PopoverAlignments() {
  return (
    <div className="flex gap-6">
      {ALIGNMENTS.map(({ align, label }) => (
        <Popover key={align}>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>
            {label}
          </PopoverTrigger>
          <PopoverContent align={align} className="w-40">
            Alinhado em align="{align}"
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
