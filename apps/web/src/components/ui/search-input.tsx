"use client";

import { cn } from "@healthy/ui";
import { Search, X } from "lucide-react";
import { forwardRef } from "react";

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="relative">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" />
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            "flex h-12 w-full rounded-xl border border-border bg-surface ps-10 pe-10 py-3 text-sm text-fg",
            "placeholder:text-fg-muted",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute end-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-fg-muted hover:text-fg transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
