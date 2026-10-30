"use client";

import { Button } from "@blips/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@phosphor-icons/react";
import * as React from "react";

export default function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState<string>("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Posição do painel
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Posição do painel</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">
              <ArrowUpIcon />
              Em cima
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              <ArrowDownIcon />
              Embaixo
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right" disabled>
              <ArrowRightIcon />
              Direita
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
