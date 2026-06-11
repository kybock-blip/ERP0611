"use client";

import Link from "next/link";
import { TreePine, Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { useAuthStore } from "@/stores/auth-store";
import { mockNotifications } from "@/lib/mock/seed";

/** global-nav — DESIGN.md: surface-black, 44px, nav-link typography */
export function GlobalNav() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const unread = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <nav className="global-nav flex shrink-0 items-center justify-between bg-surface-black px-4 lg:px-6">
      <Link href="/dashboard" className="flex items-center gap-2 text-on-dark">
        <TreePine className="h-4 w-4" />
        <span className="text-nav-link font-normal">{APP_NAME}</span>
      </Link>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="btn-press relative rounded-sm p-2 text-on-dark"
          onClick={() => router.push("/dashboard")}
          aria-label="알림"
        >
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
          )}
        </button>
        {user && (
          <span className="hidden text-nav-link text-body-muted sm:inline">{user.fullName}</span>
        )}
        <button
          type="button"
          className="btn-press ml-2 rounded-sm bg-ink px-[15px] py-2 text-caption text-on-dark"
          onClick={() => { logout(); router.push("/login"); }}
        >
          <LogOut className="mr-1 inline h-3.5 w-3.5" />
          로그아웃
        </button>
      </div>
    </nav>
  );
}
