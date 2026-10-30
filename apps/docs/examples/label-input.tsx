import { Field } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import { Label } from "@blips/ui/components/label";

export default function LabelInput() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-input-email">E-mail</Label>
      <Input
        id="label-input-email"
        type="email"
        placeholder="voce@blips.com.br"
      />
    </Field>
  );
}
