"use client";

import {
  Field,
  FieldDescription,
  FieldTitle,
} from "@blips/ui/components/field";
import { Slider } from "@blips/ui/components/slider";
import { useState } from "react";

export default function FieldSlider() {
  const [value, setValue] = useState([200, 800]);

  return (
    <Field className="w-full max-w-xs">
      <FieldTitle>Faixa de preço</FieldTitle>
      <FieldDescription>
        Defina sua faixa de orçamento (R${" "}
        <span className="font-medium tabular-nums">{value[0]}</span> a R${" "}
        <span className="font-medium tabular-nums">{value[1]}</span>).
      </FieldDescription>
      <Slider
        value={value}
        onValueChange={(next) => setValue(next as number[])}
        max={1000}
        min={0}
        step={10}
        className="mt-2 w-full"
        aria-label="Faixa de preço"
      />
    </Field>
  );
}
