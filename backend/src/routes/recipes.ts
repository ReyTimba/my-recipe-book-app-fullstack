import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { recipeCreateSchema, recipeSchema } from "../schemas/recipe.js";

const router = Router();

function formatRecipe(recipe: Record<string, unknown>) {
  return {
    ...recipe,
    createdAt: recipe.createdAt instanceof Date ? recipe.createdAt.toISOString() : recipe.createdAt,
    updatedAt: recipe.updatedAt instanceof Date ? recipe.updatedAt.toISOString() : recipe.updatedAt,
  };
}

router.get("/", async (_req, res) => {
  const recipes = await prisma.recipe.findMany({ orderBy: { updatedAt: "desc" } });
  res.json(recipes.map(formatRecipe));
});

router.get("/:id", async (req, res) => {
  const recipe = await prisma.recipe.findUnique({ where: { id: req.params.id } });
  if (!recipe) { res.status(404).json({ error: "Receta no encontrada" }); return; }
  res.json(formatRecipe(recipe));
});

router.post("/", async (req, res) => {
  const parsed = recipeCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Datos no válidos", details: parsed.error.flatten() });
    return;
  }
  const now = new Date();
  const recipe = await prisma.recipe.create({
    data: {
      ...parsed.data,
      id: crypto.randomUUID(),
      createdAt: now,
    },
  });
  res.status(201).json(formatRecipe(recipe));
});

router.put("/:id", async (req, res) => {
  const existing = await prisma.recipe.findUnique({ where: { id: req.params.id } });
  if (!existing) { res.status(404).json({ error: "Receta no encontrada" }); return; }

  const parsed = recipeCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Datos no válidos", details: parsed.error.flatten() });
    return;
  }
  const recipe = await prisma.recipe.update({
    where: { id: req.params.id },
    data: parsed.data,
  });
  res.json(formatRecipe(recipe));
});

router.delete("/:id", async (req, res) => {
  const existing = await prisma.recipe.findUnique({ where: { id: req.params.id } });
  if (!existing) { res.status(404).json({ error: "Receta no encontrada" }); return; }
  await prisma.recipe.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
