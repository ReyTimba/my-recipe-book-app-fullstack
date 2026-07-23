import type { Recipe, RecipeV1 } from "../../src/domain/recipe";

export const legacyRecipeV1: RecipeV1 = {
  id: "legacy-sopa",
  name: "Sopa original",
  description: "Texto v1 sin normalizar",
  servings: 4,
  prepMinutes: 0,
  cookMinutes: 35,
  ingredients: [
    { id: "legacy-agua", amount: "1–2", unit: "L", name: "Agua" },
    { id: "legacy-sal", amount: "", unit: "", name: "Sal" },
  ],
  steps: ["Mezclar sin cambiar este texto.", "Cocer."],
  tags: ["Legumbres", "Prueba"],
  favorite: true,
  createdAt: "2026-01-02T10:00:00.000Z",
  updatedAt: "2026-01-03T10:00:00.000Z",
};

export const componentRecipe: Recipe = {
  schemaVersion: 2,
  id: "fixture-salsa",
  name: "Salsa base",
  description: "Componente reutilizable",
  servings: null,
  prepMinutes: null,
  cookMinutes: null,
  yield: { kind: "batch", originalText: "1 lote pequeño", amount: 1, unit: "lote", state: "approximate" },
  ingredients: [
    { id: "salsa-tomate", amount: "2–3", unit: "kg", name: "Tomate", quantity: { kind: "range", originalText: "2–3 kg", min: 2, max: 3, unit: "kg" } },
    { id: "salsa-sal", amount: "", unit: "", name: "Sal", quantity: { kind: "to_taste", originalText: "al gusto" } },
  ],
  steps: [{ id: "salsa-paso", text: "Reducir hasta textura napante.", status: "complete", time: { kind: "range", originalText: "30–45 min", minMinutes: 30, maxMinutes: 45 }, equipment: ["olla"] }],
  preparationStatus: "complete",
  sections: [], references: [],
  sources: [{ id: "fuente-salsa", kind: "image", label: "1777285782908.jpg", locator: "Imgs_Recetas_Teca/1777285782908.jpg" }],
  uncertainties: [], tags: ["Componente"], favorite: false,
  createdAt: "2026-02-01T10:00:00.000Z", updatedAt: "2026-02-01T10:00:00.000Z",
};

export const advancedRecipe: Recipe = {
  schemaVersion: 2,
  id: "fixture-compuesta",
  name: "Preparación compuesta",
  description: "Fixture representativa, no dato de producción",
  servings: null,
  prepMinutes: null,
  cookMinutes: 0,
  yield: { kind: "free_text", originalText: "para un servicio", state: "uncertain" },
  ingredients: [
    { id: "main-pescado", amount: "≈800", unit: "g", name: "Pescado", quantity: { kind: "approximate", originalText: "≈800 g", value: 800, unit: "g" } },
    { id: "main-agua", amount: "", unit: "", name: "Agua", quantity: { kind: "unknown", originalText: "", note: "La fuente no indica cantidad" } },
    { id: "main-cebolla", amount: "mismo peso", unit: "", name: "Cebolla", quantity: { kind: "proportional", originalText: "mismo peso que el pescado" } },
  ],
  steps: [
    { id: "main-paso-1", text: "Cocer al vapor.", status: "complete", time: { kind: "free_text", originalText: "toda la noche" }, temperature: { kind: "exact", originalText: "78 °C", value: 78, unit: "C" }, equipment: ["horno de vapor"], notes: ["100 % humedad"] },
    { id: "main-paso-2", text: "Continuación no visible.", status: "incomplete" },
  ],
  preparationStatus: "incomplete",
  sections: [{
    id: "section-servicio",
    title: "Servicio",
    kind: "serving",
    ingredients: [{ id: "servicio-ralladura", amount: "", unit: "", name: "Ralladura de lima", quantity: { kind: "unknown", originalText: "" } }],
    steps: [{ id: "servicio-paso", text: "Terminar con la salsa base.", status: "complete" }],
    referenceIds: ["ref-salsa"],
  }],
  references: [{ id: "ref-salsa", targetRecipeId: "fixture-salsa", relation: "component", note: "Identidad por id, no por nombre" }],
  sources: [{ id: "fuente-main", kind: "image", label: "1777285782867.jpg" }],
  conservation: { status: "known", originalText: "Conservar en frío (<4 °C)", temperature: { kind: "free_text", originalText: "<4 °C" } },
  uncertainties: [{ id: "uncertain-step", fieldPath: "steps[1]", state: "incomplete", note: "La continuación no aparece", sourceId: "fuente-main" }],
  tags: ["Compuesta", "Prueba"], favorite: false,
  createdAt: "2026-02-02T10:00:00.000Z", updatedAt: "2026-02-02T10:00:00.000Z",
};

export const advancedRecipesV2: Recipe[] = [componentRecipe, advancedRecipe];
