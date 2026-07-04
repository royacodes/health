import { cn } from "@healthy/ui";
import { type TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-fg">
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={cn(
            "flex min-h-[100px] w-full rounded-xl border bg-surface px-4 py-3 text-sm text-fg",
            "placeholder:text-fg-muted resize-y",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
            error
              ? "border-danger focus:ring-danger/30"
              : "border-border focus:border-primary focus:ring-primary/20",
            className,
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="text-xs text-danger" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${id}-hint`} className="text-xs text-fg-muted">
            {hint}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
