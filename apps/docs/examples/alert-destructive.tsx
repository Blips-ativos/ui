import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@blips/ui/components/alert";
import { WarningCircleIcon } from "@phosphor-icons/react";

export default function AlertDestructive() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Alert variant="destructive">
        <WarningCircleIcon />
        <AlertTitle>Algo deu errado!</AlertTitle>
        <AlertDescription>
          Sua sessão expirou. Entre novamente.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <WarningCircleIcon />
        <AlertTitle>Não foi possível processar o pagamento.</AlertTitle>
        <AlertDescription>
          <p>
            Confira os seus <a href="#cobranca">dados de cobrança</a> e tente
            novamente.
          </p>
          <ul className="list-inside list-disc">
            <li>Confira os dados do cartão</li>
            <li>Verifique se há saldo suficiente</li>
            <li>Confirme o endereço de cobrança</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
