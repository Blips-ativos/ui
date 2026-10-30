"use client";

import {
  DirectionProvider,
  useDirection,
} from "@blips/ui/components/direction";
import { Label } from "@blips/ui/components/label";
import { Slider } from "@blips/ui/components/slider";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group";
import * as React from "react";

type Direction = "ltr" | "rtl";

function CurrentDirection() {
  const direction = useDirection();
  return (
    <p className="text-xs text-muted-foreground">
      useDirection(): <code className="font-mono">{direction}</code>
    </p>
  );
}

export default function DirectionDemo() {
  const [direction, setDirection] = React.useState<Direction>("rtl");

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <ToggleGroup
        variant="outline"
        value={[direction]}
        onValueChange={(value) => {
          if (value[0]) setDirection(value[0] as Direction);
        }}
      >
        <ToggleGroupItem value="ltr">LTR</ToggleGroupItem>
        <ToggleGroupItem value="rtl">RTL</ToggleGroupItem>
      </ToggleGroup>
      <DirectionProvider direction={direction}>
        <div dir={direction} className="flex flex-col gap-3">
          <Label>Volume</Label>
          <Slider defaultValue={40} aria-label="Volume" />
          <CurrentDirection />
        </div>
      </DirectionProvider>
    </div>
  );
}
