"use client";

import { BLIPS_YELLOW, BLIPS_YELLOW_OKLCH } from "@blips/brand";
import { cn } from "@blips/ui/lib/utils";
import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

type Token = { value: string; hint: string };

const TOKENS: Token[] = [
  { value: BLIPS_YELLOW, hint: "Hex" },
  { value: BLIPS_YELLOW_OKLCH, hint: "OKLCH · token --primary" },
];

export function ColorTokens() {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      <div className="overflow-hidden rounded-lg border">
        <div
          className="h-28 w-full"
          style={{ backgroundColor: BLIPS_YELLOW }}
        />
        <div className="flex items-center justify-between gap-2 p-3">
          <span className="font-medium text-sm">Amarelo Blips</span>
          <span className="text-muted-foreground text-xs">primary</span>
        </div>
      </div>
      <div className="grid content-start gap-2">
        {TOKENS.map((token) => (
          <CopyRow key={token.value} token={token} />
        ))}
      </div>
    </div>
  );
}

function CopyRow({ token }: { token: Token }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(token.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copiar ${token.hint}: ${token.value}`}
      className={cn(
        "flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-left transition-colors hover:bg-accent"
      )}
    >
      <span className="flex flex-col">
        <code className="font-mono text-sm">{token.value}</code>
        <span className="text-muted-foreground text-xs">{token.hint}</span>
      </span>
      {copied ? (
        <Check className="size-4 text-primary" aria-hidden />
      ) : (
        <Copy className="size-4 text-muted-foreground" aria-hidden />
      )}
    </button>
  );
}
