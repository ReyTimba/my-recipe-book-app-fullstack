import { type FormEvent, useState } from "react";
import {
  draftFromRecipe,
  emptyRecipeDraft,
  quantityFromText,
  RecipeValidationError,
  type Ingredient,
  type Recipe,
  type RecipeDraft,
} from "../domain/recipe";

interface RecipeFormProps {
  recipe: Recipe | null;
  onSave: (draft: RecipeDraft) => void;
  onCancel: () => void;
}

function createId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `local-${Date.now()}-${Math.random()}`;
}

export function RecipeForm({ recipe, onSave, onCancel }: RecipeFormProps) {
  const [draft, setDraft] = useState<RecipeDraft>(() => recipe ? draftFromRecipe(recipe) : emptyRecipeDraft(createId));
  const [tagText, setTagText] = useState(recipe?.tags.join(", ") ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateIngredient(index: number, update: Partial<Ingredient>) {
    setDraft((current) => ({
      ...current,
      ingredients: current.ingredients.map((ingredient, itemIndex) => {
        if (itemIndex !== index) return ingredient;
        const changed = { ...ingredient, ...update };
        return update.amount !== undefined || update.unit !== undefined
          ? { ...changed, quantity: quantityFromText(changed.amount, changed.unit) }
          : changed;
      }),
    }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      onSave({ ...draft, tags: tagText.split(",") });
      setErrors({});
    } catch (error) {
      if (error instanceof RecipeValidationError) {
        setErrors(error.fields);
        return;
      }
      throw error;
    }
  }

  const hasAdvancedData = Boolean(recipe && (
    recipe.sections.length || recipe.references.length || recipe.sources.length ||
    recipe.uncertainties.length || recipe.conservation
  ));

  return (
    <section className="form-view" aria-labelledby="form-heading">
      <div className="form-heading-row">
        <div>
          <p className="eyebrow">{recipe ? "Actualizar receta" : "Nueva receta"}</p>
          <h1 id="form-heading">{recipe ? `Editar ${recipe.name}` : "Guarda algo delicioso"}</h1>
        </div>
        <button className="text-button" type="button" onClick={onCancel}>Cancelar</button>
      </div>

      <form onSubmit={submit} noValidate>
        <fieldset className="form-section">
          <legend>Información básica</legend>
          <div className="form-grid two-columns">
            <label className="field field-wide">
              <span>Nombre *</span>
              <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} aria-invalid={Boolean(errors.name)} autoFocus />
              {errors.name && <small className="field-error">{errors.name}</small>}
            </label>
            <label className="field field-wide">
              <span>Descripción</span>
              <textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} rows={3} placeholder="Qué hace especial esta receta" />
            </label>
            <label className="field">
              <span>Porciones</span>
              <input type="number" min="1" step="1" value={draft.servings ?? ""} onChange={(event) => {
                const servings = event.target.value === "" ? null : Number(event.target.value);
                setDraft({
                  ...draft,
                  servings,
                  yield: servings === null
                    ? { kind: "unknown", originalText: "", state: "unknown" }
                    : { kind: "servings", originalText: String(servings), amount: servings, unit: "porciones", state: "known" },
                });
              }} aria-invalid={Boolean(errors.servings)} placeholder="Desconocidas" />
              {errors.servings && <small className="field-error">{errors.servings}</small>}
            </label>
            <label className="field">
              <span>Preparación (min)</span>
              <input type="number" min="0" step="1" value={draft.prepMinutes ?? ""} onChange={(event) => setDraft({ ...draft, prepMinutes: event.target.value === "" ? null : Number(event.target.value) })} placeholder="Desconocido" />
            </label>
            <label className="field">
              <span>Cocción (min)</span>
              <input type="number" min="0" step="1" value={draft.cookMinutes ?? ""} onChange={(event) => setDraft({ ...draft, cookMinutes: event.target.value === "" ? null : Number(event.target.value) })} placeholder="Desconocido" />
            </label>
            <label className="field field-wide">
              <span>Etiquetas</span>
              <input value={tagText} onChange={(event) => setTagText(event.target.value)} placeholder="Cena, vegetariana, rápida" />
              <small>Sepáralas con comas.</small>
            </label>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Ingredientes</legend>
          <p className="section-help">Una cantidad vacía se conserva explícitamente como desconocida.</p>
          <div className="ingredient-editor">
            {draft.ingredients.map((ingredient, index) => (
              <div className="ingredient-row" key={ingredient.id}>
                <label><span className="sr-only">Cantidad del ingrediente {index + 1}</span><input value={ingredient.amount} onChange={(event) => updateIngredient(index, { amount: event.target.value })} placeholder="Cantidad" /></label>
                <label><span className="sr-only">Unidad del ingrediente {index + 1}</span><input value={ingredient.unit} onChange={(event) => updateIngredient(index, { unit: event.target.value })} placeholder="Unidad" /></label>
                <label className="ingredient-name-field"><span className="sr-only">Nombre del ingrediente {index + 1}</span><input value={ingredient.name} onChange={(event) => updateIngredient(index, { name: event.target.value })} placeholder="Ingrediente *" aria-invalid={Boolean(errors.ingredients && !ingredient.name.trim())} /></label>
                <button className="icon-button" type="button" onClick={() => setDraft({ ...draft, ingredients: draft.ingredients.filter((_, itemIndex) => itemIndex !== index) })} aria-label={`Eliminar ingrediente ${index + 1}`} disabled={draft.ingredients.length === 1}>×</button>
              </div>
            ))}
          </div>
          {errors.ingredients && <p className="field-error">{errors.ingredients}</p>}
          <button className="secondary-button add-row-button" type="button" onClick={() => setDraft({ ...draft, ingredients: [...draft.ingredients, { id: createId(), amount: "", unit: "", name: "", quantity: { kind: "unknown", originalText: "" } }] })}>+ Añadir ingrediente</button>
        </fieldset>

        <fieldset className="form-section">
          <legend>Preparación</legend>
          <label className="field">
            <span>Estado</span>
            <select value={draft.preparationStatus} onChange={(event) => setDraft({ ...draft, preparationStatus: event.target.value as RecipeDraft["preparationStatus"] })}>
              <option value="complete">Completa</option>
              <option value="incomplete">Incompleta</option>
              <option value="absent">No disponible</option>
            </select>
          </label>
          {draft.preparationStatus === "absent" ? <p className="section-help">La fuente no contiene pasos de preparación.</p> : (
            <div className="steps-editor">
              {draft.steps.map((step, index) => (
                <div className="step-row" key={step.id}>
                  <span className="step-number" aria-hidden="true">{index + 1}</span>
                  <label><span className="sr-only">Paso {index + 1}</span><textarea value={step.text} onChange={(event) => setDraft({ ...draft, steps: draft.steps.map((item, itemIndex) => itemIndex === index ? { ...item, text: event.target.value } : item) })} rows={2} placeholder="Describe este paso" aria-invalid={Boolean(errors.steps && !step.text.trim())} /></label>
                  <button className="icon-button" type="button" onClick={() => setDraft({ ...draft, steps: draft.steps.filter((_, itemIndex) => itemIndex !== index) })} aria-label={`Eliminar paso ${index + 1}`} disabled={draft.steps.length === 1}>×</button>
                </div>
              ))}
            </div>
          )}
          {errors.steps && <p className="field-error">{errors.steps}</p>}
          <button className="secondary-button add-row-button" type="button" onClick={() => setDraft({ ...draft, preparationStatus: draft.preparationStatus === "absent" ? "incomplete" : draft.preparationStatus, steps: [...draft.steps, { id: createId(), text: "", status: "complete" }] })}>+ Añadir paso</button>
        </fieldset>

        {hasAdvancedData && <p className="section-help" role="status">Esta receta contiene datos avanzados. La edición básica conservará secciones, referencias, fuentes, conservación e incertidumbres.</p>}

        <div className="form-actions"><button className="secondary-button" type="button" onClick={onCancel}>Cancelar</button><button type="submit">{recipe ? "Guardar cambios" : "Crear receta"}</button></div>
      </form>
    </section>
  );
}
