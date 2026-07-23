export type KnowledgeState = "known" | "approximate" | "uncertain" | "unknown";
export type QuantityKind = "exact" | "range" | "approximate" | "proportional" | "to_taste" | "unknown";
export type YieldKind = "servings" | "units" | "weight" | "volume" | "batch" | "free_text" | "unknown";
export type PreparationStatus = "complete" | "incomplete" | "absent";

export interface IngredientQuantity {
  kind: QuantityKind;
  originalText: string;
  value?: number;
  min?: number;
  max?: number;
  unit?: string;
  note?: string;
}

export interface Ingredient {
  id: string;
  amount: string;
  unit: string;
  name: string;
  quantity: IngredientQuantity;
  note?: string;
}

export interface RecipeYield {
  kind: YieldKind;
  originalText: string;
  amount?: number;
  unit?: string;
  state: KnowledgeState;
}

export interface TimeValue {
  kind: "duration" | "range" | "free_text" | "unknown";
  originalText: string;
  minutes?: number;
  minMinutes?: number;
  maxMinutes?: number;
}

export interface TemperatureValue {
  kind: "exact" | "range" | "free_text" | "unknown";
  originalText: string;
  value?: number;
  min?: number;
  max?: number;
  unit?: "C" | "F";
}

export interface RecipeStep {
  id: string;
  text: string;
  status: "complete" | "incomplete" | "uncertain";
  time?: TimeValue;
  temperature?: TemperatureValue;
  equipment?: string[];
  notes?: string[];
}

export interface RecipeSection {
  id: string;
  title: string;
  kind: "component" | "phase" | "serving" | "other";
  ingredients: Ingredient[];
  steps: RecipeStep[];
  referenceIds: string[];
}

export interface RecipeReference {
  id: string;
  targetRecipeId: string;
  relation: "component" | "serving" | "derived";
  note?: string;
}

export interface RecipeSource {
  id: string;
  kind: "image" | "document" | "person" | "other";
  label: string;
  locator?: string;
}

export interface ConservationInfo {
  status: KnowledgeState;
  originalText: string;
  temperature?: TemperatureValue;
  time?: TimeValue;
}

export interface RecipeUncertainty {
  id: string;
  fieldPath: string;
  state: "uncertain" | "unknown" | "incomplete";
  note: string;
  sourceId?: string;
}

export interface IngredientV1 {
  id: string;
  amount: string;
  unit: string;
  name: string;
}

