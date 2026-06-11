"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FieldWorkPage() {
  return (
    <PageShell title="현장 관리" description="현장 작업일지 · 사진 · 동영상 첨부 (MVP 2)">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            현장 작업일지
            <Badge variant="muted" className="!py-1 !px-2">준비 중</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-caption text-ink-muted-48">
          <p>작업일, 작업자, 작업내용, 작업시간, 사용장비, 사용약제, 특이사항 입력</p>
          <p>사진·동영상·문서 첨부 · 모바일 최적화 지원 예정</p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
