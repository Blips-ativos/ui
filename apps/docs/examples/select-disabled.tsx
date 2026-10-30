"use client";

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
  { label: "Uva", value: "uva", disabled: true },
  { label: "Abacaxi", value: "abacaxi" },
];

function FruitSelect({ disabled }: { disabled?: boolean }) {
  return (
    <Select items={items} disabled={disabled}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem
              key={item.label}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function SelectDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <FruitSelect />
      <FruitSelect disabled />
    </div>
  );
}
