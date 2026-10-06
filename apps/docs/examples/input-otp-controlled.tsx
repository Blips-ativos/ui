"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@blips/ui/components/input-otp";
import { useState } from "react";

export default function InputOTPControlled() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-xs/relaxed">
        {value === "" ? (
          <>Digite sua senha de uso único.</>
        ) : (
          <>Você digitou: {value}</>
        )}
      </div>
    </div>
  );
}
