"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectForm } from "@/components/projects/project-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROJECT_STATUSES } from "@/lib/constants";
import { formatCurrency, calcProfit } from "@/lib/utils";
import { useDataStore } from "@/stores/data-store";

export default function ProjectsPage() {
  const { projects, customers, addProject } = useDataStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("new") === "1") setShowForm(true);
  }, []);
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = projects.filter((p) => !statusFilter || p.status === statusFilter);

  return (
    <PageShell
      title="프로젝트 관리"
      description="프로젝트별 수익성을 관리합니다"
      quickActions={[{ label: "프로젝트 생성", href: "/projects?new=1" }]}
    >
      <div className="space-y-4">
        {showForm ? (
          <Card>
            <CardHeader><CardTitle>프로젝트 생성</CardTitle></CardHeader>
            <CardContent>
              <ProjectForm
                customers={customers}
                onSubmit={(data) => { addProject(data); setShowForm(false); }}
                onCancel={() => setShowForm(false)}
              />
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-11 w-auto rounded-sm border border-hairline bg-canvas px-3 text-caption dark:border-surface-tile-3 dark:bg-surface-tile-3"
            >
              <option value="">전체 상태</option>
              {PROJECT_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4" />프로젝트 생성</Button>
          </div>
        )}

        <div className="space-y-3">
          {filtered.map((p) => {
            const statusInfo = PROJECT_STATUSES.find((s) => s.value === p.status);
            const totalCost = p.costs?.reduce((s, c) => s + c.amount, 0) ?? 0;
            const { profit, profitRate } = calcProfit(p.contractAmount, totalCost);

            return (
              <Card key={p.id}>
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link href={`/projects/${p.id}`} className="text-body-strong text-ink hover:text-primary dark:text-on-dark">
                        {p.name}
                      </Link>
                      <Badge variant={statusInfo?.color}>{statusInfo?.label}</Badge>
                    </div>
                    <p className="mt-1 text-caption text-ink-muted-48">{p.clientName} · {p.siteAddress}</p>
                    <div className="mt-2 flex flex-wrap gap-4 text-caption">
                      <span>계약 <strong className="text-ink dark:text-on-dark">{formatCurrency(p.contractAmount)}</strong></span>
                      {totalCost > 0 && (
                        <>
                          <span>수익 <strong className="text-primary">{formatCurrency(profit)}</strong></span>
                          <span>수익률 <strong>{profitRate.toFixed(1)}%</strong></span>
                        </>
                      )}
                    </div>
                  </div>
                  <Link href={`/projects/${p.id}`}>
                    <Button variant="outline" size="sm">상세 <ArrowRight className="h-3.5 w-3.5" /></Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
