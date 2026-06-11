"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { mockInvoices } from "@/lib/mock/seed";

export default function AccountingPage() {
  const totalReceivable = mockInvoices.filter((i) => i.status !== "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <PageShell title="회계 관리" description="매출·지출·미수금 관리 (MVP 2)">
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-caption text-ink-muted-48">미수금 합계</p>
            <p className="text-body-strong text-primary">{formatCurrency(totalReceivable)}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>수금 현황</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockInvoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between border-b border-hairline pb-2 dark:border-surface-tile-3">
              <div>
                <p className="text-body-strong">{inv.issuedAt}</p>
                <p className="text-caption text-ink-muted-48">만기: {inv.dueAt}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={inv.status === "paid" ? "primary" : inv.status === "overdue" ? "selected" : "muted"} className="!py-1 !px-2">
                  {inv.status === "paid" ? "수금완료" : inv.status === "overdue" ? "연체" : "미수"}
                </Badge>
                <span className="font-bold">{formatCurrency(inv.amount)}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
