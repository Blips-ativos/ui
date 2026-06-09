"use client";

import { Toggle } from "@blips/ui/components/toggle";
import { TextB } from "@phosphor-icons/react";

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold">
      <TextB className="h-4 w-4" />
    </Toggle>
  );
}
