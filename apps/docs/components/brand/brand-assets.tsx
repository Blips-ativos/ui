"use client";

import { cn } from "@blips/ui/lib/utils";
import { DownloadSimple } from "@phosphor-icons/react";

type Asset = {
  name: string;
  file: string; // relativo a /brand
  format: string;
  on: "light" | "dark" | "both";
};

type Group = { title: string; assets: Asset[] };

const GROUPS: Group[] = [
  {
    title: "Logos",
    assets: [
      {
        name: "Logo · texto preto",
        file: "logo/blips-logo.svg",
        format: "SVG",
        on: "light",
      },
      {
        name: "Logo · texto branco",
        file: "logo/blips-logo-white.svg",
        format: "SVG",
        on: "dark",
      },
      {
        name: "Logo · texto preto",
        file: "logo/blips-logo.png",
        format: "PNG",
        on: "light",
      },
      {
        name: "Logo · texto branco",
        file: "logo/blips-logo-white.png",
        format: "PNG",
        on: "dark",
      },
    ],
  },
  {
    title: "Símbolo",
    assets: [
      {
        name: "b-mark",
        file: "mark/blips-mark.svg",
        format: "SVG",
        on: "both",
      },
      {
        name: "b-mark · círculo",
        file: "mark/blips-mark-circle.svg",
        format: "SVG",
        on: "both",
      },
      {
        name: "b-mark",
        file: "mark/blips-mark.png",
        format: "PNG",
        on: "both",
      },
    ],
  },
  {
    title: "Favicon & ícones",
    assets: [
      {
        name: "favicon",
        file: "favicon/favicon.svg",
        format: "SVG",
        on: "both",
      },
      {
        name: "favicon",
        file: "favicon/favicon.ico",
        format: "ICO",
        on: "both",
      },
      {
        name: "apple-touch-icon",
        file: "favicon/apple-touch-icon.png",
        format: "PNG",
        on: "both",
      },
      {
        name: "icon 192",
        file: "favicon/icon-192.png",
        format: "PNG",
        on: "both",
      },
      {
        name: "icon 512",
        file: "favicon/icon-512.png",
        format: "PNG",
        on: "both",
      },
    ],
  },
];

export function BrandAssets() {
  return (
    <div className="not-prose flex flex-col gap-8">
      {GROUPS.map((group) => (
        <section key={group.title} className="flex flex-col gap-3">
          <h3 className="font-semibold text-sm">{group.title}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.assets.map((asset) => (
              <AssetCard key={asset.file} asset={asset} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function AssetCard({ asset }: { asset: Asset }) {
  const src = `/brand/${asset.file}`;
  const tile =
    asset.on === "dark"
      ? "bg-neutral-900"
      : asset.on === "light"
        ? "bg-white"
        : "bg-[linear-gradient(90deg,#ffffff_50%,#171717_50%)]";

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border">
      <div className={cn("flex h-28 items-center justify-center p-4", tile)}>
        {/* biome-ignore lint/performance/noImgElement: assets de marca (SVG/PNG/ICO) servidos estáticos de /brand — next/image não cabe em export SSG e não lida bem com SVG */}
        <img
          src={src}
          alt={`${asset.name} (${asset.format})`}
          className="max-h-16 w-auto"
        />
      </div>
      <div className="flex items-center justify-between gap-2 border-t p-3">
        <span className="flex flex-col">
          <span className="font-medium text-sm">{asset.name}</span>
          <span className="text-muted-foreground text-xs">{asset.format}</span>
        </span>
        <a
          href={src}
          download
          aria-label={`Baixar ${asset.name} em ${asset.format}`}
          className="inline-flex size-8 items-center justify-center rounded-md border transition-colors hover:bg-accent"
        >
          <DownloadSimple className="size-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
