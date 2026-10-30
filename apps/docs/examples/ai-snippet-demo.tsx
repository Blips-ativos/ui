"use client";

import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
  SnippetText,
} from "@blips/ai/components/snippet";

export default function AiSnippetDemo() {
  return (
    <div className="w-full max-w-md">
      <Snippet code="pnpm add @blips/ai">
        <SnippetAddon>
          <SnippetText>$</SnippetText>
        </SnippetAddon>
        <SnippetInput />
        <SnippetAddon align="inline-end">
          <SnippetCopyButton />
        </SnippetAddon>
      </Snippet>
    </div>
  );
}
