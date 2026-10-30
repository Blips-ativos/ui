import { Toggle } from "@blips/ui/components/toggle";
import { TextItalicIcon } from "@phosphor-icons/react";

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Alternar itálico">
      <TextItalicIcon />
      Itálico
    </Toggle>
  );
}
