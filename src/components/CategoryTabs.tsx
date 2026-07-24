import { CATEGORIAS, type CategoriaId } from "../domain/categorias";

interface CategoryTabsProps {
  activa: CategoriaId | null;
  onSelect: (id: CategoriaId | null) => void;
}

export function CategoryTabs({ activa, onSelect }: CategoryTabsProps) {
  return (
    <nav className="category-footer">
      <button
        className={`category-footer-btn ${activa === null ? "active" : ""}`}
        type="button"
        onClick={() => onSelect(null)}
        title="Todas"
      >
        <span className="category-footer-icon">🍽️</span>
      </button>
      {CATEGORIAS.map((cat) => (
        <button
          key={cat.id}
          className={`category-footer-btn ${activa === cat.id ? "active" : ""}`}
          type="button"
          onClick={() => onSelect(activa === cat.id ? null : cat.id)}
          title={cat.nombre}
        >
          <span className="category-footer-icon">{cat.icono}</span>
        </button>
      ))}
    </nav>
  );
}
