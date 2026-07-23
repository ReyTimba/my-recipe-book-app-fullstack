import type { Recipe } from "./recipe";

export interface RecipeFilters {
  query: string;
  favoritesOnly: boolean;
  tag: string;
}

function searchable(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .trim();
}

export function availableTags(recipes: Recipe[]): string[] {
  const tags = new Map<string, string>();
  for (const recipe of recipes) {
    for (const tag of recipe.tags) {
      const key = searchable(tag);
      if (!tags.has(key)) tags.set(key, tag);
    }
  }
  return [...tags.values()].sort((left, right) => left.localeCompare(right, "es"));
}

export function filterRecipes(
  recipes: Recipe[],
  filters: RecipeFilters,
): Recipe[] {
  const query = searchable(filters.query);
  const tag = searchable(filters.tag);

  return recipes
    .filter((recipe) => {
      if (filters.favoritesOnly && !recipe.favorite) return false;
      if (tag && !recipe.tags.some((item) => searchable(item) === tag)) return false;
      if (!query) return true;

      return [
        recipe.name,
        recipe.description,
        ...recipe.tags,
        ...recipe.ingredients.map((ingredient) => ingredient.name),
        ...recipe.steps.map((step) => step.text),
        ...recipe.sections.flatMap((section) => [
          section.title,
          ...section.ingredients.map((ingredient) => ingredient.name),
          ...section.steps.map((step) => step.text),
        ]),
        ...recipe.sources.map((source) => source.label),
      ].some((value) => searchable(value).includes(query));
    })
    .sort((left, right) => {
      if (left.favorite !== right.favorite) return left.favorite ? -1 : 1;
      if (left.updatedAt !== right.updatedAt) {
        return left.updatedAt < right.updatedAt ? 1 : -1;
      }
      return left.name.localeCompare(right.name, "es");
    });
}
