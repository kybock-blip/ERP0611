import type {
  Customer,
  DashboardKPI,
  Employee,
  Estimate,
  Invoice,
  Notification,
  Project,
  ProjectCost,
  Schedule,
} from "@/lib/types";

const ORG_ID = "org-001";

export const mockUser = {
  id: "user-001",
  email: "admin@greentree.co.kr",
  fullName: "김조경",
  role: "owner" as const,
  organizationId: ORG_ID,
};

export const mockEmployees: Employee[] = [
  { id: "emp-001", organizationId: ORG_ID, name: "김조경", position: "대표", phone: "010-1234-5678", certifications: ["나무의사", "조경기사"], isActive: true },
  { id: "emp-002", organizationId: ORG_ID, name: "이수목", position: "팀장", phone: "010-2345-6789", certifications: ["수목치료기술자"], isActive: true },
  { id: "emp-003", organizationId: ORG_ID, name: "박현장", position: "직원", phone: "010-3456-7890", certifications: ["산림기사"], isActive: true },
];

export const mockCustomers: Customer[] = [
  { id: "cust-001", organizationId: ORG_ID, name: "서울시립공원관리소", type: "public", contactPerson: "홍길동", phone: "02-123-4567", email: "park@seoul.go.kr", address: "서울시 중구", tags: ["공공", "정기계약"], createdAt: "2025-01-15" },
  { id: "cust-002", organizationId: ORG_ID, name: "래미안 아파트", type: "apartment", contactPerson: "관리소장", phone: "02-987-6543", email: "admin@raemian.com", address: "서울시 강남구", tags: ["아파트", "수목전정"], createdAt: "2025-02-20" },
  { id: "cust-003", organizationId: ORG_ID, name: "한국과학고등학교", type: "school", contactPerson: "시설담당", phone: "031-111-2222", email: "facility@kschool.kr", address: "경기도 수원시", tags: ["학교"], createdAt: "2025-03-10" },
  { id: "cust-004", organizationId: ORG_ID, name: "그린빌딩(주)", type: "corporate", contactPerson: "최담당", phone: "02-555-1234", email: "c.choi@green.co.kr", address: "서울시 영등포구", tags: ["법인", "조경"], createdAt: "2025-04-05" },
  { id: "cust-005", organizationId: ORG_ID, name: "김영희", type: "individual", contactPerson: "김영희", phone: "010-9999-8888", email: "yh.kim@email.com", address: "서울시 서초구", tags: ["개인", "정원"], createdAt: "2025-05-18" },
];

const projectCosts: Record<string, ProjectCost[]> = {
  "proj-001": [
    { id: "cost-001", projectId: "proj-001", category: "labor", amount: 12000000, description: "전정 작업 인건비", recordedAt: "2025-06-01" },
    { id: "cost-002", projectId: "proj-001", category: "equipment", amount: 3000000, description: "고소작업차", recordedAt: "2025-06-05" },
    { id: "cost-003", projectId: "proj-001", category: "material", amount: 1500000, description: "전정 도구 및 소모품", recordedAt: "2025-06-10" },
  ],
  "proj-002": [
    { id: "cost-004", projectId: "proj-002", category: "labor", amount: 8000000, description: "진단 및 치료", recordedAt: "2025-05-15" },
    { id: "cost-005", projectId: "proj-002", category: "material", amount: 4500000, description: "약제비", recordedAt: "2025-05-20" },
  ],
  "proj-003": [
    { id: "cost-006", projectId: "proj-003", category: "labor", amount: 5000000, recordedAt: "2025-04-01" },
    { id: "cost-007", projectId: "proj-003", category: "subcontract", amount: 8000000, recordedAt: "2025-04-15" },
  ],
  "proj-004": [
    { id: "cost-008", projectId: "proj-004", category: "labor", amount: 15000000, recordedAt: "2025-03-01" },
    { id: "cost-009", projectId: "proj-004", category: "material", amount: 12000000, recordedAt: "2025-03-15" },
    { id: "cost-010", projectId: "proj-004", category: "equipment", amount: 5000000, recordedAt: "2025-03-20" },
  ],
};