export interface RecipeV1 {
  id: string;
  name: string;
  description: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  ingredients: IngredientV1[];
  steps: string[];
  tags: string[];
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MigrationOriginV1 {
  sourceSchemaVersion: 1;
  original: RecipeV1;
}

export interface Recipe {
  schemaVersion: 2;
  id: string;
  name: string;
  description: string;
  servings: number | null;
  prepMinutes: number | null;
  cookMinutes: number | null;
  yield: RecipeYield;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  preparationStatus: PreparationStatus;
  sections: RecipeSection[];
  references: RecipeReference[];
  sources: RecipeSource[];
  conservation?: ConservationInfo;
  uncertainties: RecipeUncertainty[];
  tags: string[];
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  migration?: MigrationOriginV1;
}

export type RecipeDraft = Omit<Recipe, "schemaVersion" | "id" | "createdAt" | "updatedAt">;

export class RecipeValidationError extends Error {
  constructor(
    message: string,
    readonly fields: Record<string, string> = {},
  ) {
    super(message);
    this.name = "RecipeValidationError";
  }
}

function normalizedText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function normalizedTags(tags: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const rawTag of tags) {
    const tag = normalizedText(rawTag);
    const key = tag.toLocaleLowerCase("es");
    if (tag && !seen.has(key)) {
      seen.add(key);
      result.push(tag);
    }
  }
  return result;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isText(value: unknown): value is string {
  return typeof value === "string";
}

function isOptionalText(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isNonNegativeIntegerOrNull(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isInteger(value) && value >= 0);
}

function validIsoDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString() === value;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

export function quantityFromText(amount: string, unit: string): IngredientQuantity {
  const originalText = [amount, unit].filter(Boolean).join(" ");
  if (!originalText.trim()) return { kind: "unknown", originalText: "" };
  return { kind: "exact", originalText, unit: unit || undefined };
}

function parseQuantity(value: unknown): IngredientQuantity {
  if (!isRecord(value) || !isText(value.kind) || !isText(value.originalText)) {
    throw new RecipeValidationError("La receta contiene una cantidad no válida.");
  }
  const kinds: QuantityKind[] = ["exact", "range", "approximate", "proportional", "to_taste", "unknown"];
  if (!kinds.includes(value.kind as QuantityKind)) throw new RecipeValidationError("La receta contiene un tipo de cantidad desconocido.");
  for (const key of ["value", "min", "max"] as const) {
    if (value[key] !== undefined && !isFiniteNumber(value[key])) throw new RecipeValidationError("La receta contiene una cantidad numérica no válida.");
  }
  if (!isOptionalText(value.unit) || !isOptionalText(value.note)) throw new RecipeValidationError("La receta contiene texto de cantidad no válido.");
  if (value.kind === "unknown" && value.originalText.trim()) throw new RecipeValidationError("Una cantidad desconocida no puede presentarse como cierta.");
  return clone(value as unknown as IngredientQuantity);
}

function parseIngredient(value: unknown): Ingredient {
  if (!isRecord(value) || !isText(value.id) || !value.id.trim() || !isText(value.amount) || !isText(value.unit) || !isText(value.name) || !value.name.trim() || !isOptionalText(value.note)) {
    throw new RecipeValidationError("La receta contiene un ingrediente no válido.");
  }
  return { id: value.id, amount: value.amount, unit: value.unit, name: value.name, quantity: parseQuantity(value.quantity), ...(value.note === undefined ? {} : { note: value.note }) };
}

function parseYield(value: unknown): RecipeYield {
  if (!isRecord(value) || !isText(value.kind) || !isText(value.originalText) || !isText(value.state)) throw new RecipeValidationError("El rendimiento no es válido.");
  const kinds: YieldKind[] = ["servings", "units", "weight", "volume", "batch", "free_text", "unknown"];
  const states: KnowledgeState[] = ["known", "approximate", "uncertain", "unknown"];
  if (!kinds.includes(value.kind as YieldKind) || !states.includes(value.state as KnowledgeState) || (value.amount !== undefined && !isFiniteNumber(value.amount)) || !isOptionalText(value.unit)) {
    throw new RecipeValidationError("El rendimiento no es válido.");
  }
  if (value.kind === "unknown" && (value.originalText.trim() || value.state !== "unknown")) throw new RecipeValidationError("Un rendimiento desconocido debe ser explícito.");
  return clone(value as unknown as RecipeYield);
}

function parseTime(value: unknown): TimeValue {
  if (!isRecord(value) || !isText(value.kind) || !isText(value.originalText)) throw new RecipeValidationError("El tiempo no es válido.");
  const kinds = ["duration", "range", "free_text", "unknown"];
  if (!kinds.includes(value.kind) || ["minutes", "minMinutes", "maxMinutes"].some((key) => value[key] !== undefined && !isFiniteNumber(value[key]))) throw new RecipeValidationError("El tiempo no es válido.");
  return clone(value as unknown as TimeValue);
}

function parseTemperature(value: unknown): TemperatureValue {
  if (!isRecord(value) || !isText(value.kind) || !isText(value.originalText)) throw new RecipeValidationError("La temperatura no es válida.");
  if (!["exact", "range", "free_text", "unknown"].includes(value.kind) || ["value", "min", "max"].some((key) => value[key] !== undefined && !isFiniteNumber(value[key])) || (value.unit !== undefined && value.unit !== "C" && value.unit !== "F")) throw new RecipeValidationError("La temperatura no es válida.");
  return clone(value as unknown as TemperatureValue);
}

function parseStep(value: unknown): RecipeStep {
  if (!isRecord(value) || !isText(value.id) || !value.id.trim() || !isText(value.text) || !value.text.trim() || !isText(value.status) || !["complete", "incomplete", "uncertain"].includes(value.status)) throw new RecipeValidationError("La receta contiene un paso no válido.");
  if (value.equipment !== undefined && (!Array.isArray(value.equipment) || value.equipment.some((item) => !isText(item) || !item.trim()))) throw new RecipeValidationError("El equipo de un paso no es válido.");
  if (value.notes !== undefined && (!Array.isArray(value.notes) || value.notes.some((item) => !isText(item) || !item.trim()))) throw new RecipeValidationError("Las notas de un paso no son válidas.");
  return { id: value.id, text: value.text, status: value.status as RecipeStep["status"], ...(value.time === undefined ? {} : { time: parseTime(value.time) }), ...(value.temperature === undefined ? {} : { temperature: parseTemperature(value.temperature) }), ...(value.equipment === undefined ? {} : { equipment: [...value.equipment] as string[] }), ...(value.notes === undefined ? {} : { notes: [...value.notes] as string[] }) };
}

function uniqueIds(items: Array<{ id: string }>, label: string): void {
  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) throw new RecipeValidationError(`${label} repite el identificador ${item.id}.`);
    ids.add(item.id);
  }
}

