import * as React from "react";
import { cn } from "@/lib/utils";

/** search-input — DESIGN.md: pill, 44px, hairline border */
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-pill border border-black/[0.08] bg-canvas px-5 text-body text-ink placeholder:text-ink-muted-48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-surface-tile-3 dark:text-on-dark",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
