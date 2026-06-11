"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { CustomerForm } from "@/components/crm/customer-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CUSTOMER_TYPES } from "@/lib/constants";
import { useDataStore } from "@/stores/data-store";
import type { Customer } from "@/lib/types";

export default function CRMPage() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useDataStore();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("new") === "1") setShowForm(true);
  }, []);
  const [editing, setEditing] = useState<Customer | null>(null);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchSearch = !search || c.name.includes(search) || c.contactPerson?.includes(search) || c.phone?.includes(search);
      const matchType = !typeFilter || c.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [customers, search, typeFilter]);

  const handleSubmit = (data: Omit<Customer, "id" | "createdAt" | "organizationId">) => {
    if (editing) {
      updateCustomer(editing.id, data);
      setEditing(null);
    } else {
      addCustomer(data);
    }
    setShowForm(false);
  };

  return (
    <PageShell
      title="CRM 고객관리"
      description="고객 정보를 등록·관리합니다"
      quickActions={[{ label: "고객 등록", href: "/crm?new=1" }]}
    >
      <div className="space-y-4">
        {showForm || editing ? (
          <Card>
            <CardHeader>
              <CardTitle>{editing ? "고객 수정" : "고객 등록"}</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerForm
                initial={editing ?? undefined}
                onSubmit={handleSubmit}
                onCancel={() => { setShowForm(false); setEditing(null); }}
              />
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted-48" />
              <Input className="pl-9" placeholder="고객명, 담당자, 연락처 검색" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex h-11 rounded-sm border border-hairline bg-canvas px-3 text-caption dark:border-surface-tile-3 dark:bg-surface-tile-3"
            >
              <option value="">전체 유형</option>
              {CUSTOMER_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4" />고객 등록</Button>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const typeLabel = CUSTOMER_TYPES.find((t) => t.value === c.type)?.label;
            return (
              <Card key={c.id} className="transition-colors hover:border-primary/40">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-body-strong text-ink dark:text-on-dark">{c.name}</p>
                      <Badge variant="muted" className="mt-1 !py-1 !px-2">{typeLabel}</Badge>
                    </div>
                    <div className="flex gap-1">
                      <button className="btn-press rounded-sm p-1.5 text-ink-muted-48 hover:bg-divider-soft" onClick={() => setEditing(c)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="btn-press rounded-sm p-1.5 text-ink-muted-48 hover:text-primary" onClick={() => deleteCustomer(c.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 text-caption text-ink-muted-48">
                    {c.contactPerson && <p>담당: {c.contactPerson}</p>}
                    {c.phone && <p>{c.phone}</p>}
                    {c.email && <p>{c.email}</p>}
                    {c.address && <p className="truncate">{c.address}</p>}
                  </div>
                  {c.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {c.tags.map((tag) => <Badge key={tag} variant="default" className="!py-1 !px-2 text-[10px]">{tag}</Badge>)}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-caption text-ink-muted-48">검색 결과가 없습니다.</p>
        )}
      </div>
    </PageShell>
  );
}
