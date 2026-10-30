import { Checkbox } from "@blips/ui/components/checkbox";
import { Field } from "@blips/ui/components/field";
import { Label } from "@blips/ui/components/label";

export default function LabelDemo() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <Checkbox id="label-demo-terms" />
      <Label htmlFor="label-demo-terms">Aceito os termos e condições</Label>
    </Field>
  );
}
