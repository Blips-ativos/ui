"use client";

import { Button } from "@blips/ui/components/button";
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
      <p className="text-muted-foreground mt-6 text-sm">
        Preview{" "}
        <code className="bg-muted rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        não encontrado no registry.
      </p>
    );
  }

  const Component = entry.component;

  return (
    <div
      data-slot="component-preview"
      className="not-prose group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-xl border"
    >
      {/* preview */}
      <div className="preview flex min-h-72 w-full items-center justify-center p-10">
        <Suspense
          fallback={
            <div className="text-muted-foreground text-sm">Carregando…</div>
          }
        >
          <Component />
        </Suspense>
      </div>

      {/* code */}
      <div
        data-slot="code"
        className="relative border-t [&_[data-rehype-pretty-code-figure]]:m-0! [&_[data-rehype-pretty-code-figure]]:rounded-none [&_[data-rehype-pretty-code-figure]]:border-0"
      >
        {showCode ? (
          <div
            data-rehype-pretty-code-figure=""
            className="[&_pre]:max-h-96 [&_pre]:overflow-auto"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: build-time shiki output
            dangerouslySetInnerHTML={{ __html: entry.highlightedSource }}
          />
        ) : (
          <div className="relative max-h-32 overflow-hidden">
            <div
              data-rehype-pretty-code-figure=""
              // biome-ignore lint/security/noDangerouslySetInnerHtml: build-time shiki output
              dangerouslySetInnerHTML={{ __html: entry.highlightedSource }}
            />
            <div className="absolute inset-0 flex items-center justify-center pb-4">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, var(--color-code), color-mix(in oklab, var(--color-code) 60%, transparent), transparent)",
                }}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="bg-background hover:bg-muted relative z-10 rounded-lg shadow-none"
                onClick={() => setShowCode(true)}
              >
                Ver código
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
