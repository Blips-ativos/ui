"use client";

import { LogoLoader } from "@blips/brand/logo-loader";

// O draw in/out empacotado como <LogoLoader> (de @blips/brand): sem props =
// indeterminado (loop); progress (0–100) = determinado; disabled = marca cheia
// estática em muted.
export default function LogoDrawOn() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-10">
      <figure className="m-0 flex flex-col items-center gap-3">
        <LogoLoader className="size-20" />
        <figcaption className="font-mono text-muted-foreground text-xs">
          indeterminado
        </figcaption>
      </figure>
      <figure className="m-0 flex flex-col items-center gap-3">
        <LogoLoader className="size-20" progress={65} />
        <figcaption className="font-mono text-muted-foreground text-xs">
          progress={"{65}"}
        </figcaption>
      </figure>
      <figure className="m-0 flex flex-col items-center gap-3">
        <LogoLoader className="size-20" disabled />
        <figcaption className="font-mono text-muted-foreground text-xs">
          disabled
        </figcaption>
      </figure>
    </div>
  );
}
