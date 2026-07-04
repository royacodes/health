import { db } from "@healthy/database";
import { collectionRecipes, collections } from "@healthy/database/schema";
import { createCollectionSchema, updateCollectionSchema } from "@healthy/recipe";
import { asc, desc, eq } from "drizzle-orm";
import { Hono } from "hono";

export const collectionRoutes = new Hono();

/* GET /collections — list user's collections */
collectionRoutes.get("/", async (c) => {
  const userId = c.req.query("userId");
  if (!userId) return c.json({ error: "userId required" }, 400);

  const items = await db
    .select()
    .from(collections)
    .where(eq(collections.userId, userId))
    .orderBy(desc(collections.createdAt));

  return c.json({ items });
});

/* GET /collections/:id — get collection with recipes */
collectionRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const [collection] = await db.select().from(collections).where(eq(collections.id, id)).limit(1);
  if (!collection) return c.json({ error: "Collection not found" }, 404);

  const recipes = await db
    .select({ recipeId: collectionRecipes.recipeId, sortOrder: collectionRecipes.sortOrder })
    .from(collectionRecipes)
    .where(eq(collectionRecipes.collectionId, id))
    .orderBy(asc(collectionRecipes.sortOrder));

  return c.json({ collection, recipeIds: recipes.map((r) => r.recipeId) });
});

/* POST /collections — create collection */
collectionRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = createCollectionSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const userId = body.userId;
  if (!userId) return c.json({ error: "userId required" }, 400);

  const id = crypto.randomUUID();
  const data = parsed.data;

  const [created] = await db
    .insert(collections)
    .values({
      id,
      userId,
      translations: data.translations,
      visibility: data.visibility ?? "private",
      coverImage: data.coverImage ?? null,
    })
    .returning();

  return c.json({ collection: created }, 201);
});

/* PATCH /collections/:id — update collection */
collectionRoutes.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = updateCollectionSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const data = parsed.data;
  const updateData: Record<string, unknown> = { updatedAt: new Date() };

  if (data.translations !== undefined) updateData.translations = data.translations;
  if (data.visibility !== undefined) updateData.visibility = data.visibility;
  if (data.coverImage !== undefined) updateData.coverImage = data.coverImage;

  const [updated] = await db
    .update(collections)
    .set(updateData)
    .where(eq(collections.id, id))
    .returning();
  if (!updated) return c.json({ error: "Collection not found" }, 404);
  return c.json({ collection: updated });
});

/* DELETE /collections/:id */
collectionRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const [deleted] = await db.delete(collections).where(eq(collections.id, id)).returning();
  if (!deleted) return c.json({ error: "Collection not found" }, 404);
  return c.json({ success: true });
});

/* POST /collections/:id/recipes — add recipe to collection */
collectionRoutes.post("/:id/recipes", async (c) => {
  const collectionId = c.req.param("id");
  const body = await c.req.json();
  const { recipeId, sortOrder } = body;

  if (!recipeId) return c.json({ error: "recipeId required" }, 400);

  const [existing] = await db
    .select()
    .from(collectionRecipes)
    .where(
      eq(collectionRecipes.collectionId, collectionId) && eq(collectionRecipes.recipeId, recipeId),
    )
    .limit(1);

  if (existing) return c.json({ error: "Recipe already in collection" }, 409);

  await db.insert(collectionRecipes).values({
    collectionId,
    recipeId,
    sortOrder: sortOrder ?? 0,
  });

  return c.json({ success: true }, 201);
});

/* DELETE /collections/:id/recipes/:recipeId */
collectionRoutes.delete("/:id/recipes/:recipeId", async (c) => {
  const collectionId = c.req.param("id");
  const recipeId = c.req.param("recipeId");

  const [deleted] = await db
    .delete(collectionRecipes)
    .where(
      eq(collectionRecipes.collectionId, collectionId) && eq(collectionRecipes.recipeId, recipeId),
    )
    .returning();

  if (!deleted) return c.json({ error: "Recipe not in collection" }, 404);
  return c.json({ success: true });
});
