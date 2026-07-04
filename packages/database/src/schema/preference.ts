import { jsonb, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";

export const measurementSystemEnum = pgEnum("measurement_system", ["metric", "imperial"]);
export const dietTypeEnum = pgEnum("diet_type", [
  "none",
  "vegetarian",
  "vegan",
  "keto",
  "paleo",
  "mediterranean",
  "gluten_free",
  "dairy_free",
]);

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  marketing: boolean;
}

export const preferences = pgTable("preferences", {
  userId: varchar("user_id", { length: 36 })
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  theme: varchar("theme", { length: 20 }).default("system"),
  measurementSystem: measurementSystemEnum("measurement_system").default("metric"),
  dietType: dietTypeEnum("diet_type").default("none"),
  allergies: jsonb("allergies").$type<string[]>().default([]),
  dislikedIngredients: jsonb("disliked_ingredients").$type<string[]>().default([]),
  notificationPreferences: jsonb("notification_preferences")
    .$type<NotificationPreferences>()
    .default({ email: true, push: true, marketing: false }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
