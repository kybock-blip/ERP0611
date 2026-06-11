"use client";

import { PageShell } from "@/components/layout/page-shell";
import { KPICards } from "@/components/dashboard/kpi-cards";
import { DashboardCharts } from "@/components/dashboard/charts";
import { NotificationPanel } from "@/components/dashboard/notification-panel";
import {
  getDashboardKPI, getMonthlyRevenueData, getProjectProfitability,
  getCustomerGrowthData, getCostBreakdown, mockNotifications,
} from "@/lib/mock/seed";

export default function DashboardPage() {
  const kpi = getDashboardKPI();

  return (
    <PageShell
      title="대시보드"
      description="경영 현황을 한눈에 파악하세요"
      quickActions={[
        { label: "프로젝트", href: "/projects?new=1" },
        { label: "고객 등록", href: "/crm?new=1" },
        { label: "견적 생성", href: "/estimates?new=1" },
      ]}
    >
      <div className="space-y-6">
        <KPICards kpi={kpi} />
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <DashboardCharts
              revenueData={getMonthlyRevenueData()}
              profitability={getProjectProfitability()}
              customerGrowth={getCustomerGrowthData()}
              costBreakdown={getCostBreakdown()}
            />
          </div>
          <NotificationPanel notifications={mockNotifications} />
        </div>
      </div>
    </PageShell>
  );
}
