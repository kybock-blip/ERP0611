"use client";

import { PageShell } from "@/components/layout/page-shell";
import { LawChatPanel } from "@/components/chat/law-chat-panel";

export default function ChatPage() {
  return (
    <PageShell
      title="법령 상담"
      description="산림보호법 시행령 AI 챗봇 — 현장·업무 관련 법령 질의응답"
    >
      <LawChatPanel />
    </PageShell>
  );
}
