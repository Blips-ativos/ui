import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@blips/ui/components/alert";
import { WarningCircle } from "@phosphor-icons/react";

export default function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <WarningCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}
