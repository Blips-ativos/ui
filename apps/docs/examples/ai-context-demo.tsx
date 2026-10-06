"use client";

import {
  Context,
  ContextCacheUsage,
  ContextContent,
  ContextContentBody,
  ContextContentFooter,
  ContextContentHeader,
  ContextInputUsage,
  ContextOutputUsage,
  ContextReasoningUsage,
  ContextTrigger,
} from "@blips/ai/components/context";
import type { LanguageModelUsage } from "ai";

// Uso acumulado da conversa, no formato do AI SDK (LanguageModelUsage).
const usage: LanguageModelUsage = {
  inputTokenDetails: {
    cacheReadTokens: 12_000,
    cacheWriteTokens: 0,
    noCacheTokens: 20_400,
  },
  inputTokens: 32_400,
  outputTokenDetails: {
    reasoningTokens: 2_100,
    textTokens: 5_100,
  },
  outputTokens: 7_200,
  totalTokens: 39_600,
};

export default function AiContextDemo() {
  return (
    <Context
      maxTokens={128_000}
      modelId="openai:gpt-5"
      usage={usage}
      usedTokens={39_600}
    >
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody className="space-y-1">
          <ContextInputUsage />
          <ContextOutputUsage />
          <ContextReasoningUsage />
          <ContextCacheUsage />
        </ContextContentBody>
        <ContextContentFooter />
      </ContextContent>
    </Context>
  );
}
