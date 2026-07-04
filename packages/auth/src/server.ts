import { db } from "@healthy/database";
import { accounts, sessions, users, verifications } from "@healthy/database/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export function createAuth(config: {
  databaseUrl: string;
  google?: { clientId: string; clientSecret: string };
  telegram?: { botToken: string };
  baseURL?: string;
  secret: string;
}) {
  return betterAuth({
    baseURL: config.baseURL || "http://localhost:8787",
    secret: config.secret,
    adapter: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user: users,
        session: sessions,
        account: accounts,
        verification: verifications,
      },
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    socialProviders: {
      google: config.google
        ? {
            clientId: config.google.clientId,
            clientSecret: config.google.clientSecret,
          }
        : undefined,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
