import { Checkbox } from "@blips/ui/components/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@blips/ui/components/field";

const items = [
  { id: "notify-email", label: "E-mail", defaultChecked: true },
  { id: "notify-sms", label: "SMS", defaultChecked: false },
  { id: "notify-whatsapp", label: "WhatsApp", defaultChecked: true },
  { id: "notify-push", label: "Notificações push", defaultChecked: false },
];

export default function CheckboxGroup() {
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend variant="label">Canais de aviso</FieldLegend>
      <FieldDescription>Escolha por onde quer receber avisos.</FieldDescription>
      <FieldGroup className="gap-3">
        {items.map((item) => (
          <Field key={item.id} orientation="horizontal">
            <Checkbox id={item.id} defaultChecked={item.defaultChecked} />
            <FieldLabel htmlFor={item.id} className="font-normal">
              {item.label}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  );
}
