import { TrendingUp, FolderKanban, Users, AlertCircle, FileText, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { DashboardKPI } from "@/lib/types";

const items = [
  { key: "monthlyRevenue" as const, label: "월 매출", icon: TrendingUp, format: "currency" },
  { key: "monthlyProfit" as const, label: "월 순이익", icon: Wallet, format: "currency" },
  { key: "activeProjects" as const, label: "진행 프로젝트", icon: FolderKanban, format: "number" },
  { key: "newCustomers" as const, label: "신규 고객", icon: Users, format: "number" },
  { key: "receivables" as const, label: "미수금", icon: AlertCircle, format: "currency", warn: true },
  { key: "pendingEstimates" as const, label: "견적 진행", icon: FileText, format: "number" },
];

export function KPICards({ kpi }: { kpi: DashboardKPI }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
      {items.map(({ key, label, icon: Icon, format, warn }) => {
        const value = kpi[key];
        const display = format === "currency" ? formatCurrency(value) : `${value}건`;
        return (
          <Card key={key} className={`store-utility-card ${warn && value > 0 ? "border-primary/40" : ""}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-caption text-ink-muted-48">{label}</p>
                <Icon className={`h-4 w-4 ${warn && value > 0 ? "text-primary" : "text-ink-muted-48"}`} />
              </div>
              <p className={`mt-2 text-body-strong ${warn && value > 0 ? "text-primary" : "text-ink dark:text-on-dark"}`}>
                {display}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
