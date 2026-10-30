import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group";
import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";

export default function ToggleGroupDisabled() {
  return (
    <ToggleGroup multiple disabled spacing={1}>
      <ToggleGroupItem value="bold" aria-label="Alternar negrito">
        <TextBIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Alternar itálico">
        <TextItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Alternar sublinhado">
        <TextUnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
