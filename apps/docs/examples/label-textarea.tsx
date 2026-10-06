import { Field } from "@blips/ui/components/field";
import { Label } from "@blips/ui/components/label";
import { Textarea } from "@blips/ui/components/textarea";

export default function LabelTextarea() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-textarea-message">Mensagem</Label>
      <Textarea
        id="label-textarea-message"
        placeholder="Escreva sua mensagem"
      />
    </Field>
  );
}
