import { Badge } from "@blips/ui/components/badge";
import { ArrowUpRight } from "@phosphor-icons/react";

export function BadgeAsLink() {
  return (
    <Badge asChild>
      <a href="#link">
        Open Link <ArrowUpRight data-icon="inline-end" />
      </a>
    </Badge>
  );
}
