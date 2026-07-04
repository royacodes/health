"use client";

import { detectPlatform, isTelegramMiniApp } from "@/lib/telegram/detect";
import { initTelegramApp } from "@/lib/telegram/init";
import type { TelegramInitData, TelegramPlatform, TelegramUser } from "@/lib/telegram/types";
import { getTelegramInitData, getTelegramUser, getTelegramUserId } from "@/lib/telegram/user";
import { useCallback, useEffect, useState } from "react";

export function useTelegram() {
  const [platform, setPlatform] = useState<TelegramPlatform | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState<TelegramInitData | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initTelegramApp();
    setPlatform(detectPlatform());
    setUser(getTelegramUser());
    setInitData(getTelegramInitData());
    setIsReady(true);
  }, []);

  const expand = useCallback(() => {
    if (typeof window !== "undefined") {
      window.Telegram?.WebApp?.expand();
    }
  }, []);

  const close = useCallback(() => {
    if (typeof window !== "undefined") {
      window.Telegram?.WebApp?.close();
    }
  }, []);

  return {
    isTelegram: isTelegramMiniApp(),
    isReady,
    platform,
    user,
    initData,
    userId: getTelegramUserId(),
    expand,
    close,
  };
}
