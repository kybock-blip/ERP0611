import { Bell, AlertTriangle, ClipboardList, CreditCard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Notification } from "@/lib/types";

const typeIcon = {
  info: Bell,
  warning: AlertTriangle,
  task: ClipboardList,
  payment: CreditCard,
};

const typeBadge = {
  info: "default" as const,
  warning: "muted" as const,
  task: "primary" as const,
  payment: "primary" as const,
};

export function NotificationPanel({ notifications }: { notifications: Notification[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          알림
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((n) => {
          const Icon = typeIcon[n.type];
          return (
            <div
              key={n.id}
              className={`rounded-lg border p-3 ${n.isRead ? "border-hairline opacity-60 dark:border-surface-tile-3" : "border-primary/30 bg-canvas dark:border-primary-on-dark/30 dark:bg-surface-tile-3"}`}
            >
              <div className="flex items-start gap-2">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted-48" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-body-strong text-ink dark:text-on-dark">{n.title}</p>
                    <Badge variant={typeBadge[n.type]} className="!py-1 !px-2 text-[10px]">{n.type}</Badge>
                  </div>
                  <p className="mt-0.5 text-caption text-ink-muted-48">{n.message}</p>
                  <p className="mt-1 text-fine-print text-ink-muted-48">
                    {new Date(n.createdAt).toLocaleString("ko-KR")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
