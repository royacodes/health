import { cn } from "@healthy/ui";
import type { HTMLAttributes } from "react";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "danger";
}

export function Progress({
  value,
  max = 100,
  variant = "default",
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      tabIndex={0}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500 ease-out",
          variant === "default" && "bg-primary",
          variant === "success" && "bg-success",
          variant === "warning" && "bg-warning",
          variant === "danger" && "bg-danger",
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
