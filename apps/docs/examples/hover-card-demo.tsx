"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar";
import { Button } from "@blips/ui/components/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@blips/ui/components/hover-card";
import { CalendarBlankIcon } from "@phosphor-icons/react";

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>
        @nextjs
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h4 className="font-medium">@nextjs</h4>
            <p>O framework React, criado e mantido pela @vercel.</p>
            <div className="flex items-center gap-1 text-muted-foreground">
              <CalendarBlankIcon className="size-3.5" />
              Entrou em dezembro de 2021
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
