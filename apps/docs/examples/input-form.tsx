import { Button } from "@blips/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@blips/ui/components/native-select";

export default function InputForm() {
  return (
    <form className="w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Nome</FieldLabel>
          <Input id="form-name" type="text" placeholder="Maria Silva" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-email">E-mail</FieldLabel>
          <Input id="form-email" type="email" placeholder="maria@exemplo.com" />
          <FieldDescription>
            Nunca compartilharemos seu e-mail com ninguém.
          </FieldDescription>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="form-phone">Telefone</FieldLabel>
            <Input id="form-phone" type="tel" placeholder="(11) 91234-5678" />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-state">Estado</FieldLabel>
            <NativeSelect id="form-state" defaultValue="sp" className="w-full">
              <NativeSelectOption value="sp">São Paulo</NativeSelectOption>
              <NativeSelectOption value="rj">Rio de Janeiro</NativeSelectOption>
              <NativeSelectOption value="mg">Minas Gerais</NativeSelectOption>
            </NativeSelect>
          </Field>
        </div>
        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit">Enviar</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
