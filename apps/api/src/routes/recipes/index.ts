import { db } from "@healthy/database";
import {
  recipeCategories,
  recipeFavorites,
  recipeIngredients,
  recipeRatings,
  recipeReviews,
  recipeSteps,
  recipeTags,
  recipes,
} from "@healthy/database/schema";
import {
  createRecipeIngredientSchema,
  createRecipeSchema,
  createRecipeStepSchema,
  ratingSchema,
  reorderStepsSchema,
  reviewSchema,
  scaleServingsSchema,
  updateRecipeSchema,
} from "@healthy/recipe";
import { and, asc, count, desc, eq, sql } from "drizzle-orm";
import { Hono } from "hono";

export const recipeRoutes = new Hono();

/* GET /recipes — list recipes with pagination */
recipeRoutes.get("/", async (c) => {
  const page = Number(c.req.query("page") ?? 1);
  const limit = Math.min(Number(c.req.query("limit") ?? 20), 100);
  const offset = (page - 1) * limit;
  const status = c.req.query("status") ?? "active";

  const where = eq(recipes.status, status as "active" | "draft" | "archived");

  const [items, countResult] = await Promise.all([
    db
      .select()
      .from(recipes)
      .where(where)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(recipes.createdAt)),
    db.select({ total: count() }).from(recipes).where(where),
  ]);

  const total = countResult[0]?.total ?? 0;

  return c.json({ items, total, page, limit, totalPages: Math.ceil(total / limit) });
});

/* GET /recipes/search — search recipes */
recipeRoutes.get("/search", async (c) => {
  const query = c.req.query("q") ?? "";
  const locale = c.req.query("locale") ?? "en";
  const limit = Math.min(Number(c.req.query("limit") ?? 20), 100);

  const conditions = [eq(recipes.status, "active"), eq(recipes.visibility, "public")];

  if (query) {
    conditions.push(
      sql` EXISTS (
        SELECT 1 FROM jsonb_array_elements(${recipes.translations}) AS t
        WHERE t->>'locale' = ${locale}
        AND (t->>'title' ILIKE ${`%${query}%`} OR t->>'description' ILIKE ${`%${query}%`})
      )`,
    );
  }

  const items = await db
    .select()
    .from(recipes)
    .where(and(...conditions))
    .limit(limit)
    .orderBy(desc(recipes.createdAt));

  return c.json({ items, total: items.length });
});

/* GET /recipes/:id — get recipe with ingredients and steps */
recipeRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");

  const [recipe] = await db.select().from(recipes).where(eq(recipes.id, id)).limit(1);
  if (!recipe) return c.json({ error: "Recipe not found" }, 404);

  const ingredients = await db
    .select()
    .from(recipeIngredients)
    .where(eq(recipeIngredients.recipeId, id))
    .orderBy(asc(recipeIngredients.sortOrder));

  const steps = await db
    .select()
    .from(recipeSteps)
    .where(eq(recipeSteps.recipeId, id))
    .orderBy(asc(recipeSteps.order));

  const tags = await db
    .select({ tagId: recipeTags.tagId })
    .from(recipeTags)
    .where(eq(recipeTags.recipeId, id));

  const categories = await db
    .select({ categoryId: recipeCategories.categoryId, isPrimary: recipeCategories.isPrimary })
    .from(recipeCategories)
    .where(eq(recipeCategories.recipeId, id));

  const [ratingResult] = await db
    .select({
      avg: sql<number>`COALESCE(AVG(${recipeRatings.rating}), 0)`,
      count: count(),
    })
    .from(recipeRatings)
    .where(eq(recipeRatings.recipeId, id));

  const [reviewCount] = await db
    .select({ total: count() })
    .from(recipeReviews)
    .where(eq(recipeReviews.recipeId, id));

  const [favCount] = await db
    .select({ total: count() })
    .from(recipeFavorites)
    .where(eq(recipeFavorites.recipeId, id));

  return c.json({
    recipe,
    ingredients,
    steps,
    tags: tags.map((t) => t.tagId),
    categories,
    stats: {
      avgRating: Math.round((ratingResult?.avg ?? 0) * 10) / 10,
      ratingCount: ratingResult?.count ?? 0,
      reviewCount: reviewCount?.total ?? 0,
      favoriteCount: favCount?.total ?? 0,
    },
  });
});

