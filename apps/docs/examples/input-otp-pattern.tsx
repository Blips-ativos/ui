import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@blips/ui/components/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@blips/ui/components/input-otp";
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

export default function InputOTPPattern() {
  return (
    <div className="flex flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="otp-digits-only">Somente dígitos</FieldLabel>
        <InputOTP
          id="otp-digits-only"
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
      <Field>
        <FieldLabel htmlFor="otp-alphanumeric">Alfanumérico</FieldLabel>
        <FieldDescription>Aceita letras e números.</FieldDescription>
        <InputOTP
          id="otp-alphanumeric"
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </div>
  );
}
