"use client";

import Link from "next/link";
import { TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas-parchment p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary">
            <TreePine className="h-6 w-6" />
          </div>
          <CardTitle className="text-tagline">회원가입</CardTitle>
          <CardDescription>14일 무료 체험으로 시작하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label>회사명</Label>
              <Input placeholder="그린트리 조경" required />
            </div>
            <div className="space-y-1.5">
              <Label>담당자명</Label>
              <Input placeholder="홍길동" required />
            </div>
            <div className="space-y-1.5">
              <Label>이메일</Label>
              <Input type="email" placeholder="admin@company.co.kr" required />
            </div>
            <div className="space-y-1.5">
              <Label>비밀번호</Label>
              <Input type="password" required />
            </div>
            <Button type="submit" className="w-full">가입하기</Button>
          </form>
          <p className="mt-4 text-center text-caption text-ink-muted-48">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">로그인</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
