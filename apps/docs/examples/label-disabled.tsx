import { Field } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import { Label } from "@blips/ui/components/label";

export default function LabelDisabled() {
  return (
    <Field data-disabled={true} className="w-full max-w-xs">
      <Label htmlFor="label-disabled-input">Desabilitado</Label>
      <Input id="label-disabled-input" placeholder="Desabilitado" disabled />
    </Field>
  );
}
