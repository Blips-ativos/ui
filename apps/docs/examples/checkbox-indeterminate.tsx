"use client";

import { Checkbox } from "@blips/ui/components/checkbox";
import { Field, FieldGroup, FieldLabel } from "@blips/ui/components/field";
import { useState } from "react";

const options = [
  { id: "contratos", label: "Contratos" },
  { id: "financeiro", label: "Financeiro" },
  { id: "garantia", label: "Garantia" },
];

export default function CheckboxIndeterminate() {
  const [selected, setSelected] = useState<string[]>(["contratos"]);
  const allChecked = selected.length === options.length;
  const someChecked = selected.length > 0 && !allChecked;

  return (
    <FieldGroup className="max-w-sm gap-3">
      <Field orientation="horizontal">
        <Checkbox
          id="modules-all"
          checked={allChecked}
          indeterminate={someChecked}
          onCheckedChange={(checked) =>
            setSelected(checked ? options.map((option) => option.id) : [])
          }
        />
        <FieldLabel htmlFor="modules-all">Todos os módulos</FieldLabel>
      </Field>
      <FieldGroup className="gap-3 ps-6">
        {options.map((option) => (
          <Field key={option.id} orientation="horizontal">
            <Checkbox
              id={`modules-${option.id}`}
              checked={selected.includes(option.id)}
              onCheckedChange={(checked) =>
                setSelected((current) =>
                  checked
                    ? [...current, option.id]
                    : current.filter((id) => id !== option.id)
                )
              }
            />
            <FieldLabel
              htmlFor={`modules-${option.id}`}
              className="font-normal"
            >
              {option.label}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldGroup>
  );
}
