"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { CalendarView } from "@/components/schedule/calendar-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDataStore } from "@/stores/data-store";
import { mockEmployees } from "@/lib/mock/seed";

export default function SchedulePage() {
  const { schedules, projects, addSchedule } = useDataStore();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addSchedule({
      title,
      startAt: new Date(startAt).toISOString(),
      endAt: new Date(endAt).toISOString(),
      projectId: projectId || undefined,
      isRecurring: false,
    });
    setShowForm(false);
    setTitle(""); setStartAt(""); setEndAt(""); setProjectId("");
  };

  return (
    <PageShell title="작업 일정" description="월간·주간·일간 캘린더로 일정을 관리합니다">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4" />일정 추가</Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>일정 추가</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>제목</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>시작</Label>
                  <Input type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>종료</Label>
                  <Input type="datetime-local" value={endAt} onChange={(e) => setEndAt(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>프로젝트</Label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="flex h-11 w-full rounded-sm border border-hairline bg-canvas px-3 text-caption dark:border-surface-tile-3 dark:bg-surface-tile-3"
                  >
                    <option value="">선택</option>
                    {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="flex gap-2 sm:col-span-2">
                  <Button type="submit">등록</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>취소</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <CalendarView
          schedules={schedules}
          projects={projects}
          employees={mockEmployees}
        />
      </div>
    </PageShell>
  );
}
