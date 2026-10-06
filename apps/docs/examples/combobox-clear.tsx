"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@blips/ui/components/combobox";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

export default function ComboboxClear() {
  return (
    <Combobox items={frameworks} defaultValue={frameworks[0]}>
      <ComboboxInput
        placeholder="Selecione um framework"
        className="w-60"
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>Nenhum item encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
