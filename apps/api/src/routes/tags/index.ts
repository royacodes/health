import { db } from "@healthy/database";
import { tags } from "@healthy/database/schema";
import { createTagSchema } from "@healthy/food";
import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";

export const tagRoutes = new Hono();

/* GET /tags — list tags */
tagRoutes.get("/", async (c) => {
  const _locale = c.req.query("locale") ?? "en";
  const items = await db.select().from(tags).orderBy(desc(tags.createdAt));
  return c.json({ items });
});

/* GET /tags/:id */
tagRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const [item] = await db.select().from(tags).where(eq(tags.id, id)).limit(1);
  if (!item) return c.json({ error: "Tag not found" }, 404);
  return c.json({ tag: item });
});

/* POST /tags */
tagRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = createTagSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const id = crypto.randomUUID();
  const data = parsed.data;

  const [created] = await db
    .insert(tags)
    .values({
      id,
      slug: data.slug,
      translations: data.translations,
      color: data.color,
    })
    .returning();

  return c.json({ tag: created }, 201);
});

/* DELETE /tags/:id */
tagRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const [deleted] = await db.delete(tags).where(eq(tags.id, id)).returning();
  if (!deleted) return c.json({ error: "Tag not found" }, 404);
  return c.json({ success: true });
});
