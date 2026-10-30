import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@blips/ui/components/field";
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group";

export default function RadioGroupFieldset() {
  return (
    <FieldSet className="max-w-xs">
      <FieldLegend>Nível de bateria</FieldLegend>
      <FieldDescription>Escolha o nível de bateria preferido.</FieldDescription>
      <RadioGroup defaultValue="medio">
        <Field orientation="horizontal">
          <RadioGroupItem value="alto" id="battery-high" />
          <FieldLabel htmlFor="battery-high" className="font-normal">
            Alto
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="medio" id="battery-medium" />
          <FieldLabel htmlFor="battery-medium" className="font-normal">
            Médio
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="baixo" id="battery-low" />
          <FieldLabel htmlFor="battery-low" className="font-normal">
            Baixo
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
}
