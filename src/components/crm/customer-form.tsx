"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CUSTOMER_TYPES } from "@/lib/constants";
import type { Customer, CustomerType } from "@/lib/types";

interface CustomerFormProps {
  initial?: Partial<Customer>;
  onSubmit: (data: Omit<Customer, "id" | "createdAt" | "organizationId">) => void;
  onCancel: () => void;
}

export function CustomerForm({ initial, onSubmit, onCancel }: CustomerFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [type, setType] = useState<CustomerType>(initial?.type ?? "individual");
  const [contactPerson, setContactPerson] = useState(initial?.contactPerson ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [memo, setMemo] = useState(initial?.memo ?? "");
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name, type, contactPerson, phone, email, address, memo,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">고객명 *</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="type">고객 유형</Label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as CustomerType)}
            className="flex h-11 w-full rounded-sm border border-hairline bg-canvas px-3 text-caption dark:border-surface-tile-3 dark:bg-surface-tile-3"
          >
            {CUSTOMER_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact">담당자</Label>
          <Input id="contact" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">연락처</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="address">주소</Label>
          <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="tags">태그 (쉼표 구분)</Label>
        <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="공공, 정기계약" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="memo">메모</Label>
        <textarea
          id="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={3}
          className="flex w-full rounded-sm border border-hairline bg-canvas px-3 py-2 text-caption dark:border-surface-tile-3 dark:bg-surface-tile-3"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>취소</Button>
        <Button type="submit">{initial?.name ? "수정" : "등록"}</Button>
      </div>
    </form>
  );
}