/* POST /recipes — create recipe */
recipeRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = createRecipeSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const id = crypto.randomUUID();
  const data = parsed.data;
  const totalTime = (data.prepTimeMinutes ?? 0) + (data.cookTimeMinutes ?? 0);

  const [created] = await db
    .insert(recipes)
    .values({
      id,
      slug: data.slug,
      translations: data.translations,
      coverImage: data.coverImage ?? null,
      gallery: data.gallery ?? [],
      difficulty: data.difficulty ?? "easy",
      servings: data.servings ?? 4,
      prepTimeMinutes: data.prepTimeMinutes ?? 0,
      cookTimeMinutes: data.cookTimeMinutes ?? 0,
      totalTimeMinutes: totalTime,
      calories: data.calories ?? 0,
      visibility: data.visibility ?? "public",
      status: data.status ?? "active",
      authorId: data.authorId,
    })
    .returning();

  return c.json({ recipe: created }, 201);
});

/* PATCH /recipes/:id — update recipe */
recipeRoutes.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = updateRecipeSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const data = parsed.data;
  const updateData: Record<string, unknown> = { updatedAt: new Date() };

  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.translations !== undefined) updateData.translations = data.translations;
  if (data.coverImage !== undefined) updateData.coverImage = data.coverImage;
  if (data.gallery !== undefined) updateData.gallery = data.gallery;
  if (data.difficulty !== undefined) updateData.difficulty = data.difficulty;
  if (data.servings !== undefined) updateData.servings = data.servings;
  if (data.prepTimeMinutes !== undefined) updateData.prepTimeMinutes = data.prepTimeMinutes;
  if (data.cookTimeMinutes !== undefined) updateData.cookTimeMinutes = data.cookTimeMinutes;
  if (data.calories !== undefined) updateData.calories = data.calories;
  if (data.visibility !== undefined) updateData.visibility = data.visibility;
  if (data.status !== undefined) updateData.status = data.status;

  if (data.prepTimeMinutes !== undefined || data.cookTimeMinutes !== undefined) {
    const [existing] = await db.select().from(recipes).where(eq(recipes.id, id)).limit(1);
    if (existing) {
      const prep = data.prepTimeMinutes ?? existing.prepTimeMinutes;
      const cook = data.cookTimeMinutes ?? existing.cookTimeMinutes;
      updateData.totalTimeMinutes = prep + cook;
    }
  }

  const [updated] = await db.update(recipes).set(updateData).where(eq(recipes.id, id)).returning();
  if (!updated) return c.json({ error: "Recipe not found" }, 404);
  return c.json({ recipe: updated });
});

/* DELETE /recipes/:id */
recipeRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const [deleted] = await db.delete(recipes).where(eq(recipes.id, id)).returning();
  if (!deleted) return c.json({ error: "Recipe not found" }, 404);
  return c.json({ success: true });
});

/* POST /recipes/:id/favorite */
recipeRoutes.post("/:id/favorite", async (c) => {
  const recipeId = c.req.param("id");
  const body = await c.req.json();
  const userId = body.userId;
  if (!userId) return c.json({ error: "userId required" }, 400);

  const [existing] = await db
    .select()
    .from(recipeFavorites)
    .where(and(eq(recipeFavorites.userId, userId), eq(recipeFavorites.recipeId, recipeId)))
    .limit(1);

  if (existing) {
    await db
      .delete(recipeFavorites)
      .where(and(eq(recipeFavorites.userId, userId), eq(recipeFavorites.recipeId, recipeId)));
    return c.json({ favorited: false });
  }

  await db.insert(recipeFavorites).values({ userId, recipeId });
  return c.json({ favorited: true });
});

/* POST /recipes/:id/rating */
recipeRoutes.post("/:id/rating", async (c) => {
  const recipeId = c.req.param("id");
  const body = await c.req.json();
  const parsed = ratingSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const userId = body.userId;
  if (!userId) return c.json({ error: "userId required" }, 400);

  const [existing] = await db
    .select()
    .from(recipeRatings)
    .where(and(eq(recipeRatings.userId, userId), eq(recipeRatings.recipeId, recipeId)))
    .limit(1);

  if (existing) {
    const [updated] = await db
      .update(recipeRatings)
      .set({ rating: parsed.data.rating, updatedAt: new Date() })
      .where(eq(recipeRatings.id, existing.id))
      .returning();
    return c.json({ rating: updated });
  }

  const id = crypto.randomUUID();
  const [created] = await db
    .insert(recipeRatings)
    .values({ id, userId, recipeId, rating: parsed.data.rating })
    .returning();

  return c.json({ rating: created }, 201);
});

/* POST /recipes/:id/review */
recipeRoutes.post("/:id/review", async (c) => {
  const recipeId = c.req.param("id");
  const body = await c.req.json();
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const userId = body.userId;
  if (!userId) return c.json({ error: "userId required" }, 400);

  const id = crypto.randomUUID();
  const [created] = await db
    .insert(recipeReviews)
    .values({ id, userId, recipeId, content: parsed.data.content, rating: parsed.data.rating })
    .returning();

  return c.json({ review: created }, 201);
});

