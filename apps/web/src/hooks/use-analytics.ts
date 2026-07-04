"use client";

import {
  identify as analyticsIdentify,
  page as analyticsPage,
  track as analyticsTrack,
} from "@/lib/analytics";
import type { AnalyticsEvent } from "@/lib/analytics";
import { useCallback } from "react";

export function useAnalytics() {
  const track = useCallback((event: AnalyticsEvent) => {
    analyticsTrack(event);
  }, []);

  const trackPage = useCallback((name: string, properties?: Record<string, unknown>) => {
    analyticsPage(name, properties);
  }, []);

  const identify = useCallback((userId: string, traits?: Record<string, unknown>) => {
    analyticsIdentify(userId, traits);
  }, []);

  return { track, trackPage, identify };
}
