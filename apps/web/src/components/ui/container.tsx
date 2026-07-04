import { cn } from "@healthy/ui";
import type { HTMLAttributes } from "react";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container", className)} {...props} />;
}
