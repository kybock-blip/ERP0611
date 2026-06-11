"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Schedule, Project, Employee } from "@/lib/types";
import {
  startOfMonth, endOfMonth, eachDayOfInterval, format,
  isSameMonth, isSameDay, addMonths, subMonths,
  startOfWeek, endOfWeek, addDays, isToday,
} from "date-fns";
import { ko } from "date-fns/locale";

type ViewMode = "month" | "week" | "day";

interface CalendarViewProps {
  schedules: Schedule[];
  projects: Project[];
  employees: Employee[];
  onScheduleClick?: (schedule: Schedule) => void;
}

export function CalendarView({ schedules, projects, employees, onScheduleClick }: CalendarViewProps) {
  const [current, setCurrent] = useState(new Date());
  const [view, setView] = useState<ViewMode>("month");

  const projectMap = useMemo(() => Object.fromEntries(projects.map((p) => [p.id, p])), [projects]);
  const employeeMap = useMemo(() => Object.fromEntries(employees.map((e) => [e.id, e])), [employees]);

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(current), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(current), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [current]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(current, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [current]);

  const getSchedulesForDay = (day: Date) =>
    schedules.filter((s) => isSameDay(new Date(s.startAt), day));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrent(subMonths(current, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="min-w-[140px] text-center text-body-strong">
            {format(current, view === "day" ? "yyyy.MM.dd (EEE)" : "yyyy년 M월", { locale: ko })}
          </h2>
          <Button variant="outline" size="icon" onClick={() => setCurrent(addMonths(current, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCurrent(new Date())}>오늘</Button>
        </div>
        <div className="flex rounded-pill border border-hairline p-0.5 dark:border-surface-tile-3">
          {(["month", "week", "day"] as ViewMode[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`btn-press rounded-pill px-3 py-1.5 text-caption font-semibold transition-colors ${view === v ? "bg-primary text-on-primary" : "text-ink-muted-48 hover:bg-divider-soft/60"}`}
            >
              {v === "month" ? "월간" : v === "week" ? "주간" : "일간"}
            </button>
          ))}
        </div>
      </div>

      {view === "month" && (
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b border-hairline dark:border-surface-tile-3">
              {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                <div key={d} className="p-2 text-center text-caption-strong text-ink-muted-48">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {monthDays.map((day) => {
                const daySchedules = getSchedulesForDay(day);
                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-[90px] border-b border-r border-divider-soft p-1.5 dark:border-surface-tile-3 ${!isSameMonth(day, current) ? "bg-canvas-parchment/50 dark:bg-surface-tile-1/50" : ""}`}
                  >
                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-caption font-medium ${isToday(day) ? "bg-primary text-on-primary" : "text-ink dark:text-on-dark"}`}>
                      {format(day, "d")}
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {daySchedules.slice(0, 2).map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => onScheduleClick?.(s)}
                          className="btn-press block w-full truncate rounded-sm bg-primary/10 px-1 py-0.5 text-left text-[10px] font-medium text-primary hover:bg-primary/20 dark:text-primary-on-dark"
                        >
                          {format(new Date(s.startAt), "HH:mm")} {s.title}
                        </button>
                      ))}
                      {daySchedules.length > 2 && (
                        <span className="text-[10px] text-ink-muted-48">+{daySchedules.length - 2}건</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {(view === "week" || view === "day") && (
        <div className="space-y-2">
          {(view === "day" ? [current] : weekDays).map((day) => {
            const daySchedules = getSchedulesForDay(day);
            return (
              <Card key={day.toISOString()}>
                <CardContent className="p-4">
                  <p className="mb-3 text-body-strong text-ink dark:text-on-dark">
                    {format(day, "M월 d일 (EEE)", { locale: ko })}
                    {isToday(day) && <Badge variant="selected" className="ml-2 !py-1 !px-2">오늘</Badge>}
                  </p>
                  {daySchedules.length === 0 ? (
                    <p className="text-caption text-ink-muted-48">일정 없음</p>
                  ) : (
                    <div className="space-y-2">
                      {daySchedules.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => onScheduleClick?.(s)}
                          className="btn-press flex w-full items-center justify-between rounded-lg border border-hairline p-3 text-left hover:bg-canvas-parchment dark:border-surface-tile-3 dark:hover:bg-surface-tile-3"
                        >
                          <div>
                            <p className="text-body-strong">{s.title}</p>
                            <p className="text-caption text-ink-muted-48">
                              {format(new Date(s.startAt), "HH:mm")} - {format(new Date(s.endAt), "HH:mm")}
                              {s.projectId && projectMap[s.projectId] && ` · ${projectMap[s.projectId].name}`}
                            </p>
                          </div>
                          {s.assigneeId && employeeMap[s.assigneeId] && (
                            <Badge variant="muted" className="!py-1 !px-2">{employeeMap[s.assigneeId].name}</Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
