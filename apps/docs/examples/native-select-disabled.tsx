import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select";

export default function NativeSelectDisabled() {
  return (
    <NativeSelect disabled>
      <NativeSelectOption value="">Desabilitado</NativeSelectOption>
      <NativeSelectOption value="maca">Maçã</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
    </NativeSelect>
  );
}
