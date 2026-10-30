import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";

export default function InputDescription() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-username">Usuário</FieldLabel>
      <Input
        id="input-demo-username"
        type="text"
        placeholder="Digite seu usuário"
      />
      <FieldDescription>Escolha um nome de usuário único.</FieldDescription>
    </Field>
  );
}
