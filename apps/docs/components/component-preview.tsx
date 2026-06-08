"use client";

import React, { Suspense, useState } from "react";
import { registry } from "@/lib/__registry__";

interface ComponentPreviewProps {
  name: string;
}

export function ComponentPreview({ name }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);
  const entry = registry[name];

  if (!entry) {
    return (
      <div className="text-sm text-muted-foreground my-6 rounded-lg border p-4">
        Component preview <code>{name}</code> not found in registry.
      </div>
    );
  }

  const Component = entry.component;

  return (
    <div className="my-6 not-prose">
      <div className="relative rounded-lg border bg-background">
        <div className="flex min-h-[200px] items-center justify-center p-8">
          <Suspense
            fallback={
              <div className="text-muted-foreground text-sm">
                Loading...
              </div>
            }
          >
            <Component />
          </Suspense>
        </div>
      </div>
      <div className="mt-2">
        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          {showCode ? "Hide code" : "View code"}
        </button>
        {showCode && (
          <div className="mt-2 max-h-[400px] overflow-auto rounded-lg border bg-secondary/50">
            <pre className="p-4 text-sm">
              <code>{entry.source}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
