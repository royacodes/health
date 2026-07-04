import { db } from "@healthy/database";
import { ingredients } from "@healthy/database/schema";
import { createIngredientSchema, updateIngredientSchema } from "@healthy/food";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { Hono } from "hono";

export const ingredientRoutes = new Hono();

/* GET /ingredients — list ingredients */
ingredientRoutes.get("/", async (c) => {
  const page = Number(c.req.query("page") ?? 1);
  const limit = Math.min(Number(c.req.query("limit") ?? 20), 100);
  const offset = (page - 1) * limit;
  const _locale = c.req.query("locale") ?? "en";

  const where = eq(ingredients.status, "active");

  const [items, countResult] = await Promise.all([
    db
      .select()
      .from(ingredients)
      .where(where)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(ingredients.createdAt)),
    db.select({ total: count() }).from(ingredients).where(where),
  ]);

  const total = countResult[0]?.total ?? 0;

  return c.json({ items, total, page, limit, totalPages: Math.ceil(total / limit) });
});

/* GET /ingredients/search */
ingredientRoutes.get("/search", async (c) => {
  const query = c.req.query("q") ?? "";
  const locale = c.req.query("locale") ?? "en";
  const limit = Math.min(Number(c.req.query("limit") ?? 20), 100);

  const conditions = [eq(ingredients.status, "active")];

  if (query) {
    conditions.push(
      sql` EXISTS (
        SELECT 1 FROM jsonb_array_elements(${ingredients.translations}) AS t
        WHERE t->>'locale' = ${locale}
        AND (t->>'name' ILIKE ${`%${query}%`} OR t->>'description' ILIKE ${`%${query}%`})
      )`,
    );
  }

  const items = await db
    .select()
    .from(ingredients)
    .where(and(...conditions))
    .limit(limit)
    .orderBy(desc(ingredients.createdAt));

  return c.json({ items, total: items.length });
});

/* GET /ingredients/:id */
ingredientRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const [item] = await db.select().from(ingredients).where(eq(ingredients.id, id)).limit(1);
  if (!item) return c.json({ error: "Ingredient not found" }, 404);
  return c.json({ ingredient: item });
});

/* GET /ingredients/barcode/:barcode */
ingredientRoutes.get("/barcode/:barcode", async (c) => {
  const barcode = c.req.param("barcode");
  const [item] = await db
    .select()
    .from(ingredients)
    .where(eq(ingredients.barcode, barcode))
    .limit(1);
  if (!item) return c.json({ error: "Ingredient not found" }, 404);
  return c.json({ ingredient: item });
});

/* POST /ingredients */
ingredientRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = createIngredientSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const id = crypto.randomUUID();
  const data = parsed.data;

  const [created] = await db
    .insert(ingredients)
    .values({
      id,
      slug: data.slug,
      barcode: data.barcode,
      categoryId: data.categoryId,
      brand: data.brand,
      translations: data.translations,
      status: data.status ?? "active",
      isVerified: data.isVerified ?? false,
    })
    .returning();

  return c.json({ ingredient: created }, 201);
});

/* PATCH /ingredients/:id */
ingredientRoutes.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = updateIngredientSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const data = parsed.data;
  const updateData: Record<string, unknown> = { updatedAt: new Date() };

  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.barcode !== undefined) updateData.barcode = data.barcode;
  if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
  if (data.brand !== undefined) updateData.brand = data.brand;
  if (data.translations !== undefined) updateData.translations = data.translations;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.isVerified !== undefined) updateData.isVerified = data.isVerified;

  const [updated] = await db
    .update(ingredients)
    .set(updateData)
    .where(eq(ingredients.id, id))
    .returning();
  if (!updated) return c.json({ error: "Ingredient not found" }, 404);
  return c.json({ ingredient: updated });
});

/* DELETE /ingredients/:id */
ingredientRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const [deleted] = await db.delete(ingredients).where(eq(ingredients.id, id)).returning();
  if (!deleted) return c.json({ error: "Ingredient not found" }, 404);
  return c.json({ success: true });
});
