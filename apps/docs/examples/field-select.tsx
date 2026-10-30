import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select";

const departments = [
  { label: "Escolha um departamento", value: null },
  { label: "Engenharia", value: "engenharia" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Vendas", value: "vendas" },
  { label: "Suporte", value: "suporte" },
];

export default function FieldSelect() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="field-department">Departamento</FieldLabel>
      <Select items={departments}>
        <SelectTrigger id="field-department" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {departments.map((item) => (
              <SelectItem key={item.label} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>
        Selecione seu departamento ou área de atuação.
      </FieldDescription>
    </Field>
  );
}
