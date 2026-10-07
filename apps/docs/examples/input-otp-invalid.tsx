"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@blips/ui/components/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@blips/ui/components/input-otp";
import { useState } from "react";

export default function InputOTPInvalid() {
  const [value, setValue] = useState("000000");

  return (
    <Field className="w-fit">
      <FieldLabel htmlFor="otp-invalid">Código de verificação</FieldLabel>
      <FieldDescription>Exemplo do estado de erro.</FieldDescription>
      <InputOTP
        id="otp-invalid"
        maxLength={6}
        value={value}
        onChange={setValue}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} aria-invalid />
          <InputOTPSlot index={1} aria-invalid />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} aria-invalid />
          <InputOTPSlot index={3} aria-invalid />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} aria-invalid />
          <InputOTPSlot index={5} aria-invalid />
        </InputOTPGroup>
      </InputOTP>
      <FieldError errors={[{ message: "Código inválido. Tente novamente." }]} />
    </Field>
  );
}
