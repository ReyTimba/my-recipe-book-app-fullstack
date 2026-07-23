import { useState } from "react";
import type { Recipe } from "../domain/recipe";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

function minutes(value: number | null): string {
  return value === null ? "—" : `${value} min`;
}

export function RecipeDetail({ recipe, onBack, onEdit, onDelete, onToggleFavorite }: RecipeDetailProps) {
  const [porciones, setPorciones] = useState(recipe.servings ?? 1);
  const escala = recipe.servings ? porciones / recipe.servings : 1;
  const total = recipe.prepMinutes === null || recipe.cookMinutes === null
    ? null
    : recipe.prepMinutes + recipe.cookMinutes;

  function escalar(ing: { amount: string }): string {
    if (!ing.amount || !escala || escala === 1) return ing.amount;
    const num = parseFloat(ing.amount.replace(",", "."));
    if (Number.isNaN(num)) return ing.amount;
    const ajustado = Math.round(num * escala * 100) / 100;
    return ing.amount.includes(".") || ing.amount.includes(",")
      ? ajustado.toFixed(1).replace(".", ",")
      : String(Math.round(ajustado));
  }

  return (
    <article className="detail-view">
      <div className="detail-toolbar">
        <button className="text-button" type="button" onClick={onBack}>← Volver</button>
        <div className="detail-actions">
          <button className="secondary-button" type="button" onClick={onEdit}>Editar</button>
          <button className="danger-button" type="button" onClick={onDelete}>Eliminar</button>
        </div>
      </div>

      <div className="boceto-detail-photo">
        <div className="boceto-card-logo">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>

      <header className="detail-header">
        <div className="tag-row">{recipe.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <h1>{recipe.name}</h1>
        {recipe.description && <p>{recipe.description}</p>}
        <dl className="detail-facts">
          <div><dt>Rendimiento</dt><dd>{recipe.yield.kind === "unknown" ? "—" : recipe.yield.originalText}</dd></div>
          <div><dt>Preparación</dt><dd>{minutes(recipe.prepMinutes)}</dd></div>
          <div><dt>Cocción</dt><dd>{minutes(recipe.cookMinutes)}</dd></div>
          <div><dt>Total</dt><dd>{minutes(total)}</dd></div>
        </dl>
      </header>

      <section className="detail-scale">
        <label>
          <span>Porciones:</span>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={porciones}
            onChange={(e) => setPorciones(Math.max(0.5, Number(e.target.value)))}
          />
        </label>
      </section>

      <div className="detail-content">
        <section aria-labelledby="ingredients-heading">
          <p className="eyebrow">Prepara</p>
          <h2 id="ingredients-heading">Ingredientes</h2>
          {recipe.ingredients.length ? (
            <ul className="ingredient-list">
              {recipe.ingredients.map((ing) => (
                <li key={ing.id}>
                  <span className="ingredient-amount">{escalar(ing)} {ing.unit}</span>
                  <span>{ing.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay ingredientes indicados.</p>
          )}
        </section>

        <section aria-labelledby="steps-heading">
          <p className="eyebrow">Cocina</p>
          <h2 id="steps-heading">Paso a paso</h2>
          {recipe.preparationStatus === "absent" ? (
            <p>Preparación no disponible en la fuente.</p>
          ) : (
            <>
              {recipe.preparationStatus === "incomplete" && <p>La preparación está incompleta.</p>}
              <ol className="steps-list">
                {recipe.steps.map((step, index) => (
                  <li key={step.id}>
                    <span className="step-number" aria-hidden="true">{index + 1}</span>
                    <div>
                      <p>{step.text}</p>
                      {step.temperature && <small>Temperatura: {step.temperature.originalText}</small>}
                      {step.time && <small> · Tiempo: {step.time.originalText}</small>}
                      {step.equipment?.length ? <small> · Equipo: {step.equipment.join(", ")}</small> : null}
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}
        </section>
      </div>

      {recipe.sections.map((section) => (
        <section className="form-section" key={section.id}>
          <p className="eyebrow">{section.kind}</p>
          <h2>{section.title || "Sección"}</h2>
          {section.ingredients.length > 0 && (
            <ul className="ingredient-list">
              {section.ingredients.map((ing) => (
                <li key={ing.id}>
                  <span className="ingredient-amount">{escalar(ing)} {ing.unit}</span>
                  <span>{ing.name}</span>
                </li>
              ))}
            </ul>
          )}
          {section.steps.length > 0 && (
            <ol className="steps-list">
              {section.steps.map((step, index) => (
                <li key={step.id}>
                  <span className="step-number">{index + 1}</span>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}

      {(recipe.sources.length > 0 || recipe.conservation || recipe.uncertainties.length > 0 || recipe.references.length > 0) && (
        <section className="form-section" aria-labelledby="traceability-heading">
          <p className="eyebrow">Trazabilidad</p>
          <h2 id="traceability-heading">Datos adicionales</h2>
          {recipe.sources.length > 0 && <p><strong>Fuentes:</strong> {recipe.sources.map((s) => s.label).join(", ")}</p>}
          {recipe.conservation && <p><strong>Conservación:</strong> {recipe.conservation.status === "unknown" ? "—" : recipe.conservation.originalText}</p>}
          {recipe.references.length > 0 && <p><strong>Relacionadas:</strong> {recipe.references.map((ref) => ref.targetRecipeId).join(", ")}</p>}
          {recipe.uncertainties.length > 0 && <ul>{recipe.uncertainties.map((item) => <li key={item.id}>{item.note}</li>)}</ul>}
        </section>
      )}
    </article>
  );
}
