import { z } from "zod";

const quantityKind = z.enum(["exact", "range", "approximate", "proportional", "to_taste", "unknown"]);
const yieldKind = z.enum(["servings", "units", "weight", "volume", "batch", "free_text", "unknown"]);
const knowledgeState = z.enum(["known", "approximate", "uncertain", "unknown"]);
const stepStatus = z.enum(["complete", "incomplete", "uncertain"]);
const sectionKind = z.enum(["component", "phase", "serving", "other"]);
const refRelation = z.enum(["component", "serving", "derived"]);
const sourceKind = z.enum(["image", "document", "person", "other"]);
const prepStatus = z.enum(["complete", "incomplete", "absent"]);
const uncertaintyState = z.enum(["uncertain", "unknown", "incomplete"]);

const ingredientQuantity = z.object({
  kind: quantityKind,
  originalText: z.string(),
  value: z.number().finite().optional(),
  min: z.number().finite().optional(),
  max: z.number().finite().optional(),
  unit: z.string().optional(),
  note: z.string().optional(),
});

const ingredient = z.object({
  id: z.string().min(1),
  amount: z.string(),
  unit: z.string(),
  name: z.string().min(1),
  quantity: ingredientQuantity,
  note: z.string().optional(),
});

const temperatureValue = z.object({
  kind: z.enum(["exact", "range", "free_text", "unknown"]),
  originalText: z.string(),
  value: z.number().finite().optional(),
  min: z.number().finite().optional(),
  max: z.number().finite().optional(),
  unit: z.enum(["C", "F"]).optional(),
});

const timeValue = z.object({
  kind: z.enum(["duration", "range", "free_text", "unknown"]),
  originalText: z.string(),
  minutes: z.number().finite().optional(),
  minMinutes: z.number().finite().optional(),
  maxMinutes: z.number().finite().optional(),
});

const recipeStep = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  status: stepStatus,
  time: timeValue.optional(),
  temperature: temperatureValue.optional(),
  equipment: z.array(z.string().min(1)).optional(),
  notes: z.array(z.string().min(1)).optional(),
});

const recipeSection = z.object({
  id: z.string().min(1),
  title: z.string(),
  kind: sectionKind,
  ingredients: z.array(ingredient),
  steps: z.array(recipeStep),
  referenceIds: z.array(z.string().min(1)),
});

const recipeReference = z.object({
  id: z.string().min(1),
  targetRecipeId: z.string().min(1),
  relation: refRelation,
  note: z.string().optional(),
});

const recipeSource = z.object({
  id: z.string().min(1),
  kind: sourceKind,
  label: z.string().min(1),
  locator: z.string().optional(),
});

const conservationInfo = z.object({
  status: knowledgeState,
  originalText: z.string(),
  temperature: temperatureValue.optional(),
  time: timeValue.optional(),
});

const recipeUncertainty = z.object({
  id: z.string().min(1),
  fieldPath: z.string().min(1),
  state: uncertaintyState,
  note: z.string().min(1),
  sourceId: z.string().optional(),
});

const recipeYield = z.object({
  kind: yieldKind,
  originalText: z.string(),
  amount: z.number().finite().optional(),
  unit: z.string().optional(),
  state: knowledgeState,
});

export const recipeSchema = z.object({
  schemaVersion: z.literal(2),
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  servings: z.number().int().positive().nullable(),
  prepMinutes: z.number().int().nonnegative().nullable(),
  cookMinutes: z.number().int().nonnegative().nullable(),
  yield: recipeYield,
  ingredients: z.array(ingredient).min(1),
  steps: z.array(recipeStep),
  preparationStatus: prepStatus,
  sections: z.array(recipeSection),
  references: z.array(recipeReference),
  sources: z.array(recipeSource),
  conservation: conservationInfo.optional(),
  uncertainties: z.array(recipeUncertainty),
  tags: z.array(z.string()),
  favorite: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const recipeCreateSchema = recipeSchema.omit({ id: true, schemaVersion: true, createdAt: true, updatedAt: true });

export type RecipeInput = z.infer<typeof recipeCreateSchema>;
