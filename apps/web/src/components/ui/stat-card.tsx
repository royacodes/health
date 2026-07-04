import { cn } from "@healthy/ui";
import type { HTMLAttributes, ReactNode } from "react";

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
}

export function StatCard({
  label,
  value,
  change,
  changeType = "neutral",
  icon,
  className,
  ...props
}: StatCardProps) {
  return (
    <div className={cn("surface-elevated p-5", className)} {...props}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-fg-muted">{label}</p>
          <p className="text-2xl font-bold tracking-tight text-fg">{value}</p>
          {change && (
            <p
              className={cn(
                "text-xs font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-danger",
                changeType === "neutral" && "text-fg-muted",
              )}
            >
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
