import { getTelegramWebApp, isTelegramMiniApp } from "./detect";

let initialized = false;

export function initTelegramApp(): void {
  if (initialized) return;
  if (!isTelegramMiniApp()) return;

  const webApp = getTelegramWebApp();
  if (!webApp) return;

  webApp.ready();
  webApp.expand();

  initialized = true;
}

export function closeTelegramApp(): void {
  if (!isTelegramMiniApp()) return;
  const webApp = getTelegramWebApp();
  if (!webApp) return;
  webApp.close();
}

export function isInitialized(): boolean {
  return initialized;
}
