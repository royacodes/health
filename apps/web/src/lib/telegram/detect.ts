import type {
  TelegramPlatform,
  TelegramSafeArea,
  TelegramThemeParams,
  TelegramThemeType,
  TelegramViewport,
} from "./types";

interface WebApp {
  colorScheme: TelegramThemeType;
  themeParams: TelegramThemeParams;
  viewportHeight: number;
  viewportWidth: number;
  isExpanded: boolean;
  viewportStableHeight: number;
  safeAreaInset?: { top: number; bottom: number; left: number; right: number };
  headerHeight: number;
  ready: () => void;
  expand: () => void;
  close: () => void;
  initDataUnsafe?: {
    query_id?: string;
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      is_premium?: boolean;
      photo_url?: string;
    };
    auth_date?: number;
    hash?: string;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: WebApp;
    };
  }
}

export function isTelegramMiniApp(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.Telegram?.WebApp;
}

export function getTelegramWebApp(): WebApp | null {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
}

export function detectThemeParams(): TelegramThemeParams {
  const webApp = getTelegramWebApp();
  if (!webApp) return {};
  return { ...webApp.themeParams };
}

export function detectViewport(): TelegramViewport {
  const webApp = getTelegramWebApp();
  if (!webApp) {
    return {
      height: typeof window !== "undefined" ? window.innerHeight : 600,
      width: typeof window !== "undefined" ? window.innerWidth : 400,
      is_expanded: true,
      is_state_stable: true,
      stable_height: typeof window !== "undefined" ? window.innerHeight : 600,
    };
  }
  return {
    height: webApp.viewportHeight,
    width: webApp.viewportWidth,
    is_expanded: webApp.isExpanded,
    is_state_stable: true,
    stable_height: webApp.viewportStableHeight,
  };
}

export function detectSafeArea(): TelegramSafeArea {
  const webApp = getTelegramWebApp();
  if (!webApp?.safeAreaInset) {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }
  return {
    top: webApp.safeAreaInset.top,
    bottom: webApp.safeAreaInset.bottom,
    left: webApp.safeAreaInset.left,
    right: webApp.safeAreaInset.right,
  };
}

export function detectColorScheme(): TelegramThemeType {
  const webApp = getTelegramWebApp();
  if (!webApp) return "light";
  return webApp.colorScheme;
}

export function detectPlatform(): TelegramPlatform {
  const webApp = getTelegramWebApp();
  if (!webApp) {
    return {
      colorScheme: "light",
      themeParams: {},
      viewport: {
        height: typeof window !== "undefined" ? window.innerHeight : 600,
        width: typeof window !== "undefined" ? window.innerWidth : 400,
        is_expanded: true,
        is_state_stable: true,
        stable_height: typeof window !== "undefined" ? window.innerHeight : 600,
      },
      safeArea: { top: 0, bottom: 0, left: 0, right: 0 },
      isExpanded: true,
      headerHeight: 0,
    };
  }
  return {
    colorScheme: webApp.colorScheme,
    themeParams: { ...webApp.themeParams },
    viewport: {
      height: webApp.viewportHeight,
      width: webApp.viewportWidth,
      is_expanded: webApp.isExpanded,
      is_state_stable: true,
      stable_height: webApp.viewportStableHeight,
    },
    safeArea: detectSafeArea(),
    isExpanded: webApp.isExpanded,
    headerHeight: webApp.headerHeight,
  };
}
