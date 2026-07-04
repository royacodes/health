export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

export interface AnalyticsProvider {
  identify(userId: string, traits?: Record<string, unknown>): void;
  track(event: AnalyticsEvent): void;
  page(name: string, properties?: Record<string, unknown>): void;
  group(groupId: string, traits?: Record<string, unknown>): void;
  reset(): void;
}

class NoopAnalyticsProvider implements AnalyticsProvider {
  identify(): void {}
  track(): void {}
  page(): void {}
  group(): void {}
  reset(): void {}
}

let currentProvider: AnalyticsProvider = new NoopAnalyticsProvider();

export function setAnalyticsProvider(provider: AnalyticsProvider): void {
  currentProvider = provider;
}

export function getAnalyticsProvider(): AnalyticsProvider {
  return currentProvider;
}

export function identify(userId: string, traits?: Record<string, unknown>): void {
  currentProvider.identify(userId, traits);
}

export function track(event: AnalyticsEvent): void {
  currentProvider.track(event);
}

export function page(name: string, properties?: Record<string, unknown>): void {
  currentProvider.page(name, properties);
}

export function group(groupId: string, traits?: Record<string, unknown>): void {
  currentProvider.group(groupId, traits);
}

export function resetAnalytics(): void {
  currentProvider.reset();
}
