"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { APP_NAME, ORG_INFO } from "@/lib/constants";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, isAuthenticated } = useAuthStore();
  const [email, setEmail] = useState(ORG_INFO.email);
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) router.push("/dashboard");
  };

  const handleGoogle = async () => {
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-canvas-parchment">
      {/* product-tile-dark — DESIGN.md */}
      <section className="tile-dark px-6 py-20 text-center lg:py-24">
        <TreePine className="mx-auto mb-4 h-8 w-8" />
        <h1 className="text-display-lg">{APP_NAME}</h1>
        <p className="mx-auto mt-4 max-w-lg text-[28px] font-normal leading-[1.14] tracking-[0.196px] text-body-muted">
          조경·수목 관리의 모든 것을 한곳에서
        </p>
        <p className="mx-auto mt-2 max-w-md text-caption text-body-muted">
          고객관리, 프로젝트, 일정, 회계, 수익성 분석까지
        </p>
      </section>

      {/* product-tile-light */}
      <section className="tile-light flex justify-center px-6 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-tagline">로그인</CardTitle>
            <CardDescription>계정에 로그인하여 ERP를 시작하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="flex justify-end">
                <Link href="#" className="text-caption text-primary hover:underline">비밀번호 찾기</Link>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "로그인 중..." : "로그인"}
              </Button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-hairline" /></div>
              <div className="relative flex justify-center"><span className="bg-canvas px-2 text-caption text-ink-muted-48">또는</span></div>
            </div>

            <Button variant="secondary" className="w-full" onClick={handleGoogle} disabled={loading}>
              Google로 로그인
            </Button>

            <p className="text-center text-caption text-ink-muted-48">
              계정이 없으신가요?{" "}
              <Link href="/signup" className="font-semibold text-primary hover:underline">회원가입</Link>
            </p>
          </CardContent>
        </Card>
      </section>

      <footer className="bg-canvas-parchment px-6 py-16 text-center text-fine-print text-ink-muted-48">
        © 2025 {APP_NAME} · 행운을 빕니다. 책임감 있게 즐기세요.
      </footer>
    </div>
  );
}
