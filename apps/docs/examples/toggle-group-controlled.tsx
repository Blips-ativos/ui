"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group";
import { useState } from "react";

const weights = [
  { value: "light", label: "Leve", className: "font-light" },
  { value: "normal", label: "Normal", className: "font-normal" },
  { value: "medium", label: "Médio", className: "font-medium" },
  { value: "bold", label: "Negrito", className: "font-bold" },
];

export default function ToggleGroupControlled() {
  const [fontWeight, setFontWeight] = useState("normal");

  return (
    <div className="flex flex-col items-start gap-3">
      <ToggleGroup
        value={[fontWeight]}
        onValueChange={(value) => {
          // No modo único o valor também chega como array; vazio = desmarcou.
          if (value[0]) setFontWeight(value[0]);
        }}
        variant="outline"
        spacing={2}
        size="lg"
      >
        {weights.map((weight) => (
          <ToggleGroupItem
            key={weight.value}
            value={weight.value}
            aria-label={weight.label}
            className="flex size-16 flex-col items-center justify-center rounded-xl"
          >
            <span className={`text-2xl leading-none ${weight.className}`}>
              Aa
            </span>
            <span className="text-xs text-muted-foreground">
              {weight.label}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p className="text-xs text-muted-foreground">
        Peso selecionado:{" "}
        <code className="rounded-md bg-muted px-1 py-0.5 font-mono">
          font-{fontWeight}
        </code>
      </p>
    </div>
  );
}
