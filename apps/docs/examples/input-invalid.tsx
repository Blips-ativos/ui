import { Field, FieldError, FieldLabel } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";

export default function InputInvalid() {
  return (
    <Field data-invalid="true" className="max-w-xs">
      <FieldLabel htmlFor="input-demo-invalid">E-mail</FieldLabel>
      <Input
        id="input-demo-invalid"
        type="email"
        defaultValue="nome@"
        aria-invalid="true"
      />
      <FieldError errors={[{ message: "Informe um e-mail válido." }]} />
    </Field>
  );
}
