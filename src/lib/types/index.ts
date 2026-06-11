export type UserRole = "owner" | "admin" | "manager" | "staff";
export type CustomerType = "individual" | "corporate" | "public" | "school" | "apartment" | "park";
export type ProjectStatus = "estimate" | "contract" | "in_progress" | "completed" | "on_hold";
export type CostCategory = "labor" | "material" | "equipment" | "subcontract" | "other";
export type EstimateStatus = "draft" | "sent" | "approved" | "rejected";
export type InvoiceStatus = "pending" | "paid" | "overdue";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  organizationId: string;
  avatarUrl?: string;
}

export interface Customer {
  id: string;
  organizationId: string;
  name: string;
  type: CustomerType;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  memo?: string;
  tags: string[];
  createdAt: string;
}

export interface Employee {
  id: string;
  organizationId: string;
  name: string;
  position?: string;
  phone?: string;
  email?: string;
  certifications: string[];
  isActive: boolean;
}

export interface ProjectCost {
  id: string;
  projectId: string;
  category: CostCategory;
  amount: number;
  description?: string;
  recordedAt: string;
}

export interface Project {
  id: string;
  organizationId: string;
  customerId?: string;
  name: string;
  clientName?: string;
  contractAmount: number;
  startDate?: string;
  endDate?: string;
  siteAddress?: string;
  managerId?: string;
  status: ProjectStatus;
  memo?: string;
  costs?: ProjectCost[];
  createdAt: string;
}

export interface Schedule {
  id: string;
  organizationId: string;
  projectId?: string;
  title: string;
  description?: string;
  startAt: string;
  endAt: string;
  assigneeId?: string;
  isRecurring: boolean;
}

export interface Estimate {
  id: string;
  organizationId: string;
  customerId?: string;
  projectId?: string;
  title: string;
  status: EstimateStatus;
  totalAmount: number;
  version: number;
  validUntil?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  organizationId: string;
  customerId?: string;
  projectId?: string;
  amount: number;
  status: InvoiceStatus;
  issuedAt: string;
  dueAt?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "task" | "payment";
  isRead: boolean;
  createdAt: string;
}

export interface DashboardKPI {
  monthlyRevenue: number;
  monthlyProfit: number;
  activeProjects: number;
  newCustomers: number;
  receivables: number;
  pendingEstimates: number;
}

export interface ProjectProfitability {
  projectId: string;
  projectName: string;
  revenue: number;
  totalCost: number;
  profit: number;
  profitRate: number;
}
