import { Field, FieldError, FieldLabel } from "@blips/ui/components/field";
import { Textarea } from "@blips/ui/components/textarea";

export default function TextareaInvalid() {
  return (
    <Field data-invalid="true" className="max-w-sm">
      <FieldLabel htmlFor="textarea-demo-invalid">Mensagem</FieldLabel>
      <Textarea
        id="textarea-demo-invalid"
        placeholder="Digite sua mensagem aqui."
        aria-invalid="true"
      />
      <FieldError errors={[{ message: "A mensagem é obrigatória." }]} />
    </Field>
  );
}
