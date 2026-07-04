import { db } from "@healthy/database";
import { nutritionFacts } from "@healthy/database/schema";
import { calculateNutrition, calculateRecipeNutrition, createNutritionSchema } from "@healthy/food";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

export const nutritionRoutes = new Hono();

/* GET /nutrition/:foodId — get nutrition facts for a food */
nutritionRoutes.get("/:foodId", async (c) => {
  const foodId = c.req.param("foodId");
  const [facts] = await db
    .select()
    .from(nutritionFacts)
    .where(eq(nutritionFacts.foodId, foodId))
    .limit(1);

  if (!facts) {
    return c.json({ error: "Nutrition facts not found" }, 404);
  }

  return c.json({ nutrition: facts });
});

/* POST /nutrition — create nutrition facts */
nutritionRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = createNutritionSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
  }

  const id = crypto.randomUUID();
  const data = parsed.data;

  const [created] = await db
    .insert(nutritionFacts)
    .values({
      id,
      foodId: data.foodId,
      source: data.source ?? "database",
      per100gCalories: data.per100g.calories,
      per100gProtein: data.per100g.protein,
      per100gCarbohydrates: data.per100g.carbohydrates,
      per100gFat: data.per100g.fat,
      per100gFiber: data.per100g.fiber,
      per100gSugar: data.per100g.sugar,
      per100gSodium: data.per100g.sodium,
      per100gPotassium: data.per100g.potassium,
      per100gCalcium: data.per100g.calcium,
      per100gIron: data.per100g.iron,
      per100gMagnesium: data.per100g.magnesium,
      per100gVitaminA: data.per100g.vitaminA,
      per100gVitaminB: data.per100g.vitaminB,
      per100gVitaminC: data.per100g.vitaminC,
      per100gVitaminD: data.per100g.vitaminD,
      per100gVitaminE: data.per100g.vitaminE,
      per100gVitaminK: data.per100g.vitaminK,
      per100gCholesterol: data.per100g.cholesterol,
      per100gCaffeine: data.per100g.caffeine,
      per100gWater: data.per100g.water,
      servingSizeG: data.servingSizeG,
      perServingCalories: data.perServing.calories,
      perServingProtein: data.perServing.protein,
      perServingCarbohydrates: data.perServing.carbohydrates,
      perServingFat: data.perServing.fat,
      perServingFiber: data.perServing.fiber,
      perServingSugar: data.perServing.sugar,
      perServingSodium: data.perServing.sodium,
      perServingPotassium: data.perServing.potassium,
      perServingCalcium: data.perServing.calcium,
      perServingIron: data.perServing.iron,
      perServingMagnesium: data.perServing.magnesium,
      perServingVitaminA: data.perServing.vitaminA,
      perServingVitaminB: data.perServing.vitaminB,
      perServingVitaminC: data.perServing.vitaminC,
      perServingVitaminD: data.perServing.vitaminD,
      perServingVitaminE: data.perServing.vitaminE,
      perServingVitaminK: data.perServing.vitaminK,
      perServingCholesterol: data.perServing.cholesterol,
      perServingCaffeine: data.perServing.caffeine,
      perServingWater: data.perServing.water,
    })
    .returning();

  return c.json({ nutrition: created }, 201);
});

/* POST /nutrition/calculate — calculate nutrition for custom amounts */
nutritionRoutes.post("/calculate", async (c) => {
  const body = await c.req.json();

  if (!body.per100g || !body.amount || !body.unitSlug || !body.conversionFactor) {
    return c.json(
      { error: "Missing required fields: per100g, amount, unitSlug, conversionFactor" },
      400,
    );
  }

  const result = calculateNutrition({
    per100g: body.per100g,
    amount: body.amount,
    unitSlug: body.unitSlug,
    conversionFactor: body.conversionFactor,
  });

  return c.json(result);
});

/* POST /nutrition/calculate-recipe — calculate total nutrition for a recipe */
nutritionRoutes.post("/calculate-recipe", async (c) => {
  const body = await c.req.json();

  if (!body.ingredients || !Array.isArray(body.ingredients)) {
    return c.json({ error: "Missing required field: ingredients (array)" }, 400);
  }

  const total = calculateRecipeNutrition(body.ingredients);

  return c.json({ total });
});
