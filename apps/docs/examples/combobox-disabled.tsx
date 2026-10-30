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
const disabledFrameworks = ["Nuxt.js", "Remix"];

export default function ComboboxDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Combobox items={frameworks}>
        <ComboboxInput placeholder="Desabilitado" className="w-52" disabled />
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
      <Combobox items={frameworks}>
        <ComboboxInput placeholder="Itens desabilitados" className="w-52" />
        <ComboboxContent>
          <ComboboxEmpty>Nenhum item encontrado.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem
                key={item}
                value={item}
                disabled={disabledFrameworks.includes(item)}
              >
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
