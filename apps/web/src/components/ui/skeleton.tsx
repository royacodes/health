import { cn } from "@healthy/ui";
import type { HTMLAttributes } from "react";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse-soft rounded-xl bg-muted", className)} {...props} />;
}
