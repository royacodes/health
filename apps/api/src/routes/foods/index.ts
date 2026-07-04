import { db } from "@healthy/database";
import { foodTags, foods, nutritionFacts } from "@healthy/database/schema";
import { createFoodSchema, updateFoodSchema } from "@healthy/food";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { Hono } from "hono";

export const foodRoutes = new Hono();

/* GET /foods — list foods with pagination */
foodRoutes.get("/", async (c) => {
  const page = Number(c.req.query("page") ?? 1);
  const limit = Math.min(Number(c.req.query("limit") ?? 20), 100);
  const offset = (page - 1) * limit;
  const _locale = c.req.query("locale") ?? "en";
  const status = c.req.query("status") ?? "active";

  const where = eq(foods.status, status as "active" | "draft" | "archived");

  const [items, countResult] = await Promise.all([
    db.select().from(foods).where(where).limit(limit).offset(offset).orderBy(desc(foods.createdAt)),
    db.select({ total: count() }).from(foods).where(where),
  ]);

  const total = countResult[0]?.total ?? 0;

  return c.json({
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
});

/* GET /foods/search — search foods */
foodRoutes.get("/search", async (c) => {
  const query = c.req.query("q") ?? "";
  const locale = c.req.query("locale") ?? "en";
  const categoryId = c.req.query("categoryId");
  const limit = Math.min(Number(c.req.query("limit") ?? 20), 100);

  const conditions = [eq(foods.status, "active")];

  if (query) {
    conditions.push(
      sql` EXISTS (
        SELECT 1 FROM jsonb_array_elements(${foods.translations}) AS t
        WHERE t->>'locale' = ${locale}
        AND (t->>'name' ILIKE ${`%${query}%`} OR t->>'description' ILIKE ${`%${query}%`})
      )`,
    );
  }

  if (categoryId) {
    conditions.push(eq(foods.categoryId, categoryId));
  }

  const items = await db
    .select()
    .from(foods)
    .where(and(...conditions))
    .limit(limit)
    .orderBy(desc(foods.createdAt));

  return c.json({ items, total: items.length });
});

/* GET /foods/:id — get food by id */
foodRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");

  const [food] = await db.select().from(foods).where(eq(foods.id, id)).limit(1);

  if (!food) {
    return c.json({ error: "Food not found" }, 404);
  }

  const [nutrition] = await db
    .select()
    .from(nutritionFacts)
    .where(eq(nutritionFacts.foodId, id))
    .limit(1);

  const foodTagList = await db
    .select({ tagId: foodTags.tagId })
    .from(foodTags)
    .where(eq(foodTags.foodId, id));

  return c.json({ food, nutrition, tagIds: foodTagList.map((ft) => ft.tagId) });
});

/* GET /foods/barcode/:barcode — search by barcode */
foodRoutes.get("/barcode/:barcode", async (c) => {
  const barcode = c.req.param("barcode");

  const [food] = await db.select().from(foods).where(eq(foods.barcode, barcode)).limit(1);

  if (!food) {
    return c.json({ error: "Food not found" }, 404);
  }

  return c.json({ food });
});

/* POST /foods — create food */
foodRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = createFoodSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const id = crypto.randomUUID();
  const data = parsed.data;

  const [created] = await db
    .insert(foods)
    .values({
      id,
      slug: data.slug,
      scientificName: data.scientificName,
      brand: data.brand,
      barcode: data.barcode,
      categoryId: data.categoryId,
      translations: data.translations,
      images: data.images ?? [],
      isVerified: data.isVerified ?? false,
      visibility: data.visibility ?? "public",
      status: data.status ?? "active",
    })
    .returning();

  return c.json({ food: created }, 201);
});

/* PATCH /foods/:id — update food */
foodRoutes.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = updateFoodSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const data = parsed.data;
  const updateData: Record<string, unknown> = { updatedAt: new Date() };

  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.scientificName !== undefined) updateData.scientificName = data.scientificName;
  if (data.brand !== undefined) updateData.brand = data.brand;
  if (data.barcode !== undefined) updateData.barcode = data.barcode;
  if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
  if (data.translations !== undefined) updateData.translations = data.translations;
  if (data.images !== undefined) updateData.images = data.images;
  if (data.isVerified !== undefined) updateData.isVerified = data.isVerified;
  if (data.visibility !== undefined) updateData.visibility = data.visibility;
  if (data.status !== undefined) updateData.status = data.status;

  const [updated] = await db.update(foods).set(updateData).where(eq(foods.id, id)).returning();

  if (!updated) {
    return c.json({ error: "Food not found" }, 404);
  }

  return c.json({ food: updated });
});

/* DELETE /foods/:id — delete food */
foodRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const [deleted] = await db.delete(foods).where(eq(foods.id, id)).returning();

  if (!deleted) {
    return c.json({ error: "Food not found" }, 404);
  }

  return c.json({ success: true });
});
