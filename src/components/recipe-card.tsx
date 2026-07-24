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
          <span style={{fontSize: "32px", lineHeight: 1}}>🍲</span>
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
