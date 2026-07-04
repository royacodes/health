import { index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";

export const sessions = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: varchar("token", { length: 255 }).notNull().unique(),
    ip: varchar("ip", { length: 45 }),
    userAgent: text("user_agent"),
    platform: varchar("platform", { length: 100 }),
    location: varchar("location", { length: 255 }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("sessions_user_id_idx").on(t.userId)],
);
