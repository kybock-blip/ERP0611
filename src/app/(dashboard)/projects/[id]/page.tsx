"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { ProfitabilityCard } from "@/components/projects/profitability-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROJECT_STATUSES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { useDataStore } from "@/stores/data-store";
import { mockProjects } from "@/lib/mock/seed";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const storeProject = useDataStore((s) => s.projects.find((p) => p.id === id));
  const mockProject = mockProjects.find((p) => p.id === id);
  const project = storeProject ?? mockProject;

  if (!project) {
    return (
      <PageShell title="프로젝트">
        <p className="text-caption text-ink-muted-48">프로젝트를 찾을 수 없습니다.</p>
      </PageShell>
    );
  }

  const statusInfo = PROJECT_STATUSES.find((s) => s.value === project.status);

  return (
    <PageShell title={project.name} description={project.clientName}>
      <div className="space-y-4">
        <Link href="/projects">
          <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" />목록으로</Button>
        </Link>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>프로젝트 정보</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-caption text-ink-muted-48">상태</span><Badge variant={statusInfo?.color}>{statusInfo?.label}</Badge></div>
              <div className="flex justify-between"><span className="text-caption text-ink-muted-48">발주처</span><span className="text-body-strong">{project.clientName}</span></div>
              <div className="flex justify-between"><span className="text-caption text-ink-muted-48">계약금액</span><span className="text-body-strong text-primary">{formatCurrency(project.contractAmount)}</span></div>
              <div className="flex justify-between"><span className="text-caption text-ink-muted-48">기간</span><span className="text-caption">{project.startDate} ~ {project.endDate}</span></div>
              <div className="flex justify-between"><span className="text-caption text-ink-muted-48">현장</span><span className="text-caption">{project.siteAddress}</span></div>
              {project.memo && <p className="rounded-lg bg-canvas-parchment p-3 text-caption text-ink-muted-80 dark:bg-surface-tile-3">{project.memo}</p>}
            </CardContent>
          </Card>

          <ProfitabilityCard project={project} />
        </div>
      </div>
    </PageShell>
  );
}
