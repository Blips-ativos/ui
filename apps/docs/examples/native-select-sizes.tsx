import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select";

export default function NativeSelectSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {(["sm", "default"] as const).map((size) => (
        <NativeSelect key={size} size={size}>
          <NativeSelectOption value="">Selecione uma fruta</NativeSelectOption>
          <NativeSelectOption value="maca">Maçã</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="mirtilo">Mirtilo</NativeSelectOption>
        </NativeSelect>
      ))}
    </div>
  );
}
