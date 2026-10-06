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
  { label: "Selecione", value: null },
  { label: "Claro", value: "claro" },
  { label: "Escuro", value: "escuro" },
  { label: "Sistema", value: "sistema" },
];

export default function SelectSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {(["sm", "default"] as const).map((size) => (
        <Select key={size} items={items}>
          <SelectTrigger size={size} className="w-36">
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
      ))}
    </div>
  );
}
