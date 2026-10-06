"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@blips/ui/components/combobox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@blips/ui/components/field";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

export default function ComboboxInvalid() {
  return (
    <Field data-invalid="true" className="max-w-xs">
      <FieldLabel htmlFor="combobox-framework-invalid">Framework</FieldLabel>
      <Combobox items={frameworks}>
        <ComboboxInput
          id="combobox-framework-invalid"
          placeholder="Selecione um framework"
          aria-invalid
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
      <FieldDescription>Escolha o framework do projeto.</FieldDescription>
      <FieldError errors={[{ message: "Este campo é obrigatório." }]} />
    </Field>
  );
}
