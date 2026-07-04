import { db } from "@healthy/database";
import { foodServings, servingUnits } from "@healthy/database/schema";
import { createServingUnitSchema } from "@healthy/food";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

export const servingRoutes = new Hono();

/* GET /servings/units — list all serving units */
servingRoutes.get("/units", async (c) => {
  const items = await db.select().from(servingUnits);
  return c.json({ items });
});

/* GET /servings/units/:id */
servingRoutes.get("/units/:id", async (c) => {
  const id = c.req.param("id");
  const [item] = await db.select().from(servingUnits).where(eq(servingUnits.id, id)).limit(1);
  if (!item) return c.json({ error: "Serving unit not found" }, 404);
  return c.json({ unit: item });
});

/* POST /servings/units — create serving unit */
servingRoutes.post("/units", async (c) => {
  const body = await c.req.json();
  const parsed = createServingUnitSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const id = crypto.randomUUID();
  const data = parsed.data;

  const [created] = await db
    .insert(servingUnits)
    .values({
      id,
      slug: data.slug,
      translations: data.translations,
      baseUnit: data.baseUnit,
      conversionFactor: data.conversionFactor,
      isMetric: data.isMetric ?? true,
      icon: data.icon,
    })
    .returning();

  return c.json({ unit: created }, 201);
});

/* GET /servings/food/:foodId — get servings for a food */
servingRoutes.get("/food/:foodId", async (c) => {
  const foodId = c.req.param("foodId");
  const items = await db.select().from(foodServings).where(eq(foodServings.foodId, foodId));
  return c.json({ items });
});

/* POST /servings/food — add serving to food */
servingRoutes.post("/food", async (c) => {
  const body = await c.req.json();
  const { foodId, unitId, amount, weightInGrams, isDefault } = body;

  if (!foodId || !unitId || !amount || !weightInGrams) {
    return c.json({ error: "Missing required fields: foodId, unitId, amount, weightInGrams" }, 400);
  }

  const id = crypto.randomUUID();
  const [created] = await db
    .insert(foodServings)
    .values({ id, foodId, unitId, amount, weightInGrams, isDefault: isDefault ?? false })
    .returning();

  return c.json({ serving: created }, 201);
});
