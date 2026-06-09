"use client";

import { Button } from "@blips/ui/components/button";
import { cn } from "@blips/ui/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import * as React from "react";

export function CopyButton({
  value,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { value: string; src?: string }) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (!hasCopied) return;
    const timer = setTimeout(() => setHasCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [hasCopied]);

  return (
    <Button
      data-slot="copy-button"
      size="icon"
      variant="ghost"
      className={cn(
        "absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100",
        className
      )}
      onClick={() => {
        navigator.clipboard?.writeText(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copiar</span>
      {hasCopied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}
