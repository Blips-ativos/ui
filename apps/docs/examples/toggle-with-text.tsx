"use client";

import { Toggle } from "@blips/ui/components/toggle";
import { TextItalic } from "@phosphor-icons/react";

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <TextItalic className="h-4 w-4" />
      TextItalic
    </Toggle>
  );
}
