import { Toggle } from "@blips/ui/components/toggle";
import { TextItalic } from "@phosphor-icons/react";

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <TextItalic />
    </Toggle>
  );
}
