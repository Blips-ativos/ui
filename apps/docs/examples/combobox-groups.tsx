"use client";

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@blips/ui/components/combobox";
import { InputGroupAddon } from "@blips/ui/components/input-group";
import { GlobeIcon } from "@phosphor-icons/react";

const timezones = [
  {
    value: "Brasil",
    items: [
      "(GMT-3) Brasília",
      "(GMT-4) Manaus",
      "(GMT-5) Rio Branco",
      "(GMT-2) Fernando de Noronha",
    ],
  },
  {
    value: "Américas",
    items: [
      "(GMT-5) Nova York",
      "(GMT-6) Cidade do México",
      "(GMT-3) Buenos Aires",
      "(GMT-8) Los Angeles",
    ],
  },
  {
    value: "Europa",
    items: [
      "(GMT+0) Lisboa",
      "(GMT+1) Madri",
      "(GMT+1) Paris",
      "(GMT+0) Londres",
    ],
  },
];

export default function ComboboxGroups() {
  return (
    <Combobox items={timezones}>
      <ComboboxInput placeholder="Selecione um fuso horário" className="w-64">
        <InputGroupAddon>
          <GlobeIcon />
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxContent alignOffset={-28} className="w-64">
        <ComboboxEmpty>Nenhum fuso horário encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof timezones)[number]) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              <ComboboxSeparator />
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
