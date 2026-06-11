import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-press inline-flex items-center justify-center gap-2 whitespace-nowrap transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary text-body rounded-pill px-[22px] py-[11px]",
        secondary: "bg-canvas text-primary border border-primary rounded-pill px-[22px] py-[11px] text-body dark:bg-transparent dark:text-primary-on-dark dark:border-primary-on-dark",
        outline: "bg-surface-pearl text-ink-muted-80 border-[3px] border-divider-soft rounded-md px-[14px] py-2 text-caption dark:bg-surface-tile-2 dark:text-body-muted dark:border-surface-tile-3",
        ghost: "text-primary rounded-sm px-3 py-2 text-caption hover:bg-divider-soft/50 dark:text-primary-on-dark",
        utility: "bg-ink text-on-dark rounded-sm px-[15px] py-2 text-caption",
        destructive: "bg-red-600 text-white rounded-pill px-[22px] py-[11px] text-body",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-caption rounded-pill",
        lg: "h-12 px-7 text-[18px] font-light rounded-pill",
        icon: "h-11 w-11 rounded-full bg-surface-pearl text-ink dark:bg-surface-tile-3 dark:text-on-dark",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
