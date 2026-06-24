import { Button } from "@blips/ui/components/button";
import { Checkbox } from "@blips/ui/components/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import { Textarea } from "@blips/ui/components/textarea";

export default function FieldDemo() {
  return (
    <form className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Dados de cobrança</FieldLegend>
          <FieldDescription>
            Todas as transações são seguras e criptografadas.
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="demo-name">Nome no cartão</FieldLabel>
              <Input id="demo-name" placeholder="João da Silva" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="demo-number">Número do cartão</FieldLabel>
              <Input
                id="demo-number"
                placeholder="1234 5678 9012 3456"
                required
              />
              <FieldDescription>Os 16 dígitos do cartão.</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Endereço</FieldLegend>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox id="demo-same" defaultChecked />
              <FieldLabel htmlFor="demo-same" className="font-normal">
                Mesmo endereço de entrega
              </FieldLabel>
            </Field>
            <Field>
              <FieldLabel htmlFor="demo-notes">Observações</FieldLabel>
              <Textarea
                id="demo-notes"
                placeholder="Alguma observação adicional"
                className="resize-none"
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button type="submit">Salvar</Button>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
