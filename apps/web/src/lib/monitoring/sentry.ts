import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENVIRONMENT = process.env.NODE_ENV;
const SENTRY_RELEASE = process.env.NEXT_PUBLIC_APP_VERSION;

export function initSentry(): void {
  if (!SENTRY_DSN) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,
    release: SENTRY_RELEASE,
    tracesSampleRate: SENTRY_ENVIRONMENT === "production" ? 0.1 : 1.0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    enabled: SENTRY_ENVIRONMENT === "production",
  });
}

export function captureException(error: Error, context?: Record<string, unknown>): string {
  return Sentry.captureException(error, {
    extra: context,
  });
}

export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = "info",
  context?: Record<string, unknown>,
): string {
  return Sentry.captureMessage(message, {
    level,
    extra: context,
  });
}

export function setTag(key: string, value: string): void {
  Sentry.setTag(key, value);
}

export function setContext(name: string, context: Record<string, unknown>): void {
  Sentry.setContext(name, context);
}

export function setUser(user: { id: string; email?: string; username?: string }): void {
  Sentry.setUser(user);
}

export function withSentry<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch (error) {
    captureException(error instanceof Error ? error : new Error(String(error)));
    return fallback;
  }
}
