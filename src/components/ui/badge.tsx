import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-pill px-4 py-3 text-caption font-normal",
  {
    variants: {
      variant: {
        default: "bg-canvas text-ink border border-hairline dark:bg-surface-tile-3 dark:text-on-dark dark:border-surface-tile-2",
        selected: "bg-canvas text-ink border-2 border-primary-focus dark:bg-surface-tile-3 dark:text-on-dark",
        primary: "bg-primary/10 text-primary text-caption-strong dark:text-primary-on-dark",
        muted: "bg-surface-pearl text-ink-muted-80 border-[3px] border-divider-soft dark:bg-surface-tile-3 dark:text-body-muted",
        success: "bg-canvas text-primary border border-hairline",
        warning: "bg-canvas text-ink border border-hairline",
        danger: "bg-canvas text-primary border border-hairline",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
