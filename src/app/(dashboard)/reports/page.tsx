"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const reports = [
  "프로젝트 수익성 보고서",
  "월간 경영 보고서",
  "고객 분석 보고서",
  "직원 생산성 보고서",
];

export default function ReportsPage() {
  return (
    <PageShell title="보고서" description="자동 생성 · Excel/PDF 다운로드 (MVP 3)">
      <div className="grid gap-3 sm:grid-cols-2">
        {reports.map((r) => (
          <Card key={r}>
            <CardHeader><CardTitle className="text-base">{r}</CardTitle></CardHeader>
            <CardContent className="flex gap-2">
              <Button size="sm" variant="outline"><FileDown className="h-3.5 w-3.5" />PDF</Button>
              <Button size="sm" variant="outline"><FileDown className="h-3.5 w-3.5" />Excel</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
