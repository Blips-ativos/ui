import { Field, FieldLabel } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";

export default function InputDisabled() {
  return (
    <Field data-disabled="true" className="max-w-xs">
      <FieldLabel htmlFor="input-demo-disabled">E-mail</FieldLabel>
      <Input
        id="input-demo-disabled"
        type="email"
        placeholder="E-mail"
        disabled
      />
    </Field>
  );
}
