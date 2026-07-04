"use client";

import { cn } from "@healthy/ui";
import Link from "next/link";
import type { ReactNode } from "react";

interface BottomNavItem {
  label: string;
  href: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
}

interface BottomNavProps {
  items: BottomNavItem[];
  activePath: string;
}

export function BottomNav({ items, activePath }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-sticky safe-bottom" aria-label="Main navigation">
      <div className="glass border-t border-border-subtle">
        <div className="flex items-center justify-around px-2 py-1">
          {items.map((item) => {
            const isActive = activePath.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-2xs font-medium transition-colors",
                  isActive ? "text-primary" : "text-fg-muted hover:text-fg",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  {isActive && item.activeIcon ? item.activeIcon : item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