export const mockProjects: Project[] = [
  { id: "proj-001", organizationId: ORG_ID, customerId: "cust-001", name: "남산공원 수목전정", clientName: "서울시립공원관리소", contractAmount: 45000000, startDate: "2025-06-01", endDate: "2025-08-31", siteAddress: "서울시 중구 남산공원", managerId: "emp-002", status: "in_progress", costs: projectCosts["proj-001"], createdAt: "2025-05-20" },
  { id: "proj-002", organizationId: ORG_ID, customerId: "cust-002", name: "래미안 수목 진단·치료", clientName: "래미안 아파트", contractAmount: 28000000, startDate: "2025-05-01", endDate: "2025-06-30", siteAddress: "서울시 강남구", managerId: "emp-001", status: "in_progress", costs: projectCosts["proj-002"], createdAt: "2025-04-15" },
  { id: "proj-003", organizationId: ORG_ID, customerId: "cust-003", name: "과학고 교정 조경 정비", clientName: "한국과학고등학교", contractAmount: 18000000, startDate: "2025-04-01", endDate: "2025-05-31", siteAddress: "경기도 수원시", managerId: "emp-003", status: "completed", costs: projectCosts["proj-003"], createdAt: "2025-03-01" },
  { id: "proj-004", organizationId: ORG_ID, customerId: "cust-004", name: "그린빌딩 옥상 조경", clientName: "그린빌딩(주)", contractAmount: 65000000, startDate: "2025-03-01", endDate: "2025-04-30", siteAddress: "서울시 영등포구", managerId: "emp-002", status: "completed", costs: projectCosts["proj-004"], createdAt: "2025-02-01" },
  { id: "proj-005", organizationId: ORG_ID, customerId: "cust-005", name: "개인정원 설계·식재", clientName: "김영희", contractAmount: 8500000, startDate: "2025-07-01", endDate: "2025-07-31", siteAddress: "서울시 서초구", managerId: "emp-003", status: "estimate", createdAt: "2025-06-01" },
];

export const mockSchedules: Schedule[] = [
  { id: "sch-001", organizationId: ORG_ID, projectId: "proj-001", title: "남산공원 전정 1차", startAt: "2025-06-15T09:00:00", endAt: "2025-06-15T17:00:00", assigneeId: "emp-002", isRecurring: false },
  { id: "sch-002", organizationId: ORG_ID, projectId: "proj-002", title: "래미안 병해충 방제", startAt: "2025-06-16T08:00:00", endAt: "2025-06-16T14:00:00", assigneeId: "emp-001", isRecurring: false },
  { id: "sch-003", organizationId: ORG_ID, projectId: "proj-001", title: "남산공원 전정 2차", startAt: "2025-06-20T09:00:00", endAt: "2025-06-20T17:00:00", assigneeId: "emp-003", isRecurring: false },
  { id: "sch-004", organizationId: ORG_ID, projectId: "proj-005", title: "정원 현장 실측", startAt: "2025-06-18T10:00:00", endAt: "2025-06-18T12:00:00", assigneeId: "emp-003", isRecurring: false },
  { id: "sch-005", organizationId: ORG_ID, title: "월간 안전교육", startAt: "2025-06-25T14:00:00", endAt: "2025-06-25T16:00:00", assigneeId: "emp-001", isRecurring: true },
];

export const mockEstimates: Estimate[] = [
  { id: "est-001", organizationId: ORG_ID, customerId: "cust-005", projectId: "proj-005", title: "개인정원 설계·식재 견적", status: "sent", totalAmount: 8500000, version: 1, validUntil: "2025-07-15", createdAt: "2025-06-01" },
  { id: "est-002", organizationId: ORG_ID, customerId: "cust-001", title: "남산공원 추가 전정 견적", status: "draft", totalAmount: 12000000, version: 1, createdAt: "2025-06-10" },
];

