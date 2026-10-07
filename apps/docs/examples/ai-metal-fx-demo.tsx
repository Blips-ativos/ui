"use client";

import { BlipsMetalFx } from "@blips/ai/fx/metal-fx";
import { Button } from "@blips/ui/components/button";
import { SparkleIcon } from "@phosphor-icons/react";

export default function AiMetalFxDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <BlipsMetalFx>
        <Button className="rounded-full px-5" variant="secondary">
          <SparkleIcon />
          Ativar o assistente
        </Button>
      </BlipsMetalFx>
      <p className="text-muted-foreground text-xs">
        Anel de metal líquido na tinta da marca, sobre um botão da @blips/ui.
      </p>
    </div>
  );
}
