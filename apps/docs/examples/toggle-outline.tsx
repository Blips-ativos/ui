import { Toggle } from "@blips/ui/components/toggle";
import { TextBIcon, TextItalicIcon } from "@phosphor-icons/react";

export default function ToggleOutline() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="Alternar itálico">
        <TextItalicIcon />
        Itálico
      </Toggle>
      <Toggle variant="outline" aria-label="Alternar negrito">
        <TextBIcon />
        Negrito
      </Toggle>
    </div>
  );
}
