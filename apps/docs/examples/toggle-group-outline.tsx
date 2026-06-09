"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group";
import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react";

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <TextB className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <TextItalic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <TextUnderline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
