import { Field, FieldLabel } from "@blips/ui/components/field";
import { Switch } from "@blips/ui/components/switch";

export default function SwitchDemo() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <Switch id="airplane-mode" />
      <FieldLabel htmlFor="airplane-mode">Modo avião</FieldLabel>
    </Field>
  );
}
