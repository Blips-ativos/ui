import { Field, FieldLabel } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";

export default function InputWithLabel() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-email">E-mail</FieldLabel>
      <Input
        id="input-demo-email"
        type="email"
        placeholder="nome@exemplo.com"
      />
    </Field>
  );
}
