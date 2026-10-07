import { Badge } from "@blips/ui/components/badge";
import { Spinner } from "@blips/ui/components/spinner";

export default function SpinnerBadge() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge>
        <Spinner data-icon="inline-start" />
        Sincronizando
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Atualizando
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Processando
      </Badge>
    </div>
  );
}
