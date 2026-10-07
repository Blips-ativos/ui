import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@blips/ui/components/field";
import { Switch } from "@blips/ui/components/switch";

export default function SwitchDescription() {
  return (
    <FieldLabel htmlFor="switch-focus-mode" className="max-w-sm">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Compartilhar entre dispositivos</FieldTitle>
          <FieldDescription>
            O modo foco é compartilhado entre dispositivos e desliga quando você
            sai do app.
          </FieldDescription>
        </FieldContent>
        <Switch id="switch-focus-mode" />
      </Field>
    </FieldLabel>
  );
}
