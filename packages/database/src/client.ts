import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema/index.js";

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL environment variable is not set. " +
        "Create a .dev.vars file in apps/api/ with DATABASE_URL=your-connection-string",
    );
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof createDb> | null = null;

function getDb() {
  if (!_db) {
    _db = createDb();
  }
  return _db;
}

export const db: ReturnType<typeof drizzle<typeof schema>> = new Proxy(
  {} as ReturnType<typeof drizzle<typeof schema>>,
  {
    get(_target, prop) {
      const actualDb = getDb();
      const value = (actualDb as unknown as Record<string | symbol, unknown>)[prop];
      if (typeof value === "function") {
        return (...args: unknown[]) =>
          (value as (...a: unknown[]) => unknown).apply(actualDb, args);
      }
      return value;
    },
  },
);
