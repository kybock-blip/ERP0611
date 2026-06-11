import { readFileSync } from "fs";
import path from "path";

let cachedLawText: string | null = null;

export function getForestLawText(): string {
  if (cachedLawText) return cachedLawText;

  const filePath = path.join(process.cwd(), "data", "forest-protection-law.txt");
  cachedLawText = readFileSync(filePath, "utf-8");
  return cachedLawText;
}

export const FOREST_LAW_TITLE = "산림보호법 시행령";
