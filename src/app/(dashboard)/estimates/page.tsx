"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ESTIMATE_ITEMS } from "@/lib/constants";
import { mockEstimates } from "@/lib/mock/seed";

export default function EstimatesPage() {
  return (
    <PageShell
      title="견적 관리"
      description="견적서 생성 · PDF · 이메일 발송"
      quickActions={[{ label: "견적 생성", href: "/estimates?new=1" }]}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {ESTIMATE_ITEMS.map((item) => (
          <Badge key={item} variant="default" className="!py-1 !px-3">{item}</Badge>
        ))}
      </div>
      <div className="space-y-3">
        {mockEstimates.map((e) => (
          <Card key={e.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-bold">{e.title}</p>
                <p className="text-caption text-ink-muted-48">v{e.version} · {e.createdAt}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={e.status === "approved" ? "selected" : e.status === "sent" ? "primary" : "muted"} className="!py-1 !px-2">
                  {e.status}
                </Badge>
                <span className="text-body-strong text-primary">{formatCurrency(e.totalAmount)}</span>
                <Button size="sm" variant="outline">PDF</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
