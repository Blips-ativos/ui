"use client";

import { Button } from "@blips/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blips/ui/components/collapsible";
import { CaretUpDownIcon } from "@phosphor-icons/react";
import * as React from "react";

export default function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">
          @anasouza favoritou 3 repositórios
        </h4>
        <CollapsibleTrigger
          render={<Button variant="ghost" size="icon" className="size-8" />}
        >
          <CaretUpDownIcon />
          <span className="sr-only">Alternar</span>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-xs">
        @base-ui/react
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-xs">
          @phosphor-icons/react
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-xs">
          @blips/ui
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
