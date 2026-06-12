"use client";
import { Logo } from "@blips/brand";

export default function LogoRecolor() {
  return (
    <div className="flex items-center gap-6">
      <Logo variant="mark" className="size-12 text-primary" />
      <Logo variant="mark" className="size-12 text-foreground" />
      <Logo variant="mark" className="size-12 text-muted-foreground" />
    </div>
  );
}
