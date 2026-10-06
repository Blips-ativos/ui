import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@blips/ui/components/alert";
import { TerminalIcon } from "@phosphor-icons/react";

export default function AlertDemo() {
  return (
    <Alert className="max-w-lg">
      <TerminalIcon />
      <AlertTitle>Atenção!</AlertTitle>
      <AlertDescription>
        Você pode adicionar componentes ao seu app usando a CLI.
      </AlertDescription>
    </Alert>
  );
}