export const mockInvoices: Invoice[] = [
  { id: "inv-001", organizationId: ORG_ID, customerId: "cust-004", projectId: "proj-004", amount: 65000000, status: "paid", issuedAt: "2025-04-01", dueAt: "2025-04-30" },
  { id: "inv-002", organizationId: ORG_ID, customerId: "cust-002", projectId: "proj-002", amount: 14000000, status: "pending", issuedAt: "2025-06-01", dueAt: "2025-06-30" },
  { id: "inv-003", organizationId: ORG_ID, customerId: "cust-001", projectId: "proj-001", amount: 22500000, status: "overdue", issuedAt: "2025-05-01", dueAt: "2025-05-31" },
];

export const mockNotifications: Notification[] = [
  { id: "noti-001", title: "미수금 경고", message: "서울시립공원관리소 2,250만원 결제 기한 초과", type: "payment", isRead: false, createdAt: "2025-06-10T09:00:00" },
  { id: "noti-002", title: "작업 지시", message: "남산공원 전정 2차 작업 내일 예정", type: "task", isRead: false, createdAt: "2025-06-14T08:00:00" },
  { id: "noti-003", title: "계약 만료 예정", message: "래미안 아파트 계약 30일 후 만료", type: "warning", isRead: true, createdAt: "2025-06-08T10:00:00" },
  { id: "noti-004", title: "일정 알림", message: "래미안 병해충 방제 오늘 08:00 시작", type: "info", isRead: false, createdAt: "2025-06-16T07:30:00" },
];

export function getDashboardKPI(): DashboardKPI {
  const active = mockProjects.filter((p) => p.status === "in_progress").length;
  const newCust = mockCustomers.filter((c) => c.createdAt >= "2025-05-01").length;
  const receivables = mockInvoices.filter((i) => i.status !== "paid").reduce((s, i) => s + i.amount, 0);
  const pendingEst = mockEstimates.filter((e) => e.status === "draft" || e.status === "sent").length;

  const monthlyRevenue = mockProjects
    .filter((p) => p.status === "completed" || p.status === "in_progress")
    .reduce((s, p) => s + p.contractAmount * 0.3, 0);

  const monthlyCost = mockProjects.reduce((s, p) => {
    return s + (p.costs?.reduce((cs, c) => cs + c.amount, 0) ?? 0) * 0.2;
  }, 0);

  return {
    monthlyRevenue: Math.round(monthlyRevenue),
    monthlyProfit: Math.round(monthlyRevenue - monthlyCost),
    activeProjects: active,
    newCustomers: newCust,
    receivables,
    pendingEstimates: pendingEst,
  };
}

export function getMonthlyRevenueData() {
  return [
    { month: "1월", revenue: 32000000, cost: 22000000 },
    { month: "2월", revenue: 45000000, cost: 31000000 },
    { month: "3월", revenue: 65000000, cost: 42000000 },
    { month: "4월", revenue: 38000000, cost: 25000000 },
    { month: "5월", revenue: 52000000, cost: 35000000 },
    { month: "6월", revenue: 48000000, cost: 32000000 },
  ];
}

export function getProjectProfitability() {
  return mockProjects
    .filter((p) => p.costs && p.costs.length > 0)
    .map((p) => {
      const totalCost = p.costs!.reduce((s, c) => s + c.amount, 0);
      const profit = p.contractAmount - totalCost;
      const profitRate = p.contractAmount > 0 ? (profit / p.contractAmount) * 100 : 0;
      return {
        projectId: p.id,
        projectName: p.name,
        revenue: p.contractAmount,
        totalCost,
        profit,
        profitRate: Math.round(profitRate * 10) / 10,
      };
    });
}

export function getCustomerGrowthData() {
  return [
    { month: "1월", count: 12 },
    { month: "2월", count: 15 },
    { month: "3월", count: 18 },
    { month: "4월", count: 22 },
    { month: "5월", count: 28 },
    { month: "6월", count: 32 },
  ];
}

export function getCostBreakdown() {
  const totals: Record<string, number> = {};
  mockProjects.forEach((p) => {
    p.costs?.forEach((c) => {
      totals[c.category] = (totals[c.category] ?? 0) + c.amount;
    });
  });
  return Object.entries(totals).map(([category, amount]) => ({ category, amount }));
}
