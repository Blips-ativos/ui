"use client";

import { Toggle } from "@blips/ui/components/toggle";
import { Italic } from "lucide-react";

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <Italic className="h-4 w-4" />
      Italic
    </Toggle>
  );
}
