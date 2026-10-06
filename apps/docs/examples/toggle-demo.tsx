import { Toggle } from "@blips/ui/components/toggle";
import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";

export default function ToggleDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Alternar negrito" defaultPressed>
        <TextBIcon />
      </Toggle>
      <Toggle aria-label="Alternar itálico">
        <TextItalicIcon />
      </Toggle>
      <Toggle aria-label="Alternar sublinhado">
        <TextUnderlineIcon />
      </Toggle>
    </div>
  );
}
