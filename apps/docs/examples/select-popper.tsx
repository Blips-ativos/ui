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
];

const sides = ["top", "bottom", "left", "right"] as const;

const sideLabels: Record<(typeof sides)[number], string> = {
  top: "Em cima",
  bottom: "Embaixo",
  left: "Esquerda",
  right: "Direita",
};

export default function SelectPopper() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sides.map((side) => (
        <Select key={side} items={items}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder={sideLabels[side]} />
          </SelectTrigger>
          <SelectContent side={side} alignItemWithTrigger={false}>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
