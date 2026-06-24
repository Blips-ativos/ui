import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";

export default function FieldInput() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="input-user">Usuário</FieldLabel>
            <Input id="input-user" type="text" placeholder="joao.silva" />
            <FieldDescription>
              Escolha um nome de usuário único para a sua conta.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="input-pass">Senha</FieldLabel>
            <Input id="input-pass" type="password" placeholder="••••••••" />
            <FieldDescription>
              Deve ter pelo menos 8 caracteres.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
