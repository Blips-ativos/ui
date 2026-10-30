"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar";
import { Button } from "@blips/ui/components/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@blips/ui/components/item";
import { PlusIcon } from "@phosphor-icons/react";
import * as React from "react";

const people = [
  {
    username: "shadcn",
    email: "shadcn@vercel.com",
    avatar: "https://github.com/shadcn.png",
  },
  {
    username: "maxleiter",
    email: "maxleiter@vercel.com",
    avatar: "https://github.com/maxleiter.png",
  },
  {
    username: "evilrabbit",
    email: "evilrabbit@vercel.com",
    avatar: "https://github.com/evilrabbit.png",
  },
];

export default function ItemGroupDemo() {
  return (
    <ItemGroup className="w-full max-w-sm">
      {people.map((person, index) => (
        <React.Fragment key={person.username}>
          <Item>
            <ItemMedia>
              <Avatar>
                <AvatarImage src={person.avatar} className="grayscale" />
                <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent className="gap-1">
              <ItemTitle>{person.username}</ItemTitle>
              <ItemDescription>{person.email}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label={`Convidar ${person.username}`}
              >
                <PlusIcon />
              </Button>
            </ItemActions>
          </Item>
          {index !== people.length - 1 && <ItemSeparator />}
        </React.Fragment>
      ))}
    </ItemGroup>
  );
}