function parseSection(value: unknown): RecipeSection {
  if (!isRecord(value) || !isText(value.id) || !value.id.trim() || !isText(value.title) || !isText(value.kind) || !["component", "phase", "serving", "other"].includes(value.kind) || !Array.isArray(value.ingredients) || !Array.isArray(value.steps) || !Array.isArray(value.referenceIds) || value.referenceIds.some((id) => !isText(id) || !id.trim())) throw new RecipeValidationError("La receta contiene una sección no válida.");
  const ingredients = value.ingredients.map(parseIngredient);
  const steps = value.steps.map(parseStep);
  uniqueIds(ingredients, "La sección");
  uniqueIds(steps, "La sección");
  if (new Set(value.referenceIds).size !== value.referenceIds.length) throw new RecipeValidationError("Una sección repite referencias.");
  return { id: value.id, title: value.title, kind: value.kind as RecipeSection["kind"], ingredients, steps, referenceIds: [...value.referenceIds] as string[] };
}

function parseReference(value: unknown): RecipeReference {
  if (!isRecord(value) || !isText(value.id) || !value.id.trim() || !isText(value.targetRecipeId) || !value.targetRecipeId.trim() || !isText(value.relation) || !["component", "serving", "derived"].includes(value.relation) || !isOptionalText(value.note)) throw new RecipeValidationError("La receta contiene una referencia no válida.");
  return clone(value as unknown as RecipeReference);
}

function parseSource(value: unknown): RecipeSource {
  if (!isRecord(value) || !isText(value.id) || !value.id.trim() || !isText(value.kind) || !["image", "document", "person", "other"].includes(value.kind) || !isText(value.label) || !value.label.trim() || !isOptionalText(value.locator)) throw new RecipeValidationError("La receta contiene una fuente no válida.");
  return clone(value as unknown as RecipeSource);
}

function parseConservation(value: unknown): ConservationInfo {
  if (!isRecord(value) || !isText(value.status) || !["known", "approximate", "uncertain", "unknown"].includes(value.status) || !isText(value.originalText)) throw new RecipeValidationError("La conservación no es válida.");
  return { status: value.status as KnowledgeState, originalText: value.originalText, ...(value.temperature === undefined ? {} : { temperature: parseTemperature(value.temperature) }), ...(value.time === undefined ? {} : { time: parseTime(value.time) }) };
}

function parseUncertainty(value: unknown): RecipeUncertainty {
  if (!isRecord(value) || !isText(value.id) || !value.id.trim() || !isText(value.fieldPath) || !value.fieldPath.trim() || !isText(value.state) || !["uncertain", "unknown", "incomplete"].includes(value.state) || !isText(value.note) || !value.note.trim() || !isOptionalText(value.sourceId)) throw new RecipeValidationError("La receta contiene una incertidumbre no válida.");
  return clone(value as unknown as RecipeUncertainty);
}

