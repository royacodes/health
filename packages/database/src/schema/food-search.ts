import { index, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const searchHistory = pgTable(
  "search_history",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 36 }).notNull(),
    query: text("query").notNull(),
    locale: varchar("locale", { length: 10 }).default("en").notNull(),
    resultCount: integer("result_count").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("search_history_user_idx").on(t.userId),
    index("search_history_query_idx").on(t.query),
  ],
);

export const popularSearches = pgTable(
  "popular_searches",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    query: text("query").notNull().unique(),
    locale: varchar("locale", { length: 10 }).default("en").notNull(),
    count: integer("count").default(1).notNull(),
    lastSearchedAt: timestamp("last_searched_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("popular_searches_locale_idx").on(t.locale),
    index("popular_searches_count_idx").on(t.count),
  ],
);
