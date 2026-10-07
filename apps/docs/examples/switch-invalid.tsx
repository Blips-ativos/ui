import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field";
import { Switch } from "@blips/ui/components/switch";

export default function SwitchInvalid() {
  return (
    <Field orientation="horizontal" data-invalid="true" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="switch-invalid">Aceitar os termos</FieldLabel>
        <FieldDescription>
          É preciso aceitar os termos para continuar.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-invalid" aria-invalid />
    </Field>
  );
}
