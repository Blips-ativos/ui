"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select";

const timezones = [
  {
    label: "Brasil",
    items: [
      { label: "Horário de Brasília (BRT)", value: "brt" },
      { label: "Horário do Amazonas (AMT)", value: "amt" },
      { label: "Horário do Acre (ACT)", value: "act" },
      { label: "Fernando de Noronha (FNT)", value: "fnt" },
    ],
  },
  {
    label: "América do Sul",
    items: [
      { label: "Horário da Argentina (ART)", value: "art" },
      { label: "Horário da Bolívia (BOT)", value: "bot" },
      { label: "Horário do Chile (CLT)", value: "clt" },
      { label: "Horário do Uruguai (UYT)", value: "uyt" },
    ],
  },
  {
    label: "América do Norte",
    items: [
      { label: "Horário do Leste (EST)", value: "est" },
      { label: "Horário Central (CST)", value: "cst" },
      { label: "Horário das Montanhas (MST)", value: "mst" },
      { label: "Horário do Pacífico (PST)", value: "pst" },
    ],
  },
  {
    label: "Europa e África",
    items: [
      { label: "Horário de Greenwich (GMT)", value: "gmt" },
      { label: "Horário da Europa Central (CET)", value: "cet" },
      { label: "Horário da Europa Oriental (EET)", value: "eet" },
      { label: "Horário da África Central (CAT)", value: "cat" },
    ],
  },
  {
    label: "Ásia e Oceania",
    items: [
      { label: "Horário de Moscou (MSK)", value: "msk" },
      { label: "Horário da Índia (IST)", value: "ist" },
      { label: "Horário do Japão (JST)", value: "jst" },
      { label: "Horário da Austrália Oriental (AEST)", value: "aest" },
    ],
  },
];

const items = [
  { label: "Selecione um fuso horário", value: null },
  ...timezones.flatMap((group) => group.items),
];

export default function SelectScrollable() {
  return (
    <Select items={items}>
      <SelectTrigger className="w-72">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {timezones.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
