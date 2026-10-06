"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@blips/ui/components/combobox";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "TanStack Start",
];

export default function ComboboxDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Selecione um framework" className="w-60" />
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
