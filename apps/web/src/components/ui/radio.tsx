"use client";

import { cn } from "@healthy/ui";
import { forwardRef } from "react";

interface RadioProps {
  checked?: boolean;
  onCheckedChange?: () => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  id?: string;
  name?: string;
}

const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  ({ checked = false, onCheckedChange, disabled, className, label, id }, ref) => {
    return (
      <div className="flex items-center gap-3">
        <button
          ref={ref}
          id={id}
          type="button"
          // biome-ignore lint/a11y/useSemanticElements: custom styled radio
          role="radio"
          aria-checked={checked}
          aria-label={label}
          disabled={disabled}
          onClick={onCheckedChange}
          className={cn(
            "peer flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
            "border transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            checked
              ? "border-primary bg-primary"
              : "border-border-strong bg-surface hover:border-primary/50",
            className,
          )}
        >
          {checked && <span className="h-2 w-2 rounded-full bg-on-primary" />}
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
Radio.displayName = "Radio";

export { Radio };
