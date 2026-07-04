"use client";

import { cn } from "@healthy/ui";
import { X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
}

export function Toast({ message, type = "info", onClose }: ToastProps) {
  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-lg",
        "animate-slide-up",
        type === "success" && "bg-success text-on-success",
        type === "error" && "bg-danger text-on-danger",
        type === "warning" && "bg-warning text-on-warning",
        type === "info" && "bg-info text-on-info",
      )}
    >
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
