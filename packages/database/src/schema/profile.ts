import { pgEnum, pgTable, real, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";

export const genderEnum = pgEnum("gender", ["male", "female", "other", "prefer_not_to_say"]);
export const activityLevelEnum = pgEnum("activity_level", [
  "sedentary",
  "light",
  "moderate",
  "active",
  "very_active",
]);
export const goalEnum = pgEnum("goal", [
  "lose_weight",
  "maintain_weight",
  "gain_weight",
  "build_muscle",
  "improve_health",
]);

export const profiles = pgTable("profiles", {
  userId: varchar("user_id", { length: 36 })
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  gender: genderEnum("gender"),
  birthDate: timestamp("birth_date", { withTimezone: true }),
  height: real("height"),
  weight: real("weight"),
  activityLevel: activityLevelEnum("activity_level"),
  goal: goalEnum("goal"),
  country: varchar("country", { length: 100 }),
  bio: text("bio"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
