import { Checkbox } from "@blips/ui/components/checkbox";
import { Field, FieldLabel } from "@blips/ui/components/field";

export default function CheckboxInvalid() {
  return (
    <Field orientation="horizontal" data-invalid="true" className="w-fit">
      <Checkbox id="terms-invalid" aria-invalid />
      <FieldLabel htmlFor="terms-invalid">
        Aceito os termos e condições
      </FieldLabel>
    </Field>
  );
}
