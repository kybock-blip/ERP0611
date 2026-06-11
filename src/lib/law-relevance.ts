import { getForestLawText, FOREST_LAW_TITLE } from "@/lib/forest-law";

export const OUT_OF_SCOPE_REPLY = "법령에 있지 않습니다.";

const LOCATION_QUESTION =
  /어디|위치|주소|소재지|몇\s*층|건물|찾아가|가는\s*법|오시는/;

const STOP_WORDS = new Set([
  "있지",
  "있나요",
  "있습니까",
  "인가요",
  "무엇",
  "어떻게",
  "알려",
  "주세요",
  "해주세요",
  "되나요",
  "되나",
  "하나요",
  "인지",
  "어디",
  "위치",
  "주소",
]);

function extractTerms(question: string): string[] {
  const terms = question.match(/[\uAC00-\uD7A3]{2,}/g) ?? [];
  return [...new Set(terms.filter((term) => !STOP_WORDS.has(term)))];
}

/** API 호출 없이 법령 본문만으로 답할 수 없는 질문을 걸러냅니다. */
export function tryLocalLawReply(question: string): string | null {
  const q = question.trim();
  if (!q) return OUT_OF_SCOPE_REPLY;

  const lawText = getForestLawText();

  // 법령 본문에 기관·장소의 주소/위치 정보는 없음 (연락처만 있음)
  if (LOCATION_QUESTION.test(q)) {
    const asksOrganizationLocation =
      /산림청|산림청장|법제처|농림축산식품부/.test(q) &&
      !/소재지|주된\s*사무소/.test(q);

    if (asksOrganizationLocation) {
      return OUT_OF_SCOPE_REPLY;
    }

    const hasAddressContextInLaw = /소재지|주된\s*사무소/.test(lawText);
    if (!hasAddressContextInLaw || !/소재지|나무병원|보호수|사무소/.test(q)) {
      return OUT_OF_SCOPE_REPLY;
    }
  }

  const terms = extractTerms(q);
  if (terms.length === 0) {
    return OUT_OF_SCOPE_REPLY;
  }

  const matched = terms.filter((term) => lawText.includes(term));
  const relevance = matched.length / terms.length;

  // 법령 본문과 관련 없는 일반 질문
  if (relevance < 0.34) {
    return OUT_OF_SCOPE_REPLY;
  }

  // 산림보호법과 무관한 주제
  if (
    /날씨|주식|비트코인|축구|연예인|맛집|레시피|번역|영어|수학|코딩/.test(q) &&
    !lawText.includes(terms[0] ?? "")
  ) {
    return OUT_OF_SCOPE_REPLY;
  }

  return null;
}

export function isGeminiRateLimitError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("429") || message.includes("Too Many Requests") || message.includes("quota");
}

export function toUserFacingChatError(error: unknown): { message: string; status: number } {
  if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
    return {
      message: "AI 서비스 설정이 완료되지 않았습니다. 관리자에게 문의하세요.",
      status: 503,
    };
  }

  if (isGeminiRateLimitError(error)) {
    const errorMessage = error instanceof Error ? error.message : "";
    const retryMatch =
      errorMessage.match(/retry in (\d+(?:\.\d+)?)s/i) ??
      errorMessage.match(/"retryDelay":"(\d+)s"/);

    const seconds = retryMatch ? Math.ceil(Number(retryMatch[1])) : 40;

    return {
      message: `AI 요청 한도를 초과했습니다. 약 ${seconds}초 후 다시 시도해 주세요. (무료 API 일일 한도: 모델당 20회)`,
      status: 429,
    };
  }

  return {
    message: "답변 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    status: 500,
  };
}
