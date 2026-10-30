import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field";
import { Textarea } from "@blips/ui/components/textarea";

export default function TextareaWithLabel() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="textarea-demo-message">Mensagem</FieldLabel>
      <Textarea
        id="textarea-demo-message"
        placeholder="Digite sua mensagem aqui."
        rows={6}
      />
      <FieldDescription>
        Digite sua mensagem e pressione Enter para enviar.
      </FieldDescription>
    </Field>
  );
}
