import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@blips/ui/components/field";
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group";

const options = [
  { value: "email", label: "Somente e-mail" },
  { value: "sms", label: "Somente SMS" },
  { value: "ambos", label: "E-mail e SMS" },
];

export default function RadioGroupInvalid() {
  return (
    <FieldSet className="max-w-xs">
      <FieldLegend>Preferências de aviso</FieldLegend>
      <FieldDescription>Escolha como quer receber avisos.</FieldDescription>
      <RadioGroup defaultValue="email">
        {options.map((option) => (
          <Field
            key={option.value}
            orientation="horizontal"
            data-invalid="true"
          >
            <RadioGroupItem
              value={option.value}
              id={`invalid-${option.value}`}
              aria-invalid
            />
            <FieldLabel
              htmlFor={`invalid-${option.value}`}
              className="font-normal"
            >
              {option.label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  );
}
