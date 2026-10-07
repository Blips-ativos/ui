"use client";

import { Field, FieldError, FieldLabel } from "@blips/ui/components/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select";

const items = [
  { label: "Selecione uma fruta", value: null },
  { label: "Maçã", value: "maca" },
  { label: "Banana", value: "banana" },
  { label: "Mirtilo", value: "mirtilo" },
];

export default function SelectInvalid() {
  return (
    <Field data-invalid="true" className="w-full max-w-xs">
      <FieldLabel htmlFor="select-fruit-invalid">Fruta favorita</FieldLabel>
      <Select items={items}>
        <SelectTrigger
          id="select-fruit-invalid"
          aria-invalid
          className="w-full"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.label} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldError errors={[{ message: "Selecione uma fruta válida." }]} />
    </Field>
  );
}
