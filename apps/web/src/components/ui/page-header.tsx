import type { HTMLAttributes, ReactNode } from "react";

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action, ...props }: PageHeaderProps) {
  return (
    <div className="space-y-1" {...props}>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">{title}</h1>
        {action}
      </div>
      {description && <p className="text-sm text-fg-muted">{description}</p>}
    </div>
  );
}
