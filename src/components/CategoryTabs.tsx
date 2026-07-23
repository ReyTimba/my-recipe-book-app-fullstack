import { CATEGORIAS, type CategoriaId } from "../domain/categorias";

interface CategoryTabsProps {
  activa: CategoriaId | null;
  onSelect: (id: CategoriaId | null) => void;
}

export function CategoryTabs({ activa, onSelect }: CategoryTabsProps) {
  return (
    <div className="category-tabs">
      <button
        className={`category-tab ${activa === null ? "active" : ""}`}
        type="button"
        onClick={() => onSelect(null)}
      >
        Todas
      </button>
      {CATEGORIAS.map((cat) => (
        <button
          key={cat.id}
          className={`category-tab ${activa === cat.id ? "active" : ""}`}
          type="button"
          onClick={() => onSelect(activa === cat.id ? null : cat.id)}
        >
          {cat.nombre}
        </button>
      ))}
    </div>
  );
}
