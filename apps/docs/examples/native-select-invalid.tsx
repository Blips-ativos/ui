import { Field, FieldError, FieldLabel } from "@blips/ui/components/field";
import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select";

export default function NativeSelectInvalid() {
  return (
    <Field data-invalid="true" className="max-w-xs">
      <FieldLabel htmlFor="native-select-invalid">Fruta favorita</FieldLabel>
      <NativeSelect
        id="native-select-invalid"
        aria-invalid="true"
        className="w-full"
      >
        <NativeSelectOption value="">Selecione uma fruta</NativeSelectOption>
        <NativeSelectOption value="maca">Maçã</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
      <FieldError errors={[{ message: "Este campo é obrigatório." }]} />
    </Field>
  );
}
