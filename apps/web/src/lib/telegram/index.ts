export type {
  TelegramUser,
  TelegramInitData,
  TelegramThemeParams,
  TelegramViewport,
  TelegramSafeArea,
  TelegramPlatform,
  TelegramThemeType,
} from "./types";

export {
  isTelegramMiniApp,
  getTelegramWebApp,
  detectThemeParams,
  detectViewport,
  detectSafeArea,
  detectColorScheme,
  detectPlatform,
} from "./detect";

export { initTelegramApp, closeTelegramApp, isInitialized } from "./init";

export { getTelegramUser, getTelegramInitData, getTelegramUserId } from "./user";

export {
  MOCK_USER,
  MOCK_INIT_DATA,
  MOCK_THEME_PARAMS,
  MOCK_VIEWPORT,
  MOCK_SAFE_AREA,
  MOCK_PLATFORM,
} from "./mock";
