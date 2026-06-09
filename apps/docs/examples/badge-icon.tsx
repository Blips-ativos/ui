import { Badge } from "@blips/ui/components/badge";
import { SealCheck, Bookmark } from "@phosphor-icons/react";

export function BadgeWithIconLeft() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">
        <SealCheck data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="outline">
        Bookmark
        <Bookmark data-icon="inline-end" />
      </Badge>
    </div>
  );
}
