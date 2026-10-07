"use client";

import { BlipsMetalFx } from "@blips/ai/fx/metal-fx";
import { Button } from "@blips/ui/components/button";
import { ArrowUpIcon, PaperclipIcon } from "@phosphor-icons/react";
import { useRef } from "react";

export default function AiMetalFxVariants() {
  const anexoRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex w-full max-w-sm items-center gap-2 rounded-xl border bg-card p-2">
      <Button
        aria-label="Anexar arquivo"
        ref={anexoRef}
        size="icon"
        variant="ghost"
      >
        <PaperclipIcon />
      </Button>
      <span className="flex-1 truncate text-muted-foreground text-sm">
        Pergunte ao Salvador sobre o contrato…
      </span>
      <BlipsMetalFx reflectionTargets={[anexoRef]} variant="circle">
        <Button
          aria-label="Enviar"
          className="rounded-full"
          size="icon"
          variant="secondary"
        >
          <ArrowUpIcon />
        </Button>
      </BlipsMetalFx>
    </div>
  );
}
