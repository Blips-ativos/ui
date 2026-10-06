"use client";

import { Button } from "@blips/ui/components/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@blips/ui/components/item";

const music = [
  { title: "Midnight City Lights", artist: "Neon Dreams", duration: "3:45" },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    duration: "4:05",
  },
  { title: "Digital Rain", artist: "Cyber Symphony", duration: "3:30" },
];

export default function ItemImageDemo() {
  return (
    <ItemGroup className="w-full max-w-md gap-4">
      {music.map((song) => (
        <Item key={song.title} variant="outline">
          <ItemMedia variant="image">
            {/* biome-ignore lint/performance/noImgElement: demo com imagem externa, sem next/image */}
            <img
              src={`https://avatar.vercel.sh/${song.title}`}
              alt={song.title}
              width={32}
              height={32}
              className="object-cover grayscale"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-1">{song.title}</ItemTitle>
            <ItemDescription>{song.artist}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <span className="text-xs text-muted-foreground">
              {song.duration}
            </span>
            <Button variant="outline" size="sm">
              Ouvir
            </Button>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
}
