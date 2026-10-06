import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@blips/ui/components/field";
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group";

export default function FieldRadio() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">Plano de assinatura</FieldLegend>
      <FieldDescription>Planos anuais têm 20% de desconto.</FieldDescription>
      <RadioGroup defaultValue="mensal">
        <Field orientation="horizontal">
          <RadioGroupItem value="mensal" id="field-plan-monthly" />
          <FieldLabel htmlFor="field-plan-monthly" className="font-normal">
            Mensal (R$ 49,90/mês)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="anual" id="field-plan-yearly" />
          <FieldLabel htmlFor="field-plan-yearly" className="font-normal">
            Anual (R$ 479,00/ano)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="vitalicio" id="field-plan-lifetime" />
          <FieldLabel htmlFor="field-plan-lifetime" className="font-normal">
            Vitalício (R$ 1.999,00)
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
}
