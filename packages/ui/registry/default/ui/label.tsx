"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

// Label nativo (<label>): no Base UI não há primitivo de Label; a associação
// com o controle é feita por htmlFor ou aninhamento.
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor ou o controle aninhado vêm de quem consome
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-xs/relaxed leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Label };
