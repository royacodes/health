import type {
  TelegramInitData,
  TelegramPlatform,
  TelegramSafeArea,
  TelegramThemeParams,
  TelegramUser,
  TelegramViewport,
} from "./types";

export const MOCK_USER: TelegramUser = {
  id: 123456789,
  first_name: "Test",
  last_name: "User",
  username: "testuser",
  language_code: "en",
  is_premium: false,
};

export const MOCK_INIT_DATA: TelegramInitData = {
  query_id: "mock_query_id",
  user: MOCK_USER,
  auth_date: Math.floor(Date.now() / 1000),
  hash: "mock_hash",
};

export const MOCK_THEME_PARAMS: TelegramThemeParams = {
  bg_color: "#ffffff",
  text_color: "#000000",
  hint_color: "#999999",
  link_color: "#2481cc",
  button_color: "#2481cc",
  button_text_color: "#ffffff",
  secondary_bg_color: "#f0f0f0",
};

export const MOCK_VIEWPORT: TelegramViewport = {
  height: 600,
  width: 400,
  is_expanded: true,
  is_state_stable: true,
  stable_height: 600,
};

export const MOCK_SAFE_AREA: TelegramSafeArea = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

export const MOCK_PLATFORM: TelegramPlatform = {
  colorScheme: "light",
  themeParams: MOCK_THEME_PARAMS,
  viewport: MOCK_VIEWPORT,
  safeArea: MOCK_SAFE_AREA,
  isExpanded: true,
  headerHeight: 56,
};
