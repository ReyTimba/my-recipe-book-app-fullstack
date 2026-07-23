import type { Recipe } from "../domain/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onOpen: () => void;
}

export function RecipeCard({ recipe, onOpen }: RecipeCardProps) {
  const preview = recipe.ingredients.slice(0, 4);

  return (
    <article className="boceto-card" onClick={onOpen}>
      <div className="boceto-card-photo">
        <div className="boceto-card-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>
      <div className="boceto-card-body">
        <h3 className="boceto-card-title">{recipe.name}</h3>
        <ul className="boceto-card-ingredients">
          {preview.map((ing) => (
            <li key={ing.id}>
              <span className="boceto-card-qty">{ing.amount || "—"}</span>
              <span>{ing.unit}</span>
              <span> {ing.name}</span>
            </li>
          ))}
          {recipe.ingredients.length > 4 && (
            <li className="boceto-card-more">+{recipe.ingredients.length - 4} más</li>
          )}
        </ul>
      </div>
    </article>
  );
}
