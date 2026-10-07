"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@blips/ai/components/conversation";
import { ChatCircleDotsIcon } from "@phosphor-icons/react";

export default function AiConversationEmpty() {
  return (
    <div className="flex h-72 w-full max-w-lg min-w-0 flex-col overflow-hidden rounded-lg border">
      <Conversation>
        <ConversationContent className="h-full">
          <ConversationEmptyState
            description="Pergunte sobre contratos, garantia ou financeiro."
            icon={<ChatCircleDotsIcon className="size-8" />}
          />
        </ConversationContent>
      </Conversation>
    </div>
  );
}
