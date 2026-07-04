"use client";

import { initSentry } from "@/lib/monitoring";
import { useEffect } from "react";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initSentry();
  }, []);

  return <>{children}</>;
}
