import { Button } from "@blips/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card";
import { Field, FieldGroup, FieldLabel } from "@blips/ui/components/field";
import { Input } from "@blips/ui/components/input";

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Entre na sua conta</CardTitle>
        <CardDescription>
          Informe o seu e-mail abaixo para entrar na sua conta
        </CardDescription>
        <CardAction>
          <Button variant="link">Criar conta</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="card-email">E-mail</FieldLabel>
              <Input
                id="card-email"
                type="email"
                placeholder="voce@exemplo.com"
                required
              />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="card-password">Senha</FieldLabel>
                <a
                  href="#esqueci-a-senha"
                  className="ml-auto inline-block underline-offset-4 hover:underline"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <Input id="card-password" type="password" required />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Entrar
        </Button>
        <Button variant="outline" className="w-full">
          Entrar com Google
        </Button>
      </CardFooter>
    </Card>
  );
}
