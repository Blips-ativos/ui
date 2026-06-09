import { Toggle } from "@blips/ui/components/toggle";
import { TextUnderline } from "@phosphor-icons/react";

export default function ToggleDisabled() {
  return (
    <Toggle aria-label="Toggle italic" disabled>
      <TextUnderline className="h-4 w-4" />
    </Toggle>
  );
}
