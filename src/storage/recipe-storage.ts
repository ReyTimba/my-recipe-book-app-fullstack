import {
  migrateRecipeCollectionV1,
  parseRecipeCollection,
  RecipeValidationError,
  type Recipe,
} from "../domain/recipe";

export const LEGACY_STORAGE_KEY = "recetario:datos:v1";
export const STORAGE_KEY = "recetario:datos:v2";
export const BACKUP_VERSION = 2;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

interface StoredRecipeBookV2 {
  schemaVersion: 2;
  recipes: Recipe[];
}

interface RecipeBackupV2 extends StoredRecipeBookV2 {
  application: "recetario";
  exportedAt: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseJson(raw: string, message: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new RecipeValidationError(message);
  }
}

function parseStoredV2(raw: string): Recipe[] {
  const parsed = parseJson(raw, "Los datos guardados no contienen JSON válido.");
  if (!isRecord(parsed) || parsed.schemaVersion !== 2) {
    throw new RecipeValidationError("La versión de los datos guardados no es compatible.");
  }
  return parseRecipeCollection(parsed.recipes);
}

function parseStoredV1(raw: string): Recipe[] {
  const parsed = parseJson(raw, "Los datos v1 guardados no contienen JSON válido.");
  if (!isRecord(parsed) || parsed.schemaVersion !== 1) {
    throw new RecipeValidationError("La versión de los datos v1 no es compatible.");
  }
  return migrateRecipeCollectionV1(parsed.recipes);
}

export function loadRecipes(storage: StorageLike): Recipe[] | null {
  const current = storage.getItem(STORAGE_KEY);
  if (current !== null) return parseStoredV2(current);

  const legacy = storage.getItem(LEGACY_STORAGE_KEY);
  if (legacy !== null) return parseStoredV1(legacy);
  return null;
}

export function saveRecipes(storage: StorageLike, recipes: Recipe[]): void {
  // Validate and serialize fully before the single write. The v1 key is never touched.
  const validated = parseRecipeCollection(recipes);
  const payload: StoredRecipeBookV2 = { schemaVersion: 2, recipes: validated };
  const serialized = JSON.stringify(payload);
  storage.setItem(STORAGE_KEY, serialized);
}

export function exportRecipeBackup(recipes: Recipe[], exportedAt: string): string {
  if (Number.isNaN(Date.parse(exportedAt)) || new Date(exportedAt).toISOString() !== exportedAt) {
    throw new RecipeValidationError("La fecha de exportación no es válida.");
  }
  const payload: RecipeBackupV2 = {
    application: "recetario",
    schemaVersion: 2,
    exportedAt,
    recipes: parseRecipeCollection(recipes),
  };
  return JSON.stringify(payload, null, 2);
}

export function importRecipeBackup(raw: string): Recipe[] {
  const parsed = parseJson(raw, "El archivo seleccionado no contiene JSON válido.");
  if (!isRecord(parsed) || parsed.application !== "recetario" || typeof parsed.exportedAt !== "string") {
    throw new RecipeValidationError("El archivo no es una copia compatible del recetario.");
  }
  if (Number.isNaN(Date.parse(parsed.exportedAt)) || new Date(parsed.exportedAt).toISOString() !== parsed.exportedAt) {
    throw new RecipeValidationError("La fecha de la copia no es válida.");
  }
  if (parsed.schemaVersion === 1) return migrateRecipeCollectionV1(parsed.recipes);
  if (parsed.schemaVersion === 2) return parseRecipeCollection(parsed.recipes);
  throw new RecipeValidationError("La versión de la copia no es compatible.");
}
