import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, calcProfit } from "@/lib/utils";
import { COST_CATEGORIES } from "@/lib/constants";
import type { Project } from "@/lib/types";

export function ProfitabilityCard({ project }: { project: Project }) {
  const costs = project.costs ?? [];
  const totalCost = costs.reduce((s, c) => s + c.amount, 0);
  const { profit, profitRate } = calcProfit(project.contractAmount, totalCost);

  const byCategory = COST_CATEGORIES.map((cat) => ({
    ...cat,
    amount: costs.filter((c) => c.category === cat.value).reduce((s, c) => s + c.amount, 0),
  })).filter((c) => c.amount > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>수익성 분석</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-hairline bg-canvas-parchment p-3 dark:border-surface-tile-3 dark:bg-surface-tile-3">
            <p className="text-caption text-ink-muted-48">매출</p>
            <p className="text-body-strong text-primary">{formatCurrency(project.contractAmount)}</p>
          </div>
          <div className="rounded-lg border border-hairline bg-surface-pearl p-3 dark:border-surface-tile-3 dark:bg-surface-tile-2">
            <p className="text-caption text-ink-muted-48">비용</p>
            <p className="text-body-strong text-ink dark:text-on-dark">{formatCurrency(totalCost)}</p>
          </div>
          <div className="rounded-lg border border-hairline bg-canvas p-3 dark:border-surface-tile-3">
            <p className="text-caption text-ink-muted-48">수익</p>
            <p className={`text-body-strong ${profit >= 0 ? "text-primary" : "text-primary"}`}>{formatCurrency(profit)}</p>
          </div>
          <div className="rounded-lg border border-hairline bg-canvas p-3 dark:border-surface-tile-3">
            <p className="text-caption text-ink-muted-48">수익률</p>
            <p className="text-body-strong text-ink dark:text-on-dark">{profitRate.toFixed(1)}%</p>
          </div>
        </div>

        {byCategory.length > 0 && (
          <div>
            <p className="mb-2 text-body-strong text-ink dark:text-on-dark">비용 상세</p>
            <div className="space-y-2">
              {byCategory.map((c) => (
                <div key={c.value} className="flex items-center justify-between text-caption">
                  <span className="text-ink-muted-48">{c.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink dark:text-on-dark">{formatCurrency(c.amount)}</span>
                    <Badge variant="muted" className="!py-1 !px-2">{((c.amount / totalCost) * 100).toFixed(0)}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
