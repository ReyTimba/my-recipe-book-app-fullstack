import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ message: "Backend funcionando" });
});

app.get("/api/recipes", async (req: Request, res: Response) => {
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true
    }
  });
  res.status(200).json(recipes)
});

app.post("/api/recipes", async (req: Request, res: Response) => {

  const reqTitle = req.body.title;
  const isValidTitle = typeof reqTitle === "string" && !!reqTitle?.trim();
  if (!isValidTitle) {
    return res.status(400).json({msg: "err_title"})
  };
  const reqIngredient = req.body.ingredients;
  if (!Array.isArray(reqIngredient)) {
    return res.status(400).json({msg: "err_no_array"})
  };
  const ingredientsToCreate = reqIngredient.map((ingredient) => ({
    name: ingredient.name,
    qty: ingredient.qty,
    unit: ingredient.unit
  }))
  
  const newRecipe = await prisma.recipe.create({
    data: {
      title: reqTitle.trim(),
      ingredients: {
        create: ingredientsToCreate
      }
    },
    include: {
      ingredients: true
    }
  });

  res.status(201).json(newRecipe);
})

app.delete("/api/recipes/:id", async (req: Request, res: Response) => {
  const recipeId = req.params.id;

  if (typeof recipeId !== "string" || !recipeId) {
    return res.status(400).json({msg: "err_id"})
  };

  const findRecipe = await prisma.recipe.findUnique({
    where: {id: recipeId}
  })

  if (!findRecipe) {
    return res.status(404).json({msg: "err_recipe_not_found"})
  };

  const data = await prisma.recipe.delete({
    where: {id: recipeId }
  })

  res.status(200).json(data);

})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
