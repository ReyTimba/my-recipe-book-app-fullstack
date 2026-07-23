import { describe, expect, it } from "vitest";
import { exampleRecipes } from "../src/domain/recipe";
import {
  BACKUP_VERSION,
  exportRecipeBackup,
  importRecipeBackup,
  LEGACY_STORAGE_KEY,
  loadRecipes,
  saveRecipes,
  STORAGE_KEY,
  type StorageLike,
} from "../src/storage/recipe-storage";
import { advancedRecipesV2, legacyRecipeV1 } from "./fixtures/recipe-v2";
import browserBackupV1 from "./fixtures/browser-v1-backup.json";
import browserBackupV2 from "./fixtures/browser-v2-backup.json";

class MemoryStorage implements StorageLike {
  private values = new Map<string, string>();
  writes: Array<{ key: string; value: string }> = [];
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.writes.push({ key, value }); this.values.set(key, value); }
  raw(key: string) { return this.values.get(key); }
  seed(key: string, value: string) { this.values.set(key, value); }
}

const EXPORTED_AT = "2026-07-21T19:00:00.000Z";

describe("persistencia local v2", () => {
  it("distingue el primer uso", () => {
    expect(loadRecipes(new MemoryStorage())).toBeNull();
  });

  it("guarda y recupera v2 mediante una única escritura", () => {
    const storage = new MemoryStorage();
    saveRecipes(storage, advancedRecipesV2);
    expect(storage.writes).toHaveLength(1);
    expect(storage.writes[0].key).toBe(STORAGE_KEY);
    expect(storage.raw(STORAGE_KEY)).toContain('"schemaVersion":2');
    expect(loadRecipes(storage)).toEqual(advancedRecipesV2);
  });

  it("migra v1 sin tocar la única copia y conserva origen recuperable", () => {
    const storage = new MemoryStorage();
    const original = JSON.stringify({ schemaVersion: 1, recipes: [legacyRecipeV1] });
    storage.seed(LEGACY_STORAGE_KEY, original);
    const migrated = loadRecipes(storage)!;
    expect(migrated[0]).toMatchObject({ id: legacyRecipeV1.id, servings: 4, prepMinutes: 0, cookMinutes: 35 });
    expect(migrated[0].migration?.original).toEqual(legacyRecipeV1);
    expect(storage.raw(LEGACY_STORAGE_KEY)).toBe(original);
    expect(storage.raw(STORAGE_KEY)).toBeUndefined();
    expect(storage.writes).toHaveLength(0);
  });

  it("no escribe si la colección v2 completa es inválida", () => {
    const storage = new MemoryStorage();
    const invalid = structuredClone(advancedRecipesV2);
    invalid[1].references[0].targetRecipeId = "ausente";
    expect(() => saveRecipes(storage, invalid)).toThrow("ausente");
    expect(storage.writes).toHaveLength(0);
  });

  it("rechaza datos guardados corruptos", () => {
    const storage = new MemoryStorage();
    storage.seed(STORAGE_KEY, "no-json");
    expect(() => loadRecipes(storage)).toThrow("JSON válido");
  });
});

describe("copias de seguridad v1/v2", () => {
  it("valida los dos archivos preparados para la comprobaciÃ³n en navegador", () => {
    const migratedV1 = importRecipeBackup(JSON.stringify(browserBackupV1));
    const parsedV2 = importRecipeBackup(JSON.stringify(browserBackupV2));
    expect(migratedV1[0].migration?.original.name).toBe("Fixture v1 \u2014 sopa");
    expect(parsedV2).toHaveLength(2);
    expect(parsedV2[1].references[0].targetRecipeId).toBe(parsedV2[0].id);
  });

  it("exporta v2 y realiza round-trip sin pérdida", () => {
    const backup = exportRecipeBackup(advancedRecipesV2, EXPORTED_AT);
    expect(JSON.parse(backup).schemaVersion).toBe(BACKUP_VERSION);
    expect(importRecipeBackup(backup)).toEqual(advancedRecipesV2);
  });

  it("importa una copia v1 y conserva el snapshot original", () => {
    const backupV1 = JSON.stringify({ application: "recetario", schemaVersion: 1, exportedAt: EXPORTED_AT, recipes: [legacyRecipeV1] });
    const [migrated] = importRecipeBackup(backupV1);
    expect(migrated.migration?.original).toEqual(legacyRecipeV1);
  });

  it("rechaza versiones desconocidas, JSON inválido e ids duplicados", () => {
    expect(() => importRecipeBackup(JSON.stringify({ application: "recetario", schemaVersion: 99, exportedAt: EXPORTED_AT, recipes: [] }))).toThrow("versión");
    expect(() => importRecipeBackup("no-json")).toThrow("JSON válido");
    const recipes = exampleRecipes();
    expect(() => importRecipeBackup(JSON.stringify({ application: "recetario", schemaVersion: 2, exportedAt: EXPORTED_AT, recipes: [recipes[0], recipes[0]] }))).toThrow("repite");
  });
});
