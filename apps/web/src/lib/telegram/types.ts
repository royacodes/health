export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export interface TelegramInitData {
  query_id?: string;
  user?: TelegramUser;
  auth_date?: number;
  hash?: string;
}

export interface TelegramThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
  accent_text_color?: string;
  section_bg_color?: string;
  section_header_text_color?: string;
  subtitle_text_color?: string;
  destructive_text_color?: string;
}

export interface TelegramViewport {
  height: number;
  width: number;
  is_expanded: boolean;
  is_state_stable: boolean;
  stable_height: number;
}

export interface TelegramSafeArea {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export type TelegramThemeType = "light" | "dark" | "platform_params";

export interface TelegramPlatform {
  colorScheme: TelegramThemeType;
  themeParams: TelegramThemeParams;
  viewport: TelegramViewport;
  safeArea: TelegramSafeArea;
  isExpanded: boolean;
  headerHeight: number;
}
