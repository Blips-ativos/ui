import { Badge } from "@blips/ui/components/badge";
import { ArrowRightIcon, CheckCircleIcon } from "@phosphor-icons/react";

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">
        <CheckCircleIcon data-icon="inline-start" />
        Verificado
      </Badge>
      <Badge variant="outline">
        Ver detalhes
        <ArrowRightIcon data-icon="inline-end" />
      </Badge>
    </div>
  );
}
