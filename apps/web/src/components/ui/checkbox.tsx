"use client";

import { cn } from "@healthy/ui";
import { Check } from "lucide-react";
import { forwardRef } from "react";

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  id?: string;
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked = false, onCheckedChange, disabled, className, label, id }, ref) => {
    return (
      <div className="flex items-center gap-3">
        <button
          ref={ref}
          id={id}
          type="button"
          // biome-ignore lint/a11y/useSemanticElements: custom styled checkbox
          role="checkbox"
          aria-checked={checked}
          aria-label={label}
          disabled={disabled}
          onClick={() => onCheckedChange?.(!checked)}
          className={cn(
            "peer flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
            "border transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            checked
              ? "border-primary bg-primary text-on-primary"
              : "border-border-strong bg-surface hover:border-primary/50",
            className,
          )}
        >
          {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </button>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-fg cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
