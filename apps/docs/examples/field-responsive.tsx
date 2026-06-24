import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import { Textarea } from "@blips/ui/components/textarea";

export default function FieldResponsive() {
  return (
    <form className="w-full max-w-2xl">
      <FieldSet>
        <FieldLegend>Perfil</FieldLegend>
        <FieldDescription>Preencha as informações do perfil.</FieldDescription>
        <FieldSeparator />
        <FieldGroup>
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor="resp-name">Nome</FieldLabel>
              <FieldDescription>
                Nome completo para identificação.
              </FieldDescription>
            </FieldContent>
            <Input id="resp-name" placeholder="João da Silva" required />
          </Field>
          <FieldSeparator />
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor="resp-message">Mensagem</FieldLabel>
              <FieldDescription>
                Mantenha curta, de preferência abaixo de 100 caracteres.
              </FieldDescription>
            </FieldContent>
            <Textarea
              id="resp-message"
              placeholder="Olá, mundo!"
              className="min-h-[100px] resize-none sm:min-w-[300px]"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
