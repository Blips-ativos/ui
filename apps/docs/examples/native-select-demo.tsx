import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select";

export default function NativeSelectDemo() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Selecione uma fruta</NativeSelectOption>
      <NativeSelectOption value="maca">Maçã</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="mirtilo">Mirtilo</NativeSelectOption>
      <NativeSelectOption value="uva" disabled>
        Uva
      </NativeSelectOption>
      <NativeSelectOption value="abacaxi">Abacaxi</NativeSelectOption>
    </NativeSelect>
  );
}
