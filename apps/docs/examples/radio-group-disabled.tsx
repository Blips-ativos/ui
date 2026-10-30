import { Field, FieldLabel } from "@blips/ui/components/field";
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group";

export default function RadioGroupDisabled() {
  return (
    <RadioGroup defaultValue="opcao2" disabled className="w-fit">
      {["opcao1", "opcao2", "opcao3"].map((value, index) => (
        <Field key={value} orientation="horizontal" data-disabled="true">
          <RadioGroupItem value={value} id={`disabled-${value}`} />
          <FieldLabel htmlFor={`disabled-${value}`} className="font-normal">
            Opção {index + 1}
          </FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  );
}
