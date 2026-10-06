import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@blips/ui/components/native-select";

export default function NativeSelectGroups() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Selecione um alimento</NativeSelectOption>
      <NativeSelectOptGroup label="Frutas">
        <NativeSelectOption value="maca">Maçã</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="mirtilo">Mirtilo</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Legumes">
        <NativeSelectOption value="cenoura">Cenoura</NativeSelectOption>
        <NativeSelectOption value="brocolis">Brócolis</NativeSelectOption>
        <NativeSelectOption value="espinafre">Espinafre</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  );
}
