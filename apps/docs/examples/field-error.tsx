"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";
import { useState } from "react";

export default function FieldError_() {
  const [email, setEmail] = useState("joao");
  const invalid = !email.includes("@");

  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <Field data-invalid={invalid}>
          <FieldLabel htmlFor="error-email">E-mail</FieldLabel>
          <Input
            id="error-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={invalid}
            placeholder="voce@empresa.com.br"
          />
          {invalid ? (
            <FieldError errors={[{ message: "Informe um e-mail válido." }]} />
          ) : (
            <FieldDescription>Usaremos para enviar avisos.</FieldDescription>
          )}
        </Field>
      </FieldGroup>
    </div>
  );
}
