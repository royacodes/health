import { createAuth } from "@healthy/auth";
import { createLogger } from "@healthy/auth/logger";
import { Hono } from "hono";

const logger = createLogger("api:auth");

const auth = createAuth({
  databaseUrl: process.env.DATABASE_URL!,
  secret: process.env.BETTER_AUTH_SECRET || process.env.NEXTAUTH_SECRET!,
  baseURL: `${process.env.API_URL || "http://localhost:8787"}/api/auth`,
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001",
  ],
  google:
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }
      : undefined,
});

export const authRoutes = new Hono();

authRoutes.all("/*", async (c) => {
  try {
    const response = await auth.handler(c.req.raw);
    return response;
  } catch (error) {
    logger.error("Auth handler error", { error: String(error) });
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

authRoutes.get("/session", async (c) => {
  try {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      return c.json({ session: null, user: null });
    }
    return c.json({ session: session.session, user: session.user });
  } catch (error) {
    logger.error("Get session error", { error: String(error) });
    return c.json({ session: null, user: null });
  }
});
