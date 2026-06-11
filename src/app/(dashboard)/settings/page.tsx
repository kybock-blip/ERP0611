"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { USER_ROLES } from "@/lib/constants";
import { mockOrganization } from "@/lib/mock/seed";
import { useAuthStore } from "@/stores/auth-store";

const ORG_FIELDS = [
  { label: "회사명", value: mockOrganization.name },
  { label: "사업자번호", value: mockOrganization.businessNumber },
  { label: "주소", value: mockOrganization.address },
  { label: "연락처", value: mockOrganization.phone },
  { label: "이메일", value: mockOrganization.email },
] as const;

export default function SettingsPage() {
  const { user, setRole } = useAuthStore();

  return (
    <PageShell title="설정" description="권한 관리 · 조직 설정">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>권한 관리 (데모)</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-caption text-ink-muted-48">역할별 메뉴 노출을 테스트합니다.</p>
            <div className="flex flex-wrap gap-2">
              {USER_ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`btn-press rounded-pill border px-4 py-2 text-caption font-medium transition-colors ${user?.role === r.value ? "border-primary-focus border-2 bg-canvas text-primary" : "border-hairline hover:bg-surface-pearl"}`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <p className="text-fine-print text-ink-muted-48">현재 역할: <Badge variant="selected" className="!inline-flex !py-1 !px-2">{USER_ROLES.find((r) => r.value === user?.role)?.label}</Badge></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>조직 정보</CardTitle>
            <p className="text-tagline font-semibold text-ink">{mockOrganization.name}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <dl className="space-y-2">
              {ORG_FIELDS.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-[88px_1fr] gap-2 text-caption">
                  <dt className="font-medium text-ink-muted-48">{label}</dt>
                  <dd className="text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-hairline pt-3 text-fine-print text-ink-muted-48">
              Supabase 연동 시 조직 설정이 활성화됩니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
