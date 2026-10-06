"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select";

const fruits = [
  { label: "Maçã", value: "maca" },
  { label: "Banana", value: "banana" },
  { label: "Mirtilo", value: "mirtilo" },
];

const vegetables = [
  { label: "Cenoura", value: "cenoura" },
  { label: "Brócolis", value: "brocolis" },
  { label: "Espinafre", value: "espinafre" },
];

const items = [
  { label: "Selecione um alimento", value: null },
  ...fruits,
  ...vegetables,
];

export default function SelectDemo() {
  return (
    <Select items={items}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frutas</SelectLabel>
          {fruits.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Legumes</SelectLabel>
          {vegetables.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
