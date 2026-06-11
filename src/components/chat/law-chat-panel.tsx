"use client";

import { useRef, useState } from "react";
import { Bot, Loader2, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types/chat";

const SUGGESTED_QUESTIONS = [
  "산림보호구역에서 허용되는 행위는 무엇인가요?",
  "입목 벌채 허가가 필요한 경우를 알려주세요.",
  "산림유전자원보호구역의 행위 제한은 어떻게 되나요?",
  "병해충 방제 시설 설치 관련 규정이 있나요?",
];

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "안녕하세요. 산림보호법 상담 챗봇입니다. 법률 본문에 있는 내용만 답변하며, 관련 없는 질문에는 \"법령에 있지 않습니다.\"라고 안내합니다.",
};

export function LawChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);
    scrollToBottom();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "응답을 받지 못했습니다.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      scrollToBottom();
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex h-[calc(100vh-12rem)] min-h-[520px] flex-col">
      <CardHeader className="shrink-0 border-b border-hairline pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Bot className="h-5 w-5 text-primary" />
          산림보호법 상담
        </CardTitle>
        <CardDescription>
          산림보호법(법률 제20751호, 2026.2.1. 시행) 기반 AI 답변
        </CardDescription>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-3 p-0">
        <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {messages.map((msg, index) => (
            <div
              key={`${msg.role}-${index}`}
              className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-md px-4 py-3 text-caption leading-relaxed whitespace-pre-wrap",
                  msg.role === "user"
                    ? "bg-primary text-on-primary"
                    : "border border-hairline bg-surface-pearl text-ink dark:border-surface-tile-3 dark:bg-surface-tile-3 dark:text-on-dark"
                )}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-on-dark">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-caption text-ink-muted-48">
              <Loader2 className="h-4 w-4 animate-spin" />
              법령을 검토하고 답변을 작성하는 중…
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 px-4">
            {SUGGESTED_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => sendMessage(question)}
                className="btn-press rounded-pill border border-hairline bg-canvas px-3 py-1.5 text-fine-print text-ink-muted-80 hover:bg-surface-pearl dark:border-surface-tile-3 dark:bg-surface-tile-2 dark:text-body-muted"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {error && (
          <p className="px-4 text-caption text-red-600">{error}</p>
        )}

        <form
          className="flex shrink-0 gap-2 border-t border-hairline p-4 dark:border-surface-tile-3"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="산림보호법 관련 질문을 입력하세요…"
            disabled={loading}
            className="flex h-11 flex-1 rounded-sm border border-hairline bg-canvas px-3 text-caption outline-none focus:border-primary dark:border-surface-tile-3 dark:bg-surface-tile-3"
          />
          <Button type="submit" disabled={loading || !input.trim()} className="shrink-0">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            전송
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
