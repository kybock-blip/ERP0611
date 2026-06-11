import { GoogleGenerativeAI, type Content } from "@google/generative-ai";
import { getForestLawText, FOREST_LAW_TITLE } from "@/lib/forest-law";
import { OUT_OF_SCOPE_REPLY, tryLocalLawReply } from "@/lib/law-relevance";
import type { ChatMessage } from "@/lib/types/chat";

export type { ChatMessage };

const SYSTEM_INSTRUCTION = `당신은 (주)라온누리나무병원의 ${FOREST_LAW_TITLE} 전문 상담 AI입니다.
아래 제공된 법령 전문만을 근거로 질문에 답변하세요.

답변 규칙:
1. 질문에 대한 근거가 아래 법령 전문에 명확히 있을 때만 답변합니다.
2. 답변 시 가능하면 관련 조항(제○조 등)을 인용합니다.
3. 아래 중 하나라도 해당하면 다른 설명 없이 정확히 "${OUT_OF_SCOPE_REPLY}"만 출력합니다.
   - 질문이 ${FOREST_LAW_TITLE}과 무관한 경우
   - 법령 전문에서 관련 조항·내용을 찾을 수 없는 경우
   - 일반 상식, 추측, 다른 법령에 의존해야만 답할 수 있는 경우
   - 기관의 주소·위치·연락처 등 본문에 없는 정보를 묻는 경우
4. 법령에 있는 내용을 답할 때는 한국어로 간결하고 이해하기 쉽게 작성합니다.
5. "${OUT_OF_SCOPE_REPLY}" 외의 문장을 덧붙이지 마세요.`;

function buildModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY가 설정되지 않았습니다. Vercel 환경변수를 확인하세요.");
  }

  const lawText = getForestLawText();
  const genAI = new GoogleGenerativeAI(apiKey);

  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash-lite",
    systemInstruction: `${SYSTEM_INSTRUCTION}\n\n[${FOREST_LAW_TITLE} 전문]\n${lawText}`,
  });
}

function toGeminiHistory(messages: ChatMessage[]): Content[] {
  const prior = messages.slice(0, -1);

  let start = 0;
  while (start < prior.length && prior[start].role === "assistant") {
    start += 1;
  }

  return prior.slice(start).map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content }],
  }));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRetryDelayMs(error: unknown): number | null {
  if (!(error instanceof Error)) return null;

  const secondsMatch =
    error.message.match(/retry in (\d+(?:\.\d+)?)s/i) ??
    error.message.match(/"retryDelay":"(\d+)s"/);

  if (!secondsMatch) return null;

  const seconds = Number(secondsMatch[1]);
  if (!Number.isFinite(seconds) || seconds <= 0 || seconds > 45) return null;

  return Math.ceil(seconds * 1000) + 500;
}

async function requestGeminiReply(messages: ChatMessage[]): Promise<string> {
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

export async function generateLawChatReply(messages: ChatMessage[]): Promise<string> {
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    throw new Error("마지막 메시지는 사용자 질문이어야 합니다.");
  }

  const lastMessage = messages[messages.length - 1].content;
  const localReply = tryLocalLawReply(lastMessage);
  if (localReply) return localReply;

  try {
    return await requestGeminiReply(messages);
  } catch (error) {
    const retryMs = getRetryDelayMs(error);
    if (retryMs) {
      await sleep(retryMs);
      return await requestGeminiReply(messages);
    }
    throw error;
  }
}
