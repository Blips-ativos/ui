import { Badge } from "@blips/ui/components/badge";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

export default function BadgeAsLink() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        render={
          <a href="#link">
            Abrir link <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        }
      />
      <Badge
        variant="secondary"
        render={
          <a href="#link">
            Abrir link <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        }
      />
      <Badge
        variant="ghost"
        render={
          <a href="#link">
            Abrir link <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        }
      />
    </div>
  );
}
