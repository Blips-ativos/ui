import { Field, FieldLabel } from "@blips/ui/components/field";
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="confortavel" className="w-fit">
      <Field orientation="horizontal">
        <RadioGroupItem value="padrao" id="r1" />
        <FieldLabel htmlFor="r1" className="font-normal">
          Padrão
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="confortavel" id="r2" />
        <FieldLabel htmlFor="r2" className="font-normal">
          Confortável
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="compacto" id="r3" />
        <FieldLabel htmlFor="r3" className="font-normal">
          Compacto
        </FieldLabel>
      </Field>
    </RadioGroup>
  );
}
