import { findNeighbour, type Root } from "fumadocs-core/page-tree";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export function DocsPager({ tree, url }: { tree: Root; url: string }) {
  const { previous, next } = findNeighbour(tree, url);

  if (!previous && !next) return null;

  return (
    <div className="grid grid-cols-2 gap-4 border-t pt-6">
      {previous ? (
        <Link
          href={previous.url}
          className="hover:bg-accent/50 flex flex-col gap-1 rounded-lg border p-3 text-sm transition-colors"
        >
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <ChevronLeftIcon className="size-3" />
            Anterior
          </span>
          <span className="font-medium">{previous.name}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.url}
          className="hover:bg-accent/50 flex flex-col items-end gap-1 rounded-lg border p-3 text-right text-sm transition-colors"
        >
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            Próximo
            <ChevronRightIcon className="size-3" />
          </span>
          <span className="font-medium">{next.name}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
