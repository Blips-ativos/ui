"use client";

import { Button } from "@blips/ui/components/button";
import { ButtonGroup } from "@blips/ui/components/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu";
import {
  Warning,
  Check,
  CaretDown,
  Copy,
  ShareNetwork,
  Trash,
  UserMinus,
  SpeakerSimpleX,
} from "@phosphor-icons/react";

export default function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="pl-2!">
            <CaretDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="[--radius:1rem]">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <SpeakerSimpleX />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Check />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Warning />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserMinus />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShareNetwork />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <Trash />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
