import { Badge } from "@blips/ui/components/badge";
import { Spinner } from "@blips/ui/components/spinner";

export default function BadgeWithSpinner() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="destructive">
        <Spinner data-icon="inline-start" />
        Excluindo
      </Badge>
      <Badge variant="secondary">
        Gerando
        <Spinner data-icon="inline-end" />
      </Badge>
    </div>
  );
}
