"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlobalNav } from "./global-nav";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useAuthStore } from "@/stores/auth-store";

interface PageShellProps {
  title: string;
  description?: string;
  quickActions?: { label: string; href: string }[];
  children: React.ReactNode;
}

export function PageShell({ title, description, quickActions, children }: PageShellProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen flex-col bg-canvas-parchment dark:bg-surface-tile-1">
      <GlobalNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header title={title} description={description} quickActions={quickActions} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
