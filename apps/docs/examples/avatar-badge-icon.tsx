import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar";
import { CheckIcon, PlusIcon } from "@phosphor-icons/react";

export default function AvatarBadgeIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Avatar size="lg">
        <AvatarImage
          src="https://github.com/pranathip.png"
          alt="@pranathip"
          className="grayscale"
        />
        <AvatarFallback>PP</AvatarFallback>
        <AvatarBadge>
          <PlusIcon />
        </AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>PP</AvatarFallback>
        <AvatarBadge>
          <CheckIcon />
        </AvatarBadge>
      </Avatar>
    </div>
  );
}
