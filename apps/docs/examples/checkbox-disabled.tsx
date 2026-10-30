import { Checkbox } from "@blips/ui/components/checkbox";
import { Field, FieldLabel } from "@blips/ui/components/field";

export default function CheckboxDisabled() {
  return (
    <Field orientation="horizontal" data-disabled="true" className="w-fit">
      <Checkbox id="terms-disabled" disabled />
      <FieldLabel htmlFor="terms-disabled">Ativar notificações</FieldLabel>
    </Field>
  );
}
