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
  { label: "Maçã", value: "maca" },
  { label: "Banana", value: "banana" },
  { label: "Mirtilo", value: "mirtilo" },
  { label: "Uva", value: "uva" },
  { label: "Abacaxi", value: "abacaxi" },
  { label: "Morango", value: "morango" },
  { label: "Melancia", value: "melancia" },
];

export default function SelectMultiple() {
  return (
    <Select items={items} multiple defaultValue={[]}>
      <SelectTrigger className="w-64">
        <SelectValue>
          {(value: string[]) => {
            if (value.length === 0) {
              return "Selecione as frutas";
            }
            if (value.length === 1) {
              return items.find((item) => item.value === value[0])?.label;
            }
            return `${value.length} frutas selecionadas`;
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
