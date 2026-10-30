import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
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
import { ArrowClockwiseIcon } from "@phosphor-icons/react";

const slotClassName =
  "*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl";

export default function InputOTPForm() {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Confirme seu acesso</CardTitle>
        <CardDescription>
          Digite o código que enviamos para o seu e-mail:{" "}
          <span className="font-medium">maria@exemplo.com</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification">
                Código de verificação
              </FieldLabel>
              <Button variant="outline" size="xs" type="button">
                <ArrowClockwiseIcon data-icon="inline-start" />
                Reenviar
              </Button>
            </div>
            <InputOTP maxLength={6} id="otp-verification" required>
              <InputOTPGroup className={slotClassName}>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className={slotClassName}>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription>
              <a href="#ajuda">Não tenho mais acesso a este e-mail.</a>
            </FieldDescription>
          </Field>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Verificar
        </Button>
        <div className="text-muted-foreground text-xs/relaxed">
          Problemas para entrar?{" "}
          <a
            href="#suporte"
            className="underline underline-offset-4 transition-colors hover:text-primary"
          >
            Fale com o suporte
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
