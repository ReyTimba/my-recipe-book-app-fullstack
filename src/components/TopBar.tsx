import { useState } from "react";

interface TopBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function TopBar({ query, onQueryChange }: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-logo">Recetario</span>
      </div>
      <nav className="topbar-nav">
        <button className="topbar-link" type="button">Carta/Menú</button>
      </nav>
      <div className="topbar-right">
        <button
          className="topbar-icon"
          type="button"
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Buscar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" />
          </svg>
        </button>
        <button
          className="topbar-icon"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
        {menuOpen && (
          <div className="topbar-dropdown">
            <button type="button" onClick={() => setMenuOpen(false)}>Añadir receta</button>
            <button type="button" onClick={() => setMenuOpen(false)}>Importar</button>
            <button type="button" onClick={() => setMenuOpen(false)}>Exportar</button>
          </div>
        )}
      </div>
      {searchOpen && (
        <div className="topbar-search">
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar recetas..."
            autoFocus
          />
        </div>
      )}
    </header>
  );
}
