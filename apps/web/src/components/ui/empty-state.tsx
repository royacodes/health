import type { HTMLAttributes, ReactNode } from "react";

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  secondaryAction?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  ...props
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center" {...props}>
      {icon && (
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-fg-muted">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-fg">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm leading-relaxed text-fg-muted">{description}</p>
      )}
      <div className="flex items-center gap-3">
        {action}
        {secondaryAction}
      </div>
    </div>
  );
}
