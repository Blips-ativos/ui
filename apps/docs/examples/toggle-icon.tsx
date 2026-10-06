import { Toggle } from "@blips/ui/components/toggle";
import { BookmarkIcon } from "@phosphor-icons/react";

export default function ToggleIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Alternar favorito" defaultPressed>
        <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
      </Toggle>
      <Toggle variant="outline" aria-label="Alternar favorito">
        <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
        Favorito
      </Toggle>
    </div>
  );
}
