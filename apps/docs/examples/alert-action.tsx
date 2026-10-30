import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@blips/ui/components/alert";
import { Badge } from "@blips/ui/components/badge";
import { Button } from "@blips/ui/components/button";
import { WarningCircleIcon } from "@phosphor-icons/react";

export default function AlertWithAction() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Alert>
        <WarningCircleIcon />
        <AlertTitle>
          Os e-mails selecionados foram marcados como spam.
        </AlertTitle>
        <AlertAction>
          <Button size="xs">Desfazer</Button>
        </AlertAction>
      </Alert>
      <Alert>
        <WarningCircleIcon />
        <AlertTitle>
          Os e-mails selecionados foram marcados como spam.
        </AlertTitle>
        <AlertDescription>
          Eles continuam na pasta de spam por 30 dias.
        </AlertDescription>
        <AlertAction>
          <Badge variant="secondary">Novo</Badge>
        </AlertAction>
      </Alert>
    </div>
  );
}
