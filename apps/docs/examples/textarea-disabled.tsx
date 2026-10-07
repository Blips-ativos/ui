import { Field, FieldLabel } from "@blips/ui/components/field";
import { Textarea } from "@blips/ui/components/textarea";

export default function TextareaDisabled() {
  return (
    <Field data-disabled="true" className="max-w-sm">
      <FieldLabel htmlFor="textarea-demo-disabled">Mensagem</FieldLabel>
      <Textarea
        id="textarea-demo-disabled"
        placeholder="Digite sua mensagem aqui."
        disabled
      />
    </Field>
  );
}
