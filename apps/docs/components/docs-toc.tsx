"use client";

import { cn } from "@blips/ui/lib/utils";
import {
  AnchorProvider,
  type TableOfContents,
  TOCItem,
} from "fumadocs-core/toc";

export function DocsToc({ toc }: { toc: TableOfContents }) {
  if (toc.length === 0) return null;

  return (
    <div className="sticky top-[calc(var(--header-height)+2rem)] h-[calc(100svh-var(--header-height)-4rem)] overflow-auto pb-8 text-sm">
      <p className="text-foreground mb-3 font-medium">Nesta página</p>
      <AnchorProvider toc={toc}>
        <div className="flex flex-col gap-1.5 border-l">
          {toc.map((item) => (
            <TOCItem
              key={item.url}
              href={item.url}
              className={cn(
                "text-muted-foreground hover:text-foreground data-[active=true]:text-foreground data-[active=true]:border-primary -ml-px border-l border-transparent py-0.5 transition-colors"
              )}
              style={{ paddingLeft: `${(item.depth - 1) * 12 + 12}px` }}
            >
              {item.title}
            </TOCItem>
          ))}
        </div>
      </AnchorProvider>
    </div>
  );
}
