import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { authRoutes } from "./routes/auth/index.js";
import { categoryRoutes } from "./routes/categories/index.js";
import { collectionRoutes } from "./routes/collections/index.js";
import { foodRoutes } from "./routes/foods/index.js";
import { healthRoutes } from "./routes/health.js";
import { ingredientRoutes } from "./routes/ingredients/index.js";
import { nutritionRoutes } from "./routes/nutrition/index.js";
import { recipeRoutes } from "./routes/recipes/index.js";
import { servingRoutes } from "./routes/servings/index.js";
import { tagRoutes } from "./routes/tags/index.js";

type Bindings = {
  ENVIRONMENT: string;
  CACHE: KVNamespace;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: (origin) => {
      const allowedOrigins = [
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001",
      ];
      return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
    },
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

// Routes
app.route("/health", healthRoutes);
app.route("/auth", authRoutes);

/* Food & Nutrition Engine */
app.route("/foods", foodRoutes);
app.route("/ingredients", ingredientRoutes);
app.route("/categories", categoryRoutes);
app.route("/tags", tagRoutes);
app.route("/nutrition", nutritionRoutes);
app.route("/servings", servingRoutes);

/* Recipe Engine */
app.route("/recipes", recipeRoutes);
app.route("/collections", collectionRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal Server Error" }, 500);
});

export default app;
