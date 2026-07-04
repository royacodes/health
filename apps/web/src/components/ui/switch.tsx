"use client";

import { cn } from "@healthy/ui";
import { forwardRef } from "react";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  id?: string;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled, className, label, id }, ref) => {
    return (
      <div className="flex items-center gap-3">
        <button
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={label}
          disabled={disabled}
          onClick={() => onCheckedChange?.(!checked)}
          className={cn(
            "peer relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            checked ? "bg-primary" : "bg-border-strong",
            className,
          )}
        >
          <span
            className={cn(
              "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm",
              "transition-transform duration-200 ease-out",
              checked ? "translate-x-[22px]" : "translate-x-[2px]",
            )}
          />
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
Switch.displayName = "Switch";

export { Switch };
