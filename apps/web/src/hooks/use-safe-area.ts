"use client";

import { detectSafeArea } from "@/lib/telegram/detect";
import { useEffect, useState } from "react";

interface SafeArea {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function useSafeArea(): SafeArea {
  const [safeArea, setSafeArea] = useState<SafeArea>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    setSafeArea(detectSafeArea());

    const update = () => setSafeArea(detectSafeArea());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return safeArea;
}
