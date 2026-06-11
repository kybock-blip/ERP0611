import { NextResponse } from "next/server";
import { generateLawChatReply, type ChatMessage } from "@/lib/gemini";

export const runtime = "nodejs";
export const maxDuration = 60;

function isValidMessages(value: unknown): value is ChatMessage[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > 30) return false;

  return value.every(
    (msg) =>
      msg &&
      typeof msg === "object" &&
      (msg.role === "user" || msg.role === "assistant") &&
      typeof msg.content === "string" &&
      msg.content.trim().length > 0 &&
      msg.content.length <= 4000
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isValidMessages(body.messages)) {
      return NextResponse.json(
        { error: "유효하지 않은 메시지 형식입니다." },
        { status: 400 }
      );
    }

    const reply = await generateLawChatReply(body.messages);
    return NextResponse.json({ reply });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "챗봇 응답 생성 중 오류가 발생했습니다.";

    const status = message.includes("GEMINI_API_KEY") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
