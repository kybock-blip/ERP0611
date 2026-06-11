"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, FolderKanban, Calendar, MapPin,
  FileText, FileSignature, Wallet, BarChart3, Settings, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { useAuthStore } from "@/stores/auth-store";
import { useUIStore } from "@/stores/ui-store";

const iconMap = {
  LayoutDashboard, Users, FolderKanban, Calendar, MapPin,
  FileText, FileSignature, Wallet, BarChart3, Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  const visibleItems = NAV_ITEMS.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={cn(
          "fixed left-0 top-11 z-50 flex h-[calc(100%-2.75rem)] w-56 flex-col border-r border-hairline bg-canvas transition-transform dark:border-surface-tile-3 dark:bg-surface-tile-2 lg:static lg:top-0 lg:h-auto lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-hairline px-4 py-3 lg:hidden dark:border-surface-tile-3">
          <span className="text-caption-strong text-ink dark:text-on-dark">메뉴</span>
          <button type="button" className="btn-press rounded-full p-1.5" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4 text-ink-muted-48" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-0.5">
            {visibleItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-nav-link transition-colors",
                      active
                        ? "bg-surface-pearl font-semibold text-primary dark:bg-surface-tile-3 dark:text-primary-on-dark"
                        : "text-ink-muted-80 hover:bg-divider-soft/60 dark:text-body-muted dark:hover:bg-surface-tile-3"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
