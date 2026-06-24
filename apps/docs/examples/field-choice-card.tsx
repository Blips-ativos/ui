import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@blips/ui/components/field";
import { RadioGroup, RadioGroupItem } from "@blips/ui/components/radio-group";

export default function FieldChoiceCard() {
  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLabel htmlFor="plan-group">Plano</FieldLabel>
          <FieldDescription>
            Escolha o plano que melhor atende à sua operação.
          </FieldDescription>
          <RadioGroup defaultValue="pro" id="plan-group">
            <FieldLabel htmlFor="plan-pro">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Pro</FieldTitle>
                  <FieldDescription>
                    Para times em crescimento, com integrações avançadas.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="pro" id="plan-pro" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="plan-enterprise">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Enterprise</FieldTitle>
                  <FieldDescription>
                    Suporte dedicado e SLA para grandes volumes.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="enterprise" id="plan-enterprise" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
