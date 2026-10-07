import { Checkbox } from "@blips/ui/components/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@blips/ui/components/field";

export default function FieldCheckbox() {
  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox id="field-terms" defaultChecked />
          <FieldLabel htmlFor="field-terms">
            Aceito os termos e condições
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="field-newsletter" />
          <FieldContent>
            <FieldLabel htmlFor="field-newsletter">
              Assinar a newsletter
            </FieldLabel>
            <FieldDescription>
              Receba novidades semanais sobre produtos e promoções.
            </FieldDescription>
          </FieldContent>
        </Field>
        <FieldSet>
          <FieldLegend variant="label">Preferências</FieldLegend>
          <FieldDescription>Marque todas as que se aplicam.</FieldDescription>
          <FieldGroup className="gap-3">
            <Field orientation="horizontal">
              <Checkbox id="pref-dark" />
              <FieldLabel htmlFor="pref-dark">Modo escuro</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="pref-compact" />
              <FieldLabel htmlFor="pref-compact">
                Visualização compacta
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="pref-notifications" />
              <FieldLabel htmlFor="pref-notifications">
                Ativar notificações
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field data-invalid="true" orientation="horizontal">
          <Checkbox id="field-checkbox-invalid" aria-invalid />
          <FieldLabel htmlFor="field-checkbox-invalid">
            Checkbox inválido
          </FieldLabel>
        </Field>
        <Field data-disabled="true" orientation="horizontal">
          <Checkbox id="field-checkbox-disabled" disabled />
          <FieldLabel htmlFor="field-checkbox-disabled">
            Checkbox desabilitado
          </FieldLabel>
        </Field>
      </FieldGroup>
    </div>
  );
}
