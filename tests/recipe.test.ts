import { describe, expect, it } from "vitest";
import {
  draftFromRecipe,
  emptyRecipeDraft,
  exampleRecipes,
  parseRecipeCollection,
  quantityFromText,
  RecipeValidationError,
  saveRecipeDraft,
} from "../src/domain/recipe";
import { advancedRecipe } from "./fixtures/recipe-v2";

const NOW = "2026-07-21T18:00:00.000Z";

describe("dominio de recetas", () => {
  it("crea un borrador v2 utilizable", () => {
    let next = 0;
    const draft = emptyRecipeDraft(() => `id-${++next}`);
    expect(draft.servings).toBe(2);
    expect(draft.ingredients[0].quantity).toEqual({ kind: "unknown", originalText: "" });
    expect(draft.steps[0].text).toBe("");
  });

  it("normaliza campos básicos y conserva cantidades tipadas", () => {
    let next = 0;
    const draft = emptyRecipeDraft(() => `id-${++next}`);
    draft.name = "  Sopa   casera ";
    draft.description = "  Muy   sencilla ";
    draft.ingredients = [{ id: "ing-1", amount: "2", unit: "ud", name: " Tomates ", quantity: quantityFromText("2", "ud") }];
    draft.steps = [{ id: "step-1", text: " Cortar todo ", status: "complete" }];
    draft.tags = ["Cena", " cena ", "Rápida"];
    expect(saveRecipeDraft(draft, { id: "receta-1", now: NOW })).toMatchObject({
      schemaVersion: 2,
      id: "receta-1",
      name: "Sopa casera",
      description: "Muy sencilla",
      ingredients: [{ id: "ing-1", amount: "2", unit: "ud", name: "Tomates", quantity: { kind: "exact", originalText: "2 ud" } }],
      steps: [{ id: "step-1", text: "Cortar todo", status: "complete" }],
      tags: ["Cena", "Rápida"],
    });
  });

  it("al editar conserva identidad, fecha y campos avanzados no expuestos", () => {
    const draft = draftFromRecipe(advancedRecipe);
    draft.description = "Descripción editada";
    const saved = saveRecipeDraft(draft, { id: advancedRecipe.id, now: NOW, previous: advancedRecipe });
    expect(saved.id).toBe(advancedRecipe.id);
    expect(saved.createdAt).toBe(advancedRecipe.createdAt);
    expect(saved.sections).toEqual(advancedRecipe.sections);
    expect(saved.references).toEqual(advancedRecipe.references);
    expect(saved.sources).toEqual(advancedRecipe.sources);
    expect(saved.conservation).toEqual(advancedRecipe.conservation);
    expect(saved.uncertainties).toEqual(advancedRecipe.uncertainties);
  });

  it.each([
    ["name", (draft: ReturnType<typeof emptyRecipeDraft>) => { draft.name = " "; }],
    ["servings", (draft: ReturnType<typeof emptyRecipeDraft>) => { draft.name = "Sopa"; draft.servings = 0; }],
    ["ingredients", (draft: ReturnType<typeof emptyRecipeDraft>) => { draft.name = "Sopa"; draft.ingredients[0].name = ""; }],
    ["steps", (draft: ReturnType<typeof emptyRecipeDraft>) => { draft.name = "Sopa"; draft.ingredients[0].name = "Agua"; draft.steps[0].text = " "; }],
  ])("rechaza el campo obligatorio %s", (field, change) => {
    const draft = emptyRecipeDraft(() => "id");
    change(draft);
    try {
      saveRecipeDraft(draft, { id: "r", now: NOW });
      throw new Error("Debió fallar");
    } catch (error) {
      expect(error).toBeInstanceOf(RecipeValidationError);
      expect((error as RecipeValidationError).fields).toHaveProperty(field);
    }
  });

  it("distingue tiempos ausentes de cero", () => {
    const draft = draftFromRecipe(exampleRecipes()[0]);
    draft.prepMinutes = null;
    draft.cookMinutes = 0;
    const saved = saveRecipeDraft(draft, { id: "r", now: NOW });
    expect(saved.prepMinutes).toBeNull();
    expect(saved.cookMinutes).toBe(0);
  });

  it("las recetas de ejemplo son copias independientes", () => {
    const first = exampleRecipes();
    first[0].name = "Modificada";
    expect(exampleRecipes()[0].name).toBe("Tortilla de patatas");
  });

  it("valida una colección y rechaza ids duplicados", () => {
    const recipes = exampleRecipes();
    expect(parseRecipeCollection(recipes)).toHaveLength(2);
    expect(() => parseRecipeCollection([recipes[0], recipes[0]])).toThrow("repite");
  });
});
