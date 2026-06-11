import { GoogleGenerativeAI, type Content } from "@google/generative-ai";
import { getForestLawText, FOREST_LAW_TITLE } from "@/lib/forest-law";
import type { ChatMessage } from "@/lib/types/chat";

export type { ChatMessage };

const SYSTEM_INSTRUCTION = `당신은 (주)라온누리나무병원의 ${FOREST_LAW_TITLE} 전문 상담 AI입니다.
아래 제공된 법령 전문을 근거로 질문에 답변하세요.

답변 규칙:
1. 법령 본문에 근거하여 정확하게 답변합니다.
2. 가능하면 관련 조항(제○조 등)을 인용합니다.
3. 법령에 명시되지 않은 내용은 추측하지 말고, 확인이 필요함을 안내합니다.
4. 한국어로 간결하고 이해하기 쉽게 답변합니다.
5. 수목관리·나무병원·조경 현장 실무 관점에서 실용적인 설명을 덧붙일 수 있습니다.`;

function buildModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY가 설정되지 않았습니다. Vercel 환경변수를 확인하세요.");
  }

  const lawText = getForestLawText();
  const genAI = new GoogleGenerativeAI(apiKey);

  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? "gemini-2.0-flash",
    systemInstruction: `${SYSTEM_INSTRUCTION}\n\n[${FOREST_LAW_TITLE} 전문]\n${lawText}`,
  });
}

function toGeminiHistory(messages: ChatMessage[]): Content[] {
  return messages.slice(0, -1).map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content }],
  }));
}

export async function generateLawChatReply(messages: ChatMessage[]): Promise<string> {
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    throw new Error("마지막 메시지는 사용자 질문이어야 합니다.");
  }

  const model = buildModel();
  const lastMessage = messages[messages.length - 1].content;
  const history = toGeminiHistory(messages);

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(lastMessage);
  const text = result.response.text();

  if (!text?.trim()) {
    throw new Error("Gemini API가 빈 응답을 반환했습니다.");
  }

  return text.trim();
}
