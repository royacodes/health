import { db } from "@healthy/database";
import { categories } from "@healthy/database/schema";
import { createCategorySchema, updateCategorySchema } from "@healthy/food";
import { asc, eq, isNull } from "drizzle-orm";
import { Hono } from "hono";

export const categoryRoutes = new Hono();

/* GET /categories — list categories (optionally tree) */
categoryRoutes.get("/", async (c) => {
  const parentId = c.req.query("parentId");

  const items = await (parentId === "root" || parentId === undefined
    ? db
        .select()
        .from(categories)
        .where(parentId === "root" ? isNull(categories.parentId) : undefined)
        .orderBy(asc(categories.sortOrder))
    : db
        .select()
        .from(categories)
        .where(eq(categories.parentId, parentId))
        .orderBy(asc(categories.sortOrder)));

  return c.json({ items });
});

/* GET /categories/:id */
categoryRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const [item] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  if (!item) return c.json({ error: "Category not found" }, 404);

  const children = await db
    .select()
    .from(categories)
    .where(eq(categories.parentId, id))
    .orderBy(categories.sortOrder);

  return c.json({ category: item, children });
});

/* POST /categories */
categoryRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = createCategorySchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const id = crypto.randomUUID();
  const data = parsed.data;

  const [created] = await db
    .insert(categories)
    .values({
      id,
      slug: data.slug,
      parentId: data.parentId,
      translations: data.translations,
      icon: data.icon,
      color: data.color,
      sortOrder: data.sortOrder ?? 0,
    })
    .returning();

  return c.json({ category: created }, 201);
});

/* PATCH /categories/:id */
categoryRoutes.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = updateCategorySchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const data = parsed.data;
  const updateData: Record<string, unknown> = { updatedAt: new Date() };

  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.parentId !== undefined) updateData.parentId = data.parentId;
  if (data.translations !== undefined) updateData.translations = data.translations;
  if (data.icon !== undefined) updateData.icon = data.icon;
  if (data.color !== undefined) updateData.color = data.color;
  if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

  const [updated] = await db
    .update(categories)
    .set(updateData)
    .where(eq(categories.id, id))
    .returning();
  if (!updated) return c.json({ error: "Category not found" }, 404);
  return c.json({ category: updated });
});

/* DELETE /categories/:id */
categoryRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const [deleted] = await db.delete(categories).where(eq(categories.id, id)).returning();
  if (!deleted) return c.json({ error: "Category not found" }, 404);
  return c.json({ success: true });
});
