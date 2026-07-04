import { cn } from "@healthy/ui";
import type { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
}

export function Chip({ className, variant = "default", size = "md", ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        variant === "default" && "bg-muted text-fg-secondary",
        variant === "primary" && "bg-primary-subtle text-primary",
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
