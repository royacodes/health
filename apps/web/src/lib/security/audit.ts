import { track } from "@/lib/analytics";

export type AuditAction =
  | "login"
  | "logout"
  | "password_change"
  | "email_change"
  | "session_revoked"
  | "account_created"
  | "account_deleted"
  | "profile_updated"
  | "preferences_updated"
  | "onboarding_completed";

export interface AuditEntry {
  action: AuditAction;
  userId?: string;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export function createAuditEntry(entry: AuditEntry): void {
  track({
    name: entry.action,
    properties: {
      userId: entry.userId,
      ip: entry.ip,
      userAgent: entry.userAgent,
      ...entry.metadata,
    },
  });
}