function parseRecipeV1(value: unknown): RecipeV1 {
  if (!isRecord(value) || !isText(value.id) || !value.id.trim() || !isText(value.name) || !value.name.trim() || !isText(value.description) || !isFiniteNumber(value.servings) || !Number.isInteger(value.servings) || value.servings < 1 || !isFiniteNumber(value.prepMinutes) || !Number.isInteger(value.prepMinutes) || value.prepMinutes < 0 || !isFiniteNumber(value.cookMinutes) || !Number.isInteger(value.cookMinutes) || value.cookMinutes < 0 || typeof value.favorite !== "boolean" || !validIsoDate(value.createdAt) || !validIsoDate(value.updatedAt) || !Array.isArray(value.ingredients) || value.ingredients.length === 0 || !Array.isArray(value.steps) || value.steps.length === 0 || value.steps.some((step) => !isText(step) || !step.trim()) || !Array.isArray(value.tags) || value.tags.some((tag) => !isText(tag) || !tag.trim())) throw new RecipeValidationError("La copia v1 contiene una receta incompleta o no válida.");
  const ingredients = value.ingredients.map((item) => {
    if (!isRecord(item) || !isText(item.id) || !item.id.trim() || !isText(item.amount) || !isText(item.unit) || !isText(item.name) || !item.name.trim()) throw new RecipeValidationError("La copia v1 contiene un ingrediente no válido.");
    return { id: item.id, amount: item.amount, unit: item.unit, name: item.name };
  });
  uniqueIds(ingredients, "La receta v1");
  return { id: value.id, name: value.name, description: value.description, servings: value.servings, prepMinutes: value.prepMinutes, cookMinutes: value.cookMinutes, ingredients, steps: [...value.steps] as string[], tags: [...value.tags] as string[], favorite: value.favorite, createdAt: value.createdAt, updatedAt: value.updatedAt };
}

function parseMigration(value: unknown): MigrationOriginV1 {
  if (!isRecord(value) || value.sourceSchemaVersion !== 1) throw new RecipeValidationError("El origen de migración no es válido.");
  return { sourceSchemaVersion: 1, original: parseRecipeV1(value.original) };
}

export function parseRecipe(value: unknown): Recipe {
  if (!isRecord(value) || value.schemaVersion !== 2) throw new RecipeValidationError("La copia contiene una receta v2 no válida.");
  if (!isText(value.id) || !value.id.trim() || !isText(value.name) || !value.name.trim() || !isText(value.description) || !isNonNegativeIntegerOrNull(value.servings) || (typeof value.servings === "number" && value.servings < 1) || !isNonNegativeIntegerOrNull(value.prepMinutes) || !isNonNegativeIntegerOrNull(value.cookMinutes) || typeof value.favorite !== "boolean" || !validIsoDate(value.createdAt) || !validIsoDate(value.updatedAt) || !isText(value.preparationStatus) || !["complete", "incomplete", "absent"].includes(value.preparationStatus) || !Array.isArray(value.ingredients) || !Array.isArray(value.steps) || !Array.isArray(value.sections) || !Array.isArray(value.references) || !Array.isArray(value.sources) || !Array.isArray(value.uncertainties) || !Array.isArray(value.tags) || value.tags.some((tag) => !isText(tag) || !tag.trim())) throw new RecipeValidationError("La copia contiene una receta v2 incompleta o no válida.");
  const ingredients = value.ingredients.map(parseIngredient);
  const steps = value.steps.map(parseStep);
  const sections = value.sections.map(parseSection);
  const references = value.references.map(parseReference);
  const sources = value.sources.map(parseSource);
  const uncertainties = value.uncertainties.map(parseUncertainty);
  uniqueIds(ingredients, "La receta"); uniqueIds(steps, "La receta"); uniqueIds(sections, "La receta"); uniqueIds(references, "La receta"); uniqueIds(sources, "La receta"); uniqueIds(uncertainties, "La receta");
  const referenceIds = new Set(references.map((item) => item.id));
  if (sections.some((section) => section.referenceIds.some((id) => !referenceIds.has(id)))) throw new RecipeValidationError("Una sección apunta a una referencia ausente.");
  if (value.preparationStatus === "absent" && (steps.length > 0 || sections.some((section) => section.steps.length > 0))) throw new RecipeValidationError("Una preparación ausente no puede contener pasos presentados como existentes.");
  return { schemaVersion: 2, id: value.id, name: value.name, description: value.description, servings: value.servings, prepMinutes: value.prepMinutes, cookMinutes: value.cookMinutes, yield: parseYield(value.yield), ingredients, steps, preparationStatus: value.preparationStatus as PreparationStatus, sections, references, sources, ...(value.conservation === undefined ? {} : { conservation: parseConservation(value.conservation) }), uncertainties, tags: [...value.tags] as string[], favorite: value.favorite, createdAt: value.createdAt, updatedAt: value.updatedAt, ...(value.migration === undefined ? {} : { migration: parseMigration(value.migration) }) };
}