/* GET /recipes/:id/reviews */
recipeRoutes.get("/:id/reviews", async (c) => {
  const recipeId = c.req.param("id");
  const page = Number(c.req.query("page") ?? 1);
  const limit = Math.min(Number(c.req.query("limit") ?? 20), 100);
  const offset = (page - 1) * limit;

  const items = await db
    .select()
    .from(recipeReviews)
    .where(eq(recipeReviews.recipeId, recipeId))
    .orderBy(desc(recipeReviews.createdAt))
    .limit(limit)
    .offset(offset);

  return c.json({ items, page, limit });
});

/* GET /recipes/:id/ingredients — list recipe ingredients */
recipeRoutes.get("/:id/ingredients", async (c) => {
  const recipeId = c.req.param("id");
  const items = await db
    .select()
    .from(recipeIngredients)
    .where(eq(recipeIngredients.recipeId, recipeId))
    .orderBy(asc(recipeIngredients.sortOrder));
  return c.json({ items });
});

/* POST /recipes/:id/ingredients — add ingredient to recipe */
recipeRoutes.post("/:id/ingredients", async (c) => {
  const recipeId = c.req.param("id");
  const body = await c.req.json();
  const parsed = createRecipeIngredientSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const id = crypto.randomUUID();
  const data = parsed.data;

  const [created] = await db
    .insert(recipeIngredients)
    .values({
      id,
      recipeId,
      ingredientId: data.ingredientId,
      quantity: data.quantity,
      unitId: data.unitId,
      notes: data.notes ?? [],
      sortOrder: data.sortOrder ?? 0,
      isOptional: data.isOptional ?? false,
      groupId: data.groupId ?? null,
    })
    .returning();

  return c.json({ ingredient: created }, 201);
});

/* DELETE /recipes/:id/ingredients/:ingredientId */
recipeRoutes.delete("/:id/ingredients/:ingredientId", async (c) => {
  const ingredientId = c.req.param("ingredientId");
  const [deleted] = await db
    .delete(recipeIngredients)
    .where(eq(recipeIngredients.id, ingredientId))
    .returning();
  if (!deleted) return c.json({ error: "Ingredient not found" }, 404);
  return c.json({ success: true });
});

/* GET /recipes/:id/steps — list recipe steps */
recipeRoutes.get("/:id/steps", async (c) => {
  const recipeId = c.req.param("id");
  const items = await db
    .select()
    .from(recipeSteps)
    .where(eq(recipeSteps.recipeId, recipeId))
    .orderBy(asc(recipeSteps.order));
  return c.json({ items });
});

/* POST /recipes/:id/steps — add step to recipe */
recipeRoutes.post("/:id/steps", async (c) => {
  const recipeId = c.req.param("id");
  const body = await c.req.json();
  const parsed = createRecipeStepSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const id = crypto.randomUUID();
  const data = parsed.data;

  const [created] = await db
    .insert(recipeSteps)
    .values({
      id,
      recipeId,
      order: data.order,
      translations: data.translations,
      image: data.image ?? null,
      timerMinutes: data.timerMinutes ?? null,
    })
    .returning();

  return c.json({ step: created }, 201);
});

/* PATCH /recipes/:id/steps/reorder */
recipeRoutes.patch("/:id/steps/reorder", async (c) => {
  const recipeId = c.req.param("id");
  const body = await c.req.json();
  const parsed = reorderStepsSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const { stepIds } = parsed.data;

  for (let i = 0; i < stepIds.length; i++) {
    const stepId = stepIds[i];
    if (stepId) {
      await db
        .update(recipeSteps)
        .set({ order: i })
        .where(and(eq(recipeSteps.id, stepId), eq(recipeSteps.recipeId, recipeId)));
    }
  }

  return c.json({ success: true });
});

/* POST /recipes/:id/scale — scale servings and get adjusted ingredients */
recipeRoutes.post("/:id/scale", async (c) => {
  const recipeId = c.req.param("id");
  const body = await c.req.json();
  const parsed = scaleServingsSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const [recipe] = await db.select().from(recipes).where(eq(recipes.id, recipeId)).limit(1);
  if (!recipe) return c.json({ error: "Recipe not found" }, 404);

  const ingredients = await db
    .select()
    .from(recipeIngredients)
    .where(eq(recipeIngredients.recipeId, recipeId));

  const scaleFactor = parsed.data.targetServings / recipe.servings;

  const scaled = ingredients.map((ing) => ({
    ...ing,
    scaledQuantity: Math.round(ing.quantity * scaleFactor * 100) / 100,
  }));

  return c.json({
    originalServings: recipe.servings,
    targetServings: parsed.data.targetServings,
    scaleFactor: Math.round(scaleFactor * 100) / 100,
    ingredients: scaled,
  });
});
