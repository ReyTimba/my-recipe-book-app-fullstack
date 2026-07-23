import { describe, expect, it } from "vitest";
import { availableTags, filterRecipes } from "../src/domain/search";
import { exampleRecipes } from "../src/domain/recipe";

describe("búsqueda y filtros", () => {
  it.each([
    ["tortilla", "Tortilla de patatas"],
    ["PATATAS", "Tortilla de patatas"],
    ["pimenton", "Lentejas rápidas con verduras"],
    ["legumbres", "Lentejas rápidas con verduras"],
  ])("encuentra %s sin depender de mayúsculas ni acentos", (query, expected) => {
    const result = filterRecipes(exampleRecipes(), {
      query,
      favoritesOnly: false,
      tag: "",
    });
    expect(result.map((recipe) => recipe.name)).toContain(expected);
  });

  it("filtra favoritas y etiqueta a la vez", () => {
    const result = filterRecipes(exampleRecipes(), {
      query: "",
      favoritesOnly: true,
      tag: "Española",
    });
    expect(result.map((recipe) => recipe.id)).toEqual(["ejemplo-tortilla"]);
  });

  it("no muta la colección original", () => {
    const recipes = exampleRecipes();
    const before = JSON.stringify(recipes);
    filterRecipes(recipes, { query: "", favoritesOnly: false, tag: "" });
    expect(JSON.stringify(recipes)).toBe(before);
  });

  it("devuelve etiquetas únicas y ordenadas", () => {
    const recipes = exampleRecipes();
    recipes[1].tags.push("española");
    expect(availableTags(recipes)).toEqual([
      "Cena",
      "Española",
      "Legumbres",
      "Preparar antes",
    ]);
  });
});