function validateReferenceGraph(recipes: Recipe[]): void {
  const recipeIds = new Set(recipes.map((recipe) => recipe.id));
  for (const recipe of recipes) {
    for (const reference of recipe.references) {
      if (!recipeIds.has(reference.targetRecipeId)) throw new RecipeValidationError(`La referencia ${reference.id} apunta a una receta ausente.`);
    }
  }
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  function visit(id: string): void {
    if (visiting.has(id)) throw new RecipeValidationError("Las referencias entre recetas contienen un ciclo.");
    if (visited.has(id)) return;
    visiting.add(id);
    for (const reference of byId.get(id)?.references ?? []) visit(reference.targetRecipeId);
    visiting.delete(id); visited.add(id);
  }
  for (const recipe of recipes) visit(recipe.id);
}

export function parseRecipeCollection(value: unknown): Recipe[] {
  if (!Array.isArray(value)) throw new RecipeValidationError("La lista de recetas no es válida.");
  const recipes = value.map(parseRecipe);
  uniqueIds(recipes, "La copia");
  validateReferenceGraph(recipes);
  return recipes;
}

export function migrateRecipeV1ToV2(value: RecipeV1 | Recipe | unknown): Recipe {
  if (isRecord(value) && value.schemaVersion === 2) return parseRecipe(value);
  const recipe = parseRecipeV1(value);
  const migrated: Recipe = {
    schemaVersion: 2,
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    servings: recipe.servings,
    prepMinutes: recipe.prepMinutes,
    cookMinutes: recipe.cookMinutes,
    yield: { kind: "servings", originalText: String(recipe.servings), amount: recipe.servings, unit: "porciones", state: "known" },
    ingredients: recipe.ingredients.map((item) => ({ ...item, quantity: quantityFromText(item.amount, item.unit) })),
    steps: recipe.steps.map((text, index) => ({ id: `${recipe.id}-step-${index + 1}`, text, status: "complete" })),
    preparationStatus: "complete",
    sections: [], references: [], sources: [], uncertainties: [],
    tags: [...recipe.tags], favorite: recipe.favorite, createdAt: recipe.createdAt, updatedAt: recipe.updatedAt,
    migration: { sourceSchemaVersion: 1, original: clone(recipe) },
  };
  return parseRecipe(migrated);
}

export function migrateRecipeCollectionV1(value: unknown): Recipe[] {
  if (!Array.isArray(value)) throw new RecipeValidationError("La lista de recetas v1 no es válida.");
  const migrated = value.map(migrateRecipeV1ToV2);
  uniqueIds(migrated, "La copia v1");
  return parseRecipeCollection(migrated);
}

export function emptyRecipeDraft(createId: () => string): RecipeDraft {
  const ingredientId = createId();
  return { name: "", description: "", servings: 2, prepMinutes: 10, cookMinutes: 20, yield: { kind: "servings", originalText: "2", amount: 2, unit: "porciones", state: "known" }, ingredients: [{ id: ingredientId, amount: "", unit: "", name: "", quantity: { kind: "unknown", originalText: "" } }], steps: [{ id: createId(), text: "", status: "complete" }], preparationStatus: "complete", sections: [], references: [], sources: [], uncertainties: [], tags: [], favorite: false };
}

