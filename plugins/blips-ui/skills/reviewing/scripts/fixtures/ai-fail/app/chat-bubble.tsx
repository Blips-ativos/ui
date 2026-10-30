"use client";

import { useEffect, useRef } from "react";

// Fixture que FALHA de propósito: bolha e lista de chat recriadas à mão.
export function ChatBubble({
  role,
  text,
}: {
  role: "user" | "assistant";
  text: string;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div className="flex flex-col gap-2">
      <div className={role === "user" ? "ms-auto bg-primary" : "bg-muted"}>
        {text}
      </div>
      <div ref={endRef} />
    </div>
  );
}
