"use client";

import { cn } from "@healthy/ui";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right" | "bottom";
  title?: string;
}

export function Drawer({ open, onClose, children, side = "bottom", title }: DrawerProps) {
  return (
    <>
      {open && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop overlay
        <div
          className="fixed inset-0 z-overlay bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        // biome-ignore lint/a11y/useSemanticElements: styled dialog
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "fixed z-modal bg-surface transition-transform duration-300 ease-out",
          side === "bottom" && "inset-x-0 bottom-0 rounded-t-3xl max-h-[85vh]",
          side === "left" && "inset-y-0 left-0 w-[min(85vw,360px)] rounded-r-2xl",
          side === "right" && "inset-y-0 right-0 w-[min(85vw,360px)] rounded-l-2xl",
          open
            ? "translate-y-0 translate-x-0"
            : side === "bottom"
              ? "translate-y-full"
              : side === "left"
                ? "-translate-x-full"
                : "translate-x-full",
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
            <h2 className="text-base font-semibold text-fg">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-fg-muted hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </>
  );
}

export function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function DrawerTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold text-fg", className)} {...props} />;
}

export function DrawerContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-6 flex justify-end gap-3", className)} {...props} />;
}
