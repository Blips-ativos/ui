"use client";

import { Progress } from "@blips/ui/components/progress";
import { Slider } from "@blips/ui/components/slider";
import { useState } from "react";

export default function ProgressControlled() {
  const [value, setValue] = useState(50);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={value} />
      <Slider
        value={value}
        onValueChange={(next) => setValue(next as number)}
        min={0}
        max={100}
        step={1}
        aria-label="Progresso"
      />
    </div>
  );
}
