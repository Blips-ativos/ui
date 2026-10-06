"use client";

import { Button } from "@blips/ui/components/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@blips/ui/components/combobox";

const states = [
  { value: "", label: "Selecione um estado" },
  { value: "ba", label: "Bahia" },
  { value: "df", label: "Distrito Federal" },
  { value: "mg", label: "Minas Gerais" },
  { value: "pr", label: "Paraná" },
  { value: "pe", label: "Pernambuco" },
  { value: "rj", label: "Rio de Janeiro" },
  { value: "rs", label: "Rio Grande do Sul" },
  { value: "sc", label: "Santa Catarina" },
  { value: "sp", label: "São Paulo" },
];

export default function ComboboxPopup() {
  return (
    <Combobox items={states} defaultValue={states[0]}>
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            className="w-64 justify-between font-normal"
          />
        }
      >
        <ComboboxValue />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Buscar" />
        <ComboboxEmpty>Nenhum estado encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(item: (typeof states)[number]) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
