import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum("user_status", ["active", "pending", "suspended", "deleted"]);
export const roleEnum = pgEnum("user_role", ["user", "moderator", "admin"]);

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  displayName: varchar("display_name", { length: 255 }),
  username: varchar("username", { length: 100 }).unique(),
  avatar: text("avatar"),
  locale: varchar("locale", { length: 10 }).default("en"),
  timezone: varchar("timezone", { length: 50 }).default("UTC"),
  status: userStatusEnum("status").default("pending").notNull(),
  role: roleEnum("role").default("user").notNull(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
