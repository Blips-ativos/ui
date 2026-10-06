import { Checkbox } from "@blips/ui/components/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@blips/ui/components/field";

export default function CheckboxDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field orientation="horizontal">
        <Checkbox id="terms" />
        <FieldLabel htmlFor="terms">Aceito os termos e condições</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="terms-2" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="terms-2">
            Aceito os termos e condições
          </FieldLabel>
          <FieldDescription>
            Ao marcar esta opção, você concorda com os termos e condições.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled="true">
        <Checkbox id="toggle" disabled />
        <FieldLabel htmlFor="toggle">Ativar notificações</FieldLabel>
      </Field>
      <FieldLabel htmlFor="toggle-2">
        <Field orientation="horizontal">
          <Checkbox id="toggle-2" defaultChecked />
          <FieldContent>
            <FieldTitle>Ativar notificações</FieldTitle>
            <FieldDescription>
              Você pode ativar ou desativar as notificações a qualquer momento.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  );
}
