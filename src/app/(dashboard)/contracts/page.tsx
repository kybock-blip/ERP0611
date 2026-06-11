"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ContractsPage() {
  return (
    <PageShell title="계약 관리" description="계약서 저장 · 전자서명 · 갱신 알림 (MVP 2)">
      <Card>
        <CardHeader><CardTitle>계약 현황 <Badge variant="muted" className="!py-1 !px-2">MVP 2</Badge></CardTitle></CardHeader>
        <CardContent className="text-caption text-ink-muted-48">
          전자서명 연동, 계약 상태 추적, 갱신 알림 기능이 추가될 예정입니다.
        </CardContent>
      </Card>
    </PageShell>
  );
}
