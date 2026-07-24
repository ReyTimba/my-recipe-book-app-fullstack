import { useEffect, useRef, useState } from "react";

interface TopBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  searchActive: boolean;
  onSearchClose: () => void;
  onSettings?: () => void;
}

export function TopBar({ query, onQueryChange, searchActive, onSearchClose, onSettings }: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchOpen(searchActive);
  }, [searchActive]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

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
            <hr className="topbar-divider" />
            <button type="button" onClick={() => { setMenuOpen(false); onSettings?.(); }}>Ajustes</button>
          </div>
        )}
      </div>
      {searchOpen && (
        <div className="topbar-search">
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}

            placeholder="Buscar recetas..."
          />
        </div>
      )}
    </header>
  );
}
