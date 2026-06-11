"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROJECT_STATUSES } from "@/lib/constants";
import type { Customer, Project, ProjectStatus } from "@/lib/types";

interface ProjectFormProps {
  customers: Customer[];
  initial?: Partial<Project>;
  onSubmit: (data: Omit<Project, "id" | "createdAt" | "organizationId">) => void;
  onCancel: () => void;
}

export function ProjectForm({ customers, initial, onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [customerId, setCustomerId] = useState(initial?.customerId ?? "");
  const [contractAmount, setContractAmount] = useState(String(initial?.contractAmount ?? ""));
  const [startDate, setStartDate] = useState(initial?.startDate ?? "");
  const [endDate, setEndDate] = useState(initial?.endDate ?? "");
  const [siteAddress, setSiteAddress] = useState(initial?.siteAddress ?? "");
  const [status, setStatus] = useState<ProjectStatus>(initial?.status ?? "estimate");
  const [memo, setMemo] = useState(initial?.memo ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find((c) => c.id === customerId);
    onSubmit({
      name,
      customerId: customerId || undefined,
      clientName: customer?.name,
      contractAmount: Number(contractAmount) || 0,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      siteAddress: siteAddress || undefined,
      status,
      memo: memo || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="pname">프로젝트명 *</Label>
          <Input id="pname" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="customer">발주처</Label>
          <select
            id="customer"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="flex h-11 w-full rounded-sm border border-hairline bg-canvas px-3 text-caption dark:border-surface-tile-3 dark:bg-surface-tile-3"
          >
            <option value="">선택</option>
            {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="amount">계약금액 (원)</Label>
          <Input id="amount" type="number" value={contractAmount} onChange={(e) => setContractAmount(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="start">시작일</Label>
          <Input id="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="end">종료일</Label>
          <Input id="end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="site">현장주소</Label>
          <Input id="site" value={siteAddress} onChange={(e) => setSiteAddress(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="status">진행상태</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            className="flex h-11 w-full rounded-sm border border-hairline bg-canvas px-3 text-caption dark:border-surface-tile-3 dark:bg-surface-tile-3"
          >
            {PROJECT_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="memo">메모</Label>
        <textarea
          id="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={2}
          className="flex w-full rounded-sm border border-hairline bg-canvas px-3 py-2 text-caption dark:border-surface-tile-3 dark:bg-surface-tile-3"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>취소</Button>
        <Button type="submit">{initial?.name ? "수정" : "생성"}</Button>
      </div>
    </form>
  );
}
