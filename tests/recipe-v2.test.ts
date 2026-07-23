import { describe, expect, it } from "vitest";
import {
  draftFromRecipe,
  migrateRecipeV1ToV2,
  parseRecipeCollection,
  saveRecipeDraft,
} from "../src/domain/recipe";
import { advancedRecipe, advancedRecipesV2, componentRecipe, legacyRecipeV1 } from "./fixtures/recipe-v2";

describe("migración v1 a v2", () => {
  it("conserva todos los campos v1 y el origen exacto", () => {
    const migrated = migrateRecipeV1ToV2(legacyRecipeV1);
    expect(migrated).toMatchObject({
      id: legacyRecipeV1.id,
      name: legacyRecipeV1.name,
      description: legacyRecipeV1.description,
      servings: legacyRecipeV1.servings,
      prepMinutes: legacyRecipeV1.prepMinutes,
      cookMinutes: legacyRecipeV1.cookMinutes,
      tags: legacyRecipeV1.tags,
      favorite: legacyRecipeV1.favorite,
      createdAt: legacyRecipeV1.createdAt,
      updatedAt: legacyRecipeV1.updatedAt,
    });
    expect(migrated.ingredients.map(({ id, amount, unit, name }) => ({ id, amount, unit, name }))).toEqual(legacyRecipeV1.ingredients);
    expect(migrated.steps.map((step) => step.text)).toEqual(legacyRecipeV1.steps);
    expect(migrated.migration?.original).toEqual(legacyRecipeV1);
  });

  it("es idempotente semánticamente", () => {
    const once = migrateRecipeV1ToV2(legacyRecipeV1);
    expect(migrateRecipeV1ToV2(once)).toEqual(once);
  });
});

describe("matriz de representación v2", () => {
  it("representa compuesta, subreceta, lote, rango, aproximación, proporción, desconocido, técnica y trazabilidad", () => {
    expect(parseRecipeCollection(advancedRecipesV2)).toEqual(advancedRecipesV2);
    expect(componentRecipe.yield.kind).toBe("batch");
    expect(componentRecipe.ingredients.map((item) => item.quantity.kind)).toEqual(["range", "to_taste"]);
    expect(advancedRecipe.ingredients.map((item) => item.quantity.kind)).toEqual(["approximate", "unknown", "proportional"]);
    expect(advancedRecipe.preparationStatus).toBe("incomplete");
    expect(advancedRecipe.steps[0]).toMatchObject({ time: { originalText: "toda la noche" }, temperature: { originalText: "78 °C" }, equipment: ["horno de vapor"] });
    expect(advancedRecipe.sections[0].referenceIds).toEqual(["ref-salsa"]);
    expect(advancedRecipe.sources).toHaveLength(1);
    expect(advancedRecipe.conservation?.originalText).toContain("<4 °C");
    expect(advancedRecipe.uncertainties[0].state).toBe("incomplete");
  });

  it("rechaza destino ausente, referencia duplicada y ciclos", () => {
    const missing = structuredClone(advancedRecipesV2);
    missing[1].references[0].targetRecipeId = "no-existe";
    expect(() => parseRecipeCollection(missing)).toThrow("ausente");

    const duplicated = structuredClone(advancedRecipesV2);
    duplicated[1].references.push(structuredClone(duplicated[1].references[0]));
    expect(() => parseRecipeCollection(duplicated)).toThrow("repite");

    const cyclic = structuredClone(advancedRecipesV2);
    cyclic[0].references.push({ id: "ref-main", targetRecipeId: advancedRecipe.id, relation: "component" });
    expect(() => parseRecipeCollection(cyclic)).toThrow("ciclo");
  });

  it("una edición básica conserva datos avanzados y no muta el original", () => {
    const before = structuredClone(advancedRecipe);
    const draft = draftFromRecipe(advancedRecipe);
    draft.name = "Preparación compuesta editada";
    draft.favorite = true;
    const saved = saveRecipeDraft(draft, { id: advancedRecipe.id, now: "2026-07-23T01:00:00.000Z", previous: advancedRecipe });
    expect(saved.sections).toEqual(before.sections);
    expect(saved.references).toEqual(before.references);
    expect(saved.sources).toEqual(before.sources);
    expect(saved.uncertainties).toEqual(before.uncertainties);
    expect(saved.favorite).toBe(true);
    expect(advancedRecipe).toEqual(before);
  });
});
