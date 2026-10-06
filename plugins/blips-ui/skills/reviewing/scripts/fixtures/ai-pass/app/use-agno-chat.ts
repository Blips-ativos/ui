"use client";

import type { ChatStatus, DynamicToolUIPart, UIMessage } from "ai";
import { useCallback, useRef, useState } from "react";

// Só o que o mapeamento lê dos eventos SSE do AgentOS (Agno). Cada evento chega
// como "event: <Nome>\ndata: <JSON>\n\n".
type AgnoEvent = {
  event: string;
  run_id?: string;
  parent_run_id?: string | null;
  content?: string;
  reasoning_content?: string;
  tool?: {
    tool_call_id?: string;
    tool_name?: string;
    tool_args?: Record<string, unknown>;
    result?: unknown;
    error?: string;
  };
};

type Part = UIMessage["parts"][number];

const upsertTool = (parts: Part[], next: DynamicToolUIPart): Part[] => {
  const index = parts.findIndex(
    (p) => p.type === "dynamic-tool" && p.toolCallId === next.toolCallId
  );
  if (index === -1) return [...parts, next];
  return parts.map((p, i) => (i === index ? next : p));
};

const appendDelta = (
  parts: Part[],
  type: "text" | "reasoning",
  delta: string
): Part[] => {
  const last = parts.at(-1);
  if (last?.type === type && last.state === "streaming") {
    return [...parts.slice(0, -1), { ...last, text: last.text + delta }];
  }
  return [...parts, { type, text: delta, state: "streaming" }];
};

const closeStreaming = (parts: Part[]): Part[] =>
  parts.map((p) =>
    (p.type === "text" || p.type === "reasoning") && p.state === "streaming"
      ? { ...p, state: "done" }
      : p
  );

/** Evento do AgentOS → parts do UIMessage do assistente. Função pura, testável. */
export function applyAgnoEvent(parts: Part[], ev: AgnoEvent): Part[] {
  // Fala interna de membro do Team (subagente) tem parent_run_id: não é a
  // resposta do turno. Mostre num Tool/ChainOfThought se quiser; nunca no texto.
  if (ev.parent_run_id) return parts;

  switch (ev.event) {
    case "RunContent":
    case "TeamRunContent": {
      let next = parts;
      if (ev.reasoning_content) {
        next = appendDelta(next, "reasoning", ev.reasoning_content);
      }
      return ev.content ? appendDelta(next, "text", ev.content) : next;
    }
    case "ReasoningStep":
    case "ReasoningContentDelta":
      return ev.reasoning_content || ev.content
        ? appendDelta(
            parts,
            "reasoning",
            ev.reasoning_content ?? ev.content ?? ""
          )
        : parts;
    case "ToolCallStarted":
    case "TeamToolCallStarted":
      return upsertTool(closeStreaming(parts), {
        type: "dynamic-tool",
        toolCallId: ev.tool?.tool_call_id ?? crypto.randomUUID(),
        toolName: ev.tool?.tool_name ?? "ferramenta",
        state: "input-available",
        input: ev.tool?.tool_args ?? {},
      });
    case "ToolCallCompleted":
    case "TeamToolCallCompleted":
      return upsertTool(parts, {
        type: "dynamic-tool",
        toolCallId: ev.tool?.tool_call_id ?? crypto.randomUUID(),
        toolName: ev.tool?.tool_name ?? "ferramenta",
        state: "output-available",
        input: ev.tool?.tool_args ?? {},
        output: ev.tool?.result,
      });
    case "ToolCallError":
    case "TeamToolCallError":
      return upsertTool(parts, {
        type: "dynamic-tool",
        toolCallId: ev.tool?.tool_call_id ?? crypto.randomUUID(),
        toolName: ev.tool?.tool_name ?? "ferramenta",
        state: "output-error",
        input: ev.tool?.tool_args,
        errorText: ev.tool?.error ?? "Falha na ferramenta",
      });
    case "RunCompleted":
    case "TeamRunCompleted":
    case "RunError":
    case "TeamRunError":
      return closeStreaming(parts);
    default:
      return parts;
  }
}

/** Lê o corpo SSE e entrega cada evento já parseado. */
async function* readSse(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) return;
    buffer += decoder.decode(value, { stream: true });
    let end = buffer.indexOf("\n\n");
    while (end !== -1) {
      const block = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      const data = block
        .split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trim())
        .join("");
      if (data) yield JSON.parse(data) as AgnoEvent;
      end = buffer.indexOf("\n\n");
    }
  }
}

/**
 * Mesmo formato do useChat ({ messages, status, sendMessage, stop }) sobre o
 * AgentOS. `endpoint` é uma rota do PRÓPRIO app (ex.: /api/agentos/teams/salvador/runs)
 * que repassa ao AgentOS com o Bearer no servidor — o token nunca vai ao browser.
 */
export function useAgnoChat({ endpoint }: { endpoint: string }) {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("ready");
  const abortRef = useRef<AbortController | null>(null);
  const sessionRef = useRef<string>(crypto.randomUUID());

  const sendMessage = useCallback(
    async ({ text }: { text: string }) => {
      const userMessage: UIMessage = {
        id: crypto.randomUUID(),
        role: "user",
        parts: [{ type: "text", text }],
      };
      const assistantId = crypto.randomUUID();
      setMessages((prev) => [...prev, userMessage]);
      setStatus("submitted");

      const form = new FormData();
      form.append("message", text);
      form.append("stream", "true");
      form.append("session_id", sessionRef.current);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: form,
          headers: { Accept: "text/event-stream" },
          signal: controller.signal,
        });
        if (!(response.ok && response.body))
          throw new Error(`HTTP ${response.status}`);

        let parts: Part[] = [];
        for await (const ev of readSse(response.body)) {
          if (ev.event === "RunError" || ev.event === "TeamRunError") {
            setStatus("error");
          }
          const next = applyAgnoEvent(parts, ev);
          if (next === parts) continue;
          parts = next;
          setMessages((prev) =>
            prev.some((m) => m.id === assistantId)
              ? prev.map((m) =>
                  m.id === assistantId ? { ...m, parts: next } : m
                )
              : [...prev, { id: assistantId, role: "assistant", parts: next }]
          );
          setStatus((s) => (s === "submitted" ? "streaming" : s));
        }
        setStatus((s) => (s === "error" ? s : "ready"));
      } catch (error) {
        setStatus(controller.signal.aborted ? "ready" : "error");
        if (!controller.signal.aborted) console.error(error);
      }
    },
    [endpoint]
  );

  const stop = useCallback(async () => {
    abortRef.current?.abort();
  }, []);

  return { messages, status, sendMessage, stop };
}
