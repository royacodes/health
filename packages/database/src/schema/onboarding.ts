import { integer, jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";

export const onboarding = pgTable("onboarding", {
  userId: varchar("user_id", { length: 36 })
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  currentStep: integer("current_step").default(1).notNull(),
  totalSteps: integer("total_steps").default(6).notNull(),
  completed: jsonb("completed_steps").$type<number[]>().default([]),
  data: jsonb("data").$type<Record<string, unknown>>().default({}),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
