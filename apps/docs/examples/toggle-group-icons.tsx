import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group";
import { BookmarkIcon, HeartIcon, StarIcon } from "@phosphor-icons/react";

const pressedClassName =
  "aria-pressed:bg-transparent aria-pressed:*:[svg]:fill-foreground aria-pressed:*:[svg]:stroke-foreground";

export default function ToggleGroupIcons() {
  return (
    <ToggleGroup multiple variant="outline" spacing={2} size="sm">
      <ToggleGroupItem
        value="star"
        aria-label="Alternar estrela"
        className={pressedClassName}
      >
        <StarIcon />
        Estrela
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heart"
        aria-label="Alternar curtida"
        className={pressedClassName}
      >
        <HeartIcon />
        Curtir
      </ToggleGroupItem>
      <ToggleGroupItem
        value="bookmark"
        aria-label="Alternar favorito"
        className={pressedClassName}
      >
        <BookmarkIcon />
        Favorito
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
