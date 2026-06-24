import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field";
import { Switch } from "@blips/ui/components/switch";

export default function FieldSwitch() {
  return (
    <div className="w-full max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="field-2fa">
            Autenticação em duas etapas
          </FieldLabel>
          <FieldDescription>
            Exige um código adicional ao entrar. Recomendado para contas com
            acesso a dados financeiros.
          </FieldDescription>
        </FieldContent>
        <Switch id="field-2fa" />
      </Field>
    </div>
  );
}
