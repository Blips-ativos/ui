"use client";

import { Label } from "@blips/ui/components/label";
import { Slider } from "@blips/ui/components/slider";
import { useState } from "react";

export default function SliderControlled() {
  const [value, setValue] = useState([0.3, 0.7]);

  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="slider-demo-temperature">Temperatura</Label>
        <span className="text-muted-foreground text-xs/relaxed tabular-nums">
          {value.map((v) => v.toFixed(1)).join(" – ")}
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={value}
        onValueChange={(next) => setValue(next as number[])}
        min={0}
        max={1}
        step={0.1}
      />
    </div>
  );
}
