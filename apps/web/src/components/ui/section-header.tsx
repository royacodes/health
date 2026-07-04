import type { HTMLAttributes, ReactNode } from "react";

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, description, action, ...props }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4" {...props}>
      <div>
        <h2 className="text-base font-semibold text-fg">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-fg-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
