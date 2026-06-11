import type { UserRole } from "@/lib/types";

export const APP_NAME = "GreenTree ERP";

export const CUSTOMER_TYPES = [
  { value: "individual", label: "개인" },
  { value: "corporate", label: "법인" },
  { value: "public", label: "공공기관" },
  { value: "school", label: "학교" },
  { value: "apartment", label: "아파트" },
  { value: "park", label: "공원" },
] as const;

export const PROJECT_STATUSES = [
  { value: "estimate", label: "견적", color: "muted" as const },
  { value: "contract", label: "계약", color: "primary" as const },
  { value: "in_progress", label: "진행중", color: "selected" as const },
  { value: "completed", label: "완료", color: "default" as const },
  { value: "on_hold", label: "보류", color: "muted" as const },
] as const;

export const COST_CATEGORIES = [
  { value: "labor", label: "인건비" },
  { value: "material", label: "자재비" },
  { value: "equipment", label: "장비비" },
  { value: "subcontract", label: "외주비" },
  { value: "other", label: "기타경비" },
] as const;

export const ESTIMATE_ITEMS = [
  "수목 전정",
  "수목 진단",
  "수목치료",
  "병해충 방제",
  "식재",
  "조경공사",
] as const;

export const CERTIFICATIONS = [
  "나무의사",
  "수목치료기술자",
  "조경기사",
  "산림기사",
] as const;

export const USER_ROLES = [
  { value: "owner", label: "대표" },
  { value: "admin", label: "관리자" },
  { value: "manager", label: "팀장" },
  { value: "staff", label: "직원" },
] as const;

export const NAV_ITEMS: {
  href: string;
  label: string;
  icon: string;
  roles: UserRole[];
}[] = [
  { href: "/dashboard", label: "대시보드", icon: "LayoutDashboard", roles: ["owner", "admin", "manager", "staff"] },
  { href: "/crm", label: "CRM", icon: "Users", roles: ["owner", "admin", "manager", "staff"] },
  { href: "/projects", label: "프로젝트", icon: "FolderKanban", roles: ["owner", "admin", "manager", "staff"] },
  { href: "/schedule", label: "일정", icon: "Calendar", roles: ["owner", "admin", "manager", "staff"] },
  { href: "/field-work", label: "현장관리", icon: "MapPin", roles: ["owner", "admin", "manager", "staff"] },
  { href: "/estimates", label: "견적", icon: "FileText", roles: ["owner", "admin", "manager"] },
  { href: "/contracts", label: "계약", icon: "FileSignature", roles: ["owner", "admin", "manager"] },
  { href: "/accounting", label: "회계", icon: "Wallet", roles: ["owner", "admin"] },
  { href: "/reports", label: "보고서", icon: "BarChart3", roles: ["owner", "admin", "manager"] },
  { href: "/settings", label: "설정", icon: "Settings", roles: ["owner", "admin"] },
];
