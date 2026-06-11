"use client";

import { useRouter } from "next/navigation";
import { Menu, Moon, Sun, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";

interface HeaderProps {
  title: string;
  description?: string;
  quickActions?: { label: string; href: string }[];
}

/** sub-nav-frosted — DESIGN.md: parchment 80% blur, tagline title, pill CTA */
export function Header({ title, description, quickActions }: HeaderProps) {
  const router = useRouter();
  const { toggleSidebar, theme, toggleTheme } = useUIStore();

  return (
    <header className="sub-nav-frosted sticky top-0 z-20 flex min-h-[52px] items-center justify-between border-b border-hairline/60 px-4 lg:px-6 dark:border-surface-tile-3">
      <div className="flex items-center gap-3 py-2">
        <button
          type="button"
          className="btn-press rounded-full p-2 lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4 text-ink dark:text-on-dark" />
        </button>
        <div>
          <h1 className="text-tagline text-ink dark:text-on-dark">{title}</h1>
          {description && <p className="text-caption text-ink-muted-48">{description}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 py-2">
        {quickActions?.map((action) => (
          <Button
            key={action.href}
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => router.push(action.href)}
          >
            <Plus className="h-3.5 w-3.5" />
            {action.label}
          </Button>
        ))}
        <button
          type="button"
          className="btn-press rounded-full p-2 text-ink-muted-48 dark:text-body-muted"
          onClick={toggleTheme}
          aria-label="테마 전환"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
