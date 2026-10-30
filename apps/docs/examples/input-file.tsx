import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";

export default function InputFile() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="picture">Foto</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Selecione uma imagem para enviar.</FieldDescription>
    </Field>
  );
}
