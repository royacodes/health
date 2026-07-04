import { getTelegramWebApp, isTelegramMiniApp } from "./detect";
import { MOCK_INIT_DATA, MOCK_USER } from "./mock";
import type { TelegramInitData, TelegramUser } from "./types";

export function getTelegramUser(): TelegramUser | null {
  if (!isTelegramMiniApp()) {
    return process.env.NODE_ENV === "development" ? MOCK_USER : null;
  }
  const webApp = getTelegramWebApp();
  if (!webApp?.initDataUnsafe?.user) return null;
  return webApp.initDataUnsafe.user;
}

export function getTelegramInitData(): TelegramInitData | null {
  if (!isTelegramMiniApp()) {
    return process.env.NODE_ENV === "development" ? MOCK_INIT_DATA : null;
  }
  const webApp = getTelegramWebApp();
  if (!webApp?.initDataUnsafe) return null;
  return {
    query_id: webApp.initDataUnsafe.query_id,
    user: webApp.initDataUnsafe.user
      ? {
          id: webApp.initDataUnsafe.user.id,
          first_name: webApp.initDataUnsafe.user.first_name,
          last_name: webApp.initDataUnsafe.user.last_name,
          username: webApp.initDataUnsafe.user.username,
          language_code: webApp.initDataUnsafe.user.language_code,
          is_premium: webApp.initDataUnsafe.user.is_premium,
          photo_url: webApp.initDataUnsafe.user.photo_url,
        }
      : undefined,
    auth_date: webApp.initDataUnsafe.auth_date,
    hash: webApp.initDataUnsafe.hash,
  };
}

export function getTelegramUserId(): number | null {
  const user = getTelegramUser();
  return user?.id ?? null;
}
