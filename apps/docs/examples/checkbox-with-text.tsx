import { Checkbox } from "@blips/ui/components/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field";

export default function CheckboxWithText() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <Checkbox id="terms-with-text" />
      <FieldContent>
        <FieldLabel htmlFor="terms-with-text">
          Aceito os termos e condições
        </FieldLabel>
        <FieldDescription>
          Você concorda com nossos Termos de Uso e Política de Privacidade.
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}