export function draftFromRecipe(recipe: Recipe): RecipeDraft {
  const { schemaVersion: _schemaVersion, id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...draft } = clone(recipe);
  return draft;
}

export function saveRecipeDraft(draft: RecipeDraft, options: { id: string; now: string; previous?: Recipe }): Recipe {
  const fields: Record<string, string> = {};
  const name = normalizedText(draft.name);
  if (!name) fields.name = "Escribe un nombre para la receta.";
  if (draft.servings !== null && (!Number.isInteger(draft.servings) || draft.servings < 1)) fields.servings = "Las porciones deben quedar vacías o ser un entero mayor que cero.";
  if (!isNonNegativeIntegerOrNull(draft.prepMinutes) || !isNonNegativeIntegerOrNull(draft.cookMinutes)) fields.times = "Los tiempos deben quedar vacíos o ser enteros iguales o mayores que cero.";
  if (draft.ingredients.some((item) => !item.name.trim() || !item.id.trim())) fields.ingredients = "Completa el nombre y el identificador de cada ingrediente.";
  if (draft.preparationStatus !== "absent" && draft.steps.some((step) => !step.text.trim() || !step.id.trim())) fields.steps = "Completa cada paso o marca la preparación como ausente.";
  if (Object.keys(fields).length) throw new RecipeValidationError("Completa los campos necesarios.", fields);
  if (!validIsoDate(options.now)) throw new RecipeValidationError("La fecha de guardado no es válida.");
  const ingredients = draft.ingredients.map((item) => ({ ...clone(item), name: normalizedText(item.name) }));
  const steps = draft.preparationStatus === "absent" ? [] : draft.steps.map((step) => ({ ...clone(step), text: step.text.trim() }));
  const result: Recipe = { schemaVersion: 2, ...clone(draft), id: normalizedText(options.id), name, description: normalizedText(draft.description), ingredients, steps, tags: normalizedTags(draft.tags), createdAt: options.previous?.createdAt ?? options.now, updatedAt: options.now };
  return parseRecipe(result);
}

export function exampleRecipes(): Recipe[] {
  const createdAt = "2026-01-01T12:00:00.000Z";
  const legacy: RecipeV1[] = [
    { id: "ejemplo-tortilla", name: "Tortilla de patatas", description: "Jugosa por dentro y dorada por fuera.", servings: 4, prepMinutes: 15, cookMinutes: 30, ingredients: [{ id: "tortilla-patata", amount: "600", unit: "g", name: "Patatas" }, { id: "tortilla-huevo", amount: "6", unit: "", name: "Huevos" }, { id: "tortilla-cebolla", amount: "1", unit: "", name: "Cebolla" }, { id: "tortilla-aceite", amount: "", unit: "", name: "Aceite de oliva y sal" }], steps: ["Corta las patatas y la cebolla en láminas finas.", "Cocínalas a fuego medio en aceite hasta que estén tiernas.", "Mézclalas con los huevos batidos y cuaja la tortilla por ambos lados."], tags: ["Española", "Cena"], favorite: true, createdAt, updatedAt: createdAt },
    { id: "ejemplo-lentejas", name: "Lentejas rápidas con verduras", description: "Un plato sencillo para dejar preparado.", servings: 4, prepMinutes: 10, cookMinutes: 35, ingredients: [{ id: "lentejas-lenteja", amount: "300", unit: "g", name: "Lentejas pardinas" }, { id: "lentejas-zanahoria", amount: "2", unit: "", name: "Zanahorias" }, { id: "lentejas-pimiento", amount: "1", unit: "", name: "Pimiento verde" }, { id: "lentejas-pimenton", amount: "1", unit: "cdta", name: "Pimentón" }], steps: ["Sofríe las verduras picadas con un poco de aceite.", "Añade el pimentón, las lentejas y agua hasta cubrir.", "Cuece a fuego suave hasta que las lentejas estén tiernas y ajusta de sal."], tags: ["Legumbres", "Preparar antes"], favorite: false, createdAt, updatedAt: createdAt },
  ];
  return legacy.map(migrateRecipeV1ToV2);
}
