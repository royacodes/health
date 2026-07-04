import { cn } from "@healthy/ui";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger" | "info";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        "transition-colors",
        variant === "default" && "bg-primary-subtle text-primary",
        variant === "secondary" && "bg-muted text-fg-secondary",
        variant === "outline" && "border border-border text-fg-muted",
        variant === "success" && "bg-success-subtle text-success",
        variant === "warning" && "bg-warning-subtle text-warning",
        variant === "danger" && "bg-danger-subtle text-danger",
        variant === "info" && "bg-info-subtle text-info",
        className,
      )}
      {...props}
    />
  );
}
