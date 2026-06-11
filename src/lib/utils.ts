import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount >= 100000000) {
    const eok = Math.floor(amount / 100000000);
    const man = Math.floor((amount % 100000000) / 10000);
    return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억원`;
  }
  if (amount >= 10000) return `${Math.floor(amount / 10000).toLocaleString()}만원`;
  return `${amount.toLocaleString()}원`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

export function calcProfit(revenue: number, cost: number) {
  const profit = revenue - cost;
  const profitRate = revenue > 0 ? (profit / revenue) * 100 : 0;
  return { profit, profitRate };
}
