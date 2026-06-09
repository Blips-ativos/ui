import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar";
import { Plus } from "@phosphor-icons/react";

export function AvatarBadgeIconExample() {
  return (
    <Avatar className="grayscale">
      <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <Plus />
      </AvatarBadge>
    </Avatar>
  );
}
