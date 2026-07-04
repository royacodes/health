import { cn } from "@healthy/ui";
import type { HTMLAttributes } from "react";

interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg";
}

export function LoadingSpinner({ size = "md", className, ...props }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-primary border-t-transparent",
        size === "xs" && "h-3 w-3 border-[1.5px]",
        size === "sm" && "h-4 w-4 border-2",
        size === "md" && "h-6 w-6 border-2",
        size === "lg" && "h-8 w-8 border-[3px]",
        className,
      )}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
}
