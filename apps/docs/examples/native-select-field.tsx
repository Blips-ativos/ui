import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field";
import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select";

export default function NativeSelectField() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="native-select-state">Estado</FieldLabel>
      <NativeSelect id="native-select-state" className="w-full">
        <NativeSelectOption value="">Selecione um estado</NativeSelectOption>
        <NativeSelectOption value="sp">São Paulo</NativeSelectOption>
        <NativeSelectOption value="rj">Rio de Janeiro</NativeSelectOption>
        <NativeSelectOption value="mg">Minas Gerais</NativeSelectOption>
        <NativeSelectOption value="pr">Paraná</NativeSelectOption>
      </NativeSelect>
      <FieldDescription>O estado onde fica a sua empresa.</FieldDescription>
    </Field>
  );
}
